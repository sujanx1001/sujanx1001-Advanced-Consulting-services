import { API_ENDPOINTS, getAuthHeader } from './api.config';
import { Campaign } from '@/types';

// Types for campaign creation and updating
interface CampaignCreateData {
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  goal: number;
  image: string;
  location: string;
}

export const campaignService = {
  // Get all campaigns
  async getAllCampaigns(): Promise<Campaign[]> {
    const response = await fetch(API_ENDPOINTS.CAMPAIGNS.BASE);
    
    if (!response.ok) {
      throw new Error('Failed to fetch campaigns');
    }
    
    const data = await response.json();
    return data.map((item: any) => ({ ...item, id: item._id || item.id }));
  },
  
  // Get campaign by ID
  async getCampaignById(id: string): Promise<Campaign> {
    const response = await fetch(API_ENDPOINTS.CAMPAIGNS.BY_ID(id));
    
    if (!response.ok) {
      throw new Error('Failed to fetch campaign');
    }
    
    const item = await response.json();
    return { ...item, id: item._id || item.id };
  },
  
  // Create a new campaign
  async createCampaign(campaignData: CampaignCreateData): Promise<Campaign> {
    const response = await fetch(API_ENDPOINTS.CAMPAIGNS.BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(campaignData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create campaign');
    }
    
    const item = await response.json();
    return { ...item, id: item._id || item.id };
  },
  
  // Update campaign status (admin only)
  async updateCampaignStatus(id: string, status: 'approved' | 'rejected'): Promise<Campaign> {
    const response = await fetch(API_ENDPOINTS.CAMPAIGNS.STATUS(id), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ status }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update campaign status');
    }
    
    return await response.json();
  },
  
  // Join a campaign
  async joinCampaign(id: string): Promise<any> {
    const response = await fetch(API_ENDPOINTS.CAMPAIGNS.JOIN(id), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to join campaign');
    }
    
    return await response.json();
  },
  
  // Share a campaign
  async shareCampaign(id: string, platform: string): Promise<any> {
    const response = await fetch(API_ENDPOINTS.CAMPAIGNS.SHARE(id), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ platform }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to share campaign');
    }
    
    return await response.json();
  },
};
