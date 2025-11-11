
import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { artworks, reviews } from '../constants';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import StarRating from './StarRating';
import { HeartIcon } from './IconComponents';

// Sub-component for the Review Form
const ReviewForm: React.FC<{
  onSubmit: (review: { rating: number; text: string }) => void;
}> = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a star rating.');
      return;
    }
    if (text.trim().length < 10) {
      setError('Your review must be at least 10 characters long.');
      return;
    }
    setError('');
    onSubmit({ rating, text });
    setRating(0);
    setText('');
    alert('Thank you! Your review has been submitted for moderation.');
  };

  return (
    <div className="bg-subtle-separator/30 p-8 rounded-lg">
      <h3 className="text-2xl font-serif font-bold mb-4">Write a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-bold block mb-2">Your Rating</label>
          <StarRating
            rating={rating}
            onRatingChange={setRating}
            readOnly={false}
            size="w-7 h-7"
          />
        </div>
        <div>
          <label htmlFor="reviewText" className="font-bold block mb-2">Your Review</label>
          <textarea
            id="reviewText"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            placeholder="Share your thoughts on this artwork..."
            className="w-full bg-subtle-separator p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-accent"
          />
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full py-3 bg-primary-accent text-primary-bg font-bold text-lg rounded-md hover:bg-yellow-400 transition-colors"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};


const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const artwork = artworks.find(art => art.id === Number(id));
  const [mainImage, setMainImage] = useState(artwork?.images[0] || artwork?.imageUrl || '');
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate auth

  const artworkReviews = useMemo(() => {
    if (!artwork) return [];
    return reviews.filter(
      r => r.artworkId === artwork.id && r.status === 'approved'
    ).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [artwork]);

  const { averageRating, reviewCount } = useMemo(() => {
    if (artworkReviews.length === 0) {
      return { averageRating: 0, reviewCount: 0 };
    }
    const totalRating = artworkReviews.reduce((acc, r) => acc + r.rating, 0);
    return {
      averageRating: totalRating / artworkReviews.length,
      reviewCount: artworkReviews.length,
    };
  }, [artworkReviews]);

  if (!artwork) {
    return <div className="text-center py-20">Artwork not found.</div>;
  }

  const isWishlisted = isInWishlist(artwork.id);

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(artwork.id);
    } else {
      addToWishlist(artwork);
    }
  };

  const handleAddToCart = () => {
    if(artwork.availability === 'Available'){
      addToCart(artwork);
    }
  }

  const handleReviewSubmit = (reviewData: { rating: number; text: string }) => {
    console.log('New review submitted for artwork ID', artwork.id, reviewData);
    // In a real app, you'd send this to a backend API.
    setIsLoggedIn(false); 
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="mb-4 border border-subtle-separator rounded-lg overflow-hidden">
            <img src={mainImage} alt={artwork.title} className="w-full h-auto object-contain max-h-[70vh]"/>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {artwork.images.map((img, index) => (
              <button 
                key={index}
                onClick={() => setMainImage(img)}
                className={`border-2 rounded-lg overflow-hidden transition-all ${mainImage === img ? 'border-primary-accent' : 'border-subtle-separator hover:border-gray-500'}`}
              >
                <img src={img} alt={`${artwork.title} thumbnail ${index + 1}`} className="w-full h-24 object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">{artwork.title}</h1>
          
          <div className="mb-6">
            {artwork.discountedPrice ? (
              <div className="flex items-baseline space-x-3">
                <p className="text-4xl font-bold text-secondary-accent">${artwork.discountedPrice.toFixed(2)}</p>
                <p className="text-2xl text-gray-500 line-through">${artwork.price.toFixed(2)}</p>
              </div>
            ) : (
              <p className="text-4xl font-bold">${artwork.price.toFixed(2)}</p>
            )}
          </div>

          <p className="text-gray-300 leading-relaxed mb-8">{artwork.artistStatement}</p>
          
          <div className="space-y-4 text-lg border-t border-b border-subtle-separator py-6 mb-8">
            <div className="flex justify-between"><span className="font-bold text-gray-400">Medium:</span> <span>{artwork.medium}</span></div>
            <div className="flex justify-between"><span className="font-bold text-gray-400">Dimensions:</span> <span>{artwork.dimensions}</span></div>
            <div className="flex justify-between"><span className="font-bold text-gray-400">Type:</span> <span>{artwork.type}</span></div>
            <div className="flex justify-between"><span className="font-bold text-gray-400">Status:</span> 
              <span className={`${
                artwork.availability === 'Available' ? 'text-green-400' : 'text-yellow-400'
              }`}>{artwork.availability}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleAddToCart}
              disabled={artwork.availability !== 'Available'}
              className="w-full py-4 bg-secondary-accent text-primary-bg font-bold text-xl rounded-md hover:bg-orange-700 transition-colors disabled:bg-gray-700 disabled:cursor-not-allowed"
            >
              {artwork.availability === 'Available' ? 'Add to Cart' : artwork.availability}
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
      
      {/* Reviews Section */}
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

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Review List */}
          <div className="md:col-span-3">
            {artworkReviews.length > 0 && (
              <ul className="space-y-8">
                {artworkReviews.map(review => (
                  <li key={review.id} className="border-b border-subtle-separator pb-8 last:border-b-0">
                    <div className="flex items-center mb-2">
                      <StarRating rating={review.rating} />
                      <p className="ml-3 font-bold">{review.author}</p>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Reviewed on {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p className="text-gray-300 leading-relaxed">{review.text}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Review Form / Login Prompt */}
          <div className="md:col-span-2">
            {isLoggedIn ? (
              <ReviewForm onSubmit={handleReviewSubmit} />
            ) : (
              <div className="sticky top-24 bg-subtle-separator/30 p-8 rounded-lg text-center">
                <h3 className="text-xl font-bold mb-2">Share your thoughts</h3>
                <p className="mb-4 text-gray-300">Let other customers know what you think of this artwork.</p>
                <button 
                  onClick={() => setIsLoggedIn(true)} 
                  className="bg-primary-accent text-primary-bg font-bold px-6 py-2 rounded-md hover:bg-yellow-400 transition-colors"
                >
                  Write a review
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;