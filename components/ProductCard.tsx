import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { reviews } from '../constants';
import StarRating from './StarRating';
import { HeartIcon } from './IconComponents';
// FIX: The `Product` type is not exported from the main `@shopify/hydrogen-react` package.
// It should be imported from `@shopify/hydrogen-react/storefront-api-types`.
import type { Product } from '@shopify/hydrogen-react/storefront-api-types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Defensive coding: Ensure variant exists before trying to access its properties.
  const variant = product.variants?.nodes?.[0];
  if (!variant) {
    // Don't render the card if the product has no variants.
    return null;
  }
  
  // Wishlist and Review logic would need to be re-mapped to use product.handle or product.id
  const averageRating = 0; // Placeholder
  const reviewCount = 0; // Placeholder

  const price = variant.price;
  const compareAtPrice = variant.compareAtPrice;
  const imageUrl = product.images.nodes[0]?.url;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (variant.availableForSale) {
        addToCart(variant);
    }
  };

  const isWishlisted = isInWishlist(product.id);
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Link to={`/product/${product.handle}`} className="group flex flex-col bg-primary-bg border border-subtle-separator rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary-accent/10 hover:border-primary-accent/30">
      <div className="relative overflow-hidden">
        <img src={imageUrl} alt={product.title} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
        {!variant.availableForSale && (
           <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
             <span className="text-xl font-bold tracking-wider uppercase">Sold Out</span>
           </div>
        )}
         <button onClick={handleWishlistToggle} className="absolute top-3 right-3 p-2 bg-primary-bg/50 rounded-full hover:bg-primary-bg transition-colors duration-300">
            <HeartIcon className={`w-6 h-6 ${isWishlisted ? 'fill-secondary-accent text-secondary-accent' : 'text-primary-text'}`} />
        </button>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-serif font-bold truncate group-hover:text-primary-accent transition-colors">{product.title}</h3>
        <p className="text-sm text-gray-400">{product.productType}</p>
        
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
            {compareAtPrice ? (
              <div className="flex items-baseline space-x-2">
                <p className="text-xl font-bold text-secondary-accent">${price.amount}</p>
                <p className="text-md text-gray-500 line-through">${compareAtPrice.amount}</p>
              </div>
            ) : (
              <p className="text-xl font-bold">${price.amount}</p>
            )}
          </div>
          <button 
            onClick={handleAddToCart}
            disabled={!variant.availableForSale}
            className="px-4 py-2 bg-secondary-accent text-primary-bg font-bold rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 disabled:bg-gray-600 disabled:cursor-not-allowed">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
