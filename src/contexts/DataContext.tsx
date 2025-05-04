import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Campaign, BusinessPromotion } from '@/types';

// Import our services
import { campaignService } from '@/services/campaign.service';
import { businessService } from '@/services/business.service';
import { categoryService } from '@/services/category.service';
import { donationService } from '@/services/donation.service';
import { Category } from '@/services/category.service';

// Define the context type
interface DataContextType {
  campaigns: Campaign[];
  businessPromotions: BusinessPromotion[];
  categories: Category[];
  isLoading: boolean;
  createCampaign: (campaignData: Partial<Campaign>) => Promise<void>;
  createBusinessPromotion: (businessData: Partial<BusinessPromotion>) => Promise<void>;
  updateCampaignStatus: (id: string, status: 'approved' | 'rejected') => Promise<void>;
  updateBusinessStatus: (id: string, status: 'approved' | 'rejected') => Promise<void>;
  makeDonation: (campaignId: string, amount: number, displayName: string, message?: string) => Promise<void>;
}

// Create the context with a default value
const DataContext = createContext<DataContextType>({
  campaigns: [],
  businessPromotions: [],
  categories: [],
  isLoading: false,
  createCampaign: () => Promise.reject('createCampaign must be used within a Provider'),
  createBusinessPromotion: () => Promise.reject('createBusinessPromotion must be used within a Provider'),
  updateCampaignStatus: () => Promise.reject('updateCampaignStatus must be used within a Provider'),
  updateBusinessStatus: () => Promise.reject('updateBusinessStatus must be used within a Provider'),
  makeDonation: () => Promise.reject('makeDonation must be used within a Provider'),
});

// Create a custom hook to use the context
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [businessPromotions, setBusinessPromotions] = useState<BusinessPromotion[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Fetch all data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch all data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch campaigns, businesses, and categories in parallel
      const [campaignsData, businessesData, categoriesData] = await Promise.all([
        campaignService.getAllCampaigns(),
        businessService.getAllBusinesses(),
        categoryService.getAllCategories()
      ]);
      
      setCampaigns(campaignsData);
      setBusinessPromotions(businessesData);
      setCategories(categoriesData);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load data. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Create campaign function
  const createCampaign = async (campaignData: Partial<Campaign>): Promise<void> => {
    setIsLoading(true);
    try {
      const result = await campaignService.createCampaign({
        title: campaignData.title!,
        shortDescription: campaignData.shortDescription!,
        description: campaignData.description!,
        category: campaignData.category!,
        goal: campaignData.goal!,
        image: campaignData.image!,
        location: campaignData.location!,
      });
      
      // Add the new campaign to the state
      setCampaigns(prev => [result, ...prev]);
      
      toast({
        title: "Campaign created",
        description: "Your campaign has been submitted for approval",
      });
      
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create campaign. Please try again.",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Create business function
  const createBusinessPromotion = async (businessData: Partial<BusinessPromotion>): Promise<void> => {
    setIsLoading(true);
    try {
      const result = await businessService.createBusiness({
        businessName: businessData.businessName!,
        description: businessData.description!,
        logo: businessData.logo!,
        location: businessData.location!,
        website: businessData.website,
      });
      
      // Add the new business to the state
      setBusinessPromotions(prev => [result, ...prev]);
      
      toast({
        title: "Business submitted",
        description: "Your business promotion has been submitted for approval",
      });
      
    } catch (error) {
      console.error('Error creating business promotion:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create business promotion. Please try again.",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update campaign status (admin only)
  const updateCampaignStatus = async (id: string, status: 'approved' | 'rejected'): Promise<void> => {
    try {
      const updatedCampaign = await campaignService.updateCampaignStatus(id, status);
      
      // Update state
      setCampaigns(prev => prev.map(campaign => 
        campaign.id === id ? updatedCampaign : campaign
      ));
      
      toast({
        title: "Status updated",
        description: `Campaign has been ${status}`,
      });
      
    } catch (error) {
      console.error('Error updating campaign status:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update campaign status",
      });
      throw error;
    }
  };

  // Update business status (admin only)
  const updateBusinessStatus = async (id: string, status: 'approved' | 'rejected'): Promise<void> => {
    try {
      const updatedBusiness = await businessService.updateBusinessStatus(id, status);
      
      // Update state
      setBusinessPromotions(prev => prev.map(business => 
        business.id === id ? updatedBusiness : business
      ));
      
      toast({
        title: "Status updated",
        description: `Business has been ${status}`,
      });
      
    } catch (error) {
      console.error('Error updating business status:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update business status",
      });
      throw error;
    }
  };

  // Make donation function
  const makeDonation = async (campaignId: string, amount: number, displayName: string, message?: string): Promise<void> => {
    try {
      await donationService.makeDonation({
        campaignId,
        amount,
        displayName,
        message
      });
      
      // Update campaign raised amount in state
      setCampaigns(prev => prev.map(campaign => {
        if (campaign.id === campaignId) {
          return {
            ...campaign,
            raised: campaign.raised + amount
          };
        }
        return campaign;
      }));
      
      toast({
        title: "Donation successful",
        description: `Thank you for your donation of $${amount}`,
      });
      
    } catch (error) {
      console.error('Error making donation:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process donation. Please try again.",
      });
      throw error;
    }
  };

  const value: DataContextType = {
    campaigns,
    businessPromotions,
    categories,
    isLoading,
    createCampaign,
    createBusinessPromotion,
    updateCampaignStatus,
    updateBusinessStatus,
    makeDonation,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
