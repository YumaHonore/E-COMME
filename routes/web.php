<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CatalogueController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;

Route::get('/categorie/{slug}', [ProduitController::class, 'parCategorie'])->name('categorie.produits');
Route::get('/categorie/{slug}', [ProduitController::class, 'parCategorie'])->name('categorie.produits');

Route::get('/', [HomeController::class, 'index'])->name('home');

// use Inertia\Inertia;
use App\Models\Produit;

Route::get('/nouveautes', function () {
    $produits = Produit::latest()->take(8)->get(); // ou filtre par une catégorie "nouveautés"
    return Inertia::render('Nouveautes', [
        'produits' => $produits
    ]);
});

Route::get('/apropos', function () {
    return Inertia::render('AboutUs');
});

// use App\Http\Controllers\ProduitController;



Route::get('categories', [CatalogueController::class, 'getCategories']);
Route::get('produits', [CatalogueController::class, 'getProduits']);
Route::get('produits/{id}', [CatalogueController::class, 'getProduit']);
Route::get('search', [CatalogueController::class, 'searchProduits']);


Route::get('/produits/{id}', [ProductController::class, 'show'])->name('produits.show');
Route::post('/panier', [PanierController::class, 'ajouter'])->middleware('auth');



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('adminDashboard', [DashboardController::class, 'index'])->name('adminDashboard');
    Route::get('customers', [CustomerController::class, 'index'])->name('admin.customers');
    Route::get('orders', [OrderController::class, 'index'])->name('admin.orders');
    Route::get('reviews', [ReviewController::class, 'index'])->name('admin.reviews');
    Route::get('settings', [SettingController::class, 'index'])->name('admin.settings');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart/add/{id}', [CartController::class, 'add'])->name('cart.add');
    Route::get('/cart/addToCart/{id}', [CartController::class, 'addToCart'])->name('cart.addToCart');
    Route::post('/cart/remove/{id}', [CartController::class, 'remove'])->name('cart.remove');
    Route::get('/cart/checkout', [CartController::class, 'checkout'])->name('cart.checkout');
    Route::post('/cart/checkout', [CartController::class, 'processCheckout'])->name('cart.processCheckout');
    
    Route::get('/buying/buynow/{id}', [BuyingController::class, 'buyNow'])->name('buy.now');
});

// Route::prefix('admin')->group(function () {
    // Route::get('/dashboard', fn() => Inertia::render('Admin/Dashboard'))->name('admin.dashboard');

// routes/web.php
Route::post('/checkout', [\App\Http\Controllers\CheckoutController::class, 'store'])->name('checkout')->middleware('auth');


    // Route::prefix('admin')->group(function () {
        Route::get('admin/products', [ProductController::class, 'index'])->name('admin.products');
        Route::post('/admin/products', [ProductController::class, 'store'])->name('admin.products.store');
        Route::get('admin/products/add', [ProductController::class, 'add'])->name('admin.products.add');
        Route::delete('/admin/products/{produit}', [ProductController::class, 'destroy'])->name('admin.products.destroy');
        Route::post('/admin/products/{produit}/update', [ProductController::class, 'update'])->name('admin.products.update');
        Route::get('/admin/products/{produit}/edit', [ProductController::class, 'edit'])->name('admin.products.edit');

        Route::prefix('admin')->middleware(['auth'])->name('admin.')->group(function () {
            Route::resource('categories', CategoryController::class)->except(['show']);
        });
        
    // });
    
    // Tu pourras faire pareil ensuite pour customers, orders, reviews, etc.
// });



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('adminDashboard', function () {
//         return Inertia::render('adminDashboard');
//     })->name('adminDashboard');
// });

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

use App\Http\Controllers\PurchaseController;

Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/purchase/{id}', [PurchaseController::class, 'show'])->name('purchase.show');
    Route::post('/purchase/{productId}', [PurchaseController::class, 'purchase'])->name('purchase.purchase');
    Route::get('/purchase/verify/{transaction_id}', [PurchaseController::class, 'verification'])->name('purchase.verify');
    Route::post('/purchase/notify/{transaction_id}', [PurchaseController::class, 'notification'])->name('purchase.notify');
});

Route::middleware(['auth'])->group(function () {
    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
    Route::get('/checkout/callback/{paiement}', [CheckoutController::class, 'callback'])->name('checkout.callback');
    Route::get('/purchase/verify/{id}', [CheckoutController::class, 'verification'])->name('purchase.verify');
    Route::post('/purchase/notify/{id}', [CheckoutController::class, 'notification'])->name('purchase.notify');
    Route::post('/checkout/notify/{id}', [CheckoutController::class, 'notification'])->name('checkout.notification');
});


Route::get('/commande/{id}', [CommandeController::class, 'show'])->name('commande.show');
Route::get('/commande/verifier/{transaction_id}', [CommandeController::class, 'verifierPaiement'])->name('commande.verifier');
Route::post('/commande/notifier/{transaction_id}', [CommandeController::class, 'notificationPaiement'])->name('commande.notifier');
