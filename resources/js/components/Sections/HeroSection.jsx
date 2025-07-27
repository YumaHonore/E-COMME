import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { motion } from 'framer-motion';
import LinkButton from '../ui/LinkButton';

const HeroSection = ({ featuredProducts }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <section className="relative w-full h-[90vh]">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        onSlideChange={handleSlideChange}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet bg-white opacity-50',
          bulletActiveClass: 'swiper-pagination-bullet-active !opacity-100'
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-full"
      >
        {featuredProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="relative w-full h-full">
              <img
                src={product.image}
                alt={product.nom}
                className="w-full h-full object-cover absolute inset-0"
                onError={(e) => {
                  console.error("Image failed to load:", product.image);
                  e.target.style.display = 'none'; // Masquer l'image si elle ne charge pas
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50" />
              <div className="relative z-10 h-full flex items-center container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-2xl text-white"
                >
                  <h1 className="text-3xl md:text-6xl font-bold mb-6">
                    {product.nom}
                  </h1>
                  <p className="text-lg md:text-xl mb-8">
                    {product.description?.slice(0, 120)}...
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <LinkButton
                      href={`/checkout?product=${product.id}`}
                      variant="primary"
                    >
                      Acheter maintenant
                    </LinkButton>
                    <LinkButton
                      href={`/produits/${product.id}`}
                      variant="secondary"
                    >
                      Voir le produit
                    </LinkButton>
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-next !text-white after:!text-xl"></div>
        <div className="swiper-button-prev !text-white after:!text-xl"></div>
      </Swiper>
    </section>
  );
};

export default HeroSection;

















// // HeroSliderSection.jsx
// import React, { useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import { motion } from 'framer-motion';
// import LinkButton from '../ui/LinkButton';

// const HeroSection = ({ featuredProducts }) => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const handleSlideChange = (swiper) => {
//     setActiveIndex(swiper.activeIndex);
//   };

//   return (
//     <section className="relative w-full h-[90vh]">
//       <Swiper
//         spaceBetween={0}
//         slidesPerView={1}
//         loop={true}
//         onSlideChange={handleSlideChange}
//         autoplay={{ delay: 5000, disableOnInteraction: false }}
//         pagination={{ 
//           clickable: true,
//           bulletClass: 'swiper-pagination-bullet bg-white opacity-50',
//           bulletActiveClass: 'swiper-pagination-bullet-active !opacity-100'
//         }}
//         navigation={{
//           nextEl: '.swiper-button-next',
//           prevEl: '.swiper-button-prev',
//         }}
//         modules={[Autoplay, Pagination, Navigation]}
//         className="w-full h-full"
//       >
//         {featuredProducts.map((product) => (
//           <SwiperSlide key={product.id}>
//             <div className="relative w-full h-full">
//               {/* Image avec z-index explicite */}
//               <img
//                 src={product.image}
//                 alt={product.nom}
//                 className="w-full h-full object-cover absolute inset-0 z-0"
//               />
              
//               {/* Overlay avec z-index intermédiaire */}
//               <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
              
//               {/* Contenu avec z-index supérieur */}
//               <div className="relative z-20 h-full flex items-center container mx-auto px-4 sm:px-6 lg:px-8">
//                 <motion.div
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.8 }}
//                   className="max-w-2xl text-white"
//                 >
//                   <h1 className="text-3xl md:text-6xl font-bold mb-6">
//                     {product.nom}
//                   </h1>
//                   <p className="text-lg md:text-xl mb-8">
//                     {product.description?.slice(0, 120)}...
//                   </p>
//                   <div className="flex flex-col sm:flex-row gap-4">
//                     <LinkButton
//                       href={`/checkout?product=${product.id}`}
//                       variant="primary"
//                     >
//                       Acheter maintenant
//                     </LinkButton>
//                     <LinkButton
//                       href={`/produits/${product.id}`}
//                       variant="secondary"
//                     >
//                       Voir le produit
//                     </LinkButton>
//                   </div>
//                 </motion.div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
        
//         {/* Navigation personnalisée */}
//         <div className="swiper-button-next !text-white after:!text-xl"></div>
//         <div className="swiper-button-prev !text-white after:!text-xl"></div>
//       </Swiper>
//     </section>
//   );
// };

// export default HeroSection;











// // HeroSliderSection.jsx
// import React, { useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import { motion } from 'framer-motion';
// import LinkButton from '../ui/LinkButton';

// const HeroSection = ({ featuredProducts }) => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const handleSlideChange = (swiper) => {
//     setActiveIndex(swiper.activeIndex);
//   };

//   const currentProduct = featuredProducts[activeIndex] || null;

