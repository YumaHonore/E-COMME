import React from 'react';

const CTASection = () => {
  return (
    <section className="bg-primary text-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Prêt à découvrir la différence LUXE ?</h2>
        <p className="mb-8">Rejoignez notre communauté et bénéficiez de 15% de réduction sur votre première commande.</p>
        <a href="nouveautes.html" className="inline-block bg-accent px-8 py-4 font-medium hover:bg-opacity-90 transition-colors">Découvrir la collection</a>
      </div>
    </section>
  );
};

export default CTASection;
