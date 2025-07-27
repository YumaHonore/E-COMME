<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProduitController extends Controller
{
    public function parCategorie($slug)
    {
        // On cherche la catégorie par son nom (slug ou nom propre)
        $categorie = Categorie::where('nom', $slug)->firstOrFail();

        // On récupère les produits liés, paginés
        $produits = $categorie->produits()->paginate(6); // 6 produits par page

        return Inertia::render('ProduitsParCategorie', [
            'categorie' => $categorie,
            'produits' => $produits,
        ]);
    }
}
