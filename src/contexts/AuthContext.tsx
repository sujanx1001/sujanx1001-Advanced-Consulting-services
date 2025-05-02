
import React, { createContext, useState, useEffect, useContext } from 'react';
import { User } from '@/types';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

// Mock users for demonstration purposes
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as const,
    avatar: '/placeholder.svg',
  },
  {
    id: '2',
    email: 'user@example.com',
    password: 'user123',
    name: 'Regular User',
    role: 'user' as const,
    avatar: '/placeholder.svg',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check for existing session on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('socialAwareUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('socialAwareUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Mock API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      // Strip password before storing
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('socialAwareUser', JSON.stringify(userWithoutPassword));
      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.name}`,
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    // Mock API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (MOCK_USERS.some(u => u.email === email)) {
      toast({
        title: "Registration failed",
        description: "Email already exists. Please use a different email.",
        variant: "destructive",
      });
      setIsLoading(false);
      throw new Error('Email already exists');
    }
    
    // In a real app, you would make an API call to register the user
    // For demo purposes, we'll just simulate a successful registration
    const newUser = {
      id: `${MOCK_USERS.length + 1}`,
      email,
      name,
      role: 'user' as const,
    };
    
    setUser(newUser);
    localStorage.setItem('socialAwareUser', JSON.stringify(newUser));
    toast({
      title: "Registration successful",
      description: "Your account has been created successfully.",
    });
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('socialAwareUser');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
