import React, { useState } from 'react';
import { useForm, usePage, router, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';

export default function EditProduct({ product, categories }) {
  const [previewMainImage, setPreviewMainImage] = useState<string | null>(product.image_url);
  const [newSecondaryImages, setNewSecondaryImages] = useState<File[]>([]);
  const [existingSecondaryImages, setExistingSecondaryImages] = useState(product.images || []);

  const { data, setData, post, processing, errors } = useForm({
    nom: product.nom || '',
    prix: product.prix || '',
    quantite_en_stock: product.quantite_en_stock || '',
    categorie_id: product.categorie_id || '',
    description: product.description || '',
    image: null,
    is_featured: product.is_featured,
    secondary_images: [] as File[],
  });

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData('image', file);
      setPreviewMainImage(URL.createObjectURL(file));
    }
  };

  const handleSecondaryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setNewSecondaryImages([...newSecondaryImages, ...files]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'secondary_images') {
        newSecondaryImages.forEach((file) => formData.append('secondary_images[]', file));
      } else {
        formData.append(key, value as any);
      }
    });

    router.post(route('admin.products.update', product.id), formData, {
      forceFormData: true,
    });
  };

  const handleDeleteSecondaryImage = (imageId: number) => {
    if (!confirm('Supprimer cette image ?')) return;
    router.delete(route('admin.products.images.destroy', imageId), {
      preserveScroll: true,
      onSuccess: () => {
        setExistingSecondaryImages((imgs) => imgs.filter((img) => img.id !== imageId));
      },
    });
  };

  return (
    <AdminLayout title="Catégories">
    {/* // <AdminLayout title="Modifier produit"> */}
      <h2 className="text-2xl font-bold mb-6">Modifier le produit</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4" encType="multipart/form-data">
        <input type="text" value={data.nom} onChange={e => setData('nom', e.target.value)} placeholder="Nom" className="w-full bg-gray-100 p-2 rounded" />
        <input type="number" value={data.prix} onChange={e => setData('prix', e.target.value)} placeholder="Prix" className="w-full bg-gray-100 p-2 rounded" />
        <input type="number" value={data.quantite_en_stock} onChange={e => setData('quantite_en_stock', e.target.value)} placeholder="Quantité en stock" className="w-full bg-gray-100 p-2 rounded" />
        
        <select value={data.categorie_id} onChange={e => setData('categorie_id', e.target.value)} className="w-full bg-gray-100 p-2 rounded">
          <option value="">-- Choisir une catégorie --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.nom}</option>
          ))}
        </select>

        <textarea value={data.description} onChange={e => setData('description', e.target.value)} placeholder="Description" className="w-full bg-gray-100 p-2 rounded" />

        {/* Image principale */}
        <div>
          <label className="block font-medium mb-1">Image principale</label>
          <input type="file" onChange={handleMainImageChange} />
          {previewMainImage && (
            <img src={previewMainImage} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded border" />
          )}
        </div>

        {/* Images secondaires */}
        <div>
          <label className="block font-medium mb-1">Images secondaires</label>
          <input type="file" multiple onChange={handleSecondaryImagesChange} />
          <div className="mt-2 flex flex-wrap gap-2">
            {newSecondaryImages.map((file, idx) => (
              <img key={idx} src={URL.createObjectURL(file)} className="w-24 h-24 object-cover rounded border" />
            ))}
            {existingSecondaryImages.map((img) => (
              <div key={img.id} className="relative">
                <img src={img.url} className="w-24 h-24 object-cover rounded border" />
                <button type="button" onClick={() => handleDeleteSecondaryImage(img.id)} className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded">X</button>
              </div>
            ))}
          </div>
        </div>

        <label className="flex items-center space-x-2">
          <input type="checkbox" checked={data.is_featured} onChange={e => setData('is_featured', e.target.checked)} />
          <span>Mettre en avant</span>
        </label>

        <button type="submit" disabled={processing} className="bg-orange-600 text-white px-4 py-2 rounded">
          Sauvegarder
        </button>
      </form>

      <Link href={route('admin.products')} className="inline-block mt-4 text-sm text-blue-600 hover:underline">
        ← Retour à la liste des produits
      </Link>
    </AdminLayout>
  );
}











