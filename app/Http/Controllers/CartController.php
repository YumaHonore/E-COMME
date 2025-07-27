<?php

// app/Http/Controllers/CartController.php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $cartItems = Cart::with('produit')->where('user_id', Auth::id())->get();
        return Inertia::render('cart/index', [
            'cartItems' => $cartItems
            // 'categories' => $categories,
        ]);
    }

    public function addToCart(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        return Inertia::render('cart/EditProduct', [
            'product' => $produit->load('images'),
            'categories' => $categories,
        ]);
    }

    public function add(Request $request, $id)
    {
        $product = Produit::findOrFail($id);
        $cartItem = Cart::where('user_id', Auth::id())->where('produit_id', $product->id)->first();

        if ($cartItem) {
            $cartItem->increment('quantity');
        } else {
            Cart::create([
                'user_id' => Auth::id(),
                'produit_id' => $product->id,
                'quantity' => 1,
            ]);
        }

        return redirect()->route('cart.index')->with('success', 'Produit ajouté au panier.');
    }

    public function remove($id)
    {
        $cartItem = Cart::where('user_id', Auth::id())->where('produit_id', $id)->first();
        if ($cartItem) {
            $cartItem->delete();
        }

        return redirect()->route('cart.index')->with('success', 'Produit retiré du panier.');
    }

    public function checkout()
    {
        $cartItems = Cart::with('produit')->where('user_id', Auth::id())->get();
        return view('cart.checkout', compact('cartItems'));
    }

    public function processCheckout(Request $request)
    {
        // Validation des donnees
        $request->validate([
            'stripeToken' => 'required',
        ]);

        // Creer le paiement
        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));

        $cartItems = Cart::with('produit')->where('user_id', Auth::id())->get();
        $totalAmount = $cartItems->sum(function ($item) {
            return $item->product->price * $item->quantity * 100; // Passez au centime
        });

        try {
            $charge = \Stripe\Charge::create([
                'amount' => $totalAmount,
                'currency' => 'eur',
                'description' => 'Achat de produits',
                'source' => $request->stripeToken,
            ]);

            // Vider le panier apres le paiement
            Cart::where('user_id', Auth::id())->delete();

            return redirect()->route('cart.index')->with('success', 'Paiement effectu� avec succ�s !');
        } catch (\Exception $e) {
            return redirect()->route('cart.index')->withErrors('Erreur lors du paiement : ' . $e->getMessage());
        }
    }
}