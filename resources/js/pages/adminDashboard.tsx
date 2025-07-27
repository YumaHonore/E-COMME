import React, { useState } from 'react';
import { Head } from '@inertiajs/react';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const navigateTo = (target: string) => {
    setActiveSection(target);
  };

  return (
    <div className="flex h-screen">
      <Head title="Dashboard Admin | LUXE" />
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a1a] text-white flex-shrink-0">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">LUXE Admin</h1>
          <p className="text-gray-400 text-sm">Tableau de bord</p>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className={`flex items-center p-2 rounded sidebar-link text-gray-300 ${
                  activeSection === 'dashboard' ? 'active' : ''
                }`}
                onClick={() => navigateTo('dashboard')}
              >
                <i className="fas fa-home mr-3 w-5 text-center"></i>
                Tableau de bord
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex items-center p-2 rounded sidebar-link text-gray-300 ${
                  activeSection === 'products' ? 'active' : ''
                }`}
                onClick={() => navigateTo('products')}
              >
                <i className="fas fa-box mr-3 w-5 text-center"></i>
                Produits
              </a>
            </li>
            {/* Ajoutez d'autres liens ici */}
          </ul>
        </nav>
      </aside>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex justify-between items-center px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-500">
              {activeSection === 'dashboard' && 'Tableau de bord'}
              {activeSection === 'products' && 'Gestion des produits'}
              {/* Ajoutez d'autres titres ici */}
            </h2>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <i className="fas fa-bell"></i>
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="relative">
                <button className="flex items-center space-x-2 focus:outline-none">
                  <div className="h-8 w-8 rounded-full avatar flex items-center justify-center">
                    <span className="text-sm font-medium text-white">AD</span>
                  </div>
                  <span className="hidden md:inline">Admin</span>
                  <i className="fas fa-chevron-down text-sm"></i>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Contenu */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeSection === 'dashboard' && (
            <div>
              {/* Contenu du tableau de bord */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500">Chiffre d'affaires</p>
                      <p className="text-2xl font-bold text-gray-500">€24,560</p>
                    </div>
                    <div className="p-3 rounded-full bg-green-100 text-green-600">
                      <i className="fas fa-chart-line"></i>
                    </div>
                  </div>
                  <p className="text-sm text-green-600 mt-2">+12.5% vs mois dernier</p>
                </div>
                {/* Ajoutez d'autres cartes ici */}
              </div>
            </div>
          )}

          {activeSection === 'products' && (
            <div>
              {/* Contenu des produits */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Gestion des produits</h2>
                <button className="bg-[#ff3e00] hover:bg-orange-700 text-white font-medium py-2 px-4 rounded flex items-center">
                  <i className="fas fa-plus mr-2"></i> Nouveau produit
                </button>
              </div>
              {/* Ajoutez d'autres éléments ici */}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
