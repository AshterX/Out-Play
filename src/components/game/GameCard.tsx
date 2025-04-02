
import React from 'react';
import { Game, getUserById } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GameCardProps {
  game: Game;
  onJoin?: () => void;
  alreadyJoined?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ game, onJoin, alreadyJoined = false }) => {
  const navigate = useNavigate();
  const creator = getUserById(game.creatorId);
  
  // Format the date
  const formattedDate = new Date(game.date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short', 
    day: 'numeric'
  });
  
  // Calculate spots left
  const spotsLeft = game.maxPlayers - game.currentPlayers.length;
  
  return (
    <Card className="card-hover overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          {/* Game image */}
          <img 
            src={game.imageUrl} 
            alt={game.title}
            className="h-40 w-full object-cover" 
          />
          
          {/* Sport badge */}
          <Badge className="absolute top-2 right-2 bg-white/90 text-black">
            {game.sport.charAt(0).toUpperCase() + game.sport.slice(1)}
          </Badge>
          
          {/* Player count */}
          <div className="absolute bottom-2 right-2 bg-black/70 text-white rounded-full py-1 px-2 text-xs flex items-center gap-1">
            <Users size={14} />
            <span>{game.currentPlayers.length}/{game.maxPlayers}</span>
          </div>
        </div>
        
        {/* Game info */}
        <div className="p-4">
          <h3 className="font-bold text-lg line-clamp-1">{game.title}</h3>
          
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <MapPin size={14} className="mr-1" />
            <span className="line-clamp-1">{game.location.address}</span>
          </div>
          
          <div className="flex flex-wrap gap-x-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>{game.time}</span>
            </div>
          </div>
          
          <div className="flex items-center mb-4">
            <img 
              src={creator?.avatar} 
              alt={creator?.name} 
              className="h-6 w-6 rounded-full mr-2"
            />
            <span className="text-sm">Organized by <span className="font-medium">{creator?.name}</span></span>
          </div>
          
          <div className="flex items-center justify-between">
            <Button 
              onClick={() => navigate(`/games/${game.id}`)}
              variant="outline"
              size="sm"
            >
              View Details
            </Button>
            
            {onJoin && !alreadyJoined && spotsLeft > 0 && (
              <Button 
                onClick={onJoin}
                size="sm"
                className="btn-primary"
              >
                Join Game
              </Button>
            )}
            
            {alreadyJoined && (
              <Badge variant="secondary" className="pointer-events-none">
                Joined
              </Badge>
            )}
            
            {spotsLeft === 0 && !alreadyJoined && (
              <Badge variant="outline" className="pointer-events-none">
                Full
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameCard;
