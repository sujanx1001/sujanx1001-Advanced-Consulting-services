
import { Campaign, BusinessPromotion, Donation } from '@/types';
import { Category } from './category.service';

// Mock campaigns data
export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Clean Water Initiative',
    shortDescription: 'Providing clean water to rural communities',
    description: 'This campaign aims to build wells and water filtration systems in rural areas that lack access to clean drinking water.',
    image: '/placeholder.svg',
    goal: 10000,
    raised: 6500,
    daysLeft: 15,
    location: 'Global',
    status: 'approved',
    category: 'environment',
    createdBy: 'user123',
    supporters: 78,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Education For All',
    shortDescription: 'Supporting education in underprivileged areas',
    description: 'We provide educational materials, build schools, and train teachers in underprivileged communities.',
    image: '/placeholder.svg',
    goal: 25000,
    raised: 12000,
    daysLeft: 30,
    location: 'Multiple Countries',
    status: 'approved',
    category: 'education',
    createdBy: 'user456',
    supporters: 145,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// Mock businesses data
export const mockBusinesses: BusinessPromotion[] = [
  {
    id: '1',
    businessName: 'EcoFriendly Products Co.',
    description: 'We make sustainable products that reduce environmental impact.',
    logo: '/placeholder.svg',
    location: 'Portland, OR',
    website: 'https://example.com/eco',
    status: 'approved',
    createdBy: 'user789',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    businessName: 'Social Impact Consulting',
    description: 'We help businesses develop and implement socially responsible strategies.',
    logo: '/placeholder.svg',
    location: 'Chicago, IL',
    website: 'https://example.com/impact',
    status: 'approved',
    createdBy: 'user012',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// Mock categories data
export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Environment',
    slug: 'environment',
    icon: 'leaf'
  },
  {
    id: '2',
    name: 'Education',
    slug: 'education',
    icon: 'book'
  },
  {
    id: '3',
    name: 'Health',
    slug: 'health',
    icon: 'heart'
  },
  {
    id: '4',
    name: 'Poverty',
    slug: 'poverty',
    icon: 'home'
  }
];

// Mock donations data
export const mockDonations: Donation[] = [
  {
    id: '1',
    campaignId: '1',
    userId: 'user345',
    amount: 100,
    displayName: 'John Doe',
    message: 'Keep up the great work!',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    campaignId: '1',
    userId: 'user678',
    amount: 50,
    displayName: 'Jane Smith',
    createdAt: new Date().toISOString(),
  }
];
