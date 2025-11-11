
import React from 'react';
import { Link } from 'react-router-dom';
import { artworks } from '../constants';
import ProductCard from './ProductCard';

const HomePage: React.FC = () => {
  const featuredArtworks = artworks.slice(0, 3);

  return (
    <div className="bg-primary-bg text-primary-text">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <img src="https://picsum.photos/seed/hero/1920/1080" alt="Hero background" className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative z-20 container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-extrabold mb-4 drop-shadow-lg">Art That Speaks to the Soul</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-md">Discover intricate, handcrafted Mandala art that brings harmony and balance to your space.</p>
          <Link to="/shop" className="inline-block bg-primary-accent text-primary-bg font-bold text-lg px-10 py-4 rounded-md shadow-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105">
            Explore The Gallery
          </Link>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-center mb-12">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArtworks.map(artwork => (
              <ProductCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        </div>
      </section>

      {/* Artist Statement Section */}
      <section className="bg-subtle-separator/20 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h2 className="text-4xl font-serif font-bold mb-6">From the Artist</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            Each dot is a meditation, a breath, a moment of focus. My art is a journey into the self, exploring the intricate patterns of the universe and our place within it. I invite you to find a piece that resonates with your own inner world.
          </p>
          <Link to="/about" className="text-primary-accent font-bold text-lg hover:underline">
            Learn More About My Process &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
