
import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Artwork } from '../types';

interface WishlistContextType {
  wishlistItems: Artwork[];
  addToWishlist: (artwork: Artwork) => void;
  removeFromWishlist: (artworkId: number) => void;
  isInWishlist: (artworkId: number) => boolean;
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

  const removeFromWishlist = (artworkId: number) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== artworkId));
  };

  const isInWishlist = (artworkId: number) => {
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