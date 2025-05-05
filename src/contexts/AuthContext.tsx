
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Add the auth service
import { authService } from '@/services/auth.service';

// Define the user type
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

// Define the auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Mock demo user for development
const demoUser: User = {
  id: 'demo123',
  name: 'Demo User',
  email: 'demo@example.com',
  role: 'user',
  avatar: '/placeholder.svg'
};

// Admin user for testing
const adminUser: User = {
  id: 'admin123',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin',
  avatar: '/placeholder.svg'
};

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the auth provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is logged in on component mount
  useEffect(() => {
    const checkLoggedIn = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        
        if (token) {
          // Get user data from the API using the token
          const userData = await authService.getCurrentUser();
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // If token is invalid, clear it
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Special handling for demo accounts
      if ((email === 'admin@example.com' && password === 'admin123') || 
          (email === 'user@example.com' && password === 'user123')) {
        
        const mockUser = email === 'admin@example.com' ? adminUser : demoUser;
        const mockToken = 'demo-token-' + Date.now();
        
        // Mock successful login
        localStorage.setItem('token', mockToken);
        setUser(mockUser);
        setIsAuthenticated(true);
        
        toast({
          title: "Demo Login",
          description: `Logged in as ${mockUser.role} (demo mode)`,
        });
        
        return;
      }
      
      // Real login attempt
      const response = await authService.login({ email, password });
      
      // Save token to localStorage
      localStorage.setItem('token', response.token);
      
      // Set user state
      setUser(response.user);
      setIsAuthenticated(true);
      
      toast({
        title: "Success",
        description: "You have been logged in successfully",
      });
      
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // For demo, just simulate registration
      localStorage.setItem('token', 'demo-registration-token-' + Date.now());
      setUser({
        id: 'new-user-' + Date.now(),
        name,
        email,
        role: 'user'
      });
      setIsAuthenticated(true);
      
      toast({
        title: "Demo Registration",
        description: "Account created in demo mode",
      });
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = (): void => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Reset state
    setUser(null);
    setIsAuthenticated(false);
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    
    // Redirect to home page
    navigate('/');
  };

  // Provide the auth context value
  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Create the useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
