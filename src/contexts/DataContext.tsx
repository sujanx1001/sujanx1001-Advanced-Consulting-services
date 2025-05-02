
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Campaign, BusinessPromotion, Category, Donation } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from './AuthContext';

interface DataContextType {
  campaigns: Campaign[];
  businessPromotions: BusinessPromotion[];
  categories: Category[];
  donations: Donation[];
  isLoading: boolean;
  
  // Campaign actions
  createCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt' | 'participants' | 'shares' | 'status'>) => Promise<void>;
  approveCampaign: (id: string) => Promise<void>;
  rejectCampaign: (id: string) => Promise<void>;
  joinCampaign: (id: string) => Promise<void>;
  shareCampaign: (id: string) => Promise<void>;
  
  // Business promotion actions
  createBusinessPromotion: (promotion: Omit<BusinessPromotion, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  approveBusinessPromotion: (id: string) => Promise<void>;
  rejectBusinessPromotion: (id: string) => Promise<void>;

  // Donation actions
  makeDonation: (donation: Omit<Donation, 'id' | 'createdAt'>) => Promise<void>;
}

const DataContext = createContext<DataContextType>({
  campaigns: [],
  businessPromotions: [],
  categories: [],
  donations: [],
  isLoading: true,
  
  createCampaign: async () => {},
  approveCampaign: async () => {},
  rejectCampaign: async () => {},
  joinCampaign: async () => {},
  shareCampaign: async () => {},
  
  createBusinessPromotion: async () => {},
  approveBusinessPromotion: async () => {},
  rejectBusinessPromotion: async () => {},

  makeDonation: async () => {},
});

export const useData = () => useContext(DataContext);

// Mock data for demonstration
const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Environment', slug: 'environment', icon: 'leaf' },
  { id: '2', name: 'Education', slug: 'education', icon: 'book-open' },
  { id: '3', name: 'Health', slug: 'health', icon: 'heart' },
  { id: '4', name: 'Poverty', slug: 'poverty', icon: 'home' },
  { id: '5', name: 'Equality', slug: 'equality', icon: 'users' },
  { id: '6', name: 'Animals', slug: 'animals', icon: 'paw' },
];

const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: '1',
    title: 'Clean Ocean Initiative',
    description: 'Our mission is to clean up ocean plastic and protect marine life. We organize beach cleanups, educate communities, and advocate for reduced single-use plastics. Join us in making our oceans cleaner and safer for all creatures. Your support helps fund cleanup equipment, educational materials, and awareness campaigns.',
    shortDescription: 'Help us clean up ocean plastic and protect marine life',
    goal: 10000,
    raised: 6500,
    category: 'Environment',
    image: '/placeholder.svg',
    creator: {
      id: '2',
      name: 'Regular User',
      avatar: '/placeholder.svg',
    },
    status: 'approved',
    createdAt: '2023-12-01T00:00:00.000Z',
    participants: 120,
    shares: 45,
  },
  {
    id: '2',
    title: 'Education for All',
    description: 'We believe every child deserves quality education. This campaign supports providing educational resources, building schools in underserved areas, and training teachers to deliver effective education. Your donations will help us purchase books, computers, and other essential supplies for schools in need.',
    shortDescription: 'Support access to quality education in underserved communities',
    goal: 15000,
    raised: 8200,
    category: 'Education',
    image: '/placeholder.svg',
    creator: {
      id: '2',
      name: 'Regular User',
      avatar: '/placeholder.svg',
    },
    status: 'approved',
    createdAt: '2023-11-15T00:00:00.000Z',
    participants: 85,
    shares: 32,
  },
  {
    id: '3',
    title: 'Mental Health Awareness',
    description: 'Breaking the stigma around mental health is our goal. We organize workshops, support groups, and public awareness campaigns. Mental health is as important as physical health, and everyone deserves access to proper care and support. Your contributions fund counseling services and community outreach programs.',
    shortDescription: 'Breaking the stigma around mental health issues',
    goal: 8000,
    raised: 3100,
    category: 'Health',
    image: '/placeholder.svg',
    creator: {
      id: '1',
      name: 'Admin User',
      avatar: '/placeholder.svg',
    },
    status: 'approved',
    createdAt: '2023-12-10T00:00:00.000Z',
    participants: 64,
    shares: 28,
  },
  {
    id: '4',
    title: 'Homeless Shelter Support',
    description: 'Help us provide shelter, food, and resources for homeless individuals in our community. Winter is particularly challenging, and your support can make a huge difference in someone's life. We aim to offer not just temporary relief but pathways to stable housing and employment.',
    shortDescription: 'Providing shelter and resources for homeless individuals',
    goal: 12000,
    raised: 2800,
    category: 'Poverty',
    image: '/placeholder.svg',
    creator: {
      id: '2',
      name: 'Regular User',
      avatar: '/placeholder.svg',
    },
    status: 'pending',
    createdAt: '2023-12-18T00:00:00.000Z',
    participants: 0,
    shares: 0,
  },
];

