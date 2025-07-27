// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
// import { Link } from 'inertiajs/react'
import { 
  Package, Users, ShoppingCart, Plus, Trash2, Edit, Eye, 
  BarChart2, CreditCard, Settings, LogOut, Filter, Tag 
} from 'lucide-react';
// import { useAuth } from '@/auth/AuthContext';

const adminDashboard = ({ auth }) => {
    //   const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('products');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAdmin, setIsAdmin] = useState(auth.user?.role === true);
  
  // Données mock - À remplacer par vos appels API
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: 'Smartphone Premium', 
      price: 799.99, 
      stock: 15, 
      category: 'electronics',
      seller: 'TechSeller', 
      addedDate: '2024-03-15',
      sales: 42
    },
    // ... autres produits
  ]);

  const [userI, setUsers] = useState([
    { 
      id: 1, 
      name: 'Jean Dupont', 
      email: 'jean@example.com', 
      role: 'seller',
      joinDate: '2023-10-12',
      productsCount: 8
    },
    // ... autres utilisateurs
  ]);

  const categories = [
    { id: 'all', name: 'Toutes catégories' },
    { id: 'electronics', name: 'Électronique' },
    { id: 'clothing', name: 'Vêtements' },
    // ... autres catégories
  ];

  // Statistiques
  const stats = {
    totalProducts: 156,
    totalSales: 2874,
    totalRevenue: 125489.50,
    activeUsers: 89
  };

  // Fonctions CRUD
  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <BrowserRouter>
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-[#003366] text-white">
        <div className="p-4 border-b border-[#002244]">
          <h1 className="text-xl font-bold">Tableau de bord</h1>
          <p className="text-sm opacity-80">{isAdmin ? 'Administrateur' : 'Vendeur'}</p>
        </div>

        <nav className="p-4">
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === 'products' ? 'bg-[#002244]' : 'hover:bg-[#002244]/50'}`}
            >
              <Package className="h-5 w-5 mr-3" />
              Produits
            </button>

            {isAdmin && (
              <>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === 'users' ? 'bg-[#002244]' : 'hover:bg-[#002244]/50'}`}
                >
                  <Users className="h-5 w-5 mr-3" />
                  Utilisateurs
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === 'analytics' ? 'bg-[#002244]' : 'hover:bg-[#002244]/50'}`}
                >
                  <BarChart2 className="h-5 w-5 mr-3" />
                  Analytics
                </button>
              </>
            )}

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === 'settings' ? 'bg-[#002244]' : 'hover:bg-[#002244]/50'}`}
            >
              <Settings className="h-5 w-5 mr-3" />
              Paramètres
            </button>
          </div>

          {/* <Link to="/logout" className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-[#002244]/50 mt-4">
          <LogOut className="h-5 w-5 mr-3" />
          Déconnexion
          </Link> */}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {activeTab === 'products' && 'Gestion des produits'}
            {activeTab === 'users' && 'Gestion des utilisateurs'}
            {activeTab === 'analytics' && 'Analytique des ventes'}
            {activeTab === 'settings' && 'Paramètres du compte'}
          </h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Connecté en tant que: {auth.user?.name}</span>
          </div>
        </div>

        {/* Dashboard Content */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366]"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <Filter className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <Link
                to="/add-product"
                className="flex items-center bg-[#003366] text-white py-2 px-4 rounded-md hover:bg-[#002244]"
              >
                <Plus className="h-5 w-5 mr-2" />
                Ajouter un produit
              </Link>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    {isAdmin && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendeur</th>}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products
                    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
                    .filter(p => isAdmin ? true : p.seller === auth.user.name)
                    .map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md overflow-hidden">
                              {/* Image placeholder */}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500">{product.category}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            product.stock > 10 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {product.stock} en stock
                          </span>
                        </td>
                        {isAdmin && (
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.seller}
                          </td>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Link
                              to={`/product/${product.id}`}
                              className="text-[#003366] hover:text-[#002244] p-1"
                              title="Voir"
                            >
                              <Eye className="h-5 w-5" />
                            </Link>
                            <Link
                              to={`/edit-product/${product.id}`}
                              className="text-yellow-600 hover:text-yellow-800 p-1"
                              title="Modifier"
                            >
                              <Edit className="h-5 w-5" />
                            </Link>
                            <button
                              onClick={() => deleteProduct(product.id)}
                              className="text-red-600 hover:text-red-800 p-1"
                              title="Supprimer"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && isAdmin && (
          <div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilisateur</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produits</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full overflow-hidden">
                            {/* Avatar placeholder */}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">Inscrit le {user.joinDate}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role === 'admin' ? 'Administrateur' : 'Vendeur'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.productsCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link
                            to={`/edit-user/${user.id}`}
                            className="text-yellow-600 hover:text-yellow-800 p-1"
                            title="Modifier"
                          >
                            <Edit className="h-5 w-5" />
                          </Link>
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Supprimer"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && isAdmin && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    <ShoppingCart className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Produits</p>
                    <p className="text-2xl font-semibold">{stats.totalProducts}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Ventes</p>
                    <p className="text-2xl font-semibold">{stats.totalSales}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                    <Tag className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Revenu</p>
                    <p className="text-2xl font-semibold">${stats.totalRevenue.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                    <Users className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Utilisateurs</p>
                    <p className="text-2xl font-semibold">{stats.activeUsers}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Statistiques des ventes</h3>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Graphique des ventes (intégrez votre solution de graphique ici)</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-6">Paramètres du compte</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input
                  type="text"
                  defaultValue={auth.user?.name}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  defaultValue={auth.user?.email}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                <input
                  type="password"
                  placeholder="Nouveau mot de passe"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                />
              </div>
              <button className="bg-[#003366] text-white py-2 px-6 rounded-md hover:bg-[#002244]">
                Enregistrer les modifications
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </BrowserRouter>
  );
};

export default adminDashboard;


















// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
// import AppLayout from '@/layouts/app-layout';
// import { type BreadcrumbItem } from '@/types';
// import { Head } from '@inertiajs/react';

// const breadcrumbs: BreadcrumbItem[] = [
//     {
//         title: 'Dashboard Lorem ipsum',
//         href: '/dashboard',
//     },
// ];

// export default function Dashboard() {
//     return (
//         <AppLayout breadcrumbs={breadcrumbs}>
            
//             <Head title="Dashboard" />
//             <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
//                 <div className="grid auto-rows-min gap-4 md:grid-cols-3">
//                     <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
//                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium aliquam natus ipsa non quas iusto eveniet quis soluta.
//                         Expedita magni placeat doloribus similique odio fugit perspiciatis culpa, quas sunt repudiandae.
//                         {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
//                     </div>
//                     <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
//                         <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
//                     </div>
//                     <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
//                         <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
//                     </div>
//                 </div>
//                 <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
//                     <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
//                 </div>
//             </div>
//         </AppLayout>
//     );
// }
