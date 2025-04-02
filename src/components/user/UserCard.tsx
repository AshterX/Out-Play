
import React from 'react';
import { User } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface UserCardProps {
  user: User;
  distance?: number; // Distance in km
  onConnect?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, distance, onConnect }) => {
  return (
    <Card className="card-hover overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          {/* Banner - using gradient as placeholder */}
          <div className="h-16 gradient-bg"></div>
          
          {/* Avatar */}
          <div className="absolute top-8 left-4 border-4 border-white rounded-full">
            <img 
              src={user.avatar} 
              alt={user.name}
              className="h-16 w-16 rounded-full object-cover" 
            />
          </div>

          {/* Location tag */}
          {distance !== undefined && (
            <div className="absolute top-2 right-2 bg-white/90 rounded-full py-1 px-2 text-xs flex items-center gap-1">
              <MapPin size={14} className="text-brand-accent" />
              <span>{distance} km away</span>
            </div>
          )}
        </div>
        
        {/* User info */}
        <div className="pt-10 p-4">
          <h3 className="font-bold text-lg">{user.name}</h3>
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <MapPin size={14} className="mr-1" />
            <span>{user.location.city}</span>
          </div>
          
          <p className="text-sm mb-3 text-gray-600 line-clamp-2">{user.bio}</p>
          
          {/* Sports */}
          <div className="flex flex-wrap gap-1 mb-4">
            {user.sports.map(sport => (
              <Badge key={sport} variant="secondary" className="text-xs">
                {sport.charAt(0).toUpperCase() + sport.slice(1)}
              </Badge>
            ))}
            <Badge variant="outline" className="text-xs">
              {user.skillLevel.charAt(0).toUpperCase() + user.skillLevel.slice(1)}
            </Badge>
          </div>
          
          {onConnect && (
            <Button 
              onClick={onConnect}
              variant="outline"
              className="w-full border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
            >
              Connect
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
