
// Base API configuration for making requests to our backend

const API_BASE_URL = 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    ME: `${API_BASE_URL}/auth/me`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
  },
  // Campaign endpoints
  CAMPAIGNS: {
    BASE: `${API_BASE_URL}/campaigns`,
    BY_ID: (id: string) => `${API_BASE_URL}/campaigns/${id}`,
    STATUS: (id: string) => `${API_BASE_URL}/campaigns/${id}/status`,
    JOIN: (id: string) => `${API_BASE_URL}/campaigns/${id}/join`,
    SHARE: (id: string) => `${API_BASE_URL}/campaigns/${id}/share`,
  },
  // Business endpoints
  BUSINESSES: {
    BASE: `${API_BASE_URL}/businesses`,
    BY_ID: (id: string) => `${API_BASE_URL}/businesses/${id}`,
    STATUS: (id: string) => `${API_BASE_URL}/businesses/${id}/status`,
  },
  // Donation endpoints
  DONATIONS: {
    BASE: `${API_BASE_URL}/donations`,
    BY_CAMPAIGN: (campaignId: string) => `${API_BASE_URL}/donations/campaign/${campaignId}`,
  },
  // Category endpoints
  CATEGORIES: `${API_BASE_URL}/categories`,
};

export const getAuthHeader = (): { Authorization?: string } => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};
