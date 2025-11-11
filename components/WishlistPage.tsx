
import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from './ProductCard';

const WishlistPage: React.FC = () => {
  const { wishlistItems } = useWishlist();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-serif font-bold">Your Wishlist</h1>
        <p className="text-lg mt-2 text-gray-400">
          {wishlistItems.length > 0
            ? 'Your collection of saved artworks.'
            : 'You haven’t saved any artworks yet.'}
        </p>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlistItems.map(artwork => (
            // FIX: The ProductCard component expects a `product` prop, not `artwork`.
            <ProductCard key={artwork.id} product={artwork} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
            <p className="text-xl mb-4">Browse the gallery to find art that speaks to you.</p>
            <Link to="/shop" className="inline-block bg-primary-accent text-primary-bg font-bold text-lg px-10 py-4 rounded-md shadow-lg hover:bg-yellow-400 transition-all duration-300">
                Explore The Gallery
            </Link>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
