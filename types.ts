
export interface Artwork {
  id: number;
  title: string;
  artistStatement: string;
  dimensions: string;
  medium: string;
  price: number;
  discountedPrice?: number;
  discountPercentage?: number;
  availability: 'Available' | 'Sold' | 'Reserved';
  type: 'Original' | 'Print';
  primaryColor: string;
  theme: string;
  imageUrl: string;
  images: string[];
}

export interface CartItem {
  artwork: Artwork;
  quantity: number;
}

export interface Review {
  id: number;
  artworkId: number;
  author: string;
  rating: number; // 1 to 5
  text: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}