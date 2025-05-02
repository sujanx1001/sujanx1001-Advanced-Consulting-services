
export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
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
  owner: {
    id: string;
    name: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
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

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}
