<?php

// app/Models/ProduitImage.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProduitImage extends Model
{
    protected $fillable = ['produit_id', 'image_path', 'is_main'];

    public function produit()
    {
        return $this->belongsTo(Produit::class);
    }
}
