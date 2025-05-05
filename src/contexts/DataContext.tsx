import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Campaign, BusinessPromotion, Donation } from '@/types';

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
  donations: Donation[];
  isLoading: boolean;
  createCampaign: (campaignData: Partial<Campaign>) => Promise<void>;
  createBusinessPromotion: (businessData: Partial<BusinessPromotion>) => Promise<void>;
  updateCampaignStatus: (id: string, status: 'approved' | 'rejected') => Promise<void>;
  updateBusinessStatus: (id: string, status: 'approved' | 'rejected') => Promise<void>;
  makeDonation: (donationData: { campaignId: string, amount: number, displayName: string, userId?: string, message?: string }) => Promise<void>;
  joinCampaign: (campaignId: string) => Promise<void>;
  shareCampaign: (campaignId: string, platform?: string) => Promise<void>;
  approveCampaign: (campaignId: string) => Promise<void>;
  rejectCampaign: (campaignId: string) => Promise<void>;
  approveBusinessPromotion: (businessId: string) => Promise<void>;
  rejectBusinessPromotion: (businessId: string) => Promise<void>;
}

// Create the context with a default value
const DataContext = createContext<DataContextType>({
  campaigns: [],
  businessPromotions: [],
  categories: [],
  donations: [],
  isLoading: false,
  createCampaign: () => Promise.reject('createCampaign must be used within a Provider'),
  createBusinessPromotion: () => Promise.reject('createBusinessPromotion must be used within a Provider'),
  updateCampaignStatus: () => Promise.reject('updateCampaignStatus must be used within a Provider'),
  updateBusinessStatus: () => Promise.reject('updateBusinessStatus must be used within a Provider'),
  makeDonation: () => Promise.reject('makeDonation must be used within a Provider'),
  joinCampaign: () => Promise.reject('joinCampaign must be used within a Provider'),
  shareCampaign: () => Promise.reject('shareCampaign must be used within a Provider'),
  approveCampaign: () => Promise.reject('approveCampaign must be used within a Provider'),
  rejectCampaign: () => Promise.reject('rejectCampaign must be used within a Provider'),
  approveBusinessPromotion: () => Promise.reject('approveBusinessPromotion must be used within a Provider'),
  rejectBusinessPromotion: () => Promise.reject('rejectBusinessPromotion must be used within a Provider'),
});

// Create a custom hook to use the context
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [businessPromotions, setBusinessPromotions] = useState<BusinessPromotion[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
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
      
      // We'll fetch donations separately (just for active campaigns)
      const donationPromises = campaignsData
        .filter(campaign => campaign.status === 'approved')
        .map(campaign => donationService.getDonationsByCampaign(campaign.id));
      
      const donationsArrays = await Promise.all(donationPromises);
      const allDonations = donationsArrays.flat();
      setDonations(allDonations);
      
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

  // Short helper methods for campaign status updates
  const approveCampaign = async (campaignId: string): Promise<void> => {
    return updateCampaignStatus(campaignId, 'approved');
  };
  
  const rejectCampaign = async (campaignId: string): Promise<void> => {
    return updateCampaignStatus(campaignId, 'rejected');
  };
  
  // Short helper methods for business status updates
  const approveBusinessPromotion = async (businessId: string): Promise<void> => {
    return updateBusinessStatus(businessId, 'approved');
  };
  
  const rejectBusinessPromotion = async (businessId: string): Promise<void> => {
    return updateBusinessStatus(businessId, 'rejected');
  };

  // Join campaign function
  const joinCampaign = async (campaignId: string): Promise<void> => {
    try {
      const updatedCampaign = await campaignService.joinCampaign(campaignId);
      
      // Update campaign in state
      setCampaigns(prev => prev.map(campaign => 
        campaign.id === campaignId ? updatedCampaign : campaign
      ));
      
      toast({
        title: "Success",
        description: "You have successfully joined this campaign.",
      });
      
    } catch (error) {
      console.error('Error joining campaign:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to join campaign. Please try again.",
      });
      throw error;
    }
  };

  // Share campaign function
  const shareCampaign = async (campaignId: string, platform: string = 'generic'): Promise<void> => {
    try {
      const updatedCampaign = await campaignService.shareCampaign(campaignId, platform);
      
      // Update campaign in state
      setCampaigns(prev => prev.map(campaign => 
        campaign.id === campaignId ? updatedCampaign : campaign
      ));
      
      toast({
        title: "Shared",
        description: "Campaign shared successfully.",
      });
      
    } catch (error) {
      console.error('Error sharing campaign:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to share campaign. Please try again.",
      });
      throw error;
    }
  };

  // Make donation function
  const makeDonation = async (donationData: { campaignId: string, amount: number, displayName: string, userId?: string, message?: string }): Promise<void> => {
    try {
      const result = await donationService.makeDonation({
        campaignId: donationData.campaignId,
        amount: donationData.amount,
        displayName: donationData.displayName,
        message: donationData.message
      });
      
      // Update donations state
      setDonations(prev => [result, ...prev]);
      
      // Update campaign raised amount in state
      setCampaigns(prev => prev.map(campaign => {
        if (campaign.id === donationData.campaignId) {
          return {
            ...campaign,
            raised: campaign.raised + donationData.amount
          };
        }
        return campaign;
      }));
      
      toast({
        title: "Donation successful",
        description: `Thank you for your donation of $${donationData.amount}`,
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
    donations,
    isLoading,
    createCampaign,
    createBusinessPromotion,
    updateCampaignStatus,
    updateBusinessStatus,
    makeDonation,
    joinCampaign,
    shareCampaign,
    approveCampaign,
    rejectCampaign,
    approveBusinessPromotion,
    rejectBusinessPromotion,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
