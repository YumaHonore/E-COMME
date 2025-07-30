import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';

const Header = ({ auth, categories }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Prendre uniquement les trois premières catégories
  const displayedCategories = categories.slice(0, 3);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              KBKL
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/nouveautes" className="text-sm font-medium hover:text-[#ff3e00] transition-colors">
              Nouveautés
            </Link>
            {displayedCategories.map((category) => (
              <Link
                key={category.id}
                href={`/categorie/${category.nom}`}
                className="text-sm font-medium hover:text-[#ff3e00] transition-colors"
              >
                {category.nom}
              </Link>
            ))}
            <Link href="/apropos" className="text-sm font-medium hover:text-[#ff3e00] transition-colors">
              À propos
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <button type="button" name="search" title="search" className="p-2 rounded-full hover:bg-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <div className="relative">
              <button title="langue" className="p-2 rounded-full hover:bg-secondary flex items-center" onClick={() => setLangDropdownOpen(!langDropdownOpen)}>
                <span className="lang-flag flag-fr"></span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-50">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    <span className="lang-flag flag-fr"></span> Français
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    <span className="lang-flag flag-en"></span> English
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    <span className="lang-flag flag-es"></span> Español
                  </a>
                </div>
              )}
            </div>
            <button title="panier" className="p-2 rounded-full hover:bg-secondary relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute top-0 right-0 bg-[#ff3e00] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
            </button>
            <div className="relative">
              {auth.user ? (
                <div className="logged-in">
                  <button title="user" className="flex items-center text-sm rounded-full focus:outline-none" onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}>
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-sm font-medium">{auth.user.initials}</span>
                    </div>
                  </button>
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                        <div>
                          <p className="font-medium">{auth.user.name}</p>
                          <p className="text-xs text-gray-500">{auth.user.email}</p>
                        </div>
                        <button title="user" className="text-gray-400 hover:text-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      {auth.user.role === "admin" ? (
                        <Link href="adminDashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard (admin)</Link>
                      ) : (
                        <Link href="dashboard" className="block px-4 py-2 hover:bg-gray-100">Mon compte</Link>
                      )}
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">Mes commandes</a>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">Mes favoris</a>
                      <Link href="/logout" method="post" className="block px-4 py-2 hover:bg-gray-100 border-t border-gray-100 text-[#ff3e00]">Déconnexion</Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="logged-out">
                  <div className="flex space-x-2">
                    <Link href={route('login')} className="px-3 py-1 text-sm font-medium hover:text-[#ff3e00] transition-colors">Connexion</Link>
                    <Link href="/register" className="px-3 py-1 text-sm font-medium bg-primary text-white rounded hover:bg-opacity-90 transition-colors">Inscription</Link>
                  </div>
                </div>
              )}
            </div>
            <button title="menu" className="p-2 rounded-full hover:bg-secondary md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/nouveautes" className="block px-3 py-2 rounded-md text-base font-medium hover:text-[#ff3e00] transition-colors">Nouveautés</Link>
            {displayedCategories.map((category) => (
              <Link
                key={category.id}
                href={`/categorie/${category.nom}`}
                className="block px-3 py-2 rounded-md text-base font-medium hover:text-[#ff3e00] transition-colors"
              >
                {category.nom}
              </Link>
            ))}
            <Link href="/apropos" className="block px-3 py-2 rounded-md text-base font-medium hover:text-[#ff3e00] transition-colors">À propos</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;













// import React, { useState } from 'react';
// import { Link } from '@inertiajs/react';
// import { Menu, X } from 'lucide-react';

// const Header = ({ auth, categories }) => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [langDropdownOpen, setLangDropdownOpen] = useState(false);
//   const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

//   // Prendre uniquement les trois premières catégories
//   const displayedCategories = categories.slice(0, 3);

