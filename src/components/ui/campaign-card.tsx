
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Campaign } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { Heart, Share2, Users, MapPin } from 'lucide-react';
import { useData } from '@/contexts/DataContext';

interface CampaignCardProps {
  campaign: Campaign;
  showActions?: boolean;
}

export function CampaignCard({ campaign, showActions = true }: CampaignCardProps) {
  const { joinCampaign, shareCampaign } = useData();
  const progressPercentage = Math.min(Math.round((campaign.raised / campaign.goal) * 100), 100);

  const handleJoin = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    joinCampaign(campaign.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    shareCampaign(campaign.id);
  };

  return (
    <Card className="cause-card h-full flex flex-col overflow-hidden">
      <div className="relative">
        <img 
          src={campaign.image} 
          alt={campaign.title}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-cause hover:bg-cause">
          {campaign.category}
        </Badge>
      </div>
      <CardContent className="flex-grow p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">
            <Link to={`/campaigns/${campaign.id}`} className="hover:text-cause transition-colors">
              {campaign.title}
            </Link>
          </h3>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <MapPin className="h-3 w-3 mr-1" />
          {campaign.location}
        </div>
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {campaign.shortDescription}
        </p>
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">${campaign.raised.toLocaleString()}</span>
            <span className="text-muted-foreground">of ${campaign.goal.toLocaleString()}</span>
          </div>
          <Progress value={progressPercentage} className="h-2 mb-4" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{progressPercentage}% Complete</span>
            <span>{formatDistanceToNow(new Date(campaign.createdAt), { addSuffix: true })}</span>
          </div>
        </div>
      </CardContent>
      {showActions && (
        <CardFooter className="p-4 pt-0 gap-2">
          <Button 
            variant="outline" 
            className="flex-1 flex items-center justify-center"
            onClick={handleJoin}
          >
            <Users className="h-4 w-4 mr-1" />
            Join ({campaign.participants})
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 flex items-center justify-center"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4 mr-1" />
            Share ({campaign.shares})
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
