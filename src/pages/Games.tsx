
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import GameCard from '@/components/game/GameCard';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { 
  getCurrentUser, 
  getNearbyGames, 
  getUserGames, 
  joinGame, 
  sports 
} from '@/data/mockData';
import { Game } from '@/data/mockData';

const Games = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [allGames, setAllGames] = useState<Game[]>(getNearbyGames(currentUser.id));
  const [myGames, setMyGames] = useState<Game[]>(getUserGames(currentUser.id));
  const [filteredGames, setFilteredGames] = useState<Game[]>(allGames);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("discover");
  
  useEffect(() => {
    const games = activeTab === "discover" ? allGames : myGames;
    let result = games;
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(game => 
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.location.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by selected sport
    if (selectedSport) {
      result = result.filter(game => game.sport === selectedSport);
    }
    
    setFilteredGames(result);
  }, [searchTerm, selectedSport, allGames, myGames, activeTab]);
  
  const handleJoinGame = (gameId: string) => {
    const success = joinGame(gameId, currentUser.id);
    
    if (success) {
      toast({
        title: "Success!",
        description: "You've joined the game. Check your games page for details.",
      });
      
      // Update the games lists
      setAllGames(getNearbyGames(currentUser.id));
      setMyGames(getUserGames(currentUser.id));
    } else {
      toast({
        title: "Unable to join",
        description: "This game is full or you're already a member.",
        variant: "destructive",
      });
    }
  };
  
  const handleCreateGame = () => {
    navigate('/games/new');
  };
  
  const toggleSportFilter = (sportId: string) => {
    if (selectedSport === sportId) {
      setSelectedSport(null);
    } else {
      setSelectedSport(sportId);
    }
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSport(null);
  };
  
  return (
    <MainLayout>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Games</h1>
          <p className="text-muted-foreground">
            Discover and join games or create your own
          </p>
        </div>
        <Button 
          className="btn-primary flex items-center gap-2"
          onClick={handleCreateGame}
        >
          <Plus className="h-4 w-4" />
          Create Game
        </Button>
      </div>
      
      {/* Tabs */}
      <Tabs 
        defaultValue="discover" 
        onValueChange={setActiveTab}
        className="w-full mb-6"
      >
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="discover" className="flex-1">
            Discover Games
          </TabsTrigger>
          <TabsTrigger value="my-games" className="flex-1">
            My Games
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="discover" className="mt-6">
          {/* Search and filters */}
          <div className="mb-6">
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search games..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                Date
              </Button>
            </div>
            
            {/* Sport filters */}
            <div className="flex flex-wrap gap-2 mb-4">
              {sports.map(sport => (
                <Badge
                  key={sport.id}
                  variant={selectedSport === sport.id ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleSportFilter(sport.id)}
                >
                  {sport.icon} {sport.name}
                </Badge>
              ))}
            </div>
            
            {/* Active filters */}
            {(searchTerm || selectedSport) && (
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs"
                  onClick={clearFilters}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
          
          {/* Results */}
          {filteredGames.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No games found matching your filters</p>
              <Button 
                variant="link" 
                onClick={clearFilters}
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGames.map(game => (
                <GameCard 
                  key={game.id} 
                  game={game} 
                  onJoin={() => handleJoinGame(game.id)}
                  alreadyJoined={game.currentPlayers.includes(currentUser.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="my-games" className="mt-6">
          {myGames.length === 0 ? (
            <div className="text-center py-12 border rounded-lg bg-gray-50">
              <h3 className="text-lg font-medium mb-2">You haven't joined any games yet</h3>
              <p className="text-muted-foreground mb-4">
                Find and join games you're interested in
              </p>
              <Button 
                onClick={() => setActiveTab("discover")}
                className="btn-primary"
              >
                Discover Games
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGames.map(game => (
                <GameCard 
                  key={game.id} 
                  game={game} 
                  alreadyJoined={true}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Games;
