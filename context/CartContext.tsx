import React, { createContext, useContext, ReactNode, useCallback } from 'react';
// FIX: The `useCartLines...` hooks are not exported. Cart mutations are handled by functions returned from the `useCart` hook.
import { useCart as useShopifyCart } from '@shopify/hydrogen-react';
import type { Cart } from '@shopify/hydrogen-react/storefront-api-types';


// This type is a placeholder. You would typically get more specific types from the SDK.
type ShopifyProductVariant = {
  id: string;
};

interface CartContextType {
  // FIX: The `cart` property should be of type `Cart | undefined` as it comes from `useCart().data`.
  cart: Cart | undefined;
  addToCart: (variant: ShopifyProductVariant, quantity?: number) => void;
  removeFromCart: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  getCartTotal: () => string;
  getItemCount: () => number;
  checkoutUrl: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // FIX: Destructure mutation functions and cart data from the `useShopifyCart` hook.
  const { data: cart, linesAdd, linesRemove, linesUpdate, checkoutUrl: shopifyCheckoutUrl } = useShopifyCart();

  const addToCart = useCallback((variant: ShopifyProductVariant, quantity: number = 1) => {
    // FIX: Use the `linesAdd` function from the `useCart` hook.
    if (linesAdd) {
      linesAdd([{ merchandiseId: variant.id, quantity }]);
    }
  }, [linesAdd]);

  const removeFromCart = useCallback((lineId: string) => {
    // FIX: Use the `linesRemove` function from the `useCart` hook.
    if (linesRemove) {
      linesRemove([lineId]);
    }
  }, [linesRemove]);

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    if (quantity > 0) {
      // FIX: Use the `linesUpdate` function from the `useCart` hook.
      if (linesUpdate) {
        linesUpdate([{ id: lineId, quantity }]);
      }
    } else {
      removeFromCart(lineId);
    }
  }, [linesUpdate, removeFromCart]);

  const getCartTotal = () => {
    return cart?.cost?.totalAmount?.amount ?? '0.00';
  };

  const getItemCount = () => {
    return cart?.lines?.reduce((total, line) => total + line.quantity, 0) ?? 0;
  };
  
  // FIX: The checkout URL is available directly from the `useCart` hook.
  const checkoutUrl = shopifyCheckoutUrl ?? null;

  return (
    // FIX: Pass the `cart` data object and correct checkoutUrl to the context.
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
