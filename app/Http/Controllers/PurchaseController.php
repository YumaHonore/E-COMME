<?php

namespace App\Http\Controllers;

use App\Models\Paiement;
use App\Models\Purchase;
use App\Models\Commande;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PurchaseController extends Controller
{
    public function show($id)
    {
        $purchase = Purchase::findOrFail($id);
        return view('purchase.show', compact('purchase'));
    }

    public function purchase(Request $request, $productId)
    {
        $product = \App\Models\Produit::findOrFail($productId);

        $purchase = new Purchase();
        $purchase->user_id = Auth::id();
        $purchase->product_id = $productId;
        $purchase->price = $product->prix;
        $purchase->status = 'pending';
        $purchase->transaction_id = 'txn_' . uniqid();

        if ($purchase->save()) {
            return $this->initializeCinetPayTransaction($purchase);
        } else {
            return redirect()->route('home')->with('error', 'Purchase failed. Please try again.');
        }
    }

    public function initializeCinetPayTransaction($purchase)
    {
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post(env('CINETPAY_API_URL'), [
            'apikey' => env('CINETPAY_API_KEY'),
            'site_id' => env('CINETPAY_SITE_ID'),
            'transaction_id' => $purchase->transaction_id,
            'amount' => intval($purchase->price),
            'currency' => 'CDF',
            'description' => 'Achat du produit ID : ' . $purchase->product_id,
            'return_url' => route('purchase.verify', ['transaction_id' => $purchase->transaction_id]),
            'notify_url' => route('purchase.notify', ['transaction_id' => $purchase->transaction_id]),
            'channels' => 'ALL',
        ]);

        if ($response->successful()) {
            $data = $response->json();
            if (isset($data['code']) && $data['code'] == '201' && $data['message'] === 'CREATED') {
                return redirect($data['data']['payment_url']);
            }
        }

        Log::error('CinetPay transaction initialization failed', [
            'response' => $response->json(),
            'purchase_id' => $purchase->id,
        ]);

        return redirect()->route('home')->with('error', 'Une erreur s\'est produite');
    }

    public function notification(Request $request, $transaction_id)
    {
        Log::info('Notification received', $request->all());

        try {
            $purchase = Purchase::where('transaction_id', $transaction_id)->first();
            if (!$purchase) {
                Log::error('Purchase not found for transaction ID: ' . $transaction_id);
                return response()->json(['status' => 'error', 'message' => 'Purchase not found']);
            }

            $this->checkStatus($purchase);
            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            Log::error('Error processing notification: ' . $e->getMessage());
            return response()->json(['status' => 'error', 'message' => 'Internal server error']);
        }
    }

    public function verification(Request $request, $transaction_id)
    {
        $purchase = Purchase::where('transaction_id', $transaction_id)->first();

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

    protected function checkStatus($purchase)
    {
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post(env('CINETPAY_API_URL') . '/check', [
            'apikey' => env('CINETPAY_API_KEY'),
            'site_id' => env('CINETPAY_SITE_ID'),
            'transaction_id' => $purchase->transaction_id,
        ]);

        if ($response->successful()) {
            $data = $response->json();

            if (isset($data['code']) && $data['code'] == '00' && $data['message'] === 'SUCCES') {
                $purchase->update([
                    'status' => 'completed',
                    'purchased_at' => now(),
                ]);

                // Mettre à jour ou créer un enregistrement de paiement
                Paiement::updateOrCreate(
                    ['commande_id' => $purchase->id],
                    [
                        'montant' => $purchase->price,
                        'date' => now(),
                        'statut' => 'effectué',
                        'methode_de_paiement' => 'CinetPay',
                    ]
                );
            } else {
                $purchase->update(['status' => 'failed']);
            }
        }

        return true;
    }
}
