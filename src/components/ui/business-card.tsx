
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BusinessPromotion } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { ExternalLink, MapPin } from 'lucide-react';

interface BusinessCardProps {
  business: BusinessPromotion;
}

export function BusinessCard({ business }: BusinessCardProps) {
  return (
    <Card className="cause-card h-full flex flex-col">
      <div className="p-4 flex items-center justify-center">
        <img 
          src={business.logo} 
          alt={business.businessName}
          className="w-24 h-24 object-contain"
        />
      </div>
      <CardContent className="flex-grow p-4 pt-2">
        <h3 className="text-xl font-semibold mb-2">{business.businessName}</h3>
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <MapPin className="h-3 w-3 mr-1" />
          {business.location}
        </div>
        <p className="text-muted-foreground mb-4">{business.description}</p>
        <div className="text-xs text-muted-foreground">
          Added {formatDistanceToNow(new Date(business.createdAt), { addSuffix: true })}
        </div>
      </CardContent>
      {business.website && (
        <CardFooter className="p-4 pt-0">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => window.open(business.website, '_blank')}
          >
            <ExternalLink className="w-4 w-4 mr-2" />
            Visit Website
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
