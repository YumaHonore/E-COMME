<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Produit;
use App\Models\Categorie;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Gate;

class DashboardController extends Controller
{
    public function index()
    {
        // Récupérer les produits phares (ex: 4 premiers)
        $featuredProducts = Produit::take(4)->get();
        
        // Récupérer les catégories (si vous avez un modèle Category)
        $categories = Categorie::all();
        $roles;
        $user;
        if(Auth::user()){
            $user = Auth::user();
            $roles = Auth::user()->getRoleNames();
        }

        return Inertia::render('Admin/Dashboard', [
            'featuredProducts' => $featuredProducts,
            'auth' => [
                'user' => Auth::user() ? [
                    'name' => Auth::user()->name,
                    'initials' => strtoupper(substr(Auth::user()->name, 0, 2)),
                    'email' => Auth::user()->email,
                    'id'=> Auth::user()->id,
                    'role' => $roles 
                ] : null
                ],
            'categories' => $categories
        ]);    
    }
}
