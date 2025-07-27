// Nouveau composant ProductForm.tsx
import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function ProductForm({ categories }) {
  const [form, setForm] = useState({
    nom: '',
    prix: '',
    quantite_en_stock: '',
    categorie_id: '',
    description: '',
    image: null,
    images: [],
  });

  const handleMainImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleImagesChange = (e) => {
    setForm({ ...form, images: Array.from(e.target.files) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === 'images') {
        value.forEach((file, index) => data.append(`images[]`, file));
      } else if (value !== null) {
        data.append(key, value);
      }
    });
    router.post(route('admin.products.store'), data);
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white p-6 rounded shadow mb-6 space-y-4">
      <input type="text" placeholder="Nom" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} className="w-full bg-gray-100 p-2 rounded" />
      <input type="number" placeholder="Prix" value={form.prix} onChange={e => setForm({ ...form, prix: e.target.value })} className="w-full bg-gray-100 p-2 rounded" />
      <input type="number" placeholder="Quantité" value={form.quantite_en_stock} onChange={e => setForm({ ...form, quantite_en_stock: e.target.value })} className="w-full bg-gray-100 p-2 rounded" />
      <select value={form.categorie_id} onChange={e => setForm({ ...form, categorie_id: e.target.value })} className="w-full bg-gray-100 p-2 rounded">
        <option value="">Catégorie</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.nom}</option>
        ))}
      </select>
      <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full bg-gray-100 p-2 rounded" />
      <div>
        <label className="block mb-1 font-medium">Image principale :</label>
        <input type="file" onChange={handleMainImageChange} accept="image/*" />
        {form.image && <img src={URL.createObjectURL(form.image)} alt="Preview" className="w-32 h-32 mt-2 object-cover rounded border" />}
      </div>
      <div>
        <label className="block mb-1 font-medium">Images secondaires :</label>
        <input type="file" multiple onChange={handleImagesChange} accept="image/*" />
        {form.images.length > 0 && (
          <div className="flex gap-2 mt-2 flex-wrap">
            {form.images.map((img, idx) => (
              <img key={idx} src={URL.createObjectURL(img)} className="w-20 h-20 object-cover border rounded" />
            ))}
          </div>
        )}
      </div>
      <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded">Ajouter produit</button>
    </form>
  );
}
























// // resources/js/Pages/Admin/ProductForm.tsx
// import React, { useState } from 'react';
// import { router } from '@inertiajs/react';

// export default function ProductForm({ categories }) {
//   const [form, setForm] = useState({
//     nom: '',
//     prix: '',
//     quantite_en_stock: '',
//     categorie_id: '',
//     description: '',
//     image: null,
//     images: []
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const data = new FormData();

//     Object.entries(form).forEach(([key, value]) => {
//       if (key === 'images' && Array.isArray(value)) {
//         value.forEach((img) => data.append('images[]', img));
//       } else if (value !== null) {
//         data.append(key, value);
//       }
//     });

//     router.post(route('admin.products.store'), data);
//   };

//   return (
//     <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white p-6 rounded shadow mb-6 space-y-4">
//       <input type="text" placeholder="Nom" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} className="w-full bg-gray-100 p-2 rounded" />
//       <input type="number" placeholder="Prix" value={form.prix} onChange={e => setForm({ ...form, prix: e.target.value })} className="w-full bg-gray-100 p-2 rounded" />
//       <input type="number" placeholder="Quantité" value={form.quantite_en_stock} onChange={e => setForm({ ...form, quantite_en_stock: e.target.value })} className="w-full bg-gray-100 p-2 rounded" />

//       <select value={form.categorie_id} onChange={e => setForm({ ...form, categorie_id: e.target.value })} className="w-full bg-gray-100 p-2 rounded">
//         <option value="">Catégorie</option>
//         {categories.map(cat => (
//           <option key={cat.id} value={cat.id}>{cat.nom}</option>
//         ))}
//       </select>

//       <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full bg-gray-100 p-2 rounded" />

//       {/* Image principale */}
//       <div>
//         <label className="block font-medium mb-1">Image principale</label>
//         <input type="file" onChange={e => setForm({ ...form, image: e.target.files?.[0] || null })} />
//         {form.image && (
//           <img src={URL.createObjectURL(form.image)} className="w-24 h-24 mt-2 object-cover rounded" />
//         )}
//       </div>

//       {/* Images supplémentaires */}
//       <div>
//         <label className="block font-medium mb-1">Images supplémentaires</label>
//         <input type="file" multiple onChange={e => setForm({ ...form, images: Array.from(e.target.files || []) })} />
//         {form.images.length > 0 && (
//           <div className="flex gap-2 mt-2">
//             {form.images.map((img, i) => (
//               <img key={i} src={URL.createObjectURL(img)} className="w-16 h-16 object-cover rounded border" />
//             ))}
//           </div>
//         )}
//       </div>

//       <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded">Ajouter produit</button>
//     </form>
//   );
// }
