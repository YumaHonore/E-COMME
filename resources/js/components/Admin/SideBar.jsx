// resources/js/components/Admin/Sidebar.jsx
import React from 'react';
import { Link } from '@inertiajs/react';
import { 
  Home, Package, Users, ShoppingBag, MessageSquare, Settings,
  ChevronDown, User, Bell, Search, Plus, Edit, Trash, Eye, 
  Download, Filter, Upload, Check, X, Star, Truck, Ban, Clock,
  CheckCircle, Printer, LineChart, Percent, UserCheck, UserPlus, Crown
} from 'lucide-react';

export default function Sidebar({ isOpen }) {
  const navItems = [
    { href: '/adminDashboard', icon: Home, label: 'Tableau de bord' },
    { href: '/admin/products', icon: Package, label: 'Produits' },
    { href: '/admin/categories', icon: Package, label: 'Categories' },
    // { href: '/admin/customers', icon: Users, label: 'Clients' },
    // { href: '/admin/orders', icon: ShoppingBag, label: 'Commandes' },
    // { href: '/admin/reviews', icon: MessageSquare, label: 'Commentaires' },
    { href: '/admin/settings', icon: Settings, label: 'Paramètres' },
  ];

  return (
    <aside 
    className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white flex-shrink-0 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}
  >
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold flex items-center">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 p-1 rounded mr-2">
            <Package size={20} />
          </span>
          LUXE Admin
        </h1>
        <p className="text-gray-400 text-sm">Tableau de bord</p>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center p-2 rounded hover:bg-gray-800 text-gray-300 group"
                activeClassName="bg-gray-800 text-white"
              >
                <item.icon className="mr-3 w-5 h-5 group-[.active]:text-white" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}