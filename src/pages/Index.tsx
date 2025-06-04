import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CampaignCard } from '@/components/ui/campaign-card';
import { BusinessCard } from '@/components/ui/business-card';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight } from 'lucide-react';

export default function Index() {
  const { campaigns, businessPromotions, isLoading } = useData();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Filter to show only approved campaigns and businesses
  const approvedCampaigns = campaigns.filter(campaign => campaign.status === 'approved');
  const approvedBusinesses = businessPromotions.filter(promo => promo.status === 'approved');
  
  // Get top campaigns by participation or amount raised
  const featuredCampaigns = [...approvedCampaigns]
    .sort((a, b) => b.raised - a.raised)
    .slice(0, 3);
  
  // Get newest businesses
  const featuredBusinesses = [...approvedBusinesses]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-700/40 to-green-800/40"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">Transform Your Business Today</h1>
            <p className="text-xl md:text-2xl mb-8 text-white drop-shadow-lg">
              Expert consulting services to help your business thrive through innovation, 
              strategy, and sustainable growth solutions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg" 
                onClick={() => navigate('/services')}
                className="bg-cause hover:bg-cause-dark text-lg"
              >
                Our Services
              </Button>
              {!isAuthenticated && (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/register')}
                  className="border-white text-white hover:bg-white hover:text-cause text-lg"
                >
                  Get Started
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Campaigns Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Campaigns</h2>
            <Button variant="ghost" className="group" onClick={() => navigate('/campaigns')}>
              View All 
              <ArrowRight className="ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-pulse flex space-x-4">
                <div className="h-12 w-12 bg-muted rounded-full"></div>
                <div className="space-y-4 flex-1">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <p className="text-xl mb-6">
              Ready to create your own campaign and make a difference?
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate(isAuthenticated ? '/dashboard/new-campaign' : '/login')}
              className="bg-cause hover:bg-cause-dark"
            >
              {isAuthenticated ? 'Start a Campaign' : 'Sign in to Start a Campaign'}
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">How We Help You Succeed</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background rounded-lg p-6 text-center shadow-md">
              <div className="w-16 h-16 bg-cause rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Analyze & Plan</h3>
              <p className="text-muted-foreground">
                We perform in-depth analysis of your business and develop 
                strategic plans tailored to your goals.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 text-center shadow-md">
              <div className="w-16 h-16 bg-cause rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Implement Solutions</h3>
              <p className="text-muted-foreground">
                Our expert team works with you to implement effective solutions
                and best practices for sustainable growth.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 text-center shadow-md">
              <div className="w-16 h-16 bg-cause rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Monitor & Optimize</h3>
              <p className="text-muted-foreground">
                We continuously monitor progress, measure results, and optimize
                strategies to ensure long-term success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Businesses Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Local Impact Businesses</h2>
            <Button variant="ghost" className="group" onClick={() => navigate('/businesses')}>
              View All 
              <ArrowRight className="ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-pulse flex space-x-4">
                <div className="h-12 w-12 bg-muted rounded-full"></div>
                <div className="space-y-4 flex-1">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <p className="text-xl mb-6">
              Are you a socially conscious business looking to promote your impact?
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate(isAuthenticated ? '/dashboard/new-business' : '/login')}
              className="bg-cause hover:bg-cause-dark"
            >
              {isAuthenticated ? 'Promote Your Business' : 'Sign in to Promote Your Business'}
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-cause text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make an Impact?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of others who are raising awareness for important causes
            and making real change in their communities.
          </p>
          <Button 
            size="lg" 
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-cause"
            onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Join the Movement'}
          </Button>
        </div>
      </section>
    </div>
  );
}
