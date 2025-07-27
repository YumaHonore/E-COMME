import React from 'react';

const TeamSection = () => {
  return (
    <section className="bg-secondary py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Rencontrez notre équipe</h2>
          <p className="text-gray-600">Une équipe passionnée dédiée à redéfinir les standards de la mode minimaliste.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="aspect-square bg-gray-200 rounded-full mx-auto mb-4 w-3/4"></div>
            <h3 className="font-bold">Sophie Martin</h3>
            <p className="text-gray-600 text-sm">Fondatrice & Directrice Creative</p>
          </div>

          <div className="text-center">
            <div className="aspect-square bg-gray-200 rounded-full mx-auto mb-4 w-3/4"></div>
            <h3 className="font-bold">Thomas Leroy</h3>
            <p className="text-gray-600 text-sm">Directeur Général</p>
          </div>

          <div className="text-center">
            <div className="aspect-square bg-gray-200 rounded-full mx-auto mb-4 w-3/4"></div>
            <h3 className="font-bold">Camille Dubois</h3>
            <p className="text-gray-600 text-sm">Chef de Produit</p>
          </div>

          <div className="text-center">
            <div className="aspect-square bg-gray-200 rounded-full mx-auto mb-4 w-3/4"></div>
            <h3 className="font-bold">Julien Moreau</h3>
            <p className="text-gray-600 text-sm">Responsable Développement Durable</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
