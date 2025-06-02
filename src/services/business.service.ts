import { API_ENDPOINTS, getAuthHeader } from './api.config';
import { BusinessPromotion } from '@/types';

// Types for business creation
interface BusinessCreateData {
  businessName: string;
  description: string;
  logo: string;
  location: string;
  website?: string;
}

export const businessService = {
  // Get all businesses
  async getAllBusinesses(): Promise<BusinessPromotion[]> {
    const response = await fetch(API_ENDPOINTS.BUSINESSES.BASE);
    
    if (!response.ok) {
      throw new Error('Failed to fetch businesses');
    }
    
    const data = await response.json();
    return data.map((item: any) => ({ ...item, id: item._id || item.id }));
  },
  
  // Get business by ID
  async getBusinessById(id: string): Promise<BusinessPromotion> {
    const response = await fetch(API_ENDPOINTS.BUSINESSES.BY_ID(id));
    
    if (!response.ok) {
      throw new Error('Failed to fetch business');
    }
    
    const item = await response.json();
    return { ...item, id: item._id || item.id };
  },
  
  // Create a new business
  async createBusiness(businessData: BusinessCreateData): Promise<BusinessPromotion> {
    const response = await fetch(API_ENDPOINTS.BUSINESSES.BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(businessData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create business');
    }
    
    const item = await response.json();
    return { ...item, id: item._id || item.id };
  },
  
  // Update business status (admin only)
  async updateBusinessStatus(id: string, status: 'approved' | 'rejected'): Promise<BusinessPromotion> {
    const response = await fetch(API_ENDPOINTS.BUSINESSES.STATUS(id), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ status }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update business status');
    }
    
    return await response.json();
  },
};
