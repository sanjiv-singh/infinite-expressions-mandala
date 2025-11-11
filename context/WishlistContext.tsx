
import React, { createContext, useContext, useState, ReactNode } from 'react';
// import type { Artwork } from '../types';

// TODO: Update wishlist to use Shopify Product type
type Artwork = any;

interface WishlistContextType {
  wishlistItems: Artwork[];
  addToWishlist: (artwork: Artwork) => void;
  removeFromWishlist: (artworkId: number | string) => void;
  isInWishlist: (artworkId: number | string) => boolean;
  getWishlistItemCount: () => number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<Artwork[]>([]);

  const addToWishlist = (artwork: Artwork) => {
    setWishlistItems(prevItems => {
      if (!prevItems.find(item => item.id === artwork.id)) {
        return [...prevItems, artwork];
      }
      return prevItems;
    });
  };

  const removeFromWishlist = (artworkId: number | string) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== artworkId));
  };

  const isInWishlist = (artworkId: number | string) => {
    return wishlistItems.some(item => item.id === artworkId);
  };
  
  const getWishlistItemCount = () => {
    return wishlistItems.length;
  }

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, getWishlistItemCount }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};