<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Commande;
use App\Models\Produit;
use App\Models\Details_commande;
use App\Models\Paiement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log; // ← Important
use Illuminate\Support\Str;
use Inertia\Inertia;

class CheckoutController extends Controller
{

    public function storexc(Request $request)
    {
    $user = Auth::user();
    Log::info('[Checkout] Début du processus de paiement pour l’utilisateur', ['user_id' => $user->id]);

    $cartItems = Cart::with('produit')->where('user_id', $user->id)->get();

    if ($cartItems->isEmpty()) {
        Log::warning('[Checkout] Panier vide pour l’utilisateur', ['user_id' => $user->id]);
        return redirect()->route('cart.index')->withErrors('Votre panier est vide.');
    }

    $commande = Commande::create([
        'user_id' => $user->id,
        'date' => now(),
        'statut' => 'en_cours'
    ]);
    Log::info('[Checkout] Commande créée', ['commande_id' => $commande->id]);

    $total = 0;

    foreach ($cartItems as $item) {
        Details_commande::create([
            'commande_id' => $commande->id,
            'produit_id' => $item->produit->id,
            'quantite' => $item->quantity,
            'prix_unitaire' => $item->produit->prix
        ]);

        $total += $item->produit->prix * $item->quantity;
    }

    Log::info('[Checkout] Total calculé', ['montant' => $total]);

    $paiement = Paiement::create([
        'commande_id' => $commande->id,
        'montant' => $total,
        'date' => now(),
        'statut' => 'en_cours',
        'methode_de_paiement' => 'cinetpay',
        'transaction_id' => Str::uuid(),
    ]);

    Log::info('[Checkout] Paiement créé', ['paiement_id' => $paiement->id, 'transaction_id' => $paiement->transaction_id]);

    return $this->initializeCinetPayTransaction($paiement);
    }

//     use Illuminate\Support\Str;
// use Illuminate\Support\Facades\Log;
// use Illuminate\Support\Facades\Http;
// use Illuminate\Support\Facades\Auth;
// use App\Models\Commande;
// use App\Models\DetailCommande;
// use App\Models\Paiement;
// use App\Models\Cart;

public function store(Request $request)
{
    $user = Auth::user();
    $cartItems = Cart::where('user_id', $user->id)->get();

    if ($cartItems->isEmpty()) {
        return redirect()->route('cart.index')->with('error', 'Votre panier est vide.');
    }

    $total = $cartItems->sum(function ($item) {
        return $item->quantite * $item->produit->prix;
    });

    // Créer la commande
    $commande = Commande::create([
        'user_id' => $user->id,
        'date' => now(),
        'statut' => 'en_attente',
        'total' => $total,
    ]);

    foreach ($cartItems as $item) {
        Details_Commande::create([
            'commande_id' => $commande->id,
            'produit_id' => $item->produit_id,
            'quantite' => $item->quantite,
            'prix_unitaire' => $item->produit->prix,
        ]);
    }

    // Générer l'UUID transaction ID
    $transactionId = (string) Str::uuid();

    // Créer le paiement
    $paiement = Paiement::create([
        'commande_id' => $commande->id,
        'montant' => $total,
        'date' => now(),
        'statut' => 'en_cours',
        'methode_de_paiement' => 'cinetpay',
        'transaction_id' => $transactionId,
    ]);

    // Log de debug
    Log::info('[Checkout] Paiement créé', [
        'paiement_id' => $paiement->id,
        'transaction_id' => $transactionId,
    ]);

    // Appel à l'API de CinetPay
    $response = Http::post('https://api-checkout.cinetpay.com/v2/payment', [
        'apikey' => config('services.cinetpay.api_key'),
        'site_id' => config('services.cinetpay.site_id'),
        'transaction_id' => $transactionId,
        'amount' => $total,
        'currency' => 'XAF',
        'description' => 'Paiement de la commande #' . $commande->id,
        'customer_name' => $user->name,
        'customer_surname' => '',
        'customer_email' => $user->email,
        'customer_phone_number' => $user->telephone ?? '',
        'customer_address' => '',
        'customer_city' => '',
        'customer_country' => 'CM',
        'notify_url' => route('checkout.notification', $paiement->id),
        'return_url' => route('checkout.retour', $paiement->id),
        'channels' => 'ALL',
        'lang' => 'fr',
    ]);

    if ($response->successful()) {
        $paymentData = $response->json();
        Log::info('[Checkout] Réponse CinetPay', $paymentData);

        return redirect($paymentData['data']['payment_url']);
    }

    Log::error('[Checkout] Échec de la requête vers CinetPay', ['response' => $response->body()]);

    return redirect()->route('cart.index')->with('error', 'Échec de l\'initialisation du paiement.');
}


