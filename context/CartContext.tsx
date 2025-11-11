import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import { useCart as useShopifyCart, useCartLinesAdd, useCartLinesRemove, useCartLinesUpdate } from '@shopify/buy-react';

// This type is a placeholder. You would typically get more specific types from the SDK.
type ShopifyProductVariant = {
  id: string;
};

interface CartContextType {
  cart: ReturnType<typeof useShopifyCart>;
  addToCart: (variant: ShopifyProductVariant, quantity?: number) => void;
  removeFromCart: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  getCartTotal: () => string;
  getItemCount: () => number;
  checkoutUrl: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cart = useShopifyCart();
  const addLines = useCartLinesAdd();
  const removeLines = useCartLinesRemove();
  const updateLines = useCartLinesUpdate();

  const addToCart = useCallback((variant: ShopifyProductVariant, quantity: number = 1) => {
    addLines([{ merchandiseId: variant.id, quantity }]);
  }, [addLines]);

  const removeFromCart = useCallback((lineId: string) => {
    removeLines([lineId]);
  }, [removeLines]);

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    if (quantity > 0) {
      updateLines([{ id: lineId, quantity }]);
    } else {
      removeFromCart(lineId);
    }
  }, [updateLines, removeFromCart]);

  const getCartTotal = () => {
    return cart?.cost?.totalAmount?.amount ?? '0.00';
  };

  const getItemCount = () => {
    return cart?.lines?.reduce((total, line) => total + line.quantity, 0) ?? 0;
  };
  
  const checkoutUrl = cart?.checkoutUrl ?? null;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getCartTotal, getItemCount, checkoutUrl }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider and ShopifyProvider');
  }
  return context;
};