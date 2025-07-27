// resources/js/pages/Admin/Dashboard.jsx
import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import StatCard from '@/components/Admin/StatCard';
import RecentOrders from '@/components/Admin/RecentOrders';
import PopularProducts from '@/components/Admin/PopularProducts';

export default function Dashboard() {
  const stats = [
    { title: "Chiffre d'affaires", value: "€24,560", icon: "chart-line", color: "green", trend: "+12.5% vs mois dernier" },
    { title: "Commandes", value: "156", icon: "shopping-bag", color: "blue", trend: "+8.3% vs mois dernier" },
    { title: "Clients", value: "1,245", icon: "users", color: "purple", trend: "+5.2% vs mois dernier" },
    { title: "Taux de conversion", value: "3.2%", icon: "percentage", color: "yellow", trend: "+0.8% vs mois dernier" },
  ];

  return (
    <AdminLayout title="Tableau de bord">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Chiffre d'affaires</h3>
            <select className="bg-gray-100 border-0 text-sm focus:ring-0 rounded px-3 py-1">
              <option>Ce mois</option>
              <option>Ce trimestre</option>
              <option>Cette année</option>
            </select>
          </div>
          <div className="bg-gradient-to-b from-gray-50 to-gray-100 h-64 rounded flex items-center justify-center">
            <p className="text-gray-400">Graphique du chiffre d'affaires</p>
          </div>
        </div>
        
        <RecentOrders />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PopularProducts />
        <RecentCustomers />
      </div>
    </AdminLayout>
  );
}

function RecentCustomers() {
  const customers = [
    { initials: 'JD', name: 'Jean Dupont', orders: 2, date: 'Aujourd\'hui' },
    { initials: 'MS', name: 'Marie Simon', orders: 5, date: 'Hier' },
    { initials: 'TL', name: 'Thomas Leroy', orders: 1, date: '2 jours' },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Clients récents</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {customers.map((customer, index) => (
          <div key={index} className="p-4 flex items-center">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-4">
              <span className="text-sm font-medium text-white">{customer.initials}</span>
            </div>
            <div className="flex-1">
              <p className="font-medium">{customer.name}</p>
              <p className="text-sm text-gray-500">{customer.orders} commandes</p>
            </div>
            <span className="text-sm text-gray-500">{customer.date}</span>
          </div>
        ))}
      </div>
      <a href="#" className="block p-4 text-center text-orange-600 hover:underline border-t border-gray-200">
        Voir tous les clients
      </a>
    </div>
  );
}