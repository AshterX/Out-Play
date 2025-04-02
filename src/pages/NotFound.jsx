
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary flex items-center justify-center">
            <MapPin className="h-12 w-12 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-2">Page not found</p>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Go to Home
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
