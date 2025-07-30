import React from 'react';
import { Link } from '@inertiajs/react';

const ExploreByCategory = ({categories}) => {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Explorer par catégorie</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        
          {categories.map(categories => (
            // <ProductCard key={product.id} product={product} />
            // <Link key={categories.id} method='get' href={route(`categorie.${categories.nom}`)} className="group">
            <Link key={categories.id} method='get'href={route('categorie.produits', { slug: categories.nom })}>
            <div className="aspect-square bg-secondary mb-4 overflow-hidden">
              <div className="h-full w-full">
                <img src={categories.image} alt="" srcset="" />
                {/* <div>{categories.image}</div> */}
              </div>
              </div>
            <h3 className="font-medium text-center group-hover:text-accent transition-colors">{categories.nom}</h3>
            </Link>
          ))}
        
        {/* <a href="#" className="group">
          <div className="aspect-square bg-secondary mb-4 overflow-hidden">
            <div className="h-full w-full bg-gray-300"></div>
          </div>
          <h3 className="font-medium text-center group-hover:text-accent transition-colors">Vêtements</h3>
        </a>
        <a href="#" className="group">
          <div className="aspect-square bg-secondary mb-4 overflow-hidden">
            <div className="h-full w-full bg-gray-300"></div>
          </div>
          <h3 className="font-medium text-center group-hover:text-accent transition-colors">Chaussures</h3>
        </a>
        <a href="#" className="group">
          <div className="aspect-square bg-secondary mb-4 overflow-hidden">
            <div className="h-full w-full bg-gray-300"></div>
          </div>
          <h3 className="font-medium text-center group-hover:text-accent transition-colors">Accessoires</h3>
        </a>
        <a href="#" className="group">
          <div className="aspect-square bg-secondary mb-4 overflow-hidden">
            <div className="h-full w-full bg-gray-300"></div>
          </div>
          <h3 className="font-medium text-center group-hover:text-accent transition-colors">Bestsellers</h3>
        </a> */}
      </div>
    </section>
  );
};

export default ExploreByCategory;
