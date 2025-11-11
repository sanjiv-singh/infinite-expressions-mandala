
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { Artwork } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { reviews } from '../constants';
import StarRating from './StarRating';
import { HeartIcon } from './IconComponents';

interface ProductCardProps {
  artwork: Artwork;
}

const ProductCard: React.FC<ProductCardProps> = ({ artwork }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const { averageRating, reviewCount } = useMemo(() => {
    const relevantReviews = reviews.filter(
      r => r.artworkId === artwork.id && r.status === 'approved'
    );
    if (relevantReviews.length === 0) {
      return { averageRating: 0, reviewCount: 0 };
    }
    const totalRating = relevantReviews.reduce((acc, r) => acc + r.rating, 0);
    return {
      averageRating: totalRating / relevantReviews.length,
      reviewCount: relevantReviews.length,
    };
  }, [artwork.id]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if(artwork.availability === 'Available'){
        addToCart(artwork);
    }
  };

  const isWishlisted = isInWishlist(artwork.id);
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(artwork.id);
    } else {
      addToWishlist(artwork);
    }
  };

  return (
    <Link to={`/product/${artwork.id}`} className="group flex flex-col bg-primary-bg border border-subtle-separator rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary-accent/10 hover:border-primary-accent/30">
      <div className="relative overflow-hidden">
        <img src={artwork.imageUrl} alt={artwork.title} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
        {artwork.availability !== 'Available' && (
           <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
             <span className="text-xl font-bold tracking-wider uppercase">{artwork.availability}</span>
           </div>
        )}
         <button onClick={handleWishlistToggle} className="absolute top-3 right-3 p-2 bg-primary-bg/50 rounded-full hover:bg-primary-bg transition-colors duration-300">
            <HeartIcon className={`w-6 h-6 ${isWishlisted ? 'fill-secondary-accent text-secondary-accent' : 'text-primary-text'}`} />
        </button>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-serif font-bold truncate group-hover:text-primary-accent transition-colors">{artwork.title}</h3>
        <p className="text-sm text-gray-400">{artwork.type}</p>
        
        <div className="flex-grow mt-2">
          {reviewCount > 0 ? (
            <div className="flex items-center space-x-2">
              <StarRating rating={averageRating} />
              <span className="text-xs text-gray-400">({reviewCount} reviews)</span>
            </div>
          ) : (
            <div className="h-[20px]"></div> // Placeholder to prevent layout shift
          )}
        </div>

        <div className="flex justify-between items-center mt-2">
          <div>
            {artwork.discountedPrice ? (
              <div className="flex items-baseline space-x-2">
                <p className="text-xl font-bold text-secondary-accent">${artwork.discountedPrice.toFixed(2)}</p>
                <p className="text-md text-gray-500 line-through">${artwork.price.toFixed(2)}</p>
              </div>
            ) : (
              <p className="text-xl font-bold">${artwork.price.toFixed(2)}</p>
            )}
          </div>
          <button 
            onClick={handleAddToCart}
            disabled={artwork.availability !== 'Available'}
            className="px-4 py-2 bg-secondary-accent text-primary-bg font-bold rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 disabled:bg-gray-600 disabled:cursor-not-allowed">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;