//   return (
//     <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex-shrink-0 flex items-center">
//             <Link href="/" className="text-2xl font-bold tracking-tight">
//               KBKL
//             </Link>
//           </div>
//           <nav className="hidden md:flex space-x-8">
//             <Link href="/nouveautes" className="text-sm font-medium hover:text-[#ff3e00] transition-colors">
//               Nouveautés
//             </Link>
//             {categories.map((category) => (
//               <Link
//                 key={category.id}
//                 href={`/categorie/${category.nom}`}
//                 className="text-sm font-medium hover:text-[#ff3e00] transition-colors"
//               >
//                 {category.nom}
//               </Link>
//             ))}
//             <Link href="/apropos" className="text-sm font-medium hover:text-[#ff3e00] transition-colors">
//               À propos
//             </Link>
//           </nav>
//           <div className="flex items-center space-x-4">
//             <button type="button" name="search" title="search" className="p-2 rounded-full hover:bg-secondary">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </button>
//             <div className="relative">
//               <button title="langue" className="p-2 rounded-full hover:bg-secondary flex items-center" onClick={() => setLangDropdownOpen(!langDropdownOpen)}>
//                 <span className="lang-flag flag-fr"></span>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>
//               {langDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-50">
//                   <a href="#" className="block px-4 py-2 hover:bg-gray-100">
//                     <span className="lang-flag flag-fr"></span> Français
//                   </a>
//                   <a href="#" className="block px-4 py-2 hover:bg-gray-100">
//                     <span className="lang-flag flag-en"></span> English
//                   </a>
//                   <a href="#" className="block px-4 py-2 hover:bg-gray-100">
//                     <span className="lang-flag flag-es"></span> Español
//                   </a>
//                 </div>
//               )}
//             </div>
//             <button title="panier" className="p-2 rounded-full hover:bg-secondary relative">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//               </svg>
//               <span className="absolute top-0 right-0 bg-[#ff3e00] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
//             </button>
//             <div className="relative">
//               {auth.user ? (
//                 <div className="logged-in">
//                   <button title="user" className="flex items-center text-sm rounded-full focus:outline-none" onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}>
//                     <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
//                       <span className="text-sm font-medium">{auth.user.initials}</span>
//                     </div>
//                   </button>
//                   {profileDropdownOpen && (
//                     <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
//                       <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
//                         <div>
//                           <p className="font-medium">{auth.user.name}</p>
//                           <p className="text-xs text-gray-500">{auth.user.email}</p>
//                         </div>
//                         <button title="user" className="text-gray-400 hover:text-primary">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                           </svg>
//                         </button>
//                       </div>
//                       {auth.user.role === "admin" ? (
//                         <Link href="adminDashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard (admin)</Link>
//                       ) : (
//                         <Link href="dashboard" className="block px-4 py-2 hover:bg-gray-100">Mon compte</Link>
//                       )}
//                       <a href="#" className="block px-4 py-2 hover:bg-gray-100">Mes commandes</a>
//                       <a href="#" className="block px-4 py-2 hover:bg-gray-100">Mes favoris</a>
//                       <Link href="/logout" method="post" className="block px-4 py-2 hover:bg-gray-100 border-t border-gray-100 text-[#ff3e00]">Déconnexion</Link>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div className="logged-out">
//                   <div className="flex space-x-2">
//                     <Link href={route('login')} className="px-3 py-1 text-sm font-medium hover:text-[#ff3e00] transition-colors">Connexion</Link>
//                     <Link href="/register" className="px-3 py-1 text-sm font-medium bg-primary text-white rounded hover:bg-opacity-90 transition-colors">Inscription</Link>
//                   </div>
//                 </div>
//               )}
//             </div>
//             <button title="menu" className="p-2 rounded-full hover:bg-secondary md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//               {mobileMenuOpen ? <X /> : <Menu />}
//             </button>
//           </div>
//         </div>
//       </div>
//       {mobileMenuOpen && (
//         <div className="md:hidden" id="mobile-menu">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//             <Link href="/nouveautes" className="block px-3 py-2 rounded-md text-base font-medium hover:text-[#ff3e00] transition-colors">Nouveautés</Link>
//             {categories.map((category) => (
//               <Link
//                 key={category.id}
//                 href={`/categorie/${category.nom}`}
//                 className="block px-3 py-2 rounded-md text-base font-medium hover:text-[#ff3e00] transition-colors"
//               >
//                 {category.nom}
//               </Link>
//             ))}
//             <Link href="/apropos" className="block px-3 py-2 rounded-md text-base font-medium hover:text-[#ff3e00] transition-colors">À propos</Link>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;



















