import React, { useState } from 'react';
import { usePage, Link, Head } from '@inertiajs/react';
import Layout from '@/layouts/Layout';

const Show = ({auth}) => {
  const { produit } = usePage().props;
  const [selectedColor, setSelectedColor] = useState(produit.couleurs?.[0]?.nom || '');
  const [selectedSize, setSelectedSize] = useState(produit.tailles?.[0]?.nom || '');
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState('description');
  const [activeThumbnail, setActiveThumbnail] = useState(0);

  const handleQuantityChange = (value) => {
    const newValue = quantity + value;
    if (newValue >= 1 && newValue <= 10) {
      setQuantity(newValue);
    }
  };

  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  return (
    <Layout title={produit.nom} auth={auth}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galerie Produit */}
          <div className="product-gallery">
            <div className="thumbnails">
              {produit.images?.map((image, index) => (
                <div
                  key={image.id}
                  className={`thumbnail ${activeThumbnail === index ? 'active' : ''}`}
                  onClick={() => setActiveThumbnail(index)}
                >
                  <img 
                    src={image.url} 
                    alt={`Vue ${index + 1} de ${produit.nom}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="main-image h-max-[100px] overflow-hidden">
              <img 
                src={produit.images?.[activeThumbnail]?.url || produit.image} 
                alt={produit.nom}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          {/* Détails Produit */}
          <div>
            <div className="mb-6">
              <span className="text-sm text-gray-500 uppercase tracking-wider">
                {produit.categorie?.nom || 'Produit'}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-3">{produit.nom}</h1>
              <div className="flex items-center space-x-2 mb-4">
                <div className="star-rating">★★★★★</div>
                <span className="text-sm text-gray-500">({produit.nombre_avis || 0} avis)</span>
              </div>
              <p className="text-2xl font-bold">{produit.prix} FC</p>
            </div>
            
            {/* Sélecteur de couleur */}
            {produit.couleurs?.length > 0 && (
              <div className="mb-6">
                <p className="font-medium mb-2">Couleur: <span id="selected-color">{selectedColor}</span></p>
                <div className="color-selector">
                  {produit.couleurs.map((couleur) => (
                    <div
                      key={couleur.id}
                      className={`color-option ${selectedColor === couleur.nom ? 'active' : ''}`}
                      style={{ backgroundColor: couleur.code_hex }}
                      onClick={() => setSelectedColor(couleur.nom)}
                      title={couleur.nom}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Sélecteur de taille */}
            {produit.tailles?.length > 0 && (
              <div className="mb-6">
                <p className="font-medium mb-2">Taille: <span id="selected-size">{selectedSize}</span></p>
                <div className="size-selector">
                  {produit.tailles.map((taille) => (
                    <div
                      key={taille.id}
                      className={`size-option ${selectedSize === taille.nom ? 'active' : ''}`}
                      onClick={() => setSelectedSize(taille.nom)}
                      data-size={taille.nom}
                    >
                      {taille.nom}
                    </div>
                  ))}
                </div>
                <Link href="#" className="mt-2 text-sm text-gray-500 inline-block hover:text-accent">
                  Guide des tailles
                </Link>
              </div>
            )}
            
            {/* Quantité et Ajout au panier */}
            <div className="mb-8">
              <p className="font-medium mb-2">Quantité</p>
              <div className="flex items-start gap-6">
                <div className="quantity-selector">
                  <button 
                    className="quantity-btn" 
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    className="quantity-input"
                    id="quantity"
                    readOnly
                  />
                  <button 
                    className="quantity-btn" 
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                  >
                    +
                  </button>
                </div>
                <Link href={`/cart/add/${produit.id}`}
                  method='post'
                  className="flex-1 bg-primary text-white px-8 py-3 font-medium hover:bg-opacity-90 hover:cursor-pointer transition-colors h-12"
                  disabled={produit.quantite_en_stock <= 0}
                >
                  {produit.quantite_en_stock > 0 ? 'Ajouter au panier' : 'Rupture de stock'}
                </Link>
              </div>
              <p className={`mt-2 text-sm font-medium ${produit.quantite_en_stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {produit.quantite_en_stock > 0 
                  ? `${produit.quantite_en_stock} disponible(s)` 
                  : 'Produit actuellement indisponible'}
              </p>
            </div>
            
            {/* Livraison et Retours */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Livraison gratuite</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Retours gratuits</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Garantie 2 ans</span>
              </div>
            </div>
            
            {/* Accordéons Détails */}
            <div className="space-y-4">
              <div className={`accordion ${activeAccordion === 'description' ? 'active' : ''} border-b border-gray-200 pb-4`}>
                <button 
                  className="accordion-btn w-full flex justify-between items-center"
                  onClick={() => toggleAccordion('description')}
                >
                  <span className="font-medium">Description</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transform ${activeAccordion === 'description' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`accordion-content mt-4 ${activeAccordion === 'description' ? '' : 'hidden'}`}>
                  <p className="text-gray-600">{produit.description}</p>
                  {produit.caracteristiques && (
                    <ul className="mt-4 space-y-2 text-gray-600">
                      {produit.caracteristiques.map((caract) => (
                        <li key={caract.id} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>{caract.nom}: {caract.valeur}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              
              <div className={`accordion ${activeAccordion === 'delivery' ? 'active' : ''} border-b border-gray-200 pb-4`}>
                <button 
                  className="accordion-btn w-full flex justify-between items-center"
                  onClick={() => toggleAccordion('delivery')}
                >
                  <span className="font-medium">Livraison & Retours</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transform ${activeAccordion === 'delivery' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`accordion-content mt-4 ${activeAccordion === 'delivery' ? '' : 'hidden'}`}>
                  <p className="text-gray-600">
                    {produit.politique_livraison || 'Livraison standard gratuite en 2-3 jours ouvrés. Retours gratuits sous 30 jours.'}
                  </p>
                </div>
              </div>
              
              <div className={`accordion ${activeAccordion === 'care' ? 'active' : ''}`}>
                <button 
                  className="accordion-btn w-full flex justify-between items-center"
                  onClick={() => toggleAccordion('care')}
                >
                  <span className="font-medium">Entretien</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transform ${activeAccordion === 'care' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`accordion-content mt-4 ${activeAccordion === 'care' ? '' : 'hidden'}`}>
                  <p className="text-gray-600">
                    {produit.instructions_entretien || 'Consulter les instructions d\'entretien sur l\'étiquette du produit.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="" className="text-blue-600 hover:underline">
            ← Retour à la boutique
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Show;

// import React, { useState } from 'react';
// import { Head, Link } from '@inertiajs/react';
// import Layout from '@/layouts/Layout';

// const Show = () => {
//   const { produit, auth } = usePage().props;
//   const [selectedColor, setSelectedColor] = useState('Noir');
//   const [selectedSize, setSelectedSize] = useState('M');
//   const [quantity, setQuantity] = useState(1);
//   const [activeAccordion, setActiveAccordion] = useState('description');
//   const [activeThumbnail, setActiveThumbnail] = useState(0);

//   const colors = [
//     { name: 'Noir', value: '#000000' },
//     { name: 'Marron', value: '#964B00' },
//     { name: 'Gris', value: '#808080' },
//     { name: 'Beige', value: '#e8e8e8' },
//   ];

//   const sizes = ['XS', 'S', 'M', 'L', 'XL'];

//   const thumbnails = [
//     { bg: 'bg-gray-200' },
//     { bg: 'bg-gray-300' },
//     { bg: 'bg-gray-400' },
//     { bg: 'bg-gray-500' },
//     { bg: 'bg-gray-600' },
//   ];

//   const handleQuantityChange = (value) => {
//     const newValue = quantity + value;
//     if (newValue >= 1 && newValue <= 10) {
//       setQuantity(newValue);
//     }
//   };

//   const toggleAccordion = (section) => {
//     setActiveAccordion(activeAccordion === section ? null : section);
//   };

//   return (
//     <Layout title={produit.nom} auth={auth} page={usePage()}>
//     {/* <Layout title="Blazer Minimaliste - LUXE"> */}
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Galerie Produit */}
//           <div className="product-gallery">
//             <div className="thumbnails">
//               {thumbnails.map((thumbnail, index) => (
//                 <div
//                   key={index}
//                   className={`thumbnail ${thumbnail.bg} ${activeThumbnail === index ? 'active' : ''}`}
//                   onClick={() => setActiveThumbnail(index)}
//                 />
//               ))}
//             </div>
//             <div className={`main-image ${thumbnails[activeThumbnail].bg}`}></div>
//           </div>
          
//           {/* Détails Produit */}
//           <div>
//             <div className="mb-6">
//               <span className="text-sm text-gray-500 uppercase tracking-wider">Vêtements / Blazers</span>
//               <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-3">Blazer Minimaliste</h1>
//               <div className="flex items-center space-x-2 mb-4">
//                 <div className="star-rating">★★★★★</div>
//                 <span className="text-sm text-gray-500">(24 avis)</span>
//               </div>
//               <p className="text-2xl font-bold">€249</p>
//             </div>
            
//             {/* Sélecteur de couleur */}
//             <div className="mb-6">
//               <p className="font-medium mb-2">Couleur: <span id="selected-color">{selectedColor}</span></p>
//               <div className="color-selector">
//                 {colors.map((color) => (
//                   <div
//                     key={color.name}
//                     className={`color-option ${selectedColor === color.name ? 'active' : ''}`}
//                     style={{ backgroundColor: color.value, border: color.name === 'Beige' ? '1px solid #ccc' : '1px solid #e5e5e5' }}
//                     onClick={() => setSelectedColor(color.name)}
//                     data-color={color.name}
//                   />
//                 ))}
//               </div>
//             </div>
            
//             {/* Sélecteur de taille */}
//             <div className="mb-6">
//               <p className="font-medium mb-2">Taille: <span id="selected-size">{selectedSize}</span></p>
//               <div className="size-selector">
//                 {sizes.map((size) => (
//                   <div
//                     key={size}
//                     className={`size-option ${selectedSize === size ? 'active' : ''}`}
//                     onClick={() => setSelectedSize(size)}
//                     data-size={size}
//                   >
//                     {size}
//                   </div>
//                 ))}
//               </div>
//               <Link href="#" className="mt-2 text-sm text-gray-500 inline-block hover:text-accent">Guide des tailles</Link>
//             </div>
            
//             {/* Quantité et Ajout au panier */}
//             <div className="mb-8">
//               <p className="font-medium mb-2">Quantité</p>
//               <div className="flex items-start gap-6">
//                 <div className="quantity-selector">
//                   <button className="quantity-btn" onClick={() => handleQuantityChange(-1)}>-</button>
//                   <input
//                     type="text"
//                     value={quantity}
//                     className="quantity-input"
//                     id="quantity"
//                     readOnly
//                   />
//                   <button className="quantity-btn" onClick={() => handleQuantityChange(1)}>+</button>
//                 </div>
//                 <button className="flex-1 bg-primary text-white px-8 py-3 font-medium hover:bg-opacity-90 transition-colors h-12">
//                   Ajouter au panier
//                 </button>
//               </div>
//             </div>
            
//             {/* Livraison et Retours */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//               <div className="flex items-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                 </svg>
//                 <span className="text-sm">Livraison gratuite</span>
//               </div>
//               <div className="flex items-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                 </svg>
//                 <span className="text-sm">Retours gratuits</span>
//               </div>
//               <div className="flex items-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                 </svg>
//                 <span className="text-sm">Garantie 2 ans</span>
//               </div>
//             </div>
            
//             {/* Accordéons Détails */}
//             <div className="space-y-4">
//               <div className={`accordion ${activeAccordion === 'description' ? 'active' : ''} border-b border-gray-200 pb-4`}>
//                 <button 
//                   className="accordion-btn w-full flex justify-between items-center"
//                   onClick={() => toggleAccordion('description')}
//                 >
//                   <span className="font-medium">Description</span>
//                   <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transform ${activeAccordion === 'description' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>
//                 <div className={`accordion-content mt-4 ${activeAccordion === 'description' ? '' : 'hidden'}`}>
//                   <p className="text-gray-600">Le blazer minimaliste LUXE est une pièce intemporelle conçue pour durer. Taillé dans un tissu de laine premium, ce blazer offre une coupe structurée tout en conservant un confort exceptionnel. Parfait pour habiller un jean comme pour compléter un costume.</p>
//                   <ul className="mt-4 space-y-2 text-gray-600">
//                     {[
//                       "100% laine vierge",
//                       "Doublure en soie",
//                       "Finition à la main",
//                       "Fabriqué en Italie"
//                     ].map((item) => (
//                       <li key={item} className="flex items-start">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                         </svg>
//                         <span>{item}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
              
//               <div className={`accordion ${activeAccordion === 'delivery' ? 'active' : ''} border-b border-gray-200 pb-4`}>
//                 <button 
//                   className="accordion-btn w-full flex justify-between items-center"
//                   onClick={() => toggleAccordion('delivery')}
//                 >
//                   <span className="font-medium">Livraison & Retours</span>
//                   <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transform ${activeAccordion === 'delivery' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>
//                 <div className={`accordion-content mt-4 ${activeAccordion === 'delivery' ? '' : 'hidden'}`}>
//                   <p className="text-gray-600">Livraison standard gratuite en 2-3 jours ouvrés. Retours gratuits sous 30 jours. Pour les retours internationaux, des frais de retour peuvent s'appliquer.</p>
//                 </div>
//               </div>
              
//               <div className={`accordion ${activeAccordion === 'care' ? 'active' : ''}`}>
//                 <button 
//                   className="accordion-btn w-full flex justify-between items-center"
//                   onClick={() => toggleAccordion('care')}
//                 >
//                   <span className="font-medium">Entretien</span>
//                   <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transform ${activeAccordion === 'care' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>
//                 <div className={`accordion-content mt-4 ${activeAccordion === 'care' ? '' : 'hidden'}`}>
//                   <p className="text-gray-600">Nettoyage à sec uniquement. Ne pas laver en machine. Repasser à basse température. Conserver à l'abri de l'humidité.</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Show;







// import React from 'react';
// import { usePage, Link } from '@inertiajs/react';
// import Layout from '@/layouts/Layout';

// export default function Show() {
//   const { produit, auth } = usePage().props;

//   return (
//     <Layout title={produit.nom} auth={auth} page={usePage()}>
//       <div className="max-w-6xl mx-auto py-12 px-4 grid md:grid-cols-2 gap-10 bg-white rounded shadow">
        
//         {/* Image principale */}
//         <div>
//           <img
//             src={produit.image || '/placeholder.png'}
//             alt={produit.nom}
//             className="w-full h-auto max-h-[500px] object-cover rounded-lg border"
//           />

//           {/* Galerie des images secondaires */}
//           {produit.images && produit.images.length > 0 && (
//             <div className="mt-4 flex gap-3 flex-wrap">
//               {produit.images.map((img) => (
//                 <img
//                   key={img.id}
//                   src={img.url}
//                   alt="Image secondaire"
//                   className="w-24 h-24 object-cover rounded border hover:scale-105 transition"
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Détails produit */}
//         <div>
//           <h1 className="text-3xl font-bold mb-4">{produit.nom}</h1>
//           <p className="text-gray-500 mb-2">Catégorie : <span className="font-medium">{produit.categorie}</span></p>
//           <p className="text-2xl font-semibold text-orange-600 mb-4">€{produit.prix}</p>
//           <p className="text-gray-700 mb-4">{produit.description}</p>
//           <p className={`mb-4 text-sm font-medium ${produit.quantite_en_stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
//             {produit.quantite_en_stock > 0 ? `En stock (${produit.quantite_en_stock})` : 'Rupture de stock'}
//           </p>

//           <button
//             className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition"
//             disabled={produit.quantite_en_stock === 0}
//           >
//             Ajouter au panier
//           </button>
//         </div>
//       </div>

//       <div className="mt-6 text-center">
//         <Link href={route('home')} className="text-blue-600 underline">
//           ← Retour à la boutique
//         </Link>
//       </div>
//     </Layout>
//   );
// }













// import React from 'react';
// import { usePage, Link } from '@inertiajs/react';
// import Layout from '@/layouts/Layout';

// export default function Show() {
//   const { produit } = usePage().props;

//   return (
//     <Layout title={produit.nom} auth={null} page={usePage()}>
//       <div className="max-w-6xl mx-auto py-12 px-4 grid md:grid-cols-2 gap-10 bg-white rounded shadow">
        
//         {/* Image principale */}
//         <div>
//           <img
//             src={produit.image || '/placeholder.png'}
//             alt={produit.nom}
//             className="w-full h-auto max-h-[500px] object-cover rounded-lg border"
//           />

//           {/* Galerie des images secondaires */}
//           {produit.images && produit.images.length > 0 && (
//             <div className="mt-4 flex gap-3 flex-wrap">
//               {produit.images.map((img) => (
//                 <img
//                   key={img.id}
//                   src={img.url}
//                   alt="Image secondaire"
//                   className="w-24 h-24 object-cover rounded border hover:scale-105 transition"
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Détails produit */}
//         <div>
//           <h1 className="text-3xl font-bold mb-4">{produit.nom}</h1>
//           <p className="text-gray-500 mb-2">Catégorie : <span className="font-medium">{produit.categorie}</span></p>
//           <p className="text-2xl font-semibold text-orange-600 mb-4">€{produit.prix}</p>
//           <p className="text-gray-700 mb-4">{produit.description}</p>
//           <p className={`mb-4 text-sm font-medium ${produit.quantite_en_stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
//             {produit.quantite_en_stock > 0 ? `En stock (${produit.quantite_en_stock})` : 'Rupture de stock'}
//           </p>

//           <button
//             className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition"
//             disabled={produit.quantite_en_stock === 0}
//           >
//             Ajouter au panier
//           </button>
//         </div>
//       </div>

//       <div className="mt-6 text-center">
//         <Link href={route('home')} className="text-blue-600 underline">
//           ← Retour à la boutique
//         </Link>
//       </div>
//     </Layout>
//   );
// }






















// import React, { useState } from 'react';
// import { Head, router } from '@inertiajs/react';
// import Layout from '@/Components/Layout/Layout';

// interface Product {
//   id: number;
//   nom: string;
//   prix: number;
//   description: string;
//   image: string[];
//   categorie: string;
// }

// interface Auth {
//   user: {
//     id: number;
//     name: string;
//     email: string;
//   };
// }

// interface Props {
//   product: Product;
//   auth: Auth;
// }


// const Show = ({ product, auth }: Props) => {
//   const [selectedImage, setSelectedImage] = useState(product.image[0]);
//   const [selectedColor, setSelectedColor] = useState('Noir');
//   const [selectedSize, setSelectedSize] = useState('M');
//   const [quantity, setQuantity] = useState(1);
//   const handleAddToCart = () => {
//     router.post('/panier', {
//       produit_id: product.id,
//       taille: selectedSize,
//       couleur: selectedColor,
//       quantite: quantity,
//     });
//   };
  

//   return (
// <Layout title={product.nom} auth={auth}>
//       <Head title={product.nom} />

//       <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Galerie Produit */}
//           <div className="product-gallery">
//             <div className="thumbnails">
//               {product.image.map((img, idx) => (
//                 <div
//                   key={idx}
//                   className={`thumbnail ${selectedImage === img ? 'active' : ''}`}
//                   style={{
//                     backgroundImage: `url(/storage/${img})`,
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                   }}
//                   onClick={() => setSelectedImage(img)}
//                 ></div>
//               ))}
//             </div>
//             <div
//               className="main-image bg-gray-100"
//               style={{
//                 backgroundImage: `url(/storage/${selectedImage})`,
//               }}
//             ></div>
//           </div>

//           {/* Détails Produit */}
//           <div>
//             <div className="mb-6">
//               <span className="text-sm text-gray-500 uppercase tracking-wider">{product.categorie}</span>
//               <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-3">{product.nom}</h1>
//               <div className="flex items-center space-x-2 mb-4">
//                 <div className="star-rating">★★★★★</div>
//                 <span className="text-sm text-gray-500">(24 avis)</span>
//               </div>
//               <p className="text-2xl font-bold">€{product.prix}</p>
//             </div>

//             {/* Couleurs */}
//             <div className="mb-6">
//               <p className="font-medium mb-2">Couleur: <span>{selectedColor}</span></p>
//               <div className="color-selector">
//                 {['Noir', 'Marron', 'Gris', 'Beige'].map(color => (
//                   <div
//                     key={color}
//                     className={`color-option ${selectedColor === color ? 'active' : ''}`}
//                     style={{
//                       backgroundColor:
//                         color === 'Noir' ? '#000' :
//                         color === 'Marron' ? '#964B00' :
//                         color === 'Gris' ? '#808080' :
//                         '#e8e8e8',
//                       border: color === 'Beige' ? '1px solid #ccc' : undefined,
//                     }}
//                     onClick={() => setSelectedColor(color)}
//                   ></div>
//                 ))}
//               </div>
//             </div>

//             {/* Tailles */}
//             <div className="mb-6">
//               <p className="font-medium mb-2">Taille: <span>{selectedSize}</span></p>
//               <div className="size-selector">
//                 {['XS', 'S', 'M', 'L', 'XL'].map(size => (
//                   <div
//                     key={size}
//                     className={`size-option ${selectedSize === size ? 'active' : ''}`}
//                     onClick={() => setSelectedSize(size)}
//                   >
//                     {size}
//                   </div>
//                 ))}
//               </div>
//               <a href="#" className="mt-2 text-sm text-gray-500 inline-block hover:text-accent">Guide des tailles</a>
//             </div>

//             {/* Quantité */}
//             <div className="mb-8">
//               <p className="font-medium mb-2">Quantité</p>
//               <div className="flex items-start gap-6">
//                 <div className="quantity-selector">
//                   <button className="quantity-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
//                   <input type="text" value={quantity} readOnly className="quantity-input" />
//                   <button className="quantity-btn" onClick={() => setQuantity(q => q + 1)}>+</button>
//                 </div>
//                 <button
//                   onClick={handleAddToCart}
//                   className="flex-1 bg-primary text-white px-8 py-3 font-medium hover:bg-opacity-90 transition-colors h-12"
//                 >
//                   Ajouter au panier
//                 </button>

//               </div>
//             </div>

//             {/* Informations livraison */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//               {["Livraison gratuite", "Retours gratuits", "Garantie 2 ans"].map((text, idx) => (
//                 <div key={idx} className="flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span className="text-sm">{text}</span>
//                 </div>
//               ))}
//             </div>

//             {/* Accordéons (statique pour le moment) */}
//             <div className="space-y-4">
//               <div className="accordion active border-b border-gray-200 pb-4">
//                 <button className="accordion-btn w-full flex justify-between items-center">
//                   <span className="font-medium">Description</span>
//                   <svg className="h-5 w-5 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>
//                 <div className="accordion-content mt-4">
//                   <p className="text-gray-600">{product.description}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default Show;








// import React from 'react';
// import Layout from '@/Components/Layout/Layout';

// const Show = ({ produit, auth }) => {
//   return (
//     <Layout title={produit.nom} auth={auth}>
//       <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//           <div>
//             <img 
//               src={`/storage/${produit.image}`} 
//               alt={produit.nom} 
//               className="w-full rounded"
//             />
//           </div>

//           <div>
//             <h1 className="text-3xl font-bold mb-4">{produit.nom}</h1>
//             <p className="text-lg text-gray-600 mb-2">{produit.categorie?.nom}</p>
//             <p className="text-2xl font-bold mb-6">€{produit.prix}</p>
//             <p className="text-gray-700">{produit.description}</p>

//             <div className="mt-6">
//               <button className="bg-black text-white px-6 py-3">Ajouter au panier</button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default Show;
