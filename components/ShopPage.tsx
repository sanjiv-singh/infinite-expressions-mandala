
import React, { useState } from 'react';
import { artworks } from '../constants';
import ProductCard from './ProductCard';
import FilterPanel from './FilterPanel';

const ShopPage: React.FC = () => {
  const [filteredArtworks, setFilteredArtworks] = useState(artworks);
  const [sortOption, setSortOption] = useState('newest');

  // This is a placeholder for filter logic. In a real app, this would be more complex.
  const handleFilterChange = (filters: any) => {
    // Basic filtering example
    let newArtworks = [...artworks];
    if (filters.type !== 'all') {
      newArtworks = newArtworks.filter(art => art.type === filters.type);
    }
    // More filters would go here...
    
    // Sorting logic
    newArtworks.sort((a, b) => {
      const priceA = a.discountedPrice ?? a.price;
      const priceB = b.discountedPrice ?? b.price;
      switch (sortOption) {
        case 'price-low-high':
          return priceA - priceB;
        case 'price-high-low':
          return priceB - priceA;
        case 'newest':
        default:
          return b.id - a.id;
      }
    });

    setFilteredArtworks(newArtworks);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    // Re-apply filters and sorting
    // This is simplified. Ideally, filter state would be managed more robustly.
    handleFilterChange({ type: 'all' }); 
  };
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-serif font-bold">Art Gallery</h1>
        <p className="text-lg mt-2 text-gray-400">Explore the full collection of original and printed artworks.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/4 xl:w-1/5">
          <FilterPanel onFilterChange={handleFilterChange} />
        </aside>
        <main className="w-full lg:w-3/4 xl:w-4/5">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-subtle-separator">
            <p className="text-gray-400">{filteredArtworks.length} artworks found</p>
            <div className="flex items-center space-x-2">
              <label htmlFor="sort" className="text-sm">Sort by:</label>
              <select 
                id="sort" 
                value={sortOption}
                onChange={handleSortChange}
                className="bg-subtle-separator border border-gray-600 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent"
              >
                <option value="newest">Newest</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredArtworks.map(artwork => (
              <ProductCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShopPage;
