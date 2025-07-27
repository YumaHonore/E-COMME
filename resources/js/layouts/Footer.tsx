import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-secondary py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Contenu du pied de page */}
        </div>
        <div className="mt-16 pt-8 border-t border-gray-300 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} LUXE. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;