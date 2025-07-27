<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Commande;
use App\Models\DetailsCommande;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class CommandeController extends Controller
{
    public function passerCommande(Request $request)
    {
        $user = Auth::user();
        $panier = Cart::where('user_id', $user->id)->get();

        if ($panier->isEmpty()) {
            return back()->with('error', 'Votre panier est vide.');
        }

        // Création de la commande
        $commande = new Commande();
        $commande->user_id = $user->id;
        $commande->statut = 'en_attente';
        $commande->transaction_id = 'cmd_' . uniqid();
        $commande->montant_total = $panier->sum(fn($item) => $item->produit->prix * $item->quantite);
        $commande->save();

        // Détails de la commande
        foreach ($panier as $item) {
            DetailsCommande::create([
                'commande_id' => $commande->id,
                'produit_id' => $item->produit_id,
                'quantite' => $item->quantite,
                'prix_unitaire' => $item->produit->prix,
            ]);
        }

        // Redirection vers CinetPay
        return $this->initialiserCinetPay($commande);
    }

    protected function initialiserCinetPay(Commande $commande)
    {
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post(
            env('CINETPAY_API_URL'),
            [
                'apikey' => env('CINETPAY_API_KEY'),
                'site_id' => env('CINETPAY_SITE_ID'),
                'transaction_id' => $commande->transaction_id,
                'amount' => intval($commande->montant_total),
                'currency' => 'CDF',
                'description' => 'Paiement de commande #' . $commande->id,
                'return_url' => route('commande.verifier', ['transaction_id' => $commande->transaction_id]),
                'notify_url' => route('commande.notifier', ['transaction_id' => $commande->transaction_id]),
                'channels' => ['ALL'],
            ]
        );

        if ($response->successful()) {
            $data = $response->json();

            if ($data['code'] === '201' && $data['message'] === 'CREATED') {
                return redirect($data['data']['payment_url']);
            }
        }

        Log::error('Échec initialisation CinetPay', [
            'commande_id' => $commande->id,
            'response' => $response->json()
        ]);

        return redirect()->route('home')->with('error', 'Erreur lors de l\'initialisation du paiement.');
    }

    public function verifierPaiement(Request $request, $transaction_id)
    {
        $commande = Commande::where('transaction_id', $transaction_id)->first();

        if (!$commande) {
            return redirect()->route('home')->with('error', 'Commande non trouvée.');
        }

        if ($commande->statut === 'payée') {
            return redirect()->route('commande.show', $commande->id)->with('success', 'Paiement confirmé !');
        }

        $this->verifierStatut($commande);
        $commande->refresh();

        if ($commande->statut === 'payée') {
            return redirect()->route('commande.show', $commande->id)->with('success', 'Paiement confirmé !');
        }

        return redirect()->route('commande.show', $commande->id)->with('error', 'Le paiement est en attente ou a échoué.');
    }

    public function notificationPaiement(Request $request, $transaction_id)
    {
        Log::info('Notification CinetPay', $request->all());

        $commande = Commande::where('transaction_id', $transaction_id)->first();
        if (!$commande) {
            Log::error('Commande non trouvée pour la notification', ['transaction_id' => $transaction_id]);
            return response();
        }

        $this->verifierStatut($commande);
        return response();
    }

    protected function verifierStatut(Commande $commande)
    {
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post(
            env('CINETPAY_API_URL') . '/check',
            [
                'apikey' => env('CINETPAY_API_KEY'),
                'site_id' => env('CINETPAY_SITE_ID'),
                'transaction_id' => $commande->transaction_id,
            ]
        );

        if ($response->successful()) {
            $data = $response->json();

            if ($data['code'] === '00' && $data['message'] === 'SUCCES') {
                $commande->statut = 'payée';
                $commande->date_commande = now();
            } else {
                $commande->statut = 'échouée';
            }

            $commande->save();
        }
    }

    public function show($id)
    {
        $commande = Commande::with('details.produit')->findOrFail($id);

        return Inertia::render('commande.show', [
            'commande' => $commande]);
    }
}
