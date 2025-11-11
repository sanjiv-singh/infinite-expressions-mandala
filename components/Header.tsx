
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import CartSidebar from './CartSidebar';
import { ShoppingBagIcon, MenuIcon, XIcon, HeartIcon } from './IconComponents';

const Header: React.FC = () => {
  const { getItemCount: getCartItemCount } = useCart();
  const { getWishlistItemCount } = useWishlist();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItemCount = getCartItemCount();
  const wishlistItemCount = getWishlistItemCount();

  const navLinkClasses = "hover:text-primary-accent transition-colors duration-300";
  const activeLinkClasses = "text-primary-accent";

  return (
    <>
      <header className="sticky top-0 z-40 bg-primary-bg/80 backdrop-blur-sm border-b border-subtle-separator">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <NavLink to="/" className="text-2xl font-serif font-bold tracking-wider text-primary-text">
              Mandala<span className="text-primary-accent">Art</span>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 text-lg">
              <NavLink to="/" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Home</NavLink>
              <NavLink to="/shop" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Gallery</NavLink>
              <a href="#" className={navLinkClasses}>About</a>
              <a href="#" className={navLinkClasses}>Contact</a>
              <NavLink to="/admin" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Admin</NavLink>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <NavLink to="/wishlist" className="relative text-primary-text hover:text-primary-accent transition-colors duration-300">
                <HeartIcon className="h-7 w-7" />
                {wishlistItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-primary-bg bg-secondary-accent rounded-full">
                    {wishlistItemCount}
                  </span>
                )}
              </NavLink>
              <button onClick={() => setIsCartOpen(true)} className="relative text-primary-text hover:text-primary-accent transition-colors duration-300">
                <ShoppingBagIcon className="h-7 w-7" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-primary-bg bg-secondary-accent rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-primary-text hover:text-primary-accent">
                {isMenuOpen ? <XIcon className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && (
           <div className="md:hidden bg-primary-bg border-t border-subtle-separator">
            <nav className="flex flex-col items-center space-y-4 py-4 text-lg">
                <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Home</NavLink>
                <NavLink to="/shop" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Gallery</NavLink>
                <a href="#" onClick={() => setIsMenuOpen(false)} className={navLinkClasses}>About</a>
                <a href="#" onClick={() => setIsMenuOpen(false)} className={navLinkClasses}>Contact</a>
                <NavLink to="/admin" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Admin</NavLink>
            </nav>
           </div>
        )}
      </header>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;