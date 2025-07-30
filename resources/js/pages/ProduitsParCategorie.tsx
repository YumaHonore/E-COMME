import React from 'react';
import Layout from '@/Components/Layout/Layout';
import { Link, usePage } from '@inertiajs/react';

const ProduitsParCategorie = ({ featuredProducts, auth, categories }) => {
  const { categorie, produits } = usePage().props;
  return (
    <Layout title="Accueil" auth={auth} categories={categories}>
    <div className="font-sans bg-white text-primary antialiased">
      {/* Barre de navigation */}

      {/* Fil d'Ariane */}
      <div className="bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <a href="index.html" className="text-gray-600 hover:text-primary transition-colors">Accueil</a>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li aria-current="page">
                <span className="text-primary">Vêtements</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* En-tête de catégorie */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Vêtements</h1>
        <p className="text-gray-600 max-w-3xl">Découvrez notre collection de vêtements minimalistes et intemporels. Des pièces soigneusement sélectionnées pour leur qualité et leur style.</p>
      </section>

      {/* Filtres et tri */}
      <section className="bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <button className="md:hidden p-2 rounded hover:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="sr-only">Filtres</span>
              </button>
              <span className="text-sm text-gray-600">24 produits</span>
            </div>

            <div className="flex items-center space-x-4">
              <label htmlFor="sort" className="text-sm font-medium">Trier par :</label>
              <select id="sort" className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-accent">
                <option>Pertinence</option>
                <option>Prix croissant</option>
                <option>Prix décroissant</option>
                <option>Nouveautés</option>
                <option>Meilleures ventes</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row">
          {/* Filtres sidebar (masqué sur mobile) */}
          <aside className="hidden md:block w-64 pr-8">
            <div className="space-y-8">
              {/* Filtre par catégorie */}
              <div>
                <h3 className="font-medium mb-4">Catégories</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-primary transition-colors flex items-center">
                      <span className="w-4 h-4 border border-gray-400 rounded-sm mr-2"></span>
                      Tous les vêtements
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-primary transition-colors flex items-center">
                      <span className="w-4 h-4 border border-gray-400 rounded-sm mr-2"></span>
                      Hauts
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-primary transition-colors flex items-center">
                      <span className="w-4 h-4 border border-gray-400 rounded-sm mr-2"></span>
                      Pantalons
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-primary transition-colors flex items-center">
                      <span className="w-4 h-4 border border-gray-400 rounded-sm mr-2"></span>
                      Robes
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-primary transition-colors flex items-center">
                      <span className="w-4 h-4 border border-gray-400 rounded-sm mr-2"></span>
                      Vestes
                    </a>
                  </li>
                </ul>
              </div>

              {/* Filtre par taille */}
              <div>
                <h3 className="font-medium mb-4">Tailles</h3>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100">XS</button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100">S</button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100">M</button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100">L</button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100">XL</button>
                </div>
              </div>

              {/* Filtre par couleur */}
              <div>
                <h3 className="font-medium mb-4">Couleurs</h3>
                <div className="flex flex-wrap gap-3">
                  <button className="w-6 h-6 rounded-full bg-black border border-gray-300" title="Noir"></button>
                  <button className="w-6 h-6 rounded-full bg-white border border-gray-300" title="Blanc"></button>
                  <button className="w-6 h-6 rounded-full bg-gray-400 border border-gray-300" title="Gris"></button>
                  <button className="w-6 h-6 rounded-full bg-beige-400 border border-gray-300" title="Beige"></button>
                  <button className="w-6 h-6 rounded-full bg-blue-600 border border-gray-300" title="Bleu"></button>
                  <button className="w-6 h-6 rounded-full bg-red-600 border border-gray-300" title="Rouge"></button>
                </div>
              </div>

              {/* Filtre par prix */}
              <div>
                <h3 className="font-medium mb-4">Prix</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>€0</span>
                    <span>€500+</span>
                  </div>
                  <input type="range" min="0" max="500" defaultValue="250" className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer" />
                  <div className="flex justify-between">
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100">Min</button>
                    <span className="text-sm font-medium">€0 - €500</span>
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100">Max</button>
                  </div>
                </div>
              </div>

              <button className="w-full py-2 bg-primary text-white text-sm font-medium rounded hover:bg-opacity-90 transition-colors">
                Appliquer les filtres
              </button>
            </div>
          </aside>

          {/* Liste des produits */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Produit 1 */}
              <div className="group">
                <div className="aspect-[3/4] bg-secondary mb-4 relative overflow-hidden">
                  <div className="h-full w-full bg-gray-200"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-30 transition-opacity">
                    <button className="bg-white px-6 py-3 font-medium hover:bg-opacity-90 transition-colors">Voir le produit</button>
                  </div>
                  <span className="absolute top-2 right-2 bg-accent text-white text-xs px-2 py-1 rounded">Nouveau</span>
                </div>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">Chemise minimaliste</h3>
                    <p className="text-gray-600">Noir</p>
                  </div>
                  <p className="font-medium">€89</p>
                </div>
              </div>

              {/* Produit 2 */}
              <div className="group">
                <div className="aspect-[3/4] bg-secondary mb-4 relative overflow-hidden">
                  <div className="h-full w-full bg-gray-200"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-30 transition-opacity">
                    <button className="bg-white px-6 py-3 font-medium hover:bg-opacity-90 transition-colors">Voir le produit</button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">Pantalon droit</h3>
                    <p className="text-gray-600">Beige</p>
                  </div>
                  <p className="font-medium">€129</p>
                </div>
              </div>

              {/* Produit 3 */}
              <div className="group">
                <div className="aspect-[3/4] bg-secondary mb-4 relative overflow-hidden">
                  <div className="h-full w-full bg-gray-200"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-30 transition-opacity">
                    <button className="bg-white px-6 py-3 font-medium hover:bg-opacity-90 transition-colors">Voir le produit</button>
                  </div>
                  <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">Bestseller</span>
                </div>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">Pull en cachemire</h3>
                    <p className="text-gray-600">Gris</p>
                  </div>
                  <p className="font-medium">€159</p>
                </div>
              </div>

              {/* Produit 4 */}
              <div className="group">
                <div className="aspect-[3/4] bg-secondary mb-4 relative overflow-hidden">
                  <div className="h-full w-full bg-gray-200"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-30 transition-opacity">
                    <button className="bg-white px-6 py-3 font-medium hover:bg-opacity-90 transition-colors">Voir le produit</button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">Robe longue</h3>
                    <p className="text-gray-600">Noir</p>
                  </div>
                  <p className="font-medium">€179</p>
                </div>
              </div>

              {/* Produit 5 */}
              <div className="group">
                <div className="aspect-[3/4] bg-secondary mb-4 relative overflow-hidden">
                  <div className="h-full w-full bg-gray-200"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-30 transition-opacity">
                    <button className="bg-white px-6 py-3 font-medium hover:bg-opacity-90 transition-colors">Voir le produit</button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">Veste en lin</h3>
                    <p className="text-gray-600">Écru</p>
                  </div>
                  <p className="font-medium">€199</p>
                </div>
              </div>

              {/* Produit 6 */}
              <div className="group">
                <div className="aspect-[3/4] bg-secondary mb-4 relative overflow-hidden">
                  <div className="h-full w-full bg-gray-200"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-30 transition-opacity">
                    <button className="bg-white px-6 py-3 font-medium hover:bg-opacity-90 transition-colors">Voir le produit</button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">T-shirt basique</h3>
                    <p className="text-gray-600">Blanc</p>
                  </div>
                  <p className="font-medium">€49</p>
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="mt-16 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button className="p-2 rounded-full hover:bg-secondary disabled:opacity-50" disabled>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="sr-only">Précédent</span>
                </button>

                <button className="w-10 h-10 rounded-full bg-primary text-white font-medium">1</button>
                <button className="w-10 h-10 rounded-full hover:bg-secondary font-medium">2</button>
                <button className="w-10 h-10 rounded-full hover:bg-secondary font-medium">3</button>
                <span className="px-2">...</span>
                <button className="w-10 h-10 rounded-full hover:bg-secondary font-medium">8</button>

                <button className="p-2 rounded-full hover:bg-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="sr-only">Suivant</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </main>

      {/* Pied de page */}
      <footer className="bg-secondary py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-6">LUXE</h3>
              <p className="text-gray-600 mb-4">Une marque minimaliste pour un style audacieux et intemporel.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-primary">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-primary">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">Boutique</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Nouveautés</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Vêtements</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Accessoires</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Collections</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">Aide</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Livraison</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Retours</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Conditions</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Confidentialité</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-gray-300 text-center text-gray-600">
            <p>&copy; 2023 LUXE. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
    </Layout>
  );
};

export default ProduitsParCategorie;

















// import React from 'react';
// import { Link, usePage } from '@inertiajs/react';

// export default function ProduitsParCategorie() {
//   const { categorie, produits } = usePage().props;

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Produits - {categorie.nom}</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {produits.data.map((produit) => (
//           <div key={produit.id} className="border rounded p-3 shadow">
//             <img src={`/storage/${produit.image}`} alt={produit.nom} className="w-full h-40 object-cover mb-2" />
//             <h2 className="text-lg font-semibold">{produit.nom}</h2>
//             <p>{produit.description}</p>
//             <p className="font-bold">{produit.prix} FCFA</p>
//           </div>
//         ))}
//       </div>

//       <div className="mt-4 flex justify-center space-x-2">
//         {produits.links.map((link, index) => (
//           link.url ? (
//             <Link
//               key={index}
//               href={link.url}
//               className={`px-3 py-1 border rounded ${link.active ? 'bg-blue-500 text-white' : 'bg-white'}`}
//               dangerouslySetInnerHTML={{ __html: link.label }}
//             />
//           ) : null
//         ))}
//       </div>
//     </div>
//   );
// }
