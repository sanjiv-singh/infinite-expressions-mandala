import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { reviews } from '../constants';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import StarRating from './StarRating';
import { HeartIcon } from './IconComponents';
import { useProduct } from '@shopify/buy-react';


const ProductDetailPage: React.FC = () => {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, loading } = useProduct({ handle });

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [mainImage, setMainImage] = useState<string | undefined>(undefined);
  
  // Note: Review logic needs re-mapping to Shopify's product.id or product.handle
  const reviewCount = 0;
  const averageRating = 0;

  const variant = product?.variants?.nodes[0];
  const isWishlisted = product ? isInWishlist(product.id) : false;

  if (loading) {
    return <div className="text-center py-20">Loading product...</div>;
  }

  // Defensive check for product and variant
  if (!product || !variant) {
    return <div className="text-center py-20">Artwork not found or is unavailable.</div>;
  }
  
  const images = product.images.nodes;
  const currentImage = mainImage ?? images[0]?.url;

  const handleAddToCart = () => {
    if (variant.availableForSale) {
      addToCart(variant);
    }
  }
  
  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="mb-4 border border-subtle-separator rounded-lg overflow-hidden">
            <img src={currentImage} alt={product.title} className="w-full h-auto object-contain max-h-[70vh]"/>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {images.map((img, index) => (
              <button 
                key={img.id}
                onClick={() => setMainImage(img.url)}
                className={`border-2 rounded-lg overflow-hidden transition-all ${currentImage === img.url ? 'border-primary-accent' : 'border-subtle-separator hover:border-gray-500'}`}
              >
                <img src={img.url} alt={`${product.title} thumbnail ${index + 1}`} className="w-full h-24 object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">{product.title}</h1>
          
          <div className="mb-6">
            {variant.compareAtPrice ? (
              <div className="flex items-baseline space-x-3">
                <p className="text-4xl font-bold text-secondary-accent">${variant.price.amount}</p>
                <p className="text-2xl text-gray-500 line-through">${variant.compareAtPrice.amount}</p>
              </div>
            ) : (
              <p className="text-4xl font-bold">${variant.price.amount}</p>
            )}
          </div>

          <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} className="text-gray-300 leading-relaxed mb-8 prose prose-invert" />
          
          <div className="space-y-4 text-lg border-t border-b border-subtle-separator py-6 mb-8">
            <div className="flex justify-between"><span className="font-bold text-gray-400">Type:</span> <span>{product.productType}</span></div>
            <div className="flex justify-between"><span className="font-bold text-gray-400">Status:</span> 
              <span className={`${
                variant.availableForSale ? 'text-green-400' : 'text-yellow-400'
              }`}>{variant.availableForSale ? 'Available' : 'Sold Out'}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleAddToCart}
              disabled={!variant.availableForSale}
              className="w-full py-4 bg-secondary-accent text-primary-bg font-bold text-xl rounded-md hover:bg-orange-700 transition-colors disabled:bg-gray-700 disabled:cursor-not-allowed"
            >
              {variant.availableForSale ? 'Add to Cart' : 'Sold Out'}
            </button>
            <button
                onClick={handleWishlistToggle}
                className="flex items-center justify-center space-x-2 w-full py-4 border-2 border-primary-accent text-primary-accent font-bold text-xl rounded-md hover:bg-primary-accent hover:text-primary-bg transition-colors"
            >
                <HeartIcon className={`w-7 h-7 ${isWishlisted ? 'fill-current' : ''}`} />
                <span>{isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Reviews Section (This is now decoupled and can be enhanced later) */}
      <div className="mt-16 pt-12 border-t border-subtle-separator">
        <h2 className="text-3xl font-serif font-bold mb-2">Customer Reviews</h2>
        
        {reviewCount > 0 ? (
          <div className="flex items-center space-x-3 mb-8">
            <StarRating rating={averageRating} size="w-6 h-6" />
            <span className="text-lg font-bold">{averageRating.toFixed(1)} out of 5</span>
            <span className="text-gray-400">({reviewCount} customer ratings)</span>
          </div>
        ) : (
          <p className="text-gray-400 mb-8">No reviews yet. Be the first to share your thoughts!</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;