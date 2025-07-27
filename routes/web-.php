<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\{
    CatalogueController,
    HomeController,
    DashboardController,
    Admin\ProductController,
    Admin\CategoryController,
    CustomerController,
    OrderController,
    ReviewController,
    SettingController,
    CartController,
    CheckoutController,
    PurchaseController
};

// Public routes
Route::get('/', [HomeController::class, 'index'])->name('home');

// Catalogue routes
Route::prefix('catalogue')->group(function () {
    Route::get('categories', [CatalogueController::class, 'getCategories']);
    Route::get('produits', [CatalogueController::class, 'getProduits']);
    Route::get('produits/{id}', [ProductController::class, 'getProduit']);
    Route::get('search', [CatalogueController::class, 'searchProduits']);
});

// Authenticated routes
Route::middleware(['auth'])->group(function () {
    // Cart routes
    Route::prefix('cart')->group(function () {
        Route::get('/', [CartController::class, 'index'])->name('cart.index');
        Route::post('/add/{id}', [CartController::class, 'add'])->name('cart.add');
        Route::get('/addToCart/{id}', [CartController::class, 'addToCart'])->name('cart.addToCart');
        Route::post('/remove/{id}', [CartController::class, 'remove'])->name('cart.remove');
        Route::get('/checkout', [CartController::class, 'checkout'])->name('cart.checkout');
        Route::post('/checkout', [CartController::class, 'processCheckout'])->name('cart.processCheckout');
    });

    // Checkout route
    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout');
});

// Authenticated & verified routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('dashboard', fn() => Inertia::render('dashboard'))->name('dashboard');
    
    // Admin dashboard
    Route::get('adminDashboard', [DashboardController::class, 'index'])->name('adminDashboard');
    Route::get('customers', [CustomerController::class, 'index'])->name('admin.customers');
    Route::get('orders', [OrderController::class, 'index'])->name('admin.orders');
    Route::get('reviews', [ReviewController::class, 'index'])->name('admin.reviews');
    Route::get('settings', [SettingController::class, 'index'])->name('admin.settings');

    // Admin products
    Route::prefix('admin/products')->group(function () {
        Route::get('/', [ProductController::class, 'index'])->name('admin.products');
        Route::post('/', [ProductController::class, 'store'])->name('admin.products.store');
        Route::get('/add', [ProductController::class, 'add'])->name('admin.products.add');
        Route::delete('/{produit}', [ProductController::class, 'destroy'])->name('admin.products.destroy');
        Route::post('/{produit}/update', [ProductController::class, 'update'])->name('admin.products.update');
        Route::get('/{produit}/edit', [ProductController::class, 'edit'])->name('admin.products.edit');
    });

    // Admin categories (resourceful)
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('categories', CategoryController::class)->except(['show']);
    });
});

// Sanctum authenticated & verified routes
Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::prefix('purchase')->group(function () {
        Route::get('/{id}', [PurchaseController::class, 'show'])->name('purchase.show');
        Route::post('/{productId}', [PurchaseController::class, 'purchase'])->name('purchase.purchase');
        Route::get('/verify/{transaction_id}', [PurchaseController::class, 'verification'])->name('purchase.verify');
        Route::post('/notify/{transaction_id}', [PurchaseController::class, 'notification'])->name('purchase.notify');
    });
});


Route::middleware(['auth'])->group(function () {
    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
    Route::get('/checkout/callback/{paiement}', [CheckoutController::class, 'callback'])->name('checkout.callback');
});

// Include additional route files
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';