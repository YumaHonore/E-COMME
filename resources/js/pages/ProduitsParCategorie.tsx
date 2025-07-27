import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function ProduitsParCategorie() {
  const { categorie, produits } = usePage().props;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Produits - {categorie.nom}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {produits.data.map((produit) => (
          <div key={produit.id} className="border rounded p-3 shadow">
            <img src={`/storage/${produit.image}`} alt={produit.nom} className="w-full h-40 object-cover mb-2" />
            <h2 className="text-lg font-semibold">{produit.nom}</h2>
            <p>{produit.description}</p>
            <p className="font-bold">{produit.prix} FCFA</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center space-x-2">
        {produits.links.map((link, index) => (
          link.url ? (
            <Link
              key={index}
              href={link.url}
              className={`px-3 py-1 border rounded ${link.active ? 'bg-blue-500 text-white' : 'bg-white'}`}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          ) : null
        ))}
      </div>
    </div>
  );
}
