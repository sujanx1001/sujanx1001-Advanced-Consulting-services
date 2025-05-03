
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  goal: number;
  raised: number;
  category: string;
  image: string;
  location: string; // Added location field
  creator: {
    id: string;
    name: string;
    avatar?: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  participants: number;
  shares: number;
}

export interface BusinessPromotion {
  id: string;
  businessName: string;
  description: string;
  logo: string;
  website?: string;
  location: string; // Added location field
  owner: {
    id: string;
    name: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

export interface Donation {
  id: string;
  campaignId: string;
  userId: string;
  amount: number;
  createdAt: string;
  displayName: string;
  message?: string;
}
