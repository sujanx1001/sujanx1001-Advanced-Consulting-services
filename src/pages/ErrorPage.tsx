
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface ErrorPageProps {
  title?: string;
  message?: string;
  error?: Error;
}

export default function ErrorPage({ 
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again later.',
  error,
}: ErrorPageProps) {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center">
      <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
        <span className="text-4xl text-destructive">!</span>
      </div>
      
      <h1 className="text-3xl font-bold mb-4 text-center">{title}</h1>
      <p className="text-muted-foreground text-center max-w-lg mb-6">
        {message}
      </p>
      
      {error && process.env.NODE_ENV !== 'production' && (
        <pre className="bg-muted p-4 rounded-md overflow-auto max-w-full mb-6 text-sm">
          {error.message}
          {error.stack && <div className="mt-2">{error.stack}</div>}
        </pre>
      )}
      
      <div className="flex gap-4">
        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
        <Button variant="outline" onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Home
        </Button>
      </div>
    </div>
  );
}