    public function initializeCinetPayTransaction(Paiement $paiement)
    {
    $commande = $paiement->commande;
    $user = $commande->user;

    $requestData = [
        'apikey' => env('CINETPAY_API_KEY'),
        'site_id' => env('CINETPAY_SITE_ID'),
        'transaction_id' => $paiement->transaction_id,
        'amount' => $paiement->montant,
        'currency' => 'XAF',
        'description' => 'Paiement pour commande #' . $commande->id,
        'customer_name' => $user->name,
        'customer_email' => $user->email,
        'return_url' => route('checkout.callback', ['paiement' => $paiement->id]),
        'notify_url' => route('checkout.notification', ['id' => $paiement->id]),
        'channels' => 'ALL',
    ];

    Log::info('[Checkout] Envoi à CinetPay', ['data' => $requestData]);

    $response = Http::withHeaders([
        'Content-Type' => 'application/json',
    ])->post(env('CINETPAY_API_URL'), $requestData);

    if ($response->successful() && isset($response['data']['payment_url'])) {
        Log::info('[Checkout] URL CinetPay obtenue', ['url' => $response['data']['payment_url']]);
        return redirect()->away($response['data']['payment_url']);
    }

    Log::error('[Checkout] Erreur de démarrage paiement CinetPay', ['response' => $response->json()]);
    return redirect()->route('cart.index')->withErrors('Erreur lors du démarrage du paiement.');
    }

    public function storex(Request $request)
    {
        $user = Auth::user();
    
        $cartItems = Cart::with('produit')->where('user_id', $user->id)->get();
        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index')->withErrors('Votre panier est vide.');
        }
    
        // Créer la commande
        $commande = Commande::create([
            'user_id' => $user->id,
            'date' => now(),
            'statut' => 'en_cours'
        ]);
    
        $total = 0;
        foreach ($cartItems as $item) {
            DetailsCommande::create([
                'commande_id' => $commande->id,
                'produit_id' => $item->produit->id,
                'quantite' => $item->quantity,
                'prix_unitaire' => $item->produit->prix
            ]);
            $total += $item->produit->prix * $item->quantity;
        }
    
        // Créer un paiement
        $paiement = Paiement::create([
            'commande_id' => $commande->id,
            'montant' => $total,
            'date' => now(),
            'statut' => 'en_cours',
            'methode_de_paiement' => 'cinetpay',
            'transaction_id' => Str::uuid(), // UUID unique pour CinetPay
        ]);
    
