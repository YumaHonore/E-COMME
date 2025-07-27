// import React, { useState, useEffect } from 'react';
// import { useForm } from '@inertiajs/react';

// // 
// import { usePage, Link, router } from '@inertiajs/react';
// import AdminLayout from '@/layouts/AdminLayout';
// import { Edit, LucideTrash, Ellipsis } from 'lucide-react';
// // 

// export default function AddProductForm({ categories }) {
//   const { data, setData, post, progress, reset } = useForm({
//     nom: '',
//     prix: '',
//     quantite_en_stock: '',
//     categorie_id: '',
//     description: '',
//     image_principale: null,
//     images_secondaires: [],
//   });

//   const submit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('nom', data.nom);
//     formData.append('prix', data.prix);
//     formData.append('quantite_en_stock', data.quantite_en_stock);
//     formData.append('categorie_id', data.categorie_id);
//     formData.append('description', data.description);
//     if (data.image_principale) {
//       formData.append('image_principale', data.image_principale);
//     }

//     if (data.images_secondaires?.length > 0) {
//       Array.from(data.images_secondaires).forEach((file, index) => {
//         formData.append(`images_secondaires[${index}]`, file);
//       });
//     }

//     post(route('admin.products.store'), {
//       data: formData,
//       forceFormData: true,
//       onSuccess: () => reset(),
//     });
//   };

// // 
//   const { products, filters, categories } = usePage().props;
//   const flash = usePage().props.flash || {}; // Assurez-vous que flash est défini

//   const [form, setForm] = useState({
//     nom: '',
//     prix: '',
//     quantite_en_stock: '',
//     categorie_id: '',
//     description: '',
//     image: null,
//   });

//   const [search, setSearch] = useState(filters.search || '');
//   const [selectedCategorie, setSelectedCategorie] = useState(filters.categorie || '');
//   const [selectedStatus, setSelectedStatus] = useState(filters.status || '');

//   const submit = (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     Object.entries(form).forEach(([key, value]) => {
//       if (value !== null) data.append(key, value);
//     });
//     router.post(route('admin.products.store'), data);
//   };

//   const handleFilterChange = () => {
//     router.get(route('admin.products'), {
//       search,
//       categorie: selectedCategorie,
//       status: selectedStatus,
//     }, {
//       preserveState: true,
//       replace: true,
//     });
//   };

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case 'in_stock': return 'bg-green-100 text-green-800';
//       case 'low_stock': return 'bg-yellow-100 text-yellow-800';
//       case 'out_of_stock': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const handleDelete = (id) => {
//     if (confirm("Confirmer la suppression de ce produit ?")) {
//       router.delete(route('admin.products.destroy', id), {
//         preserveScroll: true,
//         onSuccess: () => console.log('Produit supprimé !'),
//       });
//     }
//   };

//   useEffect(() => {
//     if (flash.success) {
//       alert(flash.success); // Remplacez par une bibliothèque de toast si vous le souhaitez
//     }
//     if (flash.error) {
//       alert(flash.error);
//     }
//   }, [flash]);
// // 
//   return (
//     <AdminLayout title="Ajouter un produit">
//     <form onSubmit={submit} encType="multipart/form-data" className="bg-white p-6 rounded shadow mb-6 space-y-4">
//       <input type="text" placeholder="Nom" value={data.nom} onChange={e => setData('nom', e.target.value)} className="w-full bg-gray-100 p-2 rounded" />
//       <input type="number" placeholder="Prix" value={data.prix} onChange={e => setData('prix', e.target.value)} className="w-full bg-gray-100 p-2 rounded" />
//       <input type="number" placeholder="Quantité" value={data.quantite_en_stock} onChange={e => setData('quantite_en_stock', e.target.value)} className="w-full bg-gray-100 p-2 rounded" />
      
//       <select value={data.categorie_id} onChange={e => setData('categorie_id', e.target.value)} className="w-full bg-gray-100 p-2 rounded">
//         <option value="">Catégorie</option>
//         {categories.map(cat => (
//           <option key={cat.id} value={cat.id}>{cat.nom}</option>
//         ))}
//       </select>

//       <textarea placeholder="Description" value={data.description} onChange={e => setData('description', e.target.value)} className="w-full bg-gray-100 p-2 rounded" />

//       <div>
//         <label className="font-medium block mb-1">Image principale</label>
//         <input type="file" accept="image/*" onChange={e => setData('image_principale', e.target.files[0])} />
//       </div>

//       <div>
//         <label className="font-medium block mb-1">Images secondaires (optionnel)</label>
//         <input type="file" accept="image/*" multiple onChange={e => setData('images_secondaires', e.target.files)} />
//       </div>

//       <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded">
//         Ajouter le produit
//       </button>
//     </form>
//     </AdminLayout>
//   );
// }