//   return (
//     <section className="relative w-full h-[90vh]">
//       <Swiper
//         spaceBetween={0}
//         slidesPerView={1}
//         loop={true}
//         onSlideChange={handleSlideChange}
//         autoplay={{ delay: 5000 }}
//         pagination={{ clickable: true }}
//         navigation
//         modules={[Autoplay, Pagination, Navigation]}
//         className="w-full h-full"
//       >
//         {featuredProducts.map((product, index) => (
//           <SwiperSlide key={product.id}>
//             <div className="relative w-full h-full">
//               <img
//                 src={product.image}
//                 alt={product.nom}
//                 className="w-full h-full object-cover absolute inset-0"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
//               <div className="relative z-20 h-full flex items-center container mx-auto px-4 sm:px-6 lg:px-8">
//                 <motion.div
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.8 }}
//                   className="max-w-2xl text-white"
//                 >
//                   <h1 className="text-3xl md:text-6xl font-bold mb-6">
//                     {product.nom}
//                   </h1>
//                   <p className="text-lg md:text-xl mb-8">
//                     {product.description?.slice(0, 120)}...
//                   </p>
//                   <div className="flex flex-col sm:flex-row gap-4">
//                     <LinkButton
//                       href={`/checkout?product=${product.id}`}
//                       variant="primary"
//                     >
//                       Acheter maintenant
//                     </LinkButton>
//                     <LinkButton
//                       href={`/produits/${product.id}`}
//                       variant="secondary"
//                     >
//                       Voir le produit
//                     </LinkButton>
//                   </div>
//                 </motion.div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </section>
//   );
// };

// export default HeroSection;




















// // HeroSliderSection.jsx
// import React, { useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import { motion } from 'framer-motion';
// import LinkButton from '../ui/LinkButton';

// const HeroSection = ({ featuredProducts }) => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const handleSlideChange = (swiper) => {
//     setActiveIndex(swiper.activeIndex);
//   };

//   const currentProduct = featuredProducts[activeIndex] || null;

//   return (
//     <section className="relative w-full h-[90vh]">
//       <Swiper
//         spaceBetween={0}
//         slidesPerView={1}
//         loop={true}
//         onSlideChange={handleSlideChange}
//         autoplay={{ delay: 15000 }}
//         pagination={{ clickable: true }}
//         navigation
//         modules={[Autoplay, Pagination, Navigation]}
//         className="w-full h-full"
//       >
//         {featuredProducts.map((product, index) => (
//           <SwiperSlide key={product.id}>
//             <div
//               className="relative w-full h-full bg-cover bg-center"
//               style={{ backgroundImage: `url(${product.image})` }}
//             >
//               <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
//               <div className="relative z-20 h-full flex items-center container mx-auto px-4 sm:px-6 lg:px-8">
//                 <motion.div
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.8 }}
//                   className="max-w-2xl text-white"
//                 >
//                   <h1 className="text-3xl md:text-6xl font-bold mb-6">
//                     {product.nom}
//                   </h1>
//                   <p className="text-lg md:text-xl mb-8">
//                     {product.description?.slice(0, 120)}...
//                   </p>
//                   <div className="flex flex-col sm:flex-row gap-4">
//                     <LinkButton
//                       href={`/checkout?product=${product.id}`}
//                       variant="primary"
//                     >
//                       Acheter maintenant
//                     </LinkButton>
//                     <LinkButton
//                       href={`/produits/${product.id}`}
//                       variant="secondary"
//                     >
//                       Voir le produit
//                     </LinkButton>
//                   </div>
//                 </motion.div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </section>
//   );
// };

// export default HeroSection;













// import React from 'react';
// import { motion } from 'framer-motion';
// import LinkButton from '../ui/LinkButton';

// const HeroSection = () => {
//   return (
//     <section
//       className="relative bg-secondary bg-cover bg-center"
//       style={{ backgroundImage: 'url("/images/automne2023.jpg")' }} // 🔁 Remplace par ton image
//       role="banner"
//       aria-label="Nouvelle collection Automne 2023"
//     >
//       {/* Overlay sombre pour lisibilité */}
//       <div className="absolute inset-0 bg-black bg-opacity-50" />

//       {/* Contenu */}
//       <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-white">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="max-w-2xl"
//         >
//           <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
//             Collection Automne 2023
//           </h1>
//           <p className="text-lg md:text-xl mb-8">
//             Découvrez notre nouvelle collection minimaliste avec des pièces audacieuses et intemporelles.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4">
//             {/* Acheteur pressé ? Redirection directe vers un produit en vedette */}
//             <LinkButton
//               href="/checkout?product=vedette" // 🔁 ou un vrai produit ID
//               variant="primary"
//               aria-label="Acheter immédiatement le produit vedette"
//             >
//               Acheter maintenant
//             </LinkButton>

//             {/* Explorateur ? Parcourt la collection */}
//             <LinkButton
//               href="/collection"
//               variant="secondary"
//               aria-label="Voir la collection complète"
//             >
//               Voir la collection
//             </LinkButton>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;







// import React from 'react';
// import LinkButton from '../ui/LinkButton';

// const HeroSection = () => {
//   return (
//     <section className="relative bg-secondary">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
//         <div className="max-w-2xl">
//           <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Collection Automne 2023</h1>
//           <p className="text-lg md:text-xl mb-8">
//             Découvrez notre nouvelle collection minimaliste avec des pièces audacieuses et intemporelles.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4">
//             <LinkButton href="/produits" variant="primary">
//               Acheter maintenant
//             </LinkButton>
//             <LinkButton href="/collection" variant="secondary">
//               Voir la collection
//             </LinkButton>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;