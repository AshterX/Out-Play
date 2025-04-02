
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, Edit, MapPin, Settings, LogOut } from 'lucide-react';
import { getCurrentUser, getUserGames, sports } from '@/data/mockData';

const Profile = () => {
  const [user, setUser] = useState(getCurrentUser());
  const userGames = getUserGames(user.id);
  
  return (
    <MainLayout>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>
      
      {/* Profile Card */}
      <Card className="mb-8">
        <CardContent className="p-0">
          <div className="relative">
            {/* Banner - using gradient as placeholder */}
            <div className="h-32 md:h-48 gradient-bg"></div>
            
            {/* Avatar */}
            <div className="absolute -bottom-12 left-8 border-4 border-white rounded-full">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="h-24 w-24 rounded-full object-cover" 
              />
            </div>
          </div>
          
          {/* User info */}
          <div className="pt-16 px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <MapPin size={14} className="mr-1" />
                  <span>{user.location.city}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {user.availability.map(time => (
                  <Badge key={time} variant="outline">
                    Available {time}s
                  </Badge>
                ))}
                <Badge>
                  {user.skillLevel.charAt(0).toUpperCase() + user.skillLevel.slice(1)}
                </Badge>
              </div>
            </div>
            
            <p className="mt-4 text-gray-600">{user.bio}</p>
            
            <Separator className="my-6" />
            
            <div>
              <h3 className="font-medium mb-3">Sports & Activities</h3>
              <div className="flex flex-wrap gap-3">
                {user.sports.map(sportId => {
                  const sport = sports.find(s => s.id === sportId);
                  return (
                    <div 
                      key={sportId} 
                      className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2"
                    >
                      <span className="text-xl">{sport?.icon}</span>
                      <span>{sport?.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* My Games */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">My Games</h2>
        
        {userGames.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">You haven't joined any games yet</p>
              <Button 
                variant="link" 
                onClick={() => window.location.href = '/games'}
              >
                Discover Games
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userGames.map(game => (
              <Card key={game.id} className="overflow-hidden">
                <div className="relative h-32">
                  <img 
                    src={game.imageUrl} 
                    alt={game.title}
                    className="w-full h-full object-cover" 
                  />
                  <Badge className="absolute top-2 right-2 bg-white/90 text-black">
                    {game.sport.charAt(0).toUpperCase() + game.sport.slice(1)}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{game.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <MapPin size={14} className="mr-1" />
                    {game.location.address}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      <span>
                        {new Date(game.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short', 
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      <span>{game.time}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.location.href = `/games/${game.id}`}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <Button variant="outline" size="sm">
              Change
            </Button>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Password</p>
              <p className="text-sm text-muted-foreground">••••••••••</p>
            </div>
            <Button variant="outline" size="sm">
              Change
            </Button>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 w-full sm:w-auto flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </CardFooter>
      </Card>
    </MainLayout>
  );
};

export default Profile;
