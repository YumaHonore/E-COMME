<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Produit;
use App\Models\ProduitImage;

class ProduitsTableSeeder extends Seeder
{
    public function run(): void
    {
        $produits = [
            [
                'nom' => 'T-shirt blanc',
                'description' => 'Un joli T-shirt blanc classique',
                'prix' => 500,
                'stock' => 10,
                'categorie_id' => 1,
            ],
            [
                'nom' => 'T-shirt noir',
                'description' => 'Un élégant T-shirt noir',
                'prix' => 500,
                'stock' => 5,
                'categorie_id' => 2,
            ],
            [
                'nom' => 'T-shirt rouge',
                'description' => 'T-shirt rouge vif pour l\'été',
                'prix' => 500,
                'stock' => 8,
                'categorie_id' => 1,
            ],
        ];

        foreach ($produits as $data) {
            $produit = Produit::create([
                'nom' => $data['nom'],
                'description' => $data['description'],
                'prix' => $data['prix'],
                'image' => 'images/images.jpg', // déprécié, on utilise produit_images
                'quantite_en_stock' => $data['stock'],
                'categorie_id' => $data['categorie_id'],
                'is_featured' => true,
            ]);

            // Ajouter des images factices
            $images = [
                ['file' => 'images/img.jpg', 'main' => true],
                ['file' => 'images/img2.jpg', 'main' => false],
                ['file' => 'images/img3.jpg', 'main' => false],
            ];

            foreach ($images as $img) {
                ProduitImage::create([
                    'produit_id' => $produit->id,
                    'image_path' => $img['file'],
                    'is_main' => $img['main'],
                ]);
            }
        }
    }
}