const MOCK_BUSINESS_PROMOTIONS: BusinessPromotion[] = [
  {
    id: '1',
    businessName: 'EcoFriendly Products',
    description: 'We create sustainable household products that reduce plastic waste and environmental impact. Our mission is to make eco-friendly living accessible and affordable for everyone.',
    logo: '/placeholder.svg',
    website: 'https://example.com/ecofriendly',
    owner: {
      id: '2',
      name: 'Regular User',
    },
    status: 'approved',
    createdAt: '2023-11-20T00:00:00.000Z',
  },
  {
    id: '2',
    businessName: 'Community Bookstore',
    description: 'A local independent bookstore that hosts literacy programs for children and supports local authors. We believe in the power of stories to connect communities and inspire change.',
    logo: '/placeholder.svg',
    website: 'https://example.com/communitybookstore',
    owner: {
      id: '2',
      name: 'Regular User',
    },
    status: 'approved',
    createdAt: '2023-12-05T00:00:00.000Z',
  },
  {
    id: '3',
    businessName: 'Fair Trade Coffee',
    description: 'We source ethically produced coffee directly from farmers, ensuring fair wages and sustainable farming practices. Every cup you enjoy supports a global network of responsible agriculture.',
    logo: '/placeholder.svg',
    owner: {
      id: '1',
      name: 'Admin User',
    },
    status: 'pending',
    createdAt: '2023-12-15T00:00:00.000Z',
  },
];

