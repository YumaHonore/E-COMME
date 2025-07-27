<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Details_commande extends Model
{
    protected $fillable = ['commande_id','produit_id','quantite','prix_unitaire'];
    // DetailCommande.php
    public function produit() {
        return $this->belongsTo(Produit::class);
    }

}
