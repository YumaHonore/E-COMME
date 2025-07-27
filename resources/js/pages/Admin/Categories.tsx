import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Edit, Trash } from 'lucide-react';

export default function Categories() {
  const { categories, flash } = usePage().props as any;

  const [form, setForm] = useState({ nom: '', description: '' });
  const [editId, setEditId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editId) {
      router.put(route('admin.categories.update', editId), form);
    } else {
      router.post(route('admin.categories.store'), form);
    }

    setForm({ nom: '', description: '' });
    setEditId(null);
  };

  const handleEdit = (cat: any) => {
    setForm({ nom: cat.nom, description: cat.description || '' });
    setEditId(cat.id);
  };

  const handleDelete = (id: number) => {
    if (confirm('Confirmer la suppression ?')) {
      router.delete(route('admin.categories.destroy', id));
    }
  };

  return (
    <AdminLayout title="Catégories">
      <h2 className="text-2xl font-bold mb-4">Gestion des catégories</h2>

      {flash.success && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">
          {flash.success}
        </div>
      )}

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4 mb-6">
        <input
          type="text"
          placeholder="Nom de la catégorie"
          value={form.nom}
          onChange={(e) => setForm({ ...form, nom: e.target.value })}
          className="w-full bg-gray-100 p-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full bg-gray-100 p-2 rounded"
        />
        <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded">
          {editId ? 'Modifier' : 'Ajouter'}
        </button>
      </form>

      {/* Liste */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.data.map((cat: any) => (
              <tr key={cat.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{cat.nom}</td>
                <td className="px-4 py-2">{cat.description}</td>
                <td className="px-4 py-2 text-right space-x-2">
                  <button onClick={() => handleEdit(cat)} className="text-blue-600 hover:text-blue-900">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDelete(cat.id)} className="text-red-600 hover:text-red-900">
                    <Trash size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        {categories.links.map((link: any, i: number) => (
          <a
            key={i}
            href={link.url || '#'}
            className={`px-3 py-1 border rounded ${
              link.active ? 'bg-orange-600 text-white' : 'text-gray-700 bg-white'
            }`}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        ))}
      </div>
    </AdminLayout>
  );
}
