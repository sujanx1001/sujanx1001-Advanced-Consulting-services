
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BusinessPromotion } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { ExternalLink, MapPin, Clock } from 'lucide-react';

interface BusinessCardProps {
  business: BusinessPromotion;
}

export function BusinessCard({ business }: BusinessCardProps) {
  // Generate random gradient colors for each card to make them visually distinct
  const gradients = [
    'from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30',
    'from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30',
    'from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30',
    'from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30',
    'from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30'
  ];
  
  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
  
  return (
    <Card className="cause-card h-full flex flex-col shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br border-t-2 border-t-cause/40">
      <div className={`p-6 flex items-center justify-center rounded-t-lg bg-gradient-to-br ${randomGradient}`}>
        <img 
          src={business.logo} 
          alt={business.businessName}
          className="w-28 h-28 object-contain drop-shadow-md rounded-lg"
        />
      </div>
      <CardContent className="flex-grow p-5">
        <h3 className="text-xl font-semibold mb-2 text-foreground">{business.businessName}</h3>
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <MapPin className="h-3.5 w-3.5 mr-1 text-cause" />
          {business.location}
        </div>
        <p className="text-muted-foreground mb-4 line-clamp-4">{business.description}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          Added {formatDistanceToNow(new Date(business.createdAt), { addSuffix: true })}
        </div>
      </CardContent>
      {business.website && (
        <CardFooter className="p-5 pt-0">
          <Button 
            variant="default" 
            className="w-full bg-cause hover:bg-cause-dark" 
            onClick={() => window.open(business.website, '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Visit Website
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
