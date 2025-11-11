
import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-bg border-t border-subtle-separator">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold tracking-wider mb-4">
              Mandala<span className="text-primary-accent">Art</span>
            </h3>
            <p className="text-gray-400 text-sm">Unique, handcrafted mandala art for the modern collector.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><NavLink to="/shop" className="hover:text-primary-accent">Gallery</NavLink></li>
              <li><a href="#" className="hover:text-primary-accent">About</a></li>
              <li><a href="#" className="hover:text-primary-accent">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Policies</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-primary-accent">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-primary-accent">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-accent">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe for updates on new art and exclusive offers.</p>
            <form className="flex">
              <input type="email" placeholder="Your email" className="w-full bg-subtle-separator px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-accent" />
              <button type="submit" className="bg-primary-accent text-primary-bg px-4 py-2 rounded-r-md font-bold hover:bg-yellow-400 transition-colors">Go</button>
            </form>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-subtle-separator text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} MandalaArt. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
