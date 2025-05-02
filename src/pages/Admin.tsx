
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Campaign, BusinessPromotion } from '@/types';
import { format } from 'date-fns';
import { Check, X, Eye } from 'lucide-react';

export default function Admin() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    campaigns, 
    businessPromotions, 
    approveCampaign, 
    rejectCampaign,
    approveBusinessPromotion,
    rejectBusinessPromotion,
    isLoading 
  } = useData();
  
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessPromotion | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  
  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }
  
  // Filter for pending items
  const pendingCampaigns = campaigns.filter(c => c.status === 'pending');
  const pendingBusinesses = businessPromotions.filter(b => b.status === 'pending');
  
  // Handle approve/reject actions
  const handleApproveCampaign = async (id: string) => {
    await approveCampaign(id);
    setSelectedCampaign(null);
  };
  
  const handleRejectCampaign = async (id: string) => {
    await rejectCampaign(id);
    setSelectedCampaign(null);
  };
  
  const handleApproveBusiness = async (id: string) => {
    await approveBusinessPromotion(id);
    setSelectedBusiness(null);
  };
  
  const handleRejectBusiness = async (id: string) => {
    await rejectBusinessPromotion(id);
    setSelectedBusiness(null);
  };
  
  // View details for a campaign or business
  const viewCampaignDetails = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setSelectedBusiness(null);
    setIsViewDialogOpen(true);
  };
  
  const viewBusinessDetails = (business: BusinessPromotion) => {
    setSelectedBusiness(business);
    setSelectedCampaign(null);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="page-container">
      <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
      <p className="text-muted-foreground mb-8">Review and manage pending campaigns and business promotions</p>
      
      <Tabs defaultValue="campaigns" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="campaigns">
            Campaigns {pendingCampaigns.length > 0 && <Badge className="ml-2 bg-cause">{pendingCampaigns.length}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="businesses">
            Businesses {pendingBusinesses.length > 0 && <Badge className="ml-2 bg-cause">{pendingBusinesses.length}</Badge>}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="campaigns" className="mt-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Creator</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>{campaign.title}</TableCell>
                    <TableCell>{campaign.creator.name}</TableCell>
                    <TableCell>{campaign.category}</TableCell>
                    <TableCell>
                      {format(new Date(campaign.createdAt), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      {campaign.status === 'approved' && <Badge className="bg-green-500">Approved</Badge>}
                      {campaign.status === 'pending' && <Badge variant="outline" className="text-yellow-500 border-yellow-500">Pending</Badge>}
                      {campaign.status === 'rejected' && <Badge variant="destructive">Rejected</Badge>}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => viewCampaignDetails(campaign)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {campaign.status === 'pending' && (
                          <>
                            <Button 
                              size="sm" 
                              onClick={() => handleApproveCampaign(campaign.id)}
                              disabled={isLoading}
                              className="bg-green-500 hover:bg-green-600"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleRejectCampaign(campaign.id)}
                              disabled={isLoading}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {campaigns.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No campaigns found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="businesses" className="mt-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Business Name</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {businessPromotions.map((business) => (
                  <TableRow key={business.id}>
                    <TableCell>{business.businessName}</TableCell>
                    <TableCell>{business.owner.name}</TableCell>
                    <TableCell>
                      {format(new Date(business.createdAt), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      {business.status === 'approved' && <Badge className="bg-green-500">Approved</Badge>}
                      {business.status === 'pending' && <Badge variant="outline" className="text-yellow-500 border-yellow-500">Pending</Badge>}
                      {business.status === 'rejected' && <Badge variant="destructive">Rejected</Badge>}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => viewBusinessDetails(business)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {business.status === 'pending' && (
                          <>
                            <Button 
                              size="sm" 
                              onClick={() => handleApproveBusiness(business.id)}
                              disabled={isLoading}
                              className="bg-green-500 hover:bg-green-600"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleRejectBusiness(business.id)}
                              disabled={isLoading}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {businessPromotions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No businesses found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* View Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {selectedCampaign ? 'Campaign Details' : 'Business Details'}
            </DialogTitle>
            <DialogDescription>
              Review the details before approving or rejecting.
            </DialogDescription>
          </DialogHeader>
          
          {selectedCampaign && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="font-semibold mb-1">Title</h3>
                  <p>{selectedCampaign.title}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Category</h3>
                  <p>{selectedCampaign.category}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="font-semibold mb-1">Short Description</h3>
                <p>{selectedCampaign.shortDescription}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="font-semibold mb-1">Full Description</h3>
                <p className="whitespace-pre-line">{selectedCampaign.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <h3 className="font-semibold mb-1">Goal</h3>
                  <p>${selectedCampaign.goal.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Created By</h3>
                  <p>{selectedCampaign.creator.name}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Date</h3>
                  <p>{format(new Date(selectedCampaign.createdAt), 'PPP')}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Campaign Image</h3>
                <img 
                  src={selectedCampaign.image} 
                  alt={selectedCampaign.title}
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
            </div>
          )}
          
          {selectedBusiness && (
            <div>
              <div className="mb-4">
                <h3 className="font-semibold mb-1">Business Name</h3>
                <p>{selectedBusiness.businessName}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="font-semibold mb-1">Description</h3>
                <p className="whitespace-pre-line">{selectedBusiness.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {selectedBusiness.website && (
                  <div>
                    <h3 className="font-semibold mb-1">Website</h3>
                    <a 
                      href={selectedBusiness.website}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-cause hover:underline"
                    >
                      {selectedBusiness.website}
                    </a>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold mb-1">Created By</h3>
                  <p>{selectedBusiness.owner.name}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Date</h3>
                  <p>{format(new Date(selectedBusiness.createdAt), 'PPP')}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Business Logo</h3>
                <div className="flex justify-center p-4 bg-muted rounded-md">
                  <img 
                    src={selectedBusiness.logo} 
                    alt={selectedBusiness.businessName}
                    className="w-32 h-32 object-contain"
                  />
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            {selectedCampaign && selectedCampaign.status === 'pending' && (
              <>
                <Button 
                  variant="destructive" 
                  onClick={() => handleRejectCampaign(selectedCampaign.id)}
                  disabled={isLoading}
                >
                  <X className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button 
                  onClick={() => handleApproveCampaign(selectedCampaign.id)}
                  disabled={isLoading}
                  className="bg-green-500 hover:bg-green-600"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </>
            )}
            
            {selectedBusiness && selectedBusiness.status === 'pending' && (
              <>
                <Button 
                  variant="destructive" 
                  onClick={() => handleRejectBusiness(selectedBusiness.id)}
                  disabled={isLoading}
                >
                  <X className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button 
                  onClick={() => handleApproveBusiness(selectedBusiness.id)}
                  disabled={isLoading}
                  className="bg-green-500 hover:bg-green-600"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
