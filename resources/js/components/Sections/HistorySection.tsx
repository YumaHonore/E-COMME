import React from 'react';

const HistorySection = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">L'essence de LUXE</h2>
            <p className="text-gray-600 mb-4">Fondée en 2015, LUXE est née d'une vision simple : créer des pièces intemporelles qui transcendent les tendances éphémères. Notre philosophie repose sur le minimalisme audacieux - des designs épurés qui font pourtant une déclaration forte.</p>
            <p className="text-gray-600">Chaque collection est le fruit d'un processus méticuleux, alliant savoir-faire traditionnel et innovation contemporaine. Nous croyons en une mode consciente, où la qualité prime sur la quantité.</p>
          </div>
          <div className="aspect-[4/3] bg-gray-200 order-1 md:order-2"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/3] bg-gray-200"></div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Notre engagement</h2>
            <p className="text-gray-600 mb-4">Chez LUXE, nous nous engageons à :</p>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 mr-3 text-accent flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600">Utiliser des matériaux durables et éthiques dans 90% de nos produits d'ici 2025</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 mr-3 text-accent flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600">Maintenir des conditions de travail équitables dans toute notre chaîne d'approvisionnement</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 mr-3 text-accent flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600">Créer des pièces conçues pour durer, réduisant ainsi l'impact environnemental</span>
              </li>
            </ul>
            <p className="text-gray-600">Nous sommes fiers d'avoir obtenu la certification B Corp en 2022, témoignant de notre engagement envers des pratiques commerciales responsables.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
