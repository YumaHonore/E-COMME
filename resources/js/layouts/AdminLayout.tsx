// resources/js/layouts/AdminLayout.jsx
import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import Sidebar from '@/components/Admin/Sidebar';
import Header from '@/components/Admin/Header';

export default function AdminLayout({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900 antialiased">
      <Head title={title} />
      <Sidebar isOpen={sidebarOpen} />
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* <Header title={title} /> */}
        <Header 
          title={title} 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
            {/* Overlay pour fermer la sidebar sur mobile */}
            {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}