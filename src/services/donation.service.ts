
import { API_ENDPOINTS, getAuthHeader } from './api.config';

// Types
interface DonationData {
  campaignId: string;
  amount: number;
  displayName: string;
  message?: string;
}

export const donationService = {
  // Get donations by campaign
  async getDonationsByCampaign(campaignId: string): Promise<any[]> {
    const response = await fetch(API_ENDPOINTS.DONATIONS.BY_CAMPAIGN(campaignId));
    
    if (!response.ok) {
      throw new Error('Failed to fetch donations');
    }
    
    return await response.json();
  },
  
  // Make a donation
  async makeDonation(donationData: DonationData): Promise<any> {
    const response = await fetch(API_ENDPOINTS.DONATIONS.BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(donationData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to make donation');
    }
    
    return await response.json();
  },
};
