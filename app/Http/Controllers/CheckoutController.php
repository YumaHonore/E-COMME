<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Commande;
use App\Models\Details_commande;
use App\Models\Paiement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class CheckoutController extends Controller
{
    public function store(Request $request)
    {
        $user = Auth::user();
        $cartItems = Cart::with('produit')->where('user_id', $user->id)->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'Votre panier est vide.');
        }

        $total = $cartItems->sum(function ($item) {
            if (!$item->produit) {
                Log::warning('[Checkout] Produit introuvable dans le panier', ['cart_id' => $item->id]);
                return 0;
            }
            return $item->quantity * $item->produit->prix;
        });

        if ($total <= 0) {
            Log::warning('[Checkout] Montant total invalide', ['user_id' => $user->id, 'total' => $total]);
            return redirect()->route('cart.index')->with('error', 'Montant de commande invalide.');
        }

        $commande = Commande::create([
            'user_id' => $user->id,
            'date' => now(),
            'statut' => 'en_attente',
            'total' => $total,
        ]);

        foreach ($cartItems as $item) {
            if ($item->produit) {
                Details_commande::create([
                    'commande_id' => $commande->id,
                    'produit_id' => $item->produit_id,
                    'quantite' => $item->quantity,
                    'prix_unitaire' => $item->produit->prix,
                ]);
            }
        }

        $transactionId = (string) Str::uuid();

        $paiement = Paiement::create([
            'commande_id' => $commande->id,
            'montant' => $total,
            'date' => now(),
            'statut' => 'en_cours',
            'methode_de_paiement' => 'cinetpay',
            'transaction_id' => $transactionId,
        ]);

        Log::info('[Checkout] Paiement créé', [
            'paiement_id' => $paiement->id,
            'transaction_id' => $transactionId,
        ]);

        $response = Http::post('https://api-checkout.cinetpay.com/v2/payment', [
            'apikey' => env('CINETPAY_API_KEY'),
            'site_id' => env('CINETPAY_SITE_ID'),
            'transaction_id' => $transactionId,
            'amount' => $total,
            'currency' => 'CDF',
            'description' => 'Paiement de la commande #' . $commande->id,
            'customer_name' => $user->name,
            'customer_surname' => '',
            'customer_email' => $user->email,
            'customer_phone_number' => $user->telephone ?? '',
            'customer_address' => '',
            'customer_city' => '',
            'customer_country' => 'CM',
            'notify_url' => route('checkout.notification', $paiement->id),
            'return_url' => route('checkout.callback', $paiement->id),
            'channels' => 'ALL',
            'lang' => 'fr',
        ]);

        if ($response->successful() && isset($response['data']['payment_url'])) {
            Log::info('[Checkout] Réponse CinetPay', $response->json());
            // return redirect()->away($response['data']['payment_url']);
            return response()->json([
                'redirect_url' => $response['data']['payment_url'] ?? null,
            ]);
            
        }

        Log::error('[Checkout] Échec de l’appel à CinetPay', [
            'paiement_id' => $paiement->id,
            'response' => $response->body(),
        ]);

        return redirect()->route('cart.index')->with('error', 'Erreur lors de l\'initialisation du paiement.');
    }

    public function callback(Request $request, $paiement_id)
    {
        $paiement = Paiement::findOrFail($paiement_id);
        $commande = $paiement->commande;
        $status = $request->get('status');

        if ($status === 'success') {
            $paiement->update(['statut' => 'effectue']);
            $commande->update(['statut' => 'effectue']);
            Cart::where('user_id', $commande->user_id)->delete();

            return redirect()->route('commande.show', $commande->id)->with('success', 'Paiement réussi.');
        } else {
            $paiement->update(['statut' => 'echoue']);
            $commande->update(['statut' => 'echoue']);

            return redirect()->route('cart.index')->with('error', 'Le paiement a échoué.');
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
}
