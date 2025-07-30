import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const CustomSlider = ({ featuredProducts}) => {
  // Données des slides Hero
  const heroSlides = [
    {
      id: 1,
      title: "Nouvelle Collection Été",
      subtitle: "Découvrez nos articles tendance",
      description: "Jusqu'à -30% sur toute la collection",
      image: "https://via.placeholder.com/1920x800?text=Collection+Eté",
      buttonText: "Voir la collection",
      buttonLink: "/collection-ete",
      bgColor: "bg-gradient-to-r from-blue-500 to-teal-400"
    },
    {
      id: 2,
      title: "Soldes Exclusives",
      subtitle: "Économisez jusqu'à 50%",
      description: "Offre limitée - Ne manquez pas cette opportunité",
      image: "https://via.placeholder.com/1920x800?text=Soldes+Exclusives",
      buttonText: "Acheter maintenant",
      buttonLink: "/soldes",
      bgColor: "bg-gradient-to-r from-amber-500 to-pink-500"
    },
    {
      id: 3,
      title: "Livraison Gratuite",
      subtitle: "Sur toutes vos commandes",
      description: "Valable jusqu'au 30 juin",
      image: "https://via.placeholder.com/1920x800?text=Livraison+Gratuite",
      buttonText: "Profiter de l'offre",
      buttonLink: "/livraison-gratuite",
      bgColor: "bg-gradient-to-r from-purple-500 to-indigo-700"
    }
  ];

  return (
    <section className="relative h-screen max-h-[800px] w-full">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        speed={500}
        autoplay={{
          delay: 300,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          renderBullet: (index, className) => {
            return `<span class="${className} !w-3 !h-3 !mx-1 !bg-white !opacity-50 hover:!opacity-100 transition-opacity"></span>`;
          }
        }}
        loop={true}
        className="h-full w-full"
      >
        {featuredProducts.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className={`relative h-full w-full ${slide.bgColor}`}>
              {/* Image de fond */}
              <div className="absolute inset-0 overflow-hidden">
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover opacity-80"
                  loading="eager"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30"></div>
              
              {/* Contenu texte */}
              <div className="relative h-full flex items-center">
                <div className="container mx-auto px-6 lg:px-12 text-white">
                  <div className="max-w-2xl space-y-6">
                    <span className="inline-block px-3 py-1 text-sm font-medium bg-white/20 backdrop-blur-sm rounded-full">
                      {slide.subtitle}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                      {slide.nom}
                    </h1>
                    <p className="text-lg md:text-xl opacity-90">
                      {slide.description}
                    </p>
                    <div className="pt-4">
                      <a
                        href={slide.buttonLink}
                        className="inline-block px-8 py-3 text-lg font-medium bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
                      >
                        Acheter
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CustomSlider;















// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// const CustomSlider = ({featuredProducts}) => {
//   // Données des slides (remplacez par vos données réelles)
//   const slides = [
//     {
//       id: 1,
//       title: "T-Shirt Premium",
//       description: "T-shirt en coton bio avec design exclusif, disponible en plusieurs tailles.",
//       image: "https://via.placeholder.com/400x300?text=T-Shirt",
//       buttonText: "Voir le produit",
//       link: "/produit/1"
//     },
//     {
//       id: 2,
//       title: "Casque Audio",
//       description: "Casque sans fil avec réduction de bruit active et 30h d'autonomie.",
//       image: "https://via.placeholder.com/400x300?text=Casque",
//       buttonText: "Acheter maintenant",
//       link: "/produit/2"
//     },
//     {
//       id: 3,
//       title: "Montre Connectée",
//       description: "Suivi d'activité, notifications et étanche jusqu'à 50m.",
//       image: "https://via.placeholder.com/400x300?text=Montre",
//       buttonText: "Découvrir",
//       link: "/produit/3"
//     },
//     {
//       id: 4,
//       title: "Sac à Dos",
//       description: "15 pouces, compartiment anti-vol et résistant à l'eau.",
//       image: "https://via.placeholder.com/400x300?text=Sac",
//       buttonText: "Personnaliser",
//       link: "/produit/4"
//     },
//     {
//       id: 5,
//       title: "Chaussures Running",
//       description: "Semelle amortissante pour un confort optimal lors de vos runs.",
//       image: "https://via.placeholder.com/400x300?text=Chaussures",
//       buttonText: "Choisir sa taille",
//       link: "/produit/5"
//     }
//   ];

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-12">
//       <Swiper
//         modules={[Navigation, Pagination, Autoplay]}
//         spaceBetween={30}
//         slidesPerView={1}
//         navigation
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 5000, disableOnInteraction: false }}
//         breakpoints={{
//           640: { slidesPerView: 2 },
//           1024: { slidesPerView: 3 },
//           1280: { slidesPerView: 4 }
//         }}
//         className="mySwiper"
//       >
//         {featuredProducts.map((item) => (
//           <SwiperSlide key={item.id}>
//             <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
//               {/* Image */}
//               <div className="h-48 overflow-hidden">
//                 <img 
//                   src={item.image} 
//                   alt={item.title} 
//                   className="w-full h-full object-cover"
//                 />
//               </div>
              
//               {/* Contenu texte */}
//               <div className="p-6 flex-grow">
//                 <h3 className="text-xl font-bold mb-2">{item.title}</h3>
//                 <p className="text-gray-600 mb-4">{item.description}</p>
//               </div>
              
//               {/* Bouton */}
//               <div className="p-4 bg-gray-50">
//                 <a 
//                   href={item.link}
//                   className="block w-full py-2 px-4 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700 transition-colors"
//                 >
//                   {item.buttonText}
//                 </a>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default CustomSlider;