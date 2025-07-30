import React, { useState, useEffect, useRef } from 'react';
import { usePage, Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Edit, Trash2, Ellipsis, PlusCircle } from 'lucide-react';

export default function Products() {
  const { products, filters, categories } = usePage().props;
  const flash = usePage().props.flash || {};
  const [form, setForm] = useState({
    nom: '',
    prix: '',
    quantite_en_stock: '',
    categorie_id: '',
    description: '',
    image: null,
  });

  const [secondaryImages, setSecondaryImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState({
    main: null,
    secondary: [],
  });

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        image: file,
      });
      setImagePreviews({
        ...imagePreviews,
        main: URL.createObjectURL(file),
      });
    }
  };

  const handleAddSecondaryImage = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const newSecondaryImages = [...secondaryImages, ...Array.from(files)];
      setSecondaryImages(newSecondaryImages);

      const newPreviews = Array.from(files).map(file => URL.createObjectURL(file));
      setImagePreviews({
        ...imagePreviews,
        secondary: [...imagePreviews.secondary, ...newPreviews],
      });
    }
    // Réinitialiser l'input de fichier
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) {
        data.append(key, value);
      }
    });

    secondaryImages.forEach((image) => {
      data.append('images[]', image);
    });

    router.post(route('admin.products.store'), data);
  };

  const [search, setSearch] = useState(filters.search || '');
  const [selectedCategorie, setSelectedCategorie] = useState(filters.categorie || '');
  const [selectedStatus, setSelectedStatus] = useState(filters.status || '');

  const handleFilterChange = () => {
    router.get(route('admin.products'), {
      search,
      categorie: selectedCategorie,
      status: selectedStatus,
    }, {
      preserveState: true,
      replace: true,
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'in_stock': return 'bg-green-100 text-green-800';
      case 'low_stock': return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDelete = (id) => {
    if (confirm("Confirmer la suppression de ce produit ?")) {
      router.delete(route('admin.products.destroy', id), {
        preserveScroll: true,
        onSuccess: () => console.log('Produit supprimé !'),
      });
    }
  };

  useEffect(() => {
    if (flash.success) {
      alert(flash.success);
    }
    if (flash.error) {
      alert(flash.error);
    }
  }, [flash]);

  return (
    <AdminLayout title="Gestion des produits">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Produits</h2>
      </div>
      <Link href='/admin/products/add' className="bg-orange-600 text-white px-4 py-2 rounded">Ajouter un produit</Link>

      <form onSubmit={submit} encType="multipart/form-data" className="bg-white p-6 rounded shadow mb-6 space-y-4">
        <input
          type="text"
          placeholder="Nom"
          value={form.nom}
          onChange={e => setForm({ ...form, nom: e.target.value })}
          className="w-full bg-gray-100 p-2 rounded"
        />
        <input
          type="number"
          placeholder="Prix"
          value={form.prix}
          onChange={e => setForm({ ...form, prix: e.target.value })}
          className="w-full bg-gray-100 p-2 rounded"
        />
        <input
          type="number"
          placeholder="Quantité"
          value={form.quantite_en_stock}
          onChange={e => setForm({ ...form, quantite_en_stock: e.target.value })}
          className="w-full bg-gray-100 p-2 rounded"
        />
        <select
          value={form.categorie_id}
          onChange={e => setForm({ ...form, categorie_id: e.target.value })}
          className="w-full bg-gray-100 p-2 rounded"
        >
          <option value="">Catégorie</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.nom}</option>
          ))}
        </select>
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className="w-full bg-gray-100 p-2 rounded"
        />
        <input type="file" name="image" onChange={handleFileChange} className="w-full" />
        {imagePreviews.main && (
          <div className="mt-2">
            <img
              src={imagePreviews.main}
              alt="Main Preview"
              className="w-32 h-32 object-cover rounded border"
            />
          </div>
        )}

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Ajouter des images secondaires</label>
          <input
            type="file"
            id="secondaryImages"
            onChange={handleAddSecondaryImage}
            className="hidden"
            multiple
            ref={fileInputRef}
          />
          <label htmlFor="secondaryImages" className="cursor-pointer bg-orange-500 text-white px-4 py-2 rounded inline-flex items-center">
            <PlusCircle className="mr-2" />
            Ajouter des images secondaires
          </label>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {imagePreviews.secondary.map((preview, index) => (
            <img key={index} src={preview} alt={`Secondary Preview ${index}`} className="w-20 h-20 object-cover rounded border" />
          ))}
        </div>

        <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded">Ajouter un produit</button>
      </form>

      <div className="bg-white p-4 mb-4 rounded shadow grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          onBlur={handleFilterChange}
          className="w-full bg-gray-100 p-2 rounded"
        />
        <select value={selectedCategorie} onChange={e => { setSelectedCategorie(e.target.value); handleFilterChange(); }} className="w-full bg-gray-100 p-2 rounded">
          <option value="">Toutes catégories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.nom}</option>
          ))}
        </select>
        <select value={selectedStatus} onChange={e => { setSelectedStatus(e.target.value); handleFilterChange(); }} className="w-full bg-gray-100 p-2 rounded">
          <option value="">Tous les statuts</option>
          <option value="in_stock">En stock</option>
          <option value="low_stock">Stock faible</option>
          <option value="out_of_stock">Rupture</option>
        </select>
      </div>

      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-50 text-left text-sm text-gray-600">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produit</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.data.map(product => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="font-medium">{product.nom}</div>
                  <div className="text-sm text-gray-500">#{product.id}</div>
                </td>
                <td className="px-4 py-3">{product.categorie}</td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3 font-medium">{product.prix} $</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusBadge(product.status)}`}>
                    {product.status === 'in_stock' ? 'En stock' :
                     product.status === 'low_stock' ? 'Stock faible' : 'Rupture'}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <Link href={`/admin/products/${product.id}/edit`} className="text-blue-600 hover:text-blue-900">
                      <Edit/>
                    </Link>
                    <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900">
                      <Trash2/>
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <Ellipsis/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center space-x-1">
        {products.links.map((link, i) => (
          <Link
            key={i}
            href={link.url ?? ''}
            className={`px-3 py-1 border rounded ${link.active ? 'bg-orange-600 text-white' : 'bg-white text-gray-700'}`}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        ))}
      </div>
    </AdminLayout>
  );
}
