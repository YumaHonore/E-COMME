<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Produit;
use App\Models\Categorie;
use App\Models\ProduitImage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Produit::query()->with('categorie');

        if ($request->filled('search')) {
            $query->where('nom', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('categorie')) {
            $query->where('categorie_id', $request->categorie);
        }

        if ($request->filled('status')) {
            if ($request->status === 'in_stock') {
                $query->where('quantite_en_stock', '>', 0);
            } elseif ($request->status === 'out_of_stock') {
                $query->where('quantite_en_stock', '=', 0);
            } elseif ($request->status === 'low_stock') {
                $query->whereBetween('quantite_en_stock', [1, 9]);
            }
        }

        $produits = $query->latest()->paginate(10)->through(function ($produit) {
            return [
                'id' => $produit->id,
                'nom' => $produit->nom,
                'prix' => $produit->prix,
                'stock' => $produit->quantite_en_stock,
                'categorie' => $produit->categorie->nom ?? 'Non classé',
                'status' => $produit->quantite_en_stock === 0
                    ? 'out_of_stock'
                    : ($produit->quantite_en_stock < 10 ? 'low_stock' : 'in_stock'),
            ];
        });

        $categories = Categorie::select('id', 'nom')->get();

        return Inertia::render('Admin/Products', [
            'products' => $produits,
            'categories' => $categories,
            'filters' => $request->only('search', 'categorie', 'status')
        ]);
    }

    public function add()
    {
        $categories = Categorie::all();
        return Inertia::render('Admin/ProductForm', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'nom' => 'required|string|max:255',
        'description' => 'nullable|string',
        'prix' => 'required|numeric|min:0',
        'quantite_en_stock' => 'nullable|integer|min:0',
        'categorie_id' => 'nullable|exists:categories,id',
        'image' => 'nullable|image|max:2048',
        'images.*' => 'nullable|image|max:2048', // Validation pour les images secondaires
    ]);

    // Sauvegarder l'image principale
    if ($request->hasFile('image')) {
        $validated['image'] = $request->file('image')->store('produits', 'public');
    }

    // Créer le produit
    $produit = Produit::create($validated);

    // Sauvegarder les images secondaires
    if ($request->hasFile('images')) {
        foreach ($request->file('images') as $image) {
            $path = $image->store('produits/secondaires', 'public');
            ProduitImage::create([
                'produit_id' => $produit->id,
                'image_path' => $path,
            ]);
        }
    }

    return redirect()->route('admin.products')->with('success', 'Produit créé avec succès !');
}


    public function destroy(Produit $produit)
    {
        if ($produit->image) {
            Storage::disk('public')->delete($produit->image);
        }

        foreach ($produit->images as $image) {
            Storage::disk('public')->delete($image->chemin);
            $image->delete();
        }

        $produit->delete();
        return back()->with('success', 'Produit supprimé avec succès.');
    }

    public function edit(Produit $produit)
    {
        $categories = Categorie::all();
        return Inertia::render('Admin/EditProduct', [
            'product' => $produit->load('images'),
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Produit $produit)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prix' => 'required|numeric|min:0',
            'quantite_en_stock' => 'nullable|integer|min:0',
            'categorie_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'images.*' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($produit->image) {
                Storage::disk('public')->delete($produit->image);
            }
            $validated['image'] = $request->file('image')->store('produits', 'public');
        }

        $produit->update($validated);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('produits/secondaires', 'public');
                ProduitImage::create([
                    'produit_id' => $produit->id,
                    'chemin' => $path,
                ]);
            }
        }

        return redirect()->route('admin.products')->with('success', 'Produit mis à jour avec succès !');
    }

    public function show($id)
    {
        $produit = Produit::with(['categorie', 'images'])->findOrFail($id);
        return Inertia::render('Produits/Show', [
            'produit' => [
                'id' => $produit->id,
                'nom' => $produit->nom,
                'description' => $produit->description,
                'prix' => $produit->prix,
                'quantite_en_stock' => $produit->quantite_en_stock,
                'categorie' => $produit->categorie ? $produit->categorie->nom : 'Non classé',
                'image' => $produit->image ? asset('storage/' . $produit->image) : null,
                'images' => $produit->images->map(fn($img) => [
                    'id' => $img->id,
                    'url' => asset('storage/' . $img->image_path)
                ]),
            ]
        ]);
    }
}