// import React, { useState } from 'react';
// import { Link } from '@inertiajs/react';
// import { Menu, X } from 'lucide-react';

// const Header = ({ auth }) => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [langDropdownOpen, setLangDropdownOpen] = useState(false);
//   const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

//   return (
//     <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex-shrink-0 flex items-center">
//             <Link href="/" className="text-2xl font-bold tracking-tight">
//               KBKL
//             </Link>
//           </div>
//           <nav className="hidden md:flex space-x-8">
//             <Link href="/nouveautes" className="text-sm font-medium hover:text-[#ff3e00] transition-colors">Nouveautés</Link>
            
//             <Link href="/categorie/Vetements" className="text-sm font-medium hover:text-[#ff3e00] transition-colors btn">
//               Vêtements
//             </Link>

//             <Link href="/categorie/accessoires" className="text-sm font-medium hover:text-[#ff3e00] transition-colors">
//               Accessoires
//             </Link>

//             <Link href="/categorie/Sports" className="text-sm font-medium hover:text-[#ff3e00] transition-colors">
//               Sports
//             </Link>

//             <Link href="/categorie/electronic" className="text-sm font-medium hover:text-[#ff3e00] transition-colors">
//               Électronique
//             </Link>

//             <Link href="/categorie/Maison" className="text-sm font-medium hover:text-[#ff3e00] transition-colors">
//               Maison
//             </Link>

//             {/* <Link href="/vetements" className="text-sm font-medium hover:text-[#ff3e00] transition-colors">Vêtements</Link> */}
//             {/* <Link href="#" className="text-sm font-medium hover:text-[#ff3e00] transition-colors">Accessoires</Link> */}
//             {/* <Link href="#" className="text-sm font-medium hover:text-[#ff3e00] transition-colors">Collections</Link> */}
//             <Link href="/apropos" className="text-sm font-medium hover:text-[#ff3e00] transition-colors">À propos</Link>
//           </nav>
//           <div className="flex items-center space-x-4">
//             <button type='button' name='search' title='search' className="p-2 rounded-full hover:bg-secondary">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </button>

//             <div className="relative">
//               <button title='langue' className="p-2 rounded-full hover:bg-secondary flex items-center" onClick={() => setLangDropdownOpen(!langDropdownOpen)}>
//                 <span className="lang-flag flag-fr"></span>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>
//               {langDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-50">
//                   <a href="#" className="block px-4 py-2 hover:bg-gray-100">
//                     <span className="lang-flag flag-fr"></span> Français
//                   </a>
//                   <a href="#" className="block px-4 py-2 hover:bg-gray-100">
//                     <span className="lang-flag flag-en"></span> English
//                   </a>
//                   <a href="#" className="block px-4 py-2 hover:bg-gray-100">
//                     <span className="lang-flag flag-es"></span> Español
//                   </a>
//                 </div>
//               )}
//             </div>

//             <button title='panier' className="p-2 rounded-full hover:bg-secondary relative">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//               </svg>
//               <span className="absolute top-0 right-0 bg-[#ff3e00] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
//             </button>

//             <div className="relative">
//               {auth.user ? (
//                 <div className="logged-in">
//                   <button title='user' className="flex items-center text-sm rounded-full focus:outline-none" onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}>
//                     <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
//                       <span className="text-sm font-medium">{auth.user.initials}</span>
//                     </div>
//                   </button>
//                   {profileDropdownOpen && (
//                     <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
//                       <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
//                         <div>
//                           <p className="font-medium">{auth.user.name}</p>
//                           <p className="text-xs text-gray-500">{auth.user.email}</p>
//                         </div>
//                         <button title='user' className="text-gray-400 hover:text-primary">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                           </svg>
//                         </button>
//                       </div>
//                       {auth.user.role === "admin" ? (
//                         <Link href="adminDashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard (admin)</Link>
//                       ) : (
//                         <Link href="dashboard" className="block px-4 py-2 hover:bg-gray-100">Mon compte</Link>
//                       )}
//                       <a href="#" className="block px-4 py-2 hover:bg-gray-100">Mes commandes</a>
//                       <a href="#" className="block px-4 py-2 hover:bg-gray-100">Mes favoris</a>
//                       <Link href="/logout" method='post' className="block px-4 py-2 hover:bg-gray-100 border-t border-gray-100 text-[#ff3e00]">Déconnexion</Link>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div className="logged-out">
//                   <div className="flex space-x-2">
//                     <Link href={route('login')} className="px-3 py-1 text-sm font-medium hover:text-[#ff3e00] transition-colors">Connexion</Link>
//                     <Link href='/register' className="px-3 py-1 text-sm font-medium bg-primary text-white rounded hover:bg-opacity-90 transition-colors">Inscription</Link>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <button title='menu' className="p-2 rounded-full hover:bg-secondary md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//               {mobileMenuOpen ? <X /> : <Menu />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* {mobileMenuOpen && (
//         <div className="md:hidden" id="mobile-menu">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//                         <Link href="/" className="text-2xl font-bold tracking-tight">
//               KBKL
//             </Link>
//           </div>
//           <nav className="hidden md:flex space-x-8">
//             <Link href="/nouveautes" className="block px-3 py-2 rounded-md text-base font-medium hover:text-[#ff3e00] transition-colors">Nouveautés</Link>
            
