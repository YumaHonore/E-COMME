<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use App\Models\Categorie;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Gate;

class HomeController extends Controller
{

    public function index()
    {
        // Récupérer les produits phares (ex: 4 premiers)
        $featuredProducts = Produit::with(['images'])->take(20)->get();
        
        // Récupérer les catégories (si vous avez un modèle Category)
        $categories = Categorie::all();
        $roles;
        $user;
        if(Auth::user()){
            // $UserId = Auth::user()->id
            $User = Auth::user();
            $roles = Auth::user()->getRoleNames();
            $rolesString = $roles->implode(', ');
            // $roles = Auth::user() -> hasRole('admin');
        }

        // dd($featuredProducts->image);
        // dd($featuredProducts);

        $Products = $featuredProducts;
        foreach($Products as $product){
            // dd($product->image);
            // feat
            $product->image = $product->image ? asset('storage/' . $product->image) : null;
        }

        return Inertia::render('Home', [
            'featuredProducts' => $Products,
            'auth' => [
                'user' => Auth::user() ? [
                    'name' => Auth::user()->name,
                    'initials' => strtoupper(substr(Auth::user()->name, 0, 2)),
                    'email' => Auth::user()->email,
                    'id'=> Auth::user()->id,
                    'role' => $rolesString
                ] : null
                ],
            'categories' => $categories
        ]);
    }
}