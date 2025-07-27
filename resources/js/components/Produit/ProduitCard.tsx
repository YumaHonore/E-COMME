import React from 'react';
import { Link } from '@inertiajs/react';

const ProduitCard = ({ product }) => {
  const handleViewProduct = (e) => {
    e.stopPropagation(); // Empêche le déclenchement du lien parent
    window.open(`/produits/${product.id}`, '_blank');
  };

  return (
    <Link 
      href={`/produits/${product.id}`} 
      target="_blank"  // Ouvre dans un nouvel onglet
      className="group"
      onClick={(e) => {
        e.preventDefault();
        window.open(`/produits/${product.id}`, '_blank');
      }}
    >
      <div className="aspect-[3/4] bg-white mb-4 relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.nom} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-30 transition-opacity">
          <button 
            onClick={handleViewProduct}
            className="bg-white px-6 py-3 font-medium hover:bg-opacity-90 transition-colors"
          >
            Voir le produit
          </button>
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <h3 className="font-medium">{product.nom}</h3>
          <p className="text-gray-600">{product.categorie}</p>
        </div>
        <p className="font-medium">€{product.prix}</p>
      </div>
    </Link>
  );
};

export default ProduitCard;