
// API configuration

// Base API URL - use relative URL for production compatibility
const API_BASE_URL = '/api';

// Authentication header helper
export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    CURRENT_USER: `${API_BASE_URL}/auth/me`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
  },
  CAMPAIGNS: {
    BASE: `${API_BASE_URL}/campaigns`,
    BY_ID: (id: string) => `${API_BASE_URL}/campaigns/${id}`,
    JOIN: (id: string) => `${API_BASE_URL}/campaigns/${id}/join`,
    SHARE: (id: string) => `${API_BASE_URL}/campaigns/${id}/share`,
    STATUS: (id: string) => `${API_BASE_URL}/campaigns/${id}/status`,
  },
  BUSINESSES: {
    BASE: `${API_BASE_URL}/businesses`,
    BY_ID: (id: string) => `${API_BASE_URL}/businesses/${id}`,
    STATUS: (id: string) => `${API_BASE_URL}/businesses/${id}/status`,
  },
  DONATIONS: {
    BASE: `${API_BASE_URL}/donations`,
    BY_CAMPAIGN: (campaignId: string) => `${API_BASE_URL}/donations/campaign/${campaignId}`,
    BY_USER: (userId: string) => `${API_BASE_URL}/donations/user/${userId}`,
  },
  CATEGORIES: `${API_BASE_URL}/categories`,
};
