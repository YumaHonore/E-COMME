import React from 'react';

const ValuesSection = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Nos valeurs fondamentales</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 border border-secondary rounded-lg">
            <div className="h-12 w-12 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">Qualité exceptionnelle</h3>
            <p className="text-gray-600 text-sm">Nous n'acceptons aucun compromis sur la qualité de nos matériaux et notre savoir-faire artisanal.</p>
          </div>

          <div className="text-center p-6 border border-secondary rounded-lg">
            <div className="h-12 w-12 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">Transparence radicale</h3>
            <p className="text-gray-600 text-sm">Nous partageons ouvertement nos processus et nos chaînes d'approvisionnement avec nos clients.</p>
          </div>

          <div className="text-center p-6 border border-secondary rounded-lg">
            <div className="h-12 w-12 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">Design intemporel</h3>
            <p className="text-gray-600 text-sm">Nous créons des pièces conçues pour être portées pendant des années, pas seulement une saison.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
