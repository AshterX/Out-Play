
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import GameCard from '@/components/game/GameCard';
import UserCard from '@/components/user/UserCard';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from '@/hooks/useLocation';
import { 
  getCurrentUser, 
  getNearbyGames, 
  getNearbyUsers, 
  joinGame 
} from '@/data/mockData';

const Index = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [nearbyGames, setNearbyGames] = useState(getNearbyGames(currentUser.id));
  const [nearbyUsers, setNearbyUsers] = useState(getNearbyUsers(currentUser.id));
  
  const handleJoinGame = (gameId) => {
    const success = joinGame(gameId, currentUser.id);
    
    if (success) {
      toast({
        title: "Success!",
        description: "You've joined the game. Check your games page for details.",
      });
      
      // Update the games list
      setNearbyGames(getNearbyGames(currentUser.id));
    } else {
      toast({
        title: "Unable to join",
        description: "This game is full or you're already a member.",
        variant: "destructive",
      });
    }
  };
  
  const handleConnectUser = (userId) => {
    toast({
      title: "Connection request sent!",
      description: "You'll be notified when they respond.",
    });
  };
  
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Your Game</h1>
        <p className="text-muted-foreground">
          Discover nearby players and games in your area
        </p>
      </div>
      
      {/* Hero Section */}
      <Card className="mb-8 overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/80 to-brand-secondary/80 z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3" 
              alt="Sports players"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 text-white">
              <h2 className="text-2xl font-bold mb-2">Ready to Play?</h2>
              <p className="mb-4 max-w-md">
                Create your own game and invite players or join existing games in your area.
              </p>
              <div>
                <Button
                  className="bg-white text-brand-primary hover:bg-gray-100"
                  onClick={() => window.location.href = '/games/new'}
                >
                  Create a Game
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Games Near You */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Games Near You</h2>
          <Button variant="link" onClick={() => window.location.href = '/games'}>
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nearbyGames.slice(0, 3).map(game => (
            <GameCard 
              key={game.id} 
              game={game} 
              onJoin={() => handleJoinGame(game.id)}
              alreadyJoined={game.currentPlayers.includes(currentUser.id)}
            />
          ))}
        </div>
      </section>
      
      {/* Players Near You */}
      <section className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Players Near You</h2>
          <Button variant="link" onClick={() => window.location.href = '/discover'}>
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {nearbyUsers.slice(0, 4).map(user => (
            <UserCard 
              key={user.id} 
              user={user} 
              distance={Math.floor(Math.random() * 5) + 1} 
              onConnect={() => handleConnectUser(user.id)}
            />
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
