<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    protected $fillable = [
        'commande_id',
        'montant',
        'date',
        'statut',
        'methode_de_paiement',
        'transaction_id', // ← obligatoire ici
    ];
    
    // Paiement.php
    public function commande() {
        return $this->belongsTo(Commande::class);
    }

}
