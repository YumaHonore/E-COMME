<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use App\Models\Produit;
use Illuminate\Http\Request;

class CatalogueController extends Controller
{
    public function getCategories()
    {
        $categories = Categorie::all();
        return response()->json($categories);
    }

    public function getProduits()
    {
        $produits = Produit::with('categorie')->get();
        return response()->json($produits);
    }

    public function getProduit($id)
    {
        $produit = Produit::with('categorie')->findOrFail($id);
        return response()->json($produit);
    }

    public function searchProduits(Request $request)
    {
        $query = $request->input('query');
        $produits = Produit::where('nom', 'LIKE', '%' . $query . '%')->with('categorie')->get();
        return response()->json($produits);
    }
}