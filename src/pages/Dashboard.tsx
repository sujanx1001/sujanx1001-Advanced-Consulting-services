
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CampaignCard } from '@/components/ui/campaign-card';
import { BusinessCard } from '@/components/ui/business-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { PlusCircle } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const { campaigns, businessPromotions } = useData();
  const navigate = useNavigate();
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  // Filter campaigns and businesses created by the current user
  const userCampaigns = campaigns.filter(campaign => campaign.creator.id === user.id);
  const userBusinesses = businessPromotions.filter(business => business.owner.id === user.id);
  
  // Get stats
  const pendingCampaigns = userCampaigns.filter(c => c.status === 'pending').length;
  const approvedCampaigns = userCampaigns.filter(c => c.status === 'approved').length;
  const pendingBusinesses = userBusinesses.filter(b => b.status === 'pending').length;
  const approvedBusinesses = userBusinesses.filter(b => b.status === 'approved').length;
  
  // Calculate total raised across all user campaigns
  const totalRaised = userCampaigns.reduce((sum, campaign) => sum + campaign.raised, 0);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-yellow-500 border-yellow-500">Pending Review</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="page-container">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}</p>
        </div>
        
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button 
            onClick={() => navigate('/dashboard/new-campaign')}
            className="bg-cause hover:bg-cause-dark"
          >
            <PlusCircle className="mr-1 h-5 w-5" />
            New Campaign
          </Button>
          <Button 
            onClick={() => navigate('/dashboard/new-business')}
            variant="outline"
          >
            <PlusCircle className="mr-1 h-5 w-5" />
            New Business
          </Button>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{userCampaigns.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {pendingCampaigns} pending, {approvedCampaigns} approved
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Raised
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalRaised.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all your campaigns
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Business Listings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{userBusinesses.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {pendingBusinesses} pending, {approvedBusinesses} approved
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Account Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold capitalize">{user.role}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {user.role === 'admin' ? 'Full admin privileges' : 'Standard account'}
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Content Tabs */}
      <Tabs defaultValue="campaigns" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="campaigns">Your Campaigns</TabsTrigger>
          <TabsTrigger value="businesses">Your Businesses</TabsTrigger>
        </TabsList>
        
        <TabsContent value="campaigns" className="mt-6">
          {userCampaigns.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Your Campaigns</h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/dashboard/new-campaign')}
                >
                  <PlusCircle className="mr-1 h-4 w-4" />
                  Create New
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userCampaigns.map(campaign => (
                  <div key={campaign.id} className="relative">
                    <div className="absolute top-2 left-2 z-10">
                      {getStatusBadge(campaign.status)}
                    </div>
                    <CampaignCard campaign={campaign} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-muted rounded-lg">
              <h3 className="text-xl font-semibold mb-2">No campaigns yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first campaign to raise awareness for a cause you care about.
              </p>
              <Button 
                onClick={() => navigate('/dashboard/new-campaign')}
                className="bg-cause hover:bg-cause-dark"
              >
                <PlusCircle className="mr-1 h-5 w-5" />
                Create Campaign
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="businesses" className="mt-6">
          {userBusinesses.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Your Business Listings</h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/dashboard/new-business')}
                >
                  <PlusCircle className="mr-1 h-4 w-4" />
                  Create New
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userBusinesses.map(business => (
                  <div key={business.id} className="relative">
                    <div className="absolute top-2 left-2 z-10">
                      {getStatusBadge(business.status)}
                    </div>
                    <BusinessCard business={business} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-muted rounded-lg">
              <h3 className="text-xl font-semibold mb-2">No business listings yet</h3>
              <p className="text-muted-foreground mb-6">
                Promote your socially conscious business to our community.
              </p>
              <Button 
                onClick={() => navigate('/dashboard/new-business')}
                className="bg-cause hover:bg-cause-dark"
              >
                <PlusCircle className="mr-1 h-5 w-5" />
                Create Listing
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
