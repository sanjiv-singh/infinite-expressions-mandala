import React, { useState } from 'react';
import ProductCard from './ProductCard';
import FilterPanel from './FilterPanel';
import { useProducts } from '@shopify/buy-react';

const ShopPage: React.FC = () => {
  const { data: products, loading } = useProducts();
  
  // Note: Filtering and sorting would now ideally be done via the Shopify API query.
  // This is a basic implementation that shows all products.
  const [sortOption, setSortOption] = useState('newest');

  const sortedProducts = products ? [...products].sort((a, b) => {
    const priceA = parseFloat(a.variants.nodes[0].price.amount);
    const priceB = parseFloat(b.variants.nodes[0].price.amount);
    switch (sortOption) {
      case 'price-low-high':
        return priceA - priceB;
      case 'price-high-low':
        return priceB - priceA;
      case 'newest':
      default:
        // This assumes the API returns them in a somewhat consistent order.
        // For true "newest", you'd sort by `createdAt`.
        return 0; 
    }
  }) : [];
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-serif font-bold">Art Gallery</h1>
        <p className="text-lg mt-2 text-gray-400">Explore the full collection of original and printed artworks.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/4 xl:w-1/5">
          <FilterPanel onFilterChange={() => {}} />
        </aside>
        <main className="w-full lg:w-3/4 xl:w-4/5">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-subtle-separator">
            <p className="text-gray-400">{loading ? 'Loading...' : `${sortedProducts.length} artworks found`}</p>
            <div className="flex items-center space-x-2">
              <label htmlFor="sort" className="text-sm">Sort by:</label>
              <select 
                id="sort" 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-subtle-separator border border-gray-600 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent"
              >
                <option value="newest">Newest</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>
          </div>
          {loading ? (
             <div className="text-center py-20">Loading artworks...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {sortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ShopPage;