import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

const Header = ({ auth }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold tracking-tight">LUXE</Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link href="/nouveautes" className="text-sm font-medium hover:text-accent transition-colors">Nouveautés</Link>
            <Link href="/vetements" className="text-sm font-medium hover:text-accent transition-colors">Vêtements</Link>
            <Link href="#" className="text-sm font-medium hover:text-accent transition-colors">Accessoires</Link>
            <Link href="#" className="text-sm font-medium hover:text-accent transition-colors">Collections</Link>
            <Link href="/apropos" className="text-sm font-medium hover:text-accent transition-colors">À propos</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-secondary" id="search-button">
              {/* Icône de recherche */}
            </button>
            
            {/* Sélecteur de langue */}
            <div className="relative">
              <button 
                className="p-2 rounded-full hover:bg-secondary flex items-center" 
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              >
                <span className="lang-flag flag-fr"></span>
                {/* Icône flèche */}
              </button>
              
              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-50">
                  {/* Options de langue */}
                </div>
              )}
            </div>
            
            <button className="p-2 rounded-full hover:bg-secondary relative">
              {/* Icône panier */}
              <span className="absolute top-0 right-0 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
            </button>
            
            {/* État de connexion */}
            <div className="relative">
              {auth.user ? (
                <div className="logged-in">
                  <button 
                    className="flex items-center text-sm rounded-full focus:outline-none"
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  >
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-sm font-medium">{auth.user.initials}</span>
                    </div>
                  </button>
                  
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                      {/* Menu utilisateur */}
                    </div>
                  )}
                </div>
              ) : (
                <div className="logged-out">
                  <div className="flex space-x-2">
                    <Link href="/login" className="px-3 py-1 text-sm font-medium hover:text-accent transition-colors">Connexion</Link>
                    <Link href="/register" className="px-3 py-1 text-sm font-medium bg-primary text-white rounded hover:bg-opacity-90
transition-colors">Inscription</Link>
                  </div>
                </div>
              )}
            </div>
            
            <button 
              className="p-2 rounded-full hover:bg-secondary md:hidden" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {/* Icône menu mobile */}
            </button>
          </div>
        </div>
      </div>
      
      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          {/* Contenu menu mobile */}
        </div>
      )}
    </header>
  );
};

export default Header;