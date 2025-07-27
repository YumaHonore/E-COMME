// resources/js/components/Admin/Header.jsx
import React from 'react';
import { Bell, ChevronDown, Menu } from 'lucide-react';

export default function Header({ title, onToggleSidebar  }) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center">
          <button className="mr-4 md:hidden"onClick={onToggleSidebar}>
            <Menu size={24} className="text-white" />
          </button>
          <h2 className="text-xl font-semibold text-gray-500">{title}</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Bell size={20} className="text-gray-500" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="relative">
            <button className="flex items-center space-x-2 focus:outline-none">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-sm font-medium text-white">AD</span>
              </div>
              <span className="hidden md:inline text-gray-700">Admin</span>
              <ChevronDown size={16} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}