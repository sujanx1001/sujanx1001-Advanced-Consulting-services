
import { API_ENDPOINTS, getAuthHeader } from './api.config';

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
  
  // Create new category (admin only)
  async createCategory(categoryData: { name: string, icon: string }): Promise<Category> {
    const response = await fetch(API_ENDPOINTS.CATEGORIES, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(categoryData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create category');
    }
    
    return await response.json();
  },
  
  // Update category (admin only)
  async updateCategory(id: string, categoryData: { name?: string, icon?: string }): Promise<Category> {
    const response = await fetch(`${API_ENDPOINTS.CATEGORIES}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(categoryData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update category');
    }
    
    return await response.json();
  },
  
  // Delete category (admin only)
  async deleteCategory(id: string): Promise<void> {
    const response = await fetch(`${API_ENDPOINTS.CATEGORIES}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete category');
    }
  },
};
