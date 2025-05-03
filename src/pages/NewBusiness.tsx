
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';

const formSchema = z.object({
  businessName: z.string().min(3, { message: 'Business name must be at least 3 characters' }).max(100),
  description: z.string().min(50, { message: 'Description must be at least 50 characters' }),
  website: z.string().url({ message: 'Please enter a valid URL' }).optional().or(z.literal('')),
  logo: z.string().default('/placeholder.svg'),
  location: z.string().min(5, { message: 'Location must be at least 5 characters' }),
});

export default function NewBusiness() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { createBusinessPromotion, isLoading } = useData();
  const { user, isAuthenticated } = useAuth();
  
  // Redirect if not logged in
  React.useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to create a business promotion",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [isAuthenticated, navigate, toast]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: '',
      description: '',
      website: '',
      logo: '/placeholder.svg',
      location: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // If website is empty string, set to undefined
      const websiteValue = values.website === '' ? undefined : values.website;
      
      await createBusinessPromotion({
        ...values,
        website: websiteValue,
        owner: {
          id: user!.id,
          name: user!.name,
        },
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to create business promotion:', error);
      toast({
        title: "Error",
        description: "Failed to create business promotion. Please try again.",
        variant: "destructive",
      });
    }
  }

  if (!isAuthenticated || !user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="page-container max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">List Your Social Impact Business</h1>
      <p className="text-muted-foreground mb-6">
        Fill in the details below to create a new business promotion. Your submission will be reviewed by an administrator.
      </p>
      
      <div className="bg-card p-6 rounded-lg border">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your business name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Melbourne, VIC" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Include https:// at the beginning of your website URL
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your business, its social impact, and sustainable practices..." 
                      className="min-h-[200px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-cause hover:bg-cause-dark"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit Business"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
