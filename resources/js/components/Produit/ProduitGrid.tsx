import React from 'react';
import { Link } from '@inertiajs/react';
import ProductCard from './ProduitCard';

const ProductGrid = ({ title, linkText, linkUrl, products }) => {
  return (
    <section className="bg-secondary py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          <Link href={linkUrl} className="text-sm font-medium hover:text-accent transition-colors">
            {linkText}
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;