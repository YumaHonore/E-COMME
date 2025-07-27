import React from 'react';
import { router, usePage } from '@inertiajs/react';
import Layout from '@/layouts/Layout';
import axios from 'axios';

export default function Panier({ auth, cartItems }) {
  const { flash } = usePage().props as {
    flash: { success?: string; error?: string };
  };

  const total = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => acc + item.produit.prix * item.quantity, 0)
    : 0;

  const supprimer = (id: number) => {
    router.post(route('cart.remove', id), {
      _method: 'post',
    });
  };

  const lancerAchat = () => {
    router.post(route('checkout.store'));
  };
  
  // const handleCheckout = () => {
  //   router.post(route('checkout.store'), {}, {
  //     preserveScroll: true,
  //     onSuccess: () => {
  //       // Redirection vers CinetPay se fait côté backend
  //     },
  //     onError: (errors) => {
  //       console.error('Erreur lors du paiement', errors);
  //     },
  //   });
  // };
  
  // import { router } from '@inertiajs/react';

const handleCheckout = () => {
  axios.post(route('checkout.store'))
    .then(response => {
      const url = response.data.redirect_url;
      if (url) {
        // ✅ Ouvre le lien CinetPay dans un nouvel onglet
        window.open(url, '_blank');
      } else {
        console.error('Aucune URL de redirection trouvée');
      }
    })
    .catch(error => {
      console.error('Erreur lors de la tentative de paiement', error);
    });
};


  return (
    <Layout title="Mon panier" auth={auth}>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Mon panier</h1>

        {/* Notifications */}
        {flash.success && (
          <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">
            {flash.success}
          </div>
        )}
        {flash.error && (
          <div className="mb-4 p-4 bg-red-100 text-red-800 rounded">
            {flash.error}
          </div>
        )}

        {cartItems.length === 0 ? (
          <p>Votre panier est vide.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map(item => (
              <div
                key={item.id}
                className="flex justify-between items-center border p-4 rounded shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={`/storage/${item.produit.image}`}
                    alt={item.produit.nom}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.produit.nom}</h2>
                    <p className="text-gray-600">{item.produit.prix} FC</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-sm">Quantité : {item.quantity}</p>
                  <button
                    onClick={() => supprimer(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}

            <div className="text-right mt-6">
              <p className="text-xl font-bold">Total : {total.toFixed(2)} FC</p>
              <button
                onClick={handleCheckout}
                className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
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
