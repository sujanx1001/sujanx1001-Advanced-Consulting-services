
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { ArrowLeft } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }).max(100),
  shortDescription: z.string().min(20, { message: 'Short description must be at least 20 characters' }).max(200),
  description: z.string().min(100, { message: 'Description must be at least 100 characters' }),
  category: z.string().min(1, { message: 'Please select a category' }),
  goal: z.string().refine((val) => {
    const num = parseInt(val);
    return !isNaN(num) && num > 0;
  }, { message: 'Goal must be a positive number' }),
});

export default function NewCampaign() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { categories, createCampaign, isLoading } = useData();
  
  // Redirect to login if not authenticated
  if (!user) {
    navigate('/login');
    return null;
  }
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      shortDescription: '',
      description: '',
      category: '',
      goal: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createCampaign({
        title: values.title,
        shortDescription: values.shortDescription,
        description: values.description,
        category: values.category,
        goal: parseInt(values.goal),
        raised: 0,
        image: '/placeholder.svg', // In a real app, would handle image uploads
        creator: {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
        },
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to create campaign:', error);
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
        <h1 className="text-3xl font-bold mb-2">Create a New Campaign</h1>
        <p className="text-muted-foreground">
          Share your cause with our community and start making a difference.
          Your campaign will be reviewed before being published.
        </p>
      </div>
      
      <div className="bg-card border rounded-lg p-6 shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campaign Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a clear, attention-grabbing title" {...field} />
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
                    <Textarea 
                      placeholder="A brief summary that will appear on campaign cards (1-2 sentences)"
                      className="resize-none"
                      {...field} 
                    />
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
                  <FormLabel>Full Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Provide a detailed description of your campaign, its goals, and why it matters"
                      className="min-h-[200px]"
                      {...field} 
                    />
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
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
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
                    <FormLabel>Fundraising Goal ($)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1"
                        step="1"
                        placeholder="E.g., 5000"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="pb-5">
              <FormLabel>Campaign Image</FormLabel>
              <div className="mt-2 border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <p className="text-muted-foreground">
                  Upload a compelling image for your campaign. For this demo, we'll use a placeholder.
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
                {isLoading ? "Creating..." : "Create Campaign"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
