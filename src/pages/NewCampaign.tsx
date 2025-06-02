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
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';

const formSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }).max(100),
  shortDescription: z.string().min(10, { message: 'Short description must be at least 10 characters' }).max(150),
  description: z.string().min(50, { message: 'Description must be at least 50 characters' }),
  category: z.string().min(1, { message: 'Please select a category' }),
  goal: z.coerce.number().positive({ message: 'Goal must be a positive number' }),
  image: z.string().default('/placeholder.svg'),
  location: z.string().min(5, { message: 'Location must be at least 5 characters' }),
});

export default function NewCampaign() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { categories, createCampaign, isLoading } = useData();
  const { user, isAuthenticated } = useAuth();
  
  // Redirect if not logged in
  React.useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to create a campaign",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [isAuthenticated, navigate, toast]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      shortDescription: '',
      description: '',
      category: '',
      goal: 1000,
      image: '/placeholder.svg',
      location: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Create the campaign with all required fields
      await createCampaign({
        title: values.title,
        shortDescription: values.shortDescription,
        description: values.description,
        category: values.category,
        goal: values.goal,
        image: values.image,
        location: values.location,
        // Add the required fields that were missing
        raised: 0,
        creator: {
          id: user!.id,
          name: user!.name,
          avatar: user!.avatar
        },
      });
      
      navigate('/dashboard');
      toast({
        title: "Success!",
        description: "Your campaign has been submitted for approval.",
      });
    } catch (error) {
      console.error('Failed to create campaign:', error);
      toast({
        title: "Error",
        description: "Failed to create campaign. Please try again.",
        variant: "destructive",
      });
    }
  }

  if (!isAuthenticated || !user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="page-container max-w-3xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 text-gradient">Create New Campaign</h1>
        <div className="h-1 w-24 bg-cause mx-auto mb-6"></div>
        <p className="text-muted-foreground">
          Fill in the details below to create a new campaign. Your submission will be reviewed by an administrator.
        </p>
      </div>
      
      <div className="bg-card p-6 rounded-lg border shadow-md bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campaign Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a clear, descriptive title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Brief summary (appears in cards)" {...field} />
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Funding Goal ($)</FormLabel>
                    <FormControl>
                      <Input type="number" min="100" step="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Provide detailed information about your campaign..." 
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
                {isLoading ? "Creating..." : "Create Campaign"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
