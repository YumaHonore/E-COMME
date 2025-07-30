<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['nom' => 'Sports', 'description' => 'Articles de sport et plein air', 'image' => 'images/sports.jpg'],
            ['nom' => 'Électronique', 'description' => 'Appareils électroniques et gadgets', 'image' => 'images/electronics.jpg'],
            ['nom' => 'Maison', 'description' => 'Articles pour la maison et le jardin', 'image' => 'images/home.jpg'],
            ['nom' => 'Mode', 'description' => 'Vêtements et accessoires', 'image' => 'images/fashion.jpg'],
            ['nom' => 'Beauté', 'description' => 'Produits de beauté et soins personnels', 'image' => 'images/beauty.jpg'],
            ['nom' => 'Livres', 'description' => 'Livres et magazines', 'image' => 'images/books.jpg'],
            ['nom' => 'Jouets', 'description' => 'Jouets et jeux pour enfants', 'image' => 'images/toys.jpg'],
            ['nom' => 'Alimentation', 'description' => 'Produits alimentaires et boissons', 'image' => 'images/food.jpg'],
            ['nom' => 'Bricolage', 'description' => 'Outils et fournitures de bricolage', 'image' => 'images/diy.jpg'],
            ['nom' => 'Automobile', 'description' => 'Accessoires et pièces automobiles', 'image' => 'images/automotive.jpg'],
        ];

        foreach ($categories as $category) {
            \App\Models\Categorie::create($category);
        }
    }
}



// namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
// use Illuminate\Database\Seeder;

// class CategoriesTableSeeder extends Seeder
// {
//     /**
//      * Run the database seeds.
//      */
//     public function run(): void
//     {
//         \App\Models\Categorie::create(['nom' => 'Sports', 'description' => 'sports', 'image'=>'images/images.jpg']);
//         \App\Models\Categorie::create(['nom' => 'electronic', 'description' => 'sports', 'image'=>'images/images.jpg']);
//         \App\Models\Categorie::create(['nom' => 'Maison', 'description' => 'sports', 'image'=>'images/images.jpg']);
//     }
// }
