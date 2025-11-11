
import React from 'react';
import { useCart } from '../context/CartContext';
import { XIcon, PlusIcon, MinusIcon } from './IconComponents';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, addToCart, getCartTotal } = useCart();

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-primary-bg shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b border-subtle-separator">
            <h2 className="text-2xl font-serif font-bold">Your Cart</h2>
            <button onClick={onClose} className="text-primary-text hover:text-primary-accent transition-colors">
              <XIcon className="w-6 h-6" />
            </button>
          </div>
          
          {cartItems.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
              <p className="text-lg">Your cart is empty.</p>
              <button onClick={onClose} className="mt-4 px-6 py-2 bg-primary-accent text-primary-bg font-bold rounded-md hover:bg-yellow-400 transition-colors">
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="flex-grow overflow-y-auto p-6">
                <ul className="space-y-4">
                  {cartItems.map(item => (
                    <li key={item.artwork.id} className="flex items-center space-x-4">
                      <img src={item.artwork.imageUrl} alt={item.artwork.title} className="w-20 h-20 object-cover rounded-md" />
                      <div className="flex-grow">
                        <h3 className="font-bold">{item.artwork.title}</h3>
                        <p className="text-sm text-gray-400">${item.artwork.discountedPrice ?? item.artwork.price}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <button onClick={() => removeFromCart(item.artwork.id)} className="p-1 border border-subtle-separator rounded-full hover:bg-subtle-separator">
                            <MinusIcon />
                          </button>
                          <span>{item.quantity}</span>
                           <button onClick={() => addToCart(item.artwork)} className="p-1 border border-subtle-separator rounded-full hover:bg-subtle-separator">
                            <PlusIcon />
                          </button>
                        </div>
                      </div>
                      <p className="font-bold">${((item.artwork.discountedPrice ?? item.artwork.price) * item.quantity).toFixed(2)}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 border-t border-subtle-separator">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg">Subtotal</span>
                  <span className="text-xl font-bold">${getCartTotal().toFixed(2)}</span>
                </div>
                <button className="w-full py-3 bg-secondary-accent text-primary-bg font-bold text-lg rounded-md hover:bg-orange-700 transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
