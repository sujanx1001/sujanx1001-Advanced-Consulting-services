
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
import { 
  Heart, 
  Share2, 
  Users, 
  Calendar, 
  ArrowLeft, 
  DollarSign, 
  CreditCard,
  Check,
  ThumbsUp,
  Link as LinkIcon,
  BanknoteIcon,
  Gift
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CampaignDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { campaigns, donations, joinCampaign, shareCampaign, makeDonation, isLoading } = useData();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [donationAmount, setDonationAmount] = useState('10');
  const [donationMessage, setDonationMessage] = useState('');
  const [isDonationDialogOpen, setIsDonationDialogOpen] = useState(false);
  const [selectedDonationOption, setSelectedDonationOption] = useState<number | null>(10);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  
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
    
    const amount = selectedDonationOption !== null 
      ? selectedDonationOption 
      : parseInt(customAmount);
      
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid donation amount",
        variant: "destructive",
      });
      return;
    }
    
    makeDonation({
      campaignId: campaign!.id,
      amount,
      displayName: user ? user.name : "Anonymous",
      userId: user ? user.id : undefined,
      message: donationMessage || undefined,
    });
    
    setIsDonationDialogOpen(false);
    setSelectedDonationOption(10);
    setCustomAmount('');
    setDonationMessage('');
    setPaymentMethod('card');
  };

  const donationOptions = [10, 25, 50, 100];
  
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
            className="w-full h-[400px] object-cover rounded-lg mb-6 shadow-md"
          />
          
          <div className="prose max-w-none mb-8">
            <p className="text-lg leading-relaxed whitespace-pre-line">
              {campaign.description}
            </p>
          </div>
          
          {/* Campaign Impact */}
          <div className="mb-8 bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-slate-800 dark:to-slate-700 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <ThumbsUp className="h-5 w-5 mr-2 text-cause" />
              Campaign Impact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-center text-3xl font-bold text-cause mb-2">
                  {campaign.participants}
                </div>
                <p className="text-center text-sm text-muted-foreground">Supporters Joined</p>
              </div>
              <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-center text-3xl font-bold text-cause mb-2">
                  ${campaign.raised.toLocaleString()}
                </div>
                <p className="text-center text-sm text-muted-foreground">Funds Raised</p>
              </div>
              <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-center text-3xl font-bold text-cause mb-2">
                  {campaign.shares}
                </div>
                <p className="text-center text-sm text-muted-foreground">Social Shares</p>
              </div>
            </div>
          </div>
          
          {/* Share Options */}
          <div className="mb-8 bg-muted p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <LinkIcon className="h-5 w-5 mr-2 text-cause" />
              Share This Campaign
            </h3>
            <p className="mb-4 text-muted-foreground">Help spread the word about this campaign by sharing it with your network!</p>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                className="bg-[#3b5998] text-white hover:bg-[#2d4373] border-none"
                onClick={handleShare}
              >
                Facebook
              </Button>
              <Button 
                variant="outline" 
                className="bg-[#1da1f2] text-white hover:bg-[#0d95e8] border-none"
                onClick={handleShare}
              >
                Twitter
              </Button>
              <Button 
                variant="outline" 
                className="bg-[#0077b5] text-white hover:bg-[#00669c] border-none"
                onClick={handleShare}
              >
                LinkedIn
              </Button>
              <Button 
                variant="outline" 
                className="bg-[#25D366] text-white hover:bg-[#1da750] border-none"
                onClick={handleShare}
              >
                WhatsApp
              </Button>
              <Button 
                variant="outline" 
                className="bg-[#ff4500] text-white hover:bg-[#e03d00] border-none"
                onClick={handleShare}
              >
                Reddit
              </Button>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Recent Supporters</h3>
            {campaignDonations.length > 0 ? (
              <div className="space-y-4">
                {campaignDonations.map(donation => (
                  <div key={donation.id} className="bg-muted p-4 rounded-lg border border-border">
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
              <Progress 
                value={progressPercentage} 
                className="h-2 mb-2"
                indicatorClassName={progressPercentage >= 100 ? "bg-green-500" : "bg-cause"}
              />
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
                <Gift className="h-5 w-5 mr-1" />
                Donate Now
              </Button>
              <Button 
                variant="outline" 
                className="w-full hover:bg-cause/10 hover:text-cause transition-colors"
                onClick={handleJoin}
              >
                <Users className="h-5 w-5 mr-1" />
                Join Campaign
              </Button>
              <Button 
                variant="outline" 
                className="w-full hover:bg-cause/10 hover:text-cause transition-colors"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5 mr-1" />
                Share
              </Button>
            </div>
            
            {/* Donation Tier Cards */}
            <div className="mt-6 space-y-4">
              <h4 className="font-semibold text-lg">Support Tiers</h4>
              
              <div className="bg-muted rounded-lg p-4 border border-muted hover:border-cause transition-colors">
                <div className="flex justify-between mb-2">
                  <h5 className="font-semibold">Supporter</h5>
                  <span className="font-bold">$10</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Join as a basic supporter and help us reach our goals.</p>
                <Button size="sm" variant="outline" className="w-full" onClick={handleDonateClick}>Select</Button>
              </div>
              
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700 rounded-lg p-4 border border-cause/30 hover:border-cause transition-colors">
                <div className="flex justify-between mb-2">
                  <h5 className="font-semibold">Champion</h5>
                  <span className="font-bold">$50</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Become a champion with a significant contribution to our cause.</p>
                <Button size="sm" variant="outline" className="w-full" onClick={handleDonateClick}>Select</Button>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-lg p-4 border border-amber-200 dark:border-amber-800 hover:border-amber-400 dark:hover:border-amber-600 transition-colors">
                <div className="flex justify-between mb-2">
                  <h5 className="font-semibold">Hero</h5>
                  <span className="font-bold">$100</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Make a heroic impact with your generous donation.</p>
                <Button size="sm" variant="outline" className="w-full" onClick={handleDonateClick}>Select</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Donation Dialog */}
      <Dialog open={isDonationDialogOpen} onOpenChange={setIsDonationDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Make a Donation</DialogTitle>
            <DialogDescription>
              Support this campaign by making a donation. Every contribution helps!
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleDonationSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Amount
              </label>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {donationOptions.map(amount => (
                  <Button
                    key={amount}
                    type="button"
                    variant={selectedDonationOption === amount ? "default" : "outline"}
                    className={selectedDonationOption === amount ? "bg-cause hover:bg-cause-dark" : ""}
                    onClick={() => {
                      setSelectedDonationOption(amount);
                      setCustomAmount('');
                    }}
                  >
                    ${amount}
                  </Button>
                ))}
              </div>
              <div className="relative mt-2">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Custom amount"
                  className="pl-10"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedDonationOption(null);
                  }}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Payment Method
              </label>
              <div className="space-y-2">
                <div 
                  className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                    paymentMethod === 'card' ? 'border-cause bg-cause/5' : 'border-input'
                  }`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className={`w-5 h-5 rounded-full border mr-2 flex items-center justify-center ${
                    paymentMethod === 'card' ? 'border-cause' : 'border-input'
                  }`}>
                    {paymentMethod === 'card' && (
                      <div className="w-3 h-3 rounded-full bg-cause" />
                    )}
                  </div>
                  <CreditCard className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>Credit / Debit Card</span>
                </div>
                <div 
                  className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                    paymentMethod === 'paypal' ? 'border-cause bg-cause/5' : 'border-input'
                  }`}
                  onClick={() => setPaymentMethod('paypal')}
                >
                  <div className={`w-5 h-5 rounded-full border mr-2 flex items-center justify-center ${
                    paymentMethod === 'paypal' ? 'border-cause' : 'border-input'
                  }`}>
                    {paymentMethod === 'paypal' && (
                      <div className="w-3 h-3 rounded-full bg-cause" />
                    )}
                  </div>
                  <span className="text-[#003087] font-bold">Pay</span>
                  <span className="text-[#0070E0] font-bold">Pal</span>
                </div>
                <div 
                  className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                    paymentMethod === 'bank' ? 'border-cause bg-cause/5' : 'border-input'
                  }`}
                  onClick={() => setPaymentMethod('bank')}
                >
                  <div className={`w-5 h-5 rounded-full border mr-2 flex items-center justify-center ${
                    paymentMethod === 'bank' ? 'border-cause' : 'border-input'
                  }`}>
                    {paymentMethod === 'bank' && (
                      <div className="w-3 h-3 rounded-full bg-cause" />
                    )}
                  </div>
                  <BanknoteIcon className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>Bank Transfer</span>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message (Optional)
              </label>
              <Textarea 
                id="message"
                placeholder="Add a message of support..."
                value={donationMessage}
                onChange={(e) => setDonationMessage(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex h-5 items-center space-x-2">
                <Check className="h-4 w-4 text-cause" />
              </div>
              <div className="text-sm text-muted-foreground">
                I agree to the <Link to="/terms-of-service" className="text-cause hover:underline">Terms of Service</Link> and <Link to="/privacy-policy" className="text-cause hover:underline">Privacy Policy</Link>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDonationDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-cause hover:bg-cause-dark">
                <Gift className="h-4 w-4 mr-1" />
                Complete Donation
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
