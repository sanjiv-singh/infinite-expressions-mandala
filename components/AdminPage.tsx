
import React, { useState } from 'react';
import type { Artwork } from '../types';
import AdminArtworkForm from './AdminArtworkForm';

const newArtworkTemplate: Omit<Artwork, 'id'> = {
    title: '',
    artistStatement: '',
    dimensions: '',
    medium: '',
    price: 0,
    availability: 'Available',
    type: 'Original',
    primaryColor: 'Blue',
    theme: 'Abstract',
    imageUrl: 'https://picsum.photos/seed/new/600/600',
    images: ['https://picsum.photos/seed/new/1200/1200'],
    discountPercentage: 0,
};

const AdminPage: React.FC = () => {
  // FIX: Initialize with an empty array as the mock data constant has been removed.
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [modalArtwork, setModalArtwork] = useState<Artwork | Omit<Artwork, 'id'> | null>(null);

  const handleAddNew = () => {
    setModalArtwork(newArtworkTemplate);
  };

  const handleEdit = (artwork: Artwork) => {
    setModalArtwork(artwork);
  };

  const handleSave = (artworkToSave: Artwork | Omit<Artwork, 'id'>) => {
    if ('id' in artworkToSave) {
        // Editing existing artwork
        setArtworks(artworks.map(art => art.id === artworkToSave.id ? artworkToSave : art));
    } else {
        // Adding new artwork
        const newArtworkWithId = { ...artworkToSave, id: Date.now() }; // In a real app, the backend would generate the ID
        setArtworks([newArtworkWithId, ...artworks]);
    }
    setModalArtwork(null);
  };
  
  const handleDelete = (artworkId: number) => {
    if (window.confirm('Are you sure you want to delete this artwork?')) {
        setArtworks(artworks.filter(art => art.id !== artworkId));
    }
  }

  const handleCancel = () => {
    setModalArtwork(null);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-serif font-bold">Admin Dashboard</h1>
        <button onClick={handleAddNew} className="bg-primary-accent text-primary-bg font-bold px-6 py-2 rounded-md hover:bg-yellow-400 transition-colors">
          Add New Artwork
        </button>
      </div>

      {modalArtwork && (
        <AdminArtworkForm 
          artwork={modalArtwork}
          onSave={handleSave} 
          onCancel={handleCancel}
        />
      )}

      <div className="bg-subtle-separator/20 rounded-lg overflow-x-auto">
        <table className="w-full min-w-[640px] text-left">
          <thead className="border-b border-subtle-separator">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Price</th>
              <th className="p-4">Discount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {artworks.map(artwork => (
              <tr key={artwork.id} className="border-b border-subtle-separator last:border-none hover:bg-subtle-separator/30">
                <td className="p-4 font-bold">{artwork.title}</td>
                <td className="p-4">
                  {artwork.discountedPrice ? (
                    <div className="flex flex-col">
                      <span className="font-bold text-secondary-accent">${artwork.discountedPrice.toFixed(2)}</span>
                      <span className="text-gray-500 line-through text-sm">${artwork.price.toFixed(2)}</span>
                    </div>
                  ) : `$${artwork.price.toFixed(2)}`}
                </td>
                <td className="p-4">{artwork.discountPercentage ? `${artwork.discountPercentage}%` : 'N/A'}</td>
                <td className="p-4">{artwork.availability}</td>
                <td className="p-4 space-x-4">
                  <button onClick={() => handleEdit(artwork)} className="text-primary-accent font-semibold hover:underline">Edit</button>
                  <button onClick={() => handleDelete(artwork.id)} className="text-red-500 font-semibold hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