//             <Link href="/categorie/Vetements" className="block px-3 py-2 rounded-md text-base font-medium hover:text-[#ff3e00] transition-colors">
//               Vêtements
//             </Link>

//             <Link href="/categorie/accessoires" className="block px-3 py-2 rounded-md text-base font-medium hover:text-[#ff3e00] transition-colors">
//               Accessoires
//             </Link>

//             <Link href="/categorie/Sports" className="block px-3 py-2 rounded-md text-base font-medium hover:text-[#ff3e00] transition-colors">
//               Sports
//             </Link>

//             <Link href="/categorie/electronic" className="block px-3 py-2 rounded-md text-base font-medium hover:text-[#ff3e00] transition-colors">
//               Électronique
//             </Link>

//             <Link href="/categorie/Maison" className="block px-3 py-2 rounded-md text-base font-medium hover:text-[#ff3e00] transition-colors">
//               Maison
//             </Link>

//             {/* <Link href="/vetements" className="text-sm font-medium hover:text-[#ff3e00] transition-colors">Vêtements</Link> */}
//             {/* <Link href="#" className="text-sm font-medium hover:text-[#ff3e00] transition-colors">Accessoires</Link> */}
//             {/* <Link href="#" className="text-sm font-medium hover:text-[#ff3e00] transition-colors">Collections</Link> *
//             <Link href="/apropos" className="block px-3 py-2 rounded-md text-base font-medium hover:text-[#ff3e00] transition-colors">À propos</Link>
//           </nav>
//           </div>
//         // </div>
//       )} */}

//       {mobileMenuOpen && (
//         <div className="md:hidden" id="mobile-menu">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//             <Link href="/nouveautes" className="block px-3 py-2 rounded-md text-base font-medium hover:text-[#ff3e00] transition-colors">Nouveautés</Link>
//             <Link href="/vetements" className="block px-3 py-2 rounded-md text-base font-medium hover:text-[#ff3e00] transition-colors">Vêtements</Link>
//             <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:text-[#ff3e00] transition-colors">Accessoires</Link>
//             <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:text-[#ff3e00] transition-colors">Collections</Link>
//             <Link href="/apropos" className="block px-3 py-2 rounded-md text-base font-medium hover:text-[#ff3e00] transition-colors">À propos</Link>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;























// import React, { useState } from 'react';
// import { Link } from '@inertiajs/react';
// import { Menu } from 'lucide-react';
// // import { Link } from 'react-router-dom';

// const Header = ({ auth }) => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [langDropdownOpen, setLangDropdownOpen] = useState(false);
//   const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
//   console.log('Header',auth);
  

//   return (
//     <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex-shrink-0 flex items-center">
//             <Link href="/" className="text-2xl font-bold tracking-tight">
//               KBKL
//             </Link>
//           </div>

//           <nav className="hidden md:flex space-x-8">
//             <Link href="/nouveautes" className="text-sm font-medium hover:text-[#ff3e00] transition-colors">Nouveautés</Link>
//             <Link href="/vetements" className="text-sm font-medium hover:text-[#ff3e00] transition-colors">Vêtements</Link>
//             <Link href="#" className="text-sm font-medium hover:text-[#ff3e00] transition-colors">Accessoires</Link>
//             <Link href="#" className="text-sm font-medium hover:text-[#ff3e00] transition-colors">Collections</Link>
//             <Link href="/apropos" className="text-sm font-medium hover:text-[#ff3e00] transition-colors">À propos</Link>
//           </nav>

