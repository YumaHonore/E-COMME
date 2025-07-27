<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    use HasFactory;

    // protected $fillable = ['nom', 'description', 'prix', 'quantite', 'categorie_id'];
    protected $fillable = [
        'nom',
        'description',
        'prix',
        'image',
        'quantite_en_stock',
        'categorie_id',
        'is_featured'
    ];
    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }
    public function images()
    {
        return $this->hasMany(ProduitImage::class);
    }

}
