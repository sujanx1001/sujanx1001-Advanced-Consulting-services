
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Campaign } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { Heart, Share2, Users, MapPin, Clock } from 'lucide-react';
import { useData } from '@/contexts/DataContext';

interface CampaignCardProps {
  campaign: Campaign;
  showActions?: boolean;
}

export function CampaignCard({ campaign, showActions = true }: CampaignCardProps) {
  const { joinCampaign, shareCampaign } = useData();
  const progressPercentage = Math.min(Math.round((campaign.raised / campaign.goal) * 100), 100);

  // Get a random campaign image if using placeholder
  const campaignImages = [
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    'https://images.unsplash.com/photo-1522410818928-5d7e09013222',
    'https://images.unsplash.com/photo-1517486430290-35657bdcef51'
  ];
  
  const imageSrc = campaign.image === '/placeholder.svg' 
    ? campaignImages[Math.floor(Math.random() * campaignImages.length)]
    : campaign.image;

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

  // Apply different color themes based on category
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'environment':
        return 'bg-emerald-500 hover:bg-emerald-600';
      case 'education':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'health':
        return 'bg-red-500 hover:bg-red-600';
      case 'poverty':
        return 'bg-amber-500 hover:bg-amber-600';
      case 'equality':
        return 'bg-purple-500 hover:bg-purple-600';
      case 'animals':
        return 'bg-orange-500 hover:bg-orange-600';
      default:
        return 'bg-cause hover:bg-cause-dark';
    }
  };

  return (
    <Card className="cause-card h-full flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-shadow border-t-2 border-t-cause/40">
      <div className="relative">
        <img 
          src={imageSrc} 
          alt={campaign.title}
          className="w-full h-56 object-cover"
          loading="lazy"
        />
        <Badge className={`absolute top-3 right-3 text-white ${getCategoryColor(campaign.category)}`}>
          {campaign.category}
        </Badge>
        {progressPercentage >= 100 && (
          <Badge className="absolute top-3 left-3 bg-green-500 hover:bg-green-600 text-white">
            Fully Funded
          </Badge>
        )}
      </div>
      <CardContent className="flex-grow p-5">
        <div className="mb-2">
          <h3 className="text-xl font-semibold line-clamp-2">
            <Link to={`/campaigns/${campaign.id}`} className="hover:text-cause transition-colors">
              {campaign.title}
            </Link>
          </h3>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <MapPin className="h-3.5 w-3.5 mr-1 text-cause" />
          {campaign.location}
        </div>
        <p className="text-muted-foreground mb-5 line-clamp-2">
          {campaign.shortDescription}
        </p>
        <div className="mt-4 space-y-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">${campaign.raised.toLocaleString()}</span>
            <span className="text-muted-foreground">of ${campaign.goal.toLocaleString()}</span>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-2 mb-2"
            indicatorClassName={progressPercentage >= 100 ? "bg-green-500" : undefined}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span className="flex items-center">
              <Users className="h-3 w-3 mr-1 inline" />
              {campaign.participants} supporters
            </span>
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1 inline" />
              {formatDistanceToNow(new Date(campaign.createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>
      </CardContent>
      {showActions && (
        <CardFooter className="p-5 pt-0 gap-2">
          <Button 
            variant="outline" 
            className="flex-1 flex items-center justify-center hover:bg-cause/10 hover:text-cause hover:border-cause transition-colors"
            onClick={handleJoin}
          >
            <Users className="h-4 w-4 mr-1" />
            Join ({campaign.participants})
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 flex items-center justify-center hover:bg-cause/10 hover:text-cause hover:border-cause transition-colors"
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
