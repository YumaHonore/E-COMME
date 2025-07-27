// resources/js/Pages/Nouveautes.jsx

import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '@/Components/Layout/Layout';

export default function Nouveautes({ produits, auth }) {
  return (
    <Layout title="Accueil" auth={auth}>
      <Head title="Nouveautés" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-8">Nouveautés</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {produits.map((produit) => (
            <div key={produit.id} className="group">
              <div className="aspect-[3/4] bg-white mb-4 relative overflow-hidden">
                <img src={produit.image} alt={produit.nom} className="h-full w-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-30 transition-opacity">
                  <a href={`/produits/${produit.id}`} className="bg-white px-6 py-3 font-medium hover:bg-opacity-90 transition-colors">
                    Voir le produit
                  </a>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">{produit.nom}</h3>
                  <p className="text-gray-600">{produit.couleur}</p>
                </div>
                <p className="font-medium">€{produit.prix}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
