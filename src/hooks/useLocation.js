
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

export const useLocation = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({
        ...location,
        error: "Geolocation is not supported by your browser",
        loading: false,
      });
      
      toast({
        title: "Location Error",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
      
      return;
    }

    const handleSuccess = (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
        loading: false,
      });
    };

    const handleError = (error) => {
      let errorMessage = "Unable to retrieve your location";
      
      switch(error.code) {
        case 1:
          errorMessage = "Location access denied. Please enable location services.";
          break;
        case 2:
          errorMessage = "Location unavailable. Please try again later.";
          break;
        case 3:
          errorMessage = "Location request timed out. Please try again.";
          break;
      }
      
      setLocation({
        latitude: null,
        longitude: null,
        error: errorMessage,
        loading: false,
      });
      
      toast({
        title: "Location Error",
        description: errorMessage,
        variant: "destructive",
      });
    };

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  }, []);

  return location;
};

export default useLocation;