        // Rediriger vers l'initialisation du paiement
        return $this->initializeCinetPayTransaction($paiement);
    }
    
    public function callbackc(Request $request, $paiement_id)
    {
        $paiement = Paiement::findOrFail($paiement_id);
        $commande = $paiement->commande;

        // Supposons que l'API CinetPay retourne un champ 'status'
        $status = $request->get('status'); // ou récupération via appel API

        if ($status === 'success') {
            $paiement->update(['statut' => 'effectue']);
            $commande->update(['statut' => 'effectue']);

            // Vider le panier de l'utilisateur
            Cart::where('user_id', $commande->user_id)->delete();

            return redirect()->route('cart.index')->with('success', 'Paiement réussi, commande enregistrée !');
        } else {
            $paiement->update(['statut' => 'echoue']);
            $commande->update(['statut' => 'echoue']);

            return redirect()->route('cart.index')->withErrors('Paiement échoué. Veuillez réessayer.');
        }
    }

    public function callback(Request $request, $paiement_id)
    {
        $paiement = Paiement::findOrFail($paiement_id);
        $commande = $paiement->commande;

        // Optionnel : tu peux aussi appeler CinetPay ici pour vérifier le statut si tu veux être plus sûr

        if ($request->get('status') === 'success') {
            $paiement->update(['statut' => 'effectue']);
            $commande->update(['statut' => 'effectue']);
            Cart::where('user_id', $commande->user_id)->delete();

            return redirect()->route('commande.show', $commande->id)->with('success', 'Paiement réussi');
        } else {
            $paiement->update(['statut' => 'echoue']);
            $commande->update(['statut' => 'echoue']);
            return redirect()->route('cart.index')->withErrors('Le paiement a échoué');
        }
    }

    public function initializeCinetPayTransactionx(Paiement $paiement)
    {
        $commande = $paiement->commande;
        $user = $commande->user;
    
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post(
            env('CINETPAY_API_URL', 'https://api-checkout.cinetpay.com/v2/payment'),
            [
                'apikey' => env('CINETPAY_API_KEY'),
                'site_id' => env('CINETPAY_SITE_ID'),
                'transaction_id' => $paiement->transaction_id,
                'amount' => $paiement->montant,
                'currency' => 'XAF',
                'description' => 'Paiement pour commande #' . $commande->id,
                'customer_name' => $user->name,
                'customer_email' => $user->email,
                'return_url' => route('checkout.callback', ['paiement' => $paiement->id]),
                'notify_url' => route('checkout.notification', ['id' => $paiement->id]),
                'channels' => 'ALL',
            ]
        );
    
        if ($response->successful() && isset($response['data']['payment_url'])) {
            return redirect()->away($response['data']['payment_url']);
        }
    
        \Log::error('Erreur CinetPay', ['response' => $response->json()]);
        return redirect()->route('cart.index')->withErrors('Erreur lors du démarrage du paiement.');
    }
    
    public function notificationg(Request $request, $transaction_id)
    {
        Log::info($request->all());

        try {
            $purchase = Paiement::where('id', $transaction_id)->first();

            if (!$purchase) {
                Log::error('Purchase not found for transaction ID: ' . $transaction_id);
                return response();
            }

            $this->checkStatus($purchase);

            return response();
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response();
        }
    }

    public function retour($id)
{
    $paiement = Paiement::findOrFail($id);
    $commande = $paiement->commande;

    $message = match ($paiement->statut) {
        'effectue' => 'Paiement validé avec succès.',
        'echoue' => 'Le paiement a échoué.',
        default => 'Le paiement est en attente de validation.',
    };

    $type = match ($paiement->statut) {
        'effectue' => 'success',
        'echoue' => 'error',
        default => 'info',
    };

    return redirect()->route('cart.index')->with($type, $message);
}


    public function notificationff(Request $request, $id)
    {
        $paiement = Paiement::findOrFail($id);
        $commande = $paiement->commande;

        $status = $request->get('payment_status');

        if ($status === 'ACCEPTED') {
            $paiement->update(['statut' => 'effectue']);
            $commande->update(['statut' => 'effectue']);
            return redirect()->route('cart.index')->with('success', 'Paiement réussi !');
        } else {
            $paiement->update(['statut' => 'echoue']);
            $commande->update(['statut' => 'echoue']);
            return redirect()->route('cart.index')->with('error', 'Paiement échoué !');
        }

    }

    public function notification(Request $request, $id)
{
    $paiement = Paiement::findOrFail($id);
    $commande = $paiement->commande;

    $status = $request->get('payment_status');

    if ($status === 'ACCEPTED') {
        $paiement->update(['statut' => 'effectue']);
        $commande->update(['statut' => 'effectue']);
    } else {
        $paiement->update(['statut' => 'echoue']);
        $commande->update(['statut' => 'echoue']);
    }

    Log::info('[Notification CinetPay]', [
        'paiement_id' => $paiement->id,
        'status' => $status,
    ]);

    return redirect()->route('cart.index')->with(
        $status === 'ACCEPTED' ? 'success' : 'error',
        $status === 'ACCEPTED' ? 'Paiement réussi !' : 'Paiement échoué.'
    );
}


    public function verification(Request $request, $transaction_id)
    {
        $purchase = Paiement::where('transaction_id', $transaction_id)->first();

        if (!$purchase) {
            return redirect()->route('home')->with('error', 'Transaction not found.');
        }

        if ($purchase->status === 'completed') {
            return redirect()->route('purchase.response', $purchase->id)->with('success', 'Transaction successful. Thank you for your purchase!');
        } else {

            $this->checkStatus($purchase);

            $purchase->refresh();

            if ($purchase->status === 'completed') {
                return redirect()->route('purchase.response', $purchase->id)->with('success', 'Transaction successful. Thank you for your purchase!');
            }

            return redirect()->route('purchase.response', $purchase->id)->with('error', 'Transaction failed or pending. Please try again later.');
        }
    }
}
