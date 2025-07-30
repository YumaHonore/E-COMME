import React from 'react';
import Layout from '@/Components/Layout/Layout';
import HeroSection from '../components/Sections/HeroSection';
import FeaturedProducts from '@/components/Sections/FeaturedProduct'
import ExploreByCategory from '@/components/Sections/ExploreByCategory'
import ValuesSection from '@/Components/Sections/ValuesSection';
import CustomSlider from './CustomSlider';

const Home = ({ featuredProducts, auth, categories }) => {
  console.log('Home',auth);
  return (
    <Layout title="Accueil" auth={auth} categories={categories}>
      {/* <Header auth={auth} categories={categories} /> */}
      <CustomSlider featuredProducts={featuredProducts}/>
      {/* <HeroSection featuredProducts={featuredProducts}/> */}
      
      {/* Section Catégories (à créer) */}
      
      <ExploreByCategory categories={categories}/>
      <FeaturedProducts products={featuredProducts} />
      
      {/* Section Bannière promotionnelle (à créer) */}
      
      <ValuesSection />
      
      {/* Autres sections */}
    </Layout>
  );
};

export default Home;