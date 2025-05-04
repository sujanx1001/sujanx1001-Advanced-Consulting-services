
import { API_ENDPOINTS } from './api.config';

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

export const categoryService = {
  // Get all categories
  async getAllCategories(): Promise<Category[]> {
    const response = await fetch(API_ENDPOINTS.CATEGORIES);
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    
    return await response.json();
  },
};
