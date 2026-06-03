export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'burger' | 'pizza' | 'side' | 'drink';
  image: string;
  rating: number;
  reviewsCount: number;
  tags?: string[];
  spicy?: boolean;
  vegetarian?: boolean;
  options?: {
    sizes?: { name: string; priceAdjustment: number }[];
    sauces?: string[];
    extras?: { name: string; price: number }[];
  };
}

export interface CartItem {
  id: string; // unique ID for instances in cart, helps track same items with different customizations
  menuItem: MenuItem;
  quantity: number;
  selectedSize?: string;
  selectedSauce?: string;
  selectedExtras?: string[];
  addedPrice: number;
  notes?: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}