//           <div className="flex items-center space-x-4">
//             <button type='button' name='search' title='search' className="p-2 rounded-full hover:bg-secondary" id="search-button">
//               {/* Icône de recherche */}
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </button>
            
//             {/* Sélecteur de langue */}
//             <div className="relative">
//               <button title='langue'
//                 className="p-2 rounded-full hover:bg-secondary flex items-center" 
//                 onClick={() => setLangDropdownOpen(!langDropdownOpen)}
//               >
//                 <span className="lang-flag flag-fr"></span>
//                 {/* Icône flèche */}
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>
              
//               {langDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-50">
//                   {/* Options de langue */}
//                   {/* <div class="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 hidden z-50" id="lang-dropdown"> */}
//                             <a href="#" class="block px-4 py-2 hover:bg-gray-100">
//                                 <span class="lang-flag flag-fr"></span> Français
//                             </a>
//                             <a href="#" class="block px-4 py-2 hover:bg-gray-100">
//                                 <span class="lang-flag flag-en"></span> English
//                             </a>
//                             <a href="#" class="block px-4 py-2 hover:bg-gray-100">
//                                 <span class="lang-flag flag-es"></span> Español
//                             </a>
//                         {/* </div> */}
//                 </div>
//               )}
//             </div>
            
//             <button title='panier' className="p-2 rounded-full hover:bg-secondary relative">
//               {/* Icône panier */}
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//               </svg>
//               <span className="absolute top-0 right-0 bg-[#ff3e00] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
//             </button>
            
//             {/* État de connexion */}
//             <div className="relative">
//               {auth.user ? (
//                 <div className="logged-in">
//                   <button title='user'
//                     className="flex items-center text-sm rounded-full focus:outline-none"
//                     onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
//                   >
//                     <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
//                       <span className="text-sm font-medium">{auth.user.initials}</span>
//                     </div>
//                   </button>
                  
//                   {profileDropdownOpen && (
//                     <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
//                       {/* Menu utilisateur */}
//                       <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
//                         <div>
//                           <p className="font-medium">{auth.user.name}</p>
//                           <p className="text-xs text-gray-500">{auth.user.email}</p>
//                         </div>
//                         <button title='user' className="text-gray-400 hover:text-primary" id="close-profile">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                           </svg>
//                         </button>
//                       </div>
//                       {/* <Link href="dashboard" className="block px-4 py-2 hover:bg-gray-100">Mon compte</Link> */}
//                       {auth.user.role === "admin" ? <Link href="adminDashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard (admin)</Link>
//                        : 
//                        <Link href="dashboard" className="block px-4 py-2 hover:bg-gray-100">Mon compte</Link>
//                       }
//                       <a href="#" className="block px-4 py-2 hover:bg-gray-100">Mes commandes</a>
//                       <a href="#" className="block px-4 py-2 hover:bg-gray-100">Mes favoris</a>
//                       <Link href="/logout" method='post' className="block px-4 py-2 hover:bg-gray-100 border-t border-gray-100 text-[#ff3e00]">Déconnexion</Link>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div className="logged-out">
//                   <div className="flex space-x-2">
//                     <Link href={route('login')} className="px-3 py-1 text-sm font-medium hover:text-[#ff3e00] transition-colors">Connexion</Link>
//                     <Link href='/register' className="px-3 py-1 text-sm font-medium bg-primary text-white rounded hover:bg-opacity-90 transition-colors">Inscription</Link>
//                   </div>
//                 </div>
//               )}
//             </div>
            
//             <button title='menu'
//               className="p-2 rounded-full hover:bg-secondary md:hidden" 
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {/* Icône menu mobile */}
//               <Menu/>
//             </button>
//           </div>
//         </div>
//       </div>
      
//       {/* Menu mobile */}
//       {mobileMenuOpen && (
//         <div className="md:hidden" id="mobile-menu">
//           {/* Contenu menu mobile */}
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;