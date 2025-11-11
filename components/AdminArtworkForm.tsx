import React, { useState, useEffect, useCallback } from 'react';
import type { Artwork } from '../types';

interface AdminArtworkFormProps {
  artwork: Omit<Artwork, 'id'> | Artwork;
  onSave: (artwork: Omit<Artwork, 'id'> | Artwork) => void;
  onCancel: () => void;
}

const AdminArtworkForm: React.FC<AdminArtworkFormProps> = ({ artwork, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Artwork, 'id'> | Artwork>(artwork);
  const isEditing = 'id' in formData;

  const calculateDiscountedPrice = useCallback(() => {
    const price = Number(formData.price) || 0;
    const percentage = Number(formData.discountPercentage) || 0;
    if (price > 0 && percentage > 0 && percentage <= 100) {
      const discount = (price * percentage) / 100;
      return parseFloat((price - discount).toFixed(2));
    }
    // If percentage is 0 or invalid, there is no discounted price
    return undefined;
  }, [formData.price, formData.discountPercentage]);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      discountedPrice: calculateDiscountedPrice()
    }));
  }, [formData.price, formData.discountPercentage, calculateDiscountedPrice]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    let processedValue: string | number = value;
    if (type === 'number') {
        processedValue = value === '' ? '' : parseFloat(value);
        if (name === 'discountPercentage' && typeof processedValue === 'number' && (processedValue < 0 || processedValue > 100)) {
            return; // prevent update if out of range
        }
    }

    setFormData({ ...formData, [name]: processedValue });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price) {
        alert('Title and Price are required.');
        return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-primary-bg/90 backdrop-blur-sm z-50 flex justify-center items-start pt-12">
      <form onSubmit={handleSubmit} className="bg-subtle-separator/50 w-full max-w-2xl max-h-[90vh] p-8 rounded-lg shadow-2xl overflow-y-auto">
        <h2 className="text-3xl font-serif font-bold mb-6">{isEditing ? 'Edit Artwork' : 'Add New Artwork'}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Title</label>
            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className="w-full bg-primary-bg rounded-md border-gray-600 focus:ring-primary-accent focus:border-primary-accent" required/>
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">Base Price ($)</label>
            <input type="number" name="price" id="price" value={formData.price || ''} onChange={handleChange} step="0.01" min="0" className="w-full bg-primary-bg rounded-md border-gray-600 focus:ring-primary-accent focus:border-primary-accent" required/>
          </div>

          <div>
            <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-300 mb-1">Discount Percentage (%)</label>
            <input type="number" name="discountPercentage" id="discountPercentage" value={formData.discountPercentage || ''} onChange={handleChange} min="0" max="100" placeholder="e.g., 15" className="w-full bg-primary-bg rounded-md border-gray-600 focus:ring-primary-accent focus:border-primary-accent" />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="discountedPrice" className="block text-sm font-medium text-gray-300 mb-1">Discounted Price ($) - Calculated</label>
            <input type="number" name="discountedPrice" id="discountedPrice" value={formData.discountedPrice || ''} readOnly className="w-full bg-primary-bg/50 rounded-md border-gray-700 cursor-not-allowed text-gray-400" />
          </div>

          <div className="md:col-span-2">
             <label htmlFor="artistStatement" className="block text-sm font-medium text-gray-300 mb-1">Artist Statement</label>
             <textarea name="artistStatement" id="artistStatement" value={formData.artistStatement} onChange={handleChange} rows={4} className="w-full bg-primary-bg rounded-md border-gray-600 focus:ring-primary-accent focus:border-primary-accent"></textarea>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button type="button" onClick={onCancel} className="px-6 py-2 rounded-md border border-gray-500 hover:bg-gray-700 transition-colors">Cancel</button>
          <button type="submit" className="px-6 py-2 rounded-md bg-primary-accent text-primary-bg font-bold hover:bg-yellow-400 transition-colors">Save Artwork</button>
        </div>
      </form>
    </div>
  );
};

export default AdminArtworkForm;