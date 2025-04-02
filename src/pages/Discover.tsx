
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import UserCard from '@/components/user/UserCard';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getCurrentUser, getNearbyUsers, sports } from '@/data/mockData';
import { User } from '@/data/mockData';

const Discover = () => {
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [nearbyUsers, setNearbyUsers] = useState<User[]>(getNearbyUsers(currentUser.id));
  const [filteredUsers, setFilteredUsers] = useState<User[]>(nearbyUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [skillLevel, setSkillLevel] = useState<string | null>(null);
  
  useEffect(() => {
    let result = nearbyUsers;
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.bio.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by selected sports
    if (selectedSports.length > 0) {
      result = result.filter(user => 
        user.sports.some(sport => selectedSports.includes(sport))
      );
    }
    
    // Filter by skill level
    if (skillLevel) {
      result = result.filter(user => user.skillLevel === skillLevel);
    }
    
    setFilteredUsers(result);
  }, [searchTerm, selectedSports, skillLevel, nearbyUsers]);
  
  const handleConnectUser = (userId: string) => {
    toast({
      title: "Connection request sent!",
      description: "You'll be notified when they respond.",
    });
  };
  
  const toggleSportFilter = (sportId: string) => {
    if (selectedSports.includes(sportId)) {
      setSelectedSports(selectedSports.filter(id => id !== sportId));
    } else {
      setSelectedSports([...selectedSports, sportId]);
    }
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSports([]);
    setSkillLevel(null);
  };
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Discover Players</h1>
        <p className="text-muted-foreground">
          Find other players who share your interests and skill level
        </p>
      </div>
      
      {/* Search and filters */}
      <div className="mb-6">
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search players..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
        
        {/* Sport filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {sports.map(sport => (
            <Badge
              key={sport.id}
              variant={selectedSports.includes(sport.id) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleSportFilter(sport.id)}
            >
              {sport.icon} {sport.name}
            </Badge>
          ))}
        </div>
        
        {/* Skill level */}
        <div className="mb-4">
          <Tabs 
            defaultValue={skillLevel || "all"} 
            onValueChange={(value) => setSkillLevel(value === "all" ? null : value)}
            className="w-full"
          >
            <TabsList className="w-full max-w-md">
              <TabsTrigger value="all" className="flex-1">All Levels</TabsTrigger>
              <TabsTrigger value="beginner" className="flex-1">Beginner</TabsTrigger>
              <TabsTrigger value="intermediate" className="flex-1">Intermediate</TabsTrigger>
              <TabsTrigger value="advanced" className="flex-1">Advanced</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Active filters */}
        {(selectedSports.length > 0 || skillLevel) && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {skillLevel && (
              <Badge variant="secondary" className="gap-1">
                {skillLevel.charAt(0).toUpperCase() + skillLevel.slice(1)}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setSkillLevel(null)} 
                />
              </Badge>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs"
              onClick={clearFilters}
            >
              Clear all
            </Button>
          </div>
        )}
      </div>
      
      {/* Results */}
      <div>
        {filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No players found matching your filters</p>
            <Button 
              variant="link" 
              onClick={clearFilters}
            >
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredUsers.map(user => (
              <UserCard 
                key={user.id} 
                user={user} 
                distance={Math.floor(Math.random() * 5) + 1} 
                onConnect={() => handleConnectUser(user.id)}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Discover;
