
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BusinessCard } from '@/components/ui/business-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';
import { BusinessPromotion } from '@/types';
import { Search, X } from 'lucide-react';

export default function Businesses() {
  const { businessPromotions, isLoading } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [filteredBusinesses, setFilteredBusinesses] = useState<BusinessPromotion[]>([]);
  
  // Filter businesses to show only approved ones
  const approvedBusinesses = businessPromotions.filter(business => business.status === 'approved');
  
  // Handle search and filtering
  useEffect(() => {
    let result = [...approvedBusinesses];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(business => 
        business.businessName.toLowerCase().includes(term) ||
        business.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredBusinesses(result);
    
    // Update URL parameters
    const params: { search?: string } = {};
    if (searchTerm) params.search = searchTerm;
    setSearchParams(params);
  }, [searchTerm, approvedBusinesses, setSearchParams]);

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // The effect will handle the filtering
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="page-container">
      <div className="mb-12 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Local Impact Businesses</h1>
        <p className="text-xl text-muted-foreground">
          Discover and support socially conscious businesses making a positive impact in our communities.
          These businesses align with our mission of creating sustainable social change.
        </p>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <form onSubmit={handleSearchSubmit} className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search businesses..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
        
        <div className="flex items-center">
          {searchTerm && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClearSearch}
              className="ml-auto h-8"
            >
              <X className="h-4 w-4 mr-1" /> Clear search
            </Button>
          )}
        </div>
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
            Try adjusting your search to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
}
