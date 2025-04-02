
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Star, Clock, Phone } from 'lucide-react';

// Mock data for venues
const mockVenues = [
  {
    id: 'v1',
    name: 'Golden Gate Sports Complex',
    address: '123 Park Ave, San Francisco, CA',
    description: 'Multi-sports facility with football fields, tennis courts, and basketball courts',
    rating: 4.5,
    images: ['https://images.unsplash.com/photo-1587385789097-0197a7fbd179?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3'],
    sports: ['football', 'tennis', 'basketball'],
    pricePerHour: 50,
    openingHours: '7:00 AM - 10:00 PM',
    phone: '+1 (415) 555-1234',
    distance: 1.2
  },
  {
    id: 'v2',
    name: 'Bay Area Cricket Ground',
    address: '456 Field St, Oakland, CA',
    description: 'Professional cricket ground with well-maintained pitch',
    rating: 4.2,
    images: ['https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=3247&auto=format&fit=crop&ixlib=rb-4.0.3'],
    sports: ['cricket'],
    pricePerHour: 65,
    openingHours: '8:00 AM - 7:00 PM',
    phone: '+1 (510) 555-6789',
    distance: 3.5
  },
  {
    id: 'v3',
    name: 'Downtown Basketball Center',
    address: '789 Hoop Blvd, San Francisco, CA',
    description: 'Indoor basketball courts with professional flooring',
    rating: 4.8,
    images: ['https://images.unsplash.com/photo-1505666287802-931dc83a5dc9?q=80&w=3348&auto=format&fit=crop&ixlib=rb-4.0.3'],
    sports: ['basketball'],
    pricePerHour: 45,
    openingHours: '6:00 AM - 11:00 PM',
    phone: '+1 (415) 555-9012',
    distance: 0.8
  },
  {
    id: 'v4',
    name: 'Sunset Tennis Club',
    address: '101 Racket Rd, San Francisco, CA',
    description: 'Premium tennis courts with coaching available',
    rating: 4.6,
    images: ['https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3'],
    sports: ['tennis'],
    pricePerHour: 35,
    openingHours: '7:00 AM - 9:00 PM',
    phone: '+1 (415) 555-3456',
    distance: 2.1
  },
  {
    id: 'v5',
    name: 'Marina Football Fields',
    address: '202 Goal St, San Francisco, CA',
    description: 'Well-maintained football fields with floodlights for night games',
    rating: 4.3,
    images: ['https://images.unsplash.com/photo-1624880357913-a8539238245b?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3'],
    sports: ['football'],
    pricePerHour: 55,
    openingHours: '8:00 AM - 10:00 PM',
    phone: '+1 (415) 555-7890',
    distance: 1.7
  }
];

const Venues = () => {
  const [venues, setVenues] = useState(mockVenues);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  
  const filteredVenues = venues.filter(venue => {
    // Filter by search term
    const matchesSearch = searchTerm === '' || 
      venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.address.toLowerCase().includes(searchTerm.toLowerCase());
      
    // Filter by selected sport  
    const matchesSport = selectedSport === null || 
      venue.sports.includes(selectedSport);
      
    return matchesSearch && matchesSport;
  });
  
  const handleSportFilter = (sport: string) => {
    setSelectedSport(sport === selectedSport ? null : sport);
  };
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Nearby Venues</h1>
        <p className="text-muted-foreground">
          Discover and book sports venues in your area
        </p>
      </div>
      
      {/* Search and filters */}
      <div className="mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search venues by name or location..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedSport === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedSport(null)}
          >
            All Venues
          </Badge>
          <Badge
            variant={selectedSport === 'football' ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => handleSportFilter('football')}
          >
            Football
          </Badge>
          <Badge
            variant={selectedSport === 'basketball' ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => handleSportFilter('basketball')}
          >
            Basketball
          </Badge>
          <Badge
            variant={selectedSport === 'tennis' ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => handleSportFilter('tennis')}
          >
            Tennis
          </Badge>
          <Badge
            variant={selectedSport === 'cricket' ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => handleSportFilter('cricket')}
          >
            Cricket
          </Badge>
        </div>
      </div>
      
      {/* Results */}
      {filteredVenues.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No venues found matching your search</p>
          <Button 
            variant="link" 
            onClick={() => {
              setSearchTerm('');
              setSelectedSport(null);
            }}
          >
            Clear all filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredVenues.map((venue) => (
            <Card key={venue.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5">
                  <img 
                    src={venue.images[0]} 
                    alt={venue.name}
                    className="w-full h-full object-cover aspect-square md:aspect-auto" 
                  />
                </div>
                <div className="md:w-3/5 p-4 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{venue.name}</h3>
                    <div className="flex items-center bg-yellow-100 text-yellow-800 rounded px-2 py-1 text-sm">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 mr-1" />
                      {venue.rating}
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-1 text-sm text-muted-foreground mb-2">
                    <MapPin size={14} className="mt-0.5 shrink-0" />
                    <span>{venue.address}</span>
                  </div>
                  
                  <p className="text-sm mb-2 line-clamp-2 flex-grow">{venue.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-2">
                    {venue.sports.map(sport => (
                      <Badge key={sport} variant="outline" className="text-xs">
                        {sport.charAt(0).toUpperCase() + sport.slice(1)}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm mb-1">
                    <Clock size={14} className="text-muted-foreground" />
                    <span>{venue.openingHours}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm">
                    <Phone size={14} className="text-muted-foreground" />
                    <span>{venue.phone}</span>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-brand-primary">${venue.pricePerHour}</span>
                      <span className="text-sm text-muted-foreground"> /hour</span>
                    </div>
                    <Button size="sm">Book Now</Button>
                  </div>
                </div>
              </div>
              <CardFooter className="bg-gray-50 px-4 py-2 text-sm">
                <MapPin size={14} className="mr-1 text-brand-accent" />
                <span>{venue.distance} km away from your location</span>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </MainLayout>
  );
};

export default Venues;