const MOCK_DONATIONS: Donation[] = [
  {
    id: '1',
    campaignId: '1',
    userId: '2',
    amount: 100,
    createdAt: '2023-12-01T12:00:00.000Z',
    displayName: 'Regular User',
    message: 'Keep up the great work!',
  },
  {
    id: '2',
    campaignId: '1',
    userId: '1',
    amount: 250,
    createdAt: '2023-12-02T14:30:00.000Z',
    displayName: 'Admin User',
    message: 'Proud to support this cause',
  },
  {
    id: '3',
    campaignId: '2',
    userId: '2',
    amount: 75,
    createdAt: '2023-12-05T09:15:00.000Z',
    displayName: 'Regular User',
  },
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [businessPromotions, setBusinessPromotions] = useState<BusinessPromotion[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  // Load initial data
  useEffect(() => {
    // Simulate API call delay
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setCampaigns(MOCK_CAMPAIGNS);
      setBusinessPromotions(MOCK_BUSINESS_PROMOTIONS);
      setCategories(MOCK_CATEGORIES);
      setDonations(MOCK_DONATIONS);
      
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  // Campaign actions
  const createCampaign = async (campaignData: Omit<Campaign, 'id' | 'createdAt' | 'participants' | 'shares' | 'status'>) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to create a campaign",
        variant: "destructive",
      });
      throw new Error("User not authenticated");
    }

    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newCampaign: Campaign = {
      ...campaignData,
      id: `${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      participants: 0,
      shares: 0,
    };
    
    setCampaigns(prev => [...prev, newCampaign]);
    
    toast({
      title: "Campaign created",
      description: "Your campaign has been submitted for approval",
    });
    
    setIsLoading(false);
  };

  const approveCampaign = async (id: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCampaigns(prev => 
      prev.map(campaign => 
        campaign.id === id ? { ...campaign, status: 'approved' } : campaign
      )
    );
    
    toast({
      title: "Campaign approved",
      description: "The campaign is now live",
    });
    
    setIsLoading(false);
  };

  const rejectCampaign = async (id: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCampaigns(prev => 
      prev.map(campaign => 
        campaign.id === id ? { ...campaign, status: 'rejected' } : campaign
      )
    );
    
    toast({
      title: "Campaign rejected",
      description: "The campaign has been rejected",
    });
    
    setIsLoading(false);
  };

  const joinCampaign = async (id: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to join this campaign",
        variant: "destructive",
      });
      throw new Error("User not authenticated");
    }

    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCampaigns(prev => 
      prev.map(campaign => 
        campaign.id === id ? { ...campaign, participants: campaign.participants + 1 } : campaign
      )
    );
    
    toast({
      title: "Joined campaign",
      description: "You have successfully joined this campaign",
    });
    
    setIsLoading(false);
  };

  const shareCampaign = async (id: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setCampaigns(prev => 
      prev.map(campaign => 
        campaign.id === id ? { ...campaign, shares: campaign.shares + 1 } : campaign
      )
    );
    
    // In a real implementation, we would open a share dialog here
    navigator.clipboard.writeText(`${window.location.origin}/campaigns/${id}`);
    
    toast({
      title: "Campaign shared",
      description: "Campaign link copied to clipboard",
    });
    
    setIsLoading(false);
  };

  // Business promotion actions
  const createBusinessPromotion = async (promotionData: Omit<BusinessPromotion, 'id' | 'createdAt' | 'status'>) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to create a business promotion",
        variant: "destructive",
      });
      throw new Error("User not authenticated");
    }

    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newPromotion: BusinessPromotion = {
      ...promotionData,
      id: `${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    setBusinessPromotions(prev => [...prev, newPromotion]);
    
    toast({
      title: "Promotion created",
      description: "Your business promotion has been submitted for approval",
    });
    
    setIsLoading(false);
  };

  const approveBusinessPromotion = async (id: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setBusinessPromotions(prev => 
      prev.map(promotion => 
        promotion.id === id ? { ...promotion, status: 'approved' } : promotion
      )
    );
    
    toast({
      title: "Promotion approved",
      description: "The business promotion is now live",
    });
    
    setIsLoading(false);
  };

  const rejectBusinessPromotion = async (id: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setBusinessPromotions(prev => 
      prev.map(promotion => 
        promotion.id === id ? { ...promotion, status: 'rejected' } : promotion
      )
    );
    
    toast({
      title: "Promotion rejected",
      description: "The business promotion has been rejected",
    });
    
    setIsLoading(false);
  };

  // Donation actions
  const makeDonation = async (donationData: Omit<Donation, 'id' | 'createdAt'>) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to make a donation",
        variant: "destructive",
      });
      throw new Error("User not authenticated");
    }

    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newDonation: Donation = {
      ...donationData,
      id: `${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    // Add the donation
    setDonations(prev => [...prev, newDonation]);
    
    // Update the campaign's raised amount
    setCampaigns(prev => 
      prev.map(campaign => 
        campaign.id === donationData.campaignId 
          ? { ...campaign, raised: campaign.raised + donationData.amount } 
          : campaign
      )
    );
    
    toast({
      title: "Donation successful",
      description: `Thank you for your donation of $${donationData.amount}`,
    });
    
    setIsLoading(false);
  };

  return (
    <DataContext.Provider value={{
      campaigns,
      businessPromotions,
      categories,
      donations,
      isLoading,
      
      createCampaign,
      approveCampaign,
      rejectCampaign,
      joinCampaign,
      shareCampaign,
      
      createBusinessPromotion,
      approveBusinessPromotion,
      rejectBusinessPromotion,

      makeDonation,
    }}>
      {children}
    </DataContext.Provider>
  );
};
