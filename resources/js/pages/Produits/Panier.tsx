import React, { useEffect, useState } from 'react';
import { Link, router } from '@inertiajs/react';
import Layout from '@/layouts/Layout';

export default function Panier({ auth }) {
  const [panier, setPanier] = useState([]);
  const [total, setTotal] = useState(0);

  // Charger le panier depuis le localStorage
  useEffect(() => {
    const data = localStorage.getItem('panier');
    if (data) setPanier(JSON.parse(data));
  }, []);

  // Mettre à jour le total à chaque changement du panier
  useEffect(() => {
    const totalCalculé = panier.reduce((acc, item) => acc + item.prix * item.quantite, 0);
    setTotal(totalCalculé);
    localStorage.setItem('panier', JSON.stringify(panier));
  }, [panier]);

  const supprimer = (id) => {
    const newPanier = panier.filter(item => item.id !== id);
    setPanier(newPanier);
  };

  const changerQuantite = (id, quantite) => {
    setPanier(panier.map(item =>
      item.id === id ? { ...item, quantite: Number(quantite) } : item
    ));
  };

  const passerCommande = () => {
    router.post(route('panier.checkout'), { panier });
  };

  return (
    <Layout title="Mon panier" auth={auth}>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Mon panier</h1>

        {panier.length === 0 ? (
          <p>Votre panier est vide.</p>
        ) : (
          <div className="space-y-4">
            {panier.map(item => (
              <div key={item.id} className="flex justify-between items-center border p-4 rounded shadow-sm">
                <div className="flex items-center space-x-4">
                  <img src={`/storage/${item.image}`} alt={item.nom} className="w-20 h-20 object-cover rounded" />
                  <div>
                    <h2 className="text-lg font-semibold">{item.nom}</h2>
                    <p className="text-gray-600">{item.prix} FC</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    min={1}
                    value={item.quantite}
                    onChange={(e) => changerQuantite(item.id, e.target.value)}
                    className="w-16 border rounded px-2 py-1"
                  />
                  <button onClick={() => supprimer(item.id)} className="text-red-500 hover:underline">
                    Supprimer
                  </button>
                </div>
              </div>
            ))}

            <div className="text-right mt-6">
              <p className="text-xl font-bold">Total : {total.toFixed(2)} FC</p>
              <button
                onClick={passerCommande}
                className="mt-4 px-6 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
              >
                Valider la commande
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
