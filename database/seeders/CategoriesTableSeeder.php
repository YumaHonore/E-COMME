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
        \App\Models\Categorie::create(['nom' => 'Sports', 'description' => 'sports', ]);
        \App\Models\Categorie::create(['nom' => 'electronic', 'description' => 'sports', ]);
        \App\Models\Categorie::create(['nom' => 'Maison', 'description' => 'sports', ]);
    }
}
