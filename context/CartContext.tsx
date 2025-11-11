
import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { CartItem, Artwork } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (artwork: Artwork) => void;
  removeFromCart: (artworkId: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (artwork: Artwork) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.artwork.id === artwork.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.artwork.id === artwork.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { artwork, quantity: 1 }];
    });
  };

  const removeFromCart = (artworkId: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.artwork.id === artworkId);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map(item =>
          item.artwork.id === artworkId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prevItems.filter(item => item.artwork.id !== artworkId);
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.artwork.discountedPrice ?? item.artwork.price;
      return total + price * item.quantity;
    }, 0);
  };
  
  const getItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getCartTotal, getItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
