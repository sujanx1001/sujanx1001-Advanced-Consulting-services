
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { ArrowLeft } from 'lucide-react';

const formSchema = z.object({
  businessName: z.string().min(3, { message: 'Business name must be at least 3 characters' }).max(100),
  description: z.string().min(50, { message: 'Description must be at least 50 characters' }).max(500),
  website: z.string().url({ message: 'Please enter a valid URL' }).or(z.literal('')), // Optional website
});

export default function NewBusiness() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createBusinessPromotion, isLoading } = useData();
  
  // Redirect to login if not authenticated
  if (!user) {
    navigate('/login');
    return null;
  }
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: '',
      description: '',
      website: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createBusinessPromotion({
        businessName: values.businessName,
        description: values.description,
        logo: '/placeholder.svg', // In a real app, would handle logo uploads
        website: values.website || undefined,
        owner: {
          id: user.id,
          name: user.name,
        },
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to create business promotion:', error);
    }
  }

  return (
    <div className="page-container max-w-3xl mx-auto">
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => navigate('/dashboard')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create a New Business Listing</h1>
        <p className="text-muted-foreground">
          Promote your socially conscious business to our community.
          Your listing will be reviewed before being published.
        </p>
      </div>
      
      <div className="bg-card border rounded-lg p-6 shadow-sm">
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your business, your mission, and how you contribute to social good"
                      className="min-h-[150px]"
                      {...field} 
                    />
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
                    <Input placeholder="https://yourbusiness.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="pb-5">
              <FormLabel>Business Logo</FormLabel>
              <div className="mt-2 border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <p className="text-muted-foreground">
                  Upload your business logo. For this demo, we'll use a placeholder.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
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
                {isLoading ? "Creating..." : "Create Listing"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
