import type { Review } from './types';

// The mock artworks array has been removed.
// Product data is now fetched live from the Shopify Storefront API.

export const reviews: Review[] = [
  {
    id: 1,
    artworkId: 1, // Corresponds to a product handle/ID in Shopify
    author: 'Jane D.',
    rating: 5,
    text: 'Absolutely stunning piece! The colors are even more vibrant in person. It has become the centerpiece of my living room.',
    date: '2023-10-15',
    status: 'approved',
  },
  {
    id: 2,
    artworkId: 1,
    author: 'Mark S.',
    rating: 4,
    text: 'Beautiful and intricate work. My only wish is that it was slightly larger. Still, very happy with the purchase.',
    date: '2023-11-01',
    status: 'approved',
  },
  {
    id: 3,
    artworkId: 2,
    author: 'Emily R.',
    rating: 5,
    text: 'The "Golden Sun" truly lights up the room. The detail is incredible. Worth every penny!',
    date: '2023-09-20',
    status: 'approved',
  },
  {
    id: 4,
    artworkId: 4,
    author: 'Chris T.',
    rating: 5,
    text: 'The print quality is fantastic. The colors are rich and the paper is high quality. Looks great framed.',
    date: '2023-12-05',
    status: 'approved',
  },
  {
    id: 5,
    artworkId: 1,
    author: 'Anonymous',
    rating: 3,
    text: 'It is okay.',
    date: '2023-12-10',
    status: 'pending',
  },
  {
    id: 6,
    artworkId: 5,
    author: 'Samantha B.',
    rating: 5,
    text: 'I feel like I can step right into this forest. It brings such a sense of peace to my study. I love it.',
    date: '2023-11-28',
    status: 'approved',
  },
];