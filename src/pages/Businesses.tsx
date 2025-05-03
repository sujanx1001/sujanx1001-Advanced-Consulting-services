import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BusinessCard } from '@/components/ui/business-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { BusinessPromotion } from '@/types';
import { Search, X, PlusCircle } from 'lucide-react';

export default function Businesses() {
  const { businessPromotions, isLoading } = useData();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBusinesses, setFilteredBusinesses] = useState<BusinessPromotion[]>([]);
  
  // Filter businesses based on user role
  const visibleBusinesses = businessPromotions.filter(business => {
    // Admin sees all businesses
    if (user?.role === 'admin') return true;
    // Others only see approved businesses
    return business.status === 'approved';
  });
  
  // Handle search
  useEffect(() => {
    let result = [...visibleBusinesses];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(business => 
        business.businessName.toLowerCase().includes(term) || 
        business.description.toLowerCase().includes(term) ||
        business.location.toLowerCase().includes(term)
      );
    }
    
    setFilteredBusinesses(result);
  }, [searchTerm, visibleBusinesses]);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // The effect will handle the filtering
  };
  
  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="page-container">
      <div className="mb-12 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Social Impact Businesses</h1>
        <p className="text-xl text-muted-foreground">
          Discover Australian businesses making a positive impact in their communities through
          sustainable practices and social responsibility.
        </p>
        
        {isAuthenticated && (
          <div className="mt-6">
            <Button 
              onClick={() => navigate('/dashboard/new-business')}
              className="bg-cause hover:bg-cause-dark"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              List Your Business
            </Button>
          </div>
        )}
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <form onSubmit={handleSearchSubmit} className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search businesses by name, description, or location..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
        
        {searchTerm && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearSearch}
            className="ml-2 h-8"
          >
            <X className="h-4 w-4 mr-1" /> Clear search
          </Button>
        )}
      </div>

      {/* Results count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {filteredBusinesses.length} {filteredBusinesses.length === 1 ? 'business' : 'businesses'}
          {searchTerm && ` for "${searchTerm}"`}
        </p>
      </div>

      {/* Businesses Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-muted rounded-lg h-64"></div>
          ))}
        </div>
      ) : filteredBusinesses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No businesses found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or browse again later as new businesses are added.
          </p>
          {isAuthenticated && (
            <Button 
              onClick={() => navigate('/dashboard/new-business')}
              className="mt-6 bg-cause hover:bg-cause-dark"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              List Your Business
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
