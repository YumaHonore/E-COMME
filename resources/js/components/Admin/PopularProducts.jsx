import React from 'react';
import { Link } from '@inertiajs/react';

function PopularProducts({ products }) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Produits populaires</h3>
      </div>

      {/* <div className="divide-y divide-gray-200">
        {products.map((product) => (
          <div key={product.id} className="p-4 flex items-center">
            <div className="h-16 w-16 rounded mr-4 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-12 w-12 object-contain"
                />
              ) : (
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
              )}
            </div>

            <div className="flex-1">
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-gray-500">
                {product.sales_count} ventes cette semaine
              </p>
            </div>

            <span className="text-orange-600 font-medium">€{product.price}</span>
          </div>
        ))}
      </div> */}

      <Link
        href="/admin/products"
        className="block p-4 text-center text-orange-600 hover:underline border-t border-gray-200"
      >
        Voir tous les produits
      </Link>
    </div>
  );
}

export default PopularProducts;



















// // resources/js/components/Admin/PopularProducts.jsx
// import React from 'react';
// import { Link } from '@inertiajs/react';

// export default function PopularProducts({ products }) {
//   return (
//     <div className="bg-white rounded-lg shadow">
//       <div className="p-6 border-b border-gray-200">
//         <h3 className="text-lg font-semibold">Produits populaires</h3>
//       </div>
      
//       <div className="divide-y divide-gray-200">
//         {products.map((product) => (
//           <div key={product.id} className="p-4 flex items-center">
//             <div className="h-16 w-16 rounded mr-4 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
//               {product.image ? (
//                 <img 
//                   src={product.image} 
//                   alt={product.name} 
//                   className="h-12 w-12 object-contain"
//                 />
//               ) : (
//                 <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
//               )}
//             </div>
            
//             <div className="flex-1">
//               <p className="font-medium">{product.name}</p>
//               <p className="text-sm text-gray-500">
//                 {product.sales_count} ventes cette semaine
//               </p>
//             </div>
            
//             <span className="text-orange-600 font-medium">€{product.price}</span>
//           </div>
//         ))}
//       </div>
      
//       <Link 
//         href="/admin/products" 
//         className="block p-4 text-center text-orange-600 hover:underline border-t border-gray-200"
//       >
//         Voir tous les produits
//       </Link>
//     </div>
//   );
// }

// PopularProducts.defaultProps = {
//   products: [
//     { id: 1, name: 'Blazer minimaliste', sales_count: 12, price: 249 },
//     { id: 2, name: 'Robe longue', sales_count: 9, price: 189 },
//     { id: 3, name: 'Pull oversized', sales_count: 7, price: 129 },
//   ]
// };