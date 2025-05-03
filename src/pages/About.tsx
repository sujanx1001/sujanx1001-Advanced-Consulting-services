
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function About() {
  const navigate = useNavigate();
  
  return (
    <div className="page-container">
      <div className="mb-12 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">About Social Aware Connect</h1>
        <p className="text-xl text-muted-foreground">
          Empowering communities through awareness, action, and local business support.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-4 text-muted-foreground">
            Social Aware Connect was founded with a simple but powerful mission: 
            to bridge the gap between social causes that need attention and people 
            who want to make a difference.
          </p>
          <p className="mb-4 text-muted-foreground">
            We believe that awareness is the first step toward meaningful social change. 
            By providing a platform for campaigns to gain visibility and support, 
            we help turn passion into action.
          </p>
          <p className="text-muted-foreground">
            Additionally, we recognize the vital role that socially conscious businesses 
            play in creating sustainable communities. That's why we've created a dedicated 
            space for these businesses to showcase their commitment to positive impact.
          </p>
        </div>
        
        <div className="bg-muted rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Our Impact</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-cause mb-2">200+</div>
              <div className="text-muted-foreground">Campaigns Launched</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cause mb-2">50k+</div>
              <div className="text-muted-foreground">Participants</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cause mb-2">$1.2M</div>
              <div className="text-muted-foreground">Funds Raised</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cause mb-2">100+</div>
              <div className="text-muted-foreground">Business Partners</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">How We Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-full bg-cause flex items-center justify-center text-white font-bold mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Create & Submit</h3>
              <p className="text-muted-foreground">
                Users create campaigns for social causes or promote their socially conscious businesses. 
                Our platform makes it easy to share your story and set goals.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-full bg-cause flex items-center justify-center text-white font-bold mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Review & Approve</h3>
              <p className="text-muted-foreground">
                Our dedicated team reviews all submissions to ensure they align with our 
                community guidelines and mission of positive social impact.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-full bg-cause flex items-center justify-center text-white font-bold mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Connect & Grow</h3>
              <p className="text-muted-foreground">
                Approved campaigns and businesses gain visibility, connect with supporters, 
                and track their impact through our comprehensive dashboard.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Avatar className="w-32 h-32 mx-auto mb-4">
              <AvatarImage src="/placeholder.svg" alt="Netra" />
              <AvatarFallback className="text-2xl">N</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold">Netra</h3>
            <p className="text-muted-foreground">Founder & CEO</p>
          </div>
          <div className="text-center">
            <Avatar className="w-32 h-32 mx-auto mb-4">
              <AvatarImage src="/placeholder.svg" alt="Sujan" />
              <AvatarFallback className="text-2xl">S</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold">Sujan</h3>
            <p className="text-muted-foreground">Chief Impact Officer</p>
          </div>
          <div className="text-center">
            <Avatar className="w-32 h-32 mx-auto mb-4">
              <AvatarImage src="/placeholder.svg" alt="Nabin" />
              <AvatarFallback className="text-2xl">N</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold">Nabin</h3>
            <p className="text-muted-foreground">Community Director</p>
          </div>
        </div>
      </div>
      
      <div className="bg-cause text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Movement</h2>
        <p className="text-xl mb-6 max-w-2xl mx-auto">
          Whether you want to raise awareness for a cause you care about or promote your 
          socially conscious business, we're here to help you make a difference.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-cause"
            size="lg"
            onClick={() => navigate('/register')}
          >
            Create an Account
          </Button>
          <Button 
            variant="secondary"
            className="bg-white text-cause hover:bg-white/90"
            size="lg"
            onClick={() => navigate('/campaigns')}
          >
            Explore Campaigns
          </Button>
        </div>
      </div>
    </div>
  );
}
