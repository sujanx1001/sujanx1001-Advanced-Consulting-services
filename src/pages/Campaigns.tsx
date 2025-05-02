
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CampaignCard } from '@/components/ui/campaign-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useData } from '@/contexts/DataContext';
import { Campaign } from '@/types';
import { Search, Filter, X } from 'lucide-react';

export default function Campaigns() {
  const { campaigns, categories, isLoading } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || '');
  
  // Filter campaigns to show only approved ones
  const approvedCampaigns = campaigns.filter(campaign => campaign.status === 'approved');
  
  // Handle search and filtering
  useEffect(() => {
    let result = [...approvedCampaigns];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(campaign => 
        campaign.title.toLowerCase().includes(term) ||
        campaign.description.toLowerCase().includes(term)
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      result = result.filter(campaign => 
        campaign.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    setFilteredCampaigns(result);
    
    // Update URL parameters
    const params: { search?: string, category?: string } = {};
    if (searchTerm) params.search = searchTerm;
    if (selectedCategory) params.category = selectedCategory;
    setSearchParams(params);
  }, [searchTerm, selectedCategory, approvedCampaigns, setSearchParams]);

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // The effect will handle the filtering
  };

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(prevCategory => prevCategory === category ? '' : category);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
  };

  return (
    <div className="page-container">
      <div className="mb-12 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Explore Campaigns</h1>
        <p className="text-xl text-muted-foreground">
          Discover social causes making a difference in our communities and around the world.
          Join, share, or donate to help them reach their goals.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8">
        <form onSubmit={handleSearchSubmit} className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search campaigns..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
        
        <div className="flex flex-wrap gap-2 items-center">
          <span className="flex items-center text-muted-foreground">
            <Filter className="h-4 w-4 mr-1" /> 
            Filter by:
          </span>
          
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.slug ? "default" : "outline"}
              className={`cursor-pointer ${selectedCategory === category.slug ? 'bg-cause hover:bg-cause-dark' : 'hover:bg-muted'}`}
              onClick={() => handleCategorySelect(category.slug)}
            >
              {category.name}
            </Badge>
          ))}
          
          {(searchTerm || selectedCategory) && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClearFilters}
              className="ml-2 h-8"
            >
              <X className="h-4 w-4 mr-1" /> Clear filters
            </Button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {filteredCampaigns.length} {filteredCampaigns.length === 1 ? 'campaign' : 'campaigns'}
          {searchTerm && ` for "${searchTerm}"`}
          {selectedCategory && ` in ${selectedCategory}`}
        </p>
      </div>

      {/* Campaigns Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-muted rounded-lg h-80"></div>
          ))}
        </div>
      ) : filteredCampaigns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No campaigns found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
}