// import React, { useState } from 'react';
// import { usePage, router } from '@inertiajs/react';
// import AdminLayout from '@/layouts/AdminLayout';

// export default function EditProduct() {
//   const { product, categories } = usePage().props;

//   // Initialisez le formulaire avec les données du produit
//   const [form, setForm] = useState({
//     id: product.id,
//     nom: product.nom,
//     prix: product.prix,
//     quantite_en_stock: product.quantite_en_stock,
//     categorie_id: product.categorie_id,
//     description: product.description,
//     image: null as File | null,
//     _method: 'PUT' // Important pour la mise à jour
//   });

//   const submit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const data = new FormData();
    
//     Object.entries(form).forEach(([key, value]) => {
//       if (value !== null) {
//         data.append(key, value);
//       }
//     });

//     router.post(route('admin.products.update', product.id), data, {
//       onSuccess: () => {
//         alert('Produit mis à jour avec succès!');
//         router.visit(route('admin.products'));
//       }
//     });
//   };

//   return (
//     <AdminLayout title="Éditer le produit">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">Éditer le produit</h2>
//         <a href={route('admin.products')} className="text-orange-600 hover:text-orange-800">
//           Retour à la liste
//         </a>
//       </div>

//       <form onSubmit={submit} encType="multipart/form-data" className="bg-white p-6 rounded shadow space-y-4">
//         <input
//           type="text"
//           placeholder="Nom"
//           value={form.nom}
//           onChange={e => setForm({ ...form, nom: e.target.value })}
//           className="w-full bg-gray-100 p-2 rounded"
//           required
//         />
        
//         <input
//           type="number"
//           placeholder="Prix"
//           value={form.prix}
//           onChange={e => setForm({ ...form, prix: e.target.value })}
//           className="w-full bg-gray-100 p-2 rounded"
//           min="0"
//           step="0.01"
//           required
//         />
        
//         <input
//           type="number"
//           placeholder="Quantité"
//           value={form.quantite_en_stock}
//           onChange={e => setForm({ ...form, quantite_en_stock: e.target.value })}
//           className="w-full bg-gray-100 p-2 rounded"
//           min="0"
//         />
        
//         <select
//           value={form.categorie_id}
//           onChange={e => setForm({ ...form, categorie_id: e.target.value })}
//           className="w-full bg-gray-100 p-2 rounded"
//           required
//         >
//           <option value="">Sélectionnez une catégorie</option>
//           {categories.map((cat: any) => (
//             <option key={cat.id} value={cat.id}>{cat.nom}</option>
//           ))}
//         </select>
        
//         <textarea
//           placeholder="Description"
//           value={form.description}
//           onChange={e => setForm({ ...form, description: e.target.value })}
//           className="w-full bg-gray-100 p-2 rounded"
//           rows={4}
//         />
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block mb-2 font-medium">Image actuelle :</label>
//             {product.image ? (
//               <img 
//                 src={`/storage/${product.image}`} 
//                 alt={product.nom}
//                 className="w-48 h-48 object-contain border rounded"
//               />
//             ) : (
//               <p className="text-gray-500">Aucune image</p>
//             )}
//           </div>
          
//           <div>
//             <label className="block mb-2 font-medium">Changer l'image :</label>
//             <input
//               type="file"
//               onChange={e => {
//                 if (e.target.files && e.target.files[0]) {
//                   setForm({ ...form, image: e.target.files[0] });
//                 }
//               }}
//               className="w-full"
//             />
//             {form.image && (
//               <div className="mt-2">
//                 <p className="text-sm font-medium mb-1">Nouvelle image :</p>
//                 <img
//                   src={URL.createObjectURL(form.image)}
//                   alt="Aperçu"
//                   className="w-32 h-32 object-contain border rounded"
//                 />
//               </div>
//             )}
//           </div>
//         </div>
        
//         <div className="flex justify-end space-x-4 pt-4">
//           <button
//             type="button"
//             onClick={() => router.visit(route('admin.products'))}
//             className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
//           >
//             Annuler
//           </button>
//           <button
//             type="submit"
//             className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
//           >
//             Mettre à jour
//           </button>
//         </div>
//       </form>
//     </AdminLayout>
//   );
// }