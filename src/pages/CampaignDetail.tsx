
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { Heart, Share2, Users, Calendar, ArrowLeft, DollarSign } from 'lucide-react';

export default function CampaignDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { campaigns, donations, joinCampaign, shareCampaign, makeDonation, isLoading } = useData();
  const { user, isAuthenticated } = useAuth();
  
  const [donationAmount, setDonationAmount] = useState('10');
  const [donationMessage, setDonationMessage] = useState('');
  const [isDonationDialogOpen, setIsDonationDialogOpen] = useState(false);
  
  const campaign = campaigns.find(c => c.id === id);
  
  // Get donations for this campaign
  const campaignDonations = donations.filter(d => d.campaignId === id);
  
  // If campaign not found or not approved, show not found page
  if (!campaign || (campaign.status !== 'approved' && (!user || user.role !== 'admin'))) {
    return (
      <div className="page-container text-center">
        <h2 className="text-2xl font-bold mb-4">Campaign Not Found</h2>
        <p className="mb-6">The campaign you're looking for doesn't exist or has not been approved yet.</p>
        <Button onClick={() => navigate('/campaigns')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Campaigns
        </Button>
      </div>
    );
  }
  
  const progressPercentage = Math.min(Math.round((campaign.raised / campaign.goal) * 100), 100);
  
  const handleJoin = () => {
    joinCampaign(campaign.id);
  };
  
  const handleShare = () => {
    shareCampaign(campaign.id);
  };
  
  const handleDonateClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    setIsDonationDialogOpen(true);
  };
  
  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = parseInt(donationAmount);
    if (isNaN(amount) || amount <= 0) {
      return;
    }
    
    makeDonation({
      campaignId: campaign.id,
      userId: user!.id,
      amount,
      displayName: user!.name,
      message: donationMessage || undefined,
    });
    
    setIsDonationDialogOpen(false);
    setDonationAmount('10');
    setDonationMessage('');
  };
  
  return (
    <div className="page-container">
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate('/campaigns')} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Campaigns
        </Button>
        
        <div className="flex flex-wrap items-center gap-2 justify-between">
          <h1 className="text-3xl md:text-4xl font-bold">{campaign.title}</h1>
          <Badge className="bg-cause hover:bg-cause">{campaign.category}</Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <img 
            src={campaign.image} 
            alt={campaign.title}
            className="w-full h-80 object-cover rounded-lg mb-6"
          />
          
          <div className="prose max-w-none mb-8">
            <p className="text-lg leading-relaxed whitespace-pre-line">
              {campaign.description}
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Recent Supporters</h3>
            {campaignDonations.length > 0 ? (
              <div className="space-y-4">
                {campaignDonations.map(donation => (
                  <div key={donation.id} className="bg-muted p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">{donation.displayName}</div>
                      <div className="text-cause font-semibold">${donation.amount}</div>
                    </div>
                    {donation.message && (
                      <p className="text-sm text-muted-foreground">{donation.message}</p>
                    )}
                    <div className="text-xs text-muted-foreground mt-2">
                      {formatDistanceToNow(new Date(donation.createdAt), { addSuffix: true })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No donations yet. Be the first to support this campaign!</p>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-card border rounded-lg p-6 shadow-sm mb-6 sticky top-20">
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Raised</span>
                <span className="text-muted-foreground">Goal</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-2xl font-bold">${campaign.raised.toLocaleString()}</span>
                <span className="text-muted-foreground">${campaign.goal.toLocaleString()}</span>
              </div>
              <Progress value={progressPercentage} className="h-2 mb-2" />
              <div className="text-sm text-muted-foreground">{progressPercentage}% Complete</div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span><strong>{campaign.participants}</strong> people have joined this campaign</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>Started {formatDistanceToNow(new Date(campaign.createdAt), { addSuffix: true })}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Heart className="h-5 w-5 text-muted-foreground" />
                <span>Created by <strong>{campaign.creator.name}</strong></span>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button 
                className="w-full bg-cause hover:bg-cause-dark"
                onClick={handleDonateClick}
              >
                <DollarSign className="h-5 w-5 mr-1" />
                Donate Now
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleJoin}
              >
                <Users className="h-5 w-5 mr-1" />
                Join Campaign
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Donation Dialog */}
      <Dialog open={isDonationDialogOpen} onOpenChange={setIsDonationDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Make a Donation</DialogTitle>
            <DialogDescription>
              Support this campaign by making a donation. Every contribution helps!
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleDonationSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium mb-1">
                  Amount ($)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="amount"
                    type="number" 
                    min="1"
                    step="1"
                    className="pl-10"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message (Optional)
                </label>
                <Textarea 
                  id="message"
                  placeholder="Add a message of support..."
                  value={donationMessage}
                  onChange={(e) => setDonationMessage(e.target.value)}
                />
              </div>
            </div>
            
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setIsDonationDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-cause hover:bg-cause-dark">
                <DollarSign className="h-4 w-4 mr-1" />
                Complete Donation
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
