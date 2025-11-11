// The Artwork and CartItem interfaces are now deprecated.
// We will use the types provided by the @shopify/buy-react SDK.

// The Artwork type is re-added for the Admin page, which is not yet migrated to Shopify's product management.
export interface Artwork {
  id: number;
  title: string;
  artistStatement: string;
  dimensions: string;
  medium: string;
  price: number;
  availability: 'Available' | 'Sold Out' | 'On Hold';
  type: 'Original' | 'Print';
  primaryColor: string;
  theme: string;
  imageUrl: string;
  images: string[];
  discountPercentage?: number;
  discountedPrice?: number;
}

export interface Review {
  id: number;
  artworkId: number; // This will need to be mapped to a Shopify product ID or handle
  author: string;
  rating: number; // 1 to 5
  text: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}
