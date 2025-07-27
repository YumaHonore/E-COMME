import React from 'react';
import ProductGrid from '../Produit/ProduitGrid';

const FeaturedProducts = ({ products }) => {
  return (
    <ProductGrid 
      title="Produits phares"
      linkText="Voir tout →"
      linkUrl="/produits"
      products={products}
    />
  );
};

export default FeaturedProducts;