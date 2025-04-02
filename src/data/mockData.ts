
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  sports: string[];
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  location: {
    latitude: number;
    longitude: number;
    city: string;
  };
  availability: string[];
}

export interface Game {
  id: string;
  title: string;
  sport: string;
  creatorId: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  date: string;
  time: string;
  maxPlayers: number;
  currentPlayers: string[];
  description: string;
  imageUrl: string;
}

export const sports = [
  { id: 'football', name: 'Football', icon: '⚽' },
  { id: 'basketball', name: 'Basketball', icon: '🏀' },
  { id: 'tennis', name: 'Tennis', icon: '🎾' },
  { id: 'volleyball', name: 'Volleyball', icon: '🏐' },
  { id: 'badminton', name: 'Badminton', icon: '🏸' },
  { id: 'cricket', name: 'Cricket', icon: '🏏' },
  { id: 'tabletennis', name: 'Table Tennis', icon: '🏓' },
  { id: 'baseball', name: 'Baseball', icon: '⚾' },
];

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Love playing football and basketball on weekends!',
    sports: ['football', 'basketball'],
    skillLevel: 'intermediate',
    location: {
      latitude: 37.7749,
      longitude: -122.4194,
      city: 'San Francisco'
    },
    availability: ['weekend', 'evening']
  },
  {
    id: 'u2',
    name: 'Samantha Lee',
    email: 'samlee@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Tennis enthusiast looking for friendly matches',
    sports: ['tennis', 'badminton'],
    skillLevel: 'advanced',
    location: {
      latitude: 37.7833,
      longitude: -122.4167,
      city: 'San Francisco'
    },
    availability: ['weekday', 'afternoon']
  },
  {
    id: 'u3',
    name: 'Michael Chen',
    email: 'mchen@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    bio: 'Cricket and volleyball player. Always up for a game!',
    sports: ['cricket', 'volleyball'],
    skillLevel: 'beginner',
    location: {
      latitude: 37.7694,
      longitude: -122.4862,
      city: 'San Francisco'
    },
    availability: ['weekend', 'morning']
  },
  {
    id: 'u4',
    name: 'Jessica Taylor',
    email: 'jtaylor@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    bio: 'Basketball player with 5 years of experience',
    sports: ['basketball', 'volleyball'],
    skillLevel: 'advanced',
    location: {
      latitude: 37.8044,
      longitude: -122.2711,
      city: 'Oakland'
    },
    availability: ['weekend', 'evening']
  },
  {
    id: 'u5',
    name: 'David Wilson',
    email: 'dwilson@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
    bio: 'Football fanatic. Looking for 5-a-side games.',
    sports: ['football', 'tennis'],
    skillLevel: 'intermediate',
    location: {
      latitude: 37.5630,
      longitude: -122.3255,
      city: 'Redwood City'
    },
    availability: ['weekday', 'evening']
  },
];

export const mockGames: Game[] = [
  {
    id: 'g1',
    title: 'Sunday Football Match',
    sport: 'football',
    creatorId: 'u1',
    location: {
      latitude: 37.7749,
      longitude: -122.4194,
      address: 'Golden Gate Park, San Francisco'
    },
    date: '2023-06-18',
    time: '10:00 AM',
    maxPlayers: 10,
    currentPlayers: ['u1', 'u5'],
    description: 'Casual 5-a-side football match. All skill levels welcome!',
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: 'g2',
    title: 'Tennis Doubles',
    sport: 'tennis',
    creatorId: 'u2',
    location: {
      latitude: 37.7833,
      longitude: -122.4167,
      address: 'San Francisco Tennis Club'
    },
    date: '2023-06-17',
    time: '2:00 PM',
    maxPlayers: 4,
    currentPlayers: ['u2', 'u5'],
    description: 'Looking for 2 more players for doubles. Intermediate level.',
    imageUrl: 'https://images.unsplash.com/photo-1531315630201-bb15abeb1653?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: 'g3',
    title: 'Basketball Pickup Game',
    sport: 'basketball',
    creatorId: 'u4',
    location: {
      latitude: 37.8044,
      longitude: -122.2711,
      address: 'Oakland Recreation Center'
    },
    date: '2023-06-20',
    time: '6:00 PM',
    maxPlayers: 10,
    currentPlayers: ['u4', 'u1'],
    description: 'Evening basketball game. Looking for players of all skill levels.',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=3090&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: 'g4',
    title: 'Cricket Match',
    sport: 'cricket',
    creatorId: 'u3',
    location: {
      latitude: 37.7694,
      longitude: -122.4862,
      address: 'Ocean Beach, San Francisco'
    },
    date: '2023-06-25',
    time: '9:00 AM',
    maxPlayers: 22,
    currentPlayers: ['u3'],
    description: 'Morning cricket match. Bring your own equipment if possible.',
    imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=3247&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: 'g5',
    title: 'Badminton Tournament',
    sport: 'badminton',
    creatorId: 'u2',
    location: {
      latitude: 37.7833,
      longitude: -122.4167,
      address: 'City Sports Club, San Francisco'
    },
    date: '2023-06-30',
    time: '4:00 PM',
    maxPlayers: 8,
    currentPlayers: ['u2'],
    description: 'Mini badminton tournament. Singles and doubles matches.',
    imageUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3'
  }
];

// Utility function to generate a random user (for demonstration purposes)
export function getCurrentUser(): User {
  return mockUsers[0]; // Default to first user for demo
}

// Utility function to get a user by ID
export function getUserById(id: string): User | undefined {
  return mockUsers.find(user => user.id === id);
}

// Utility function to get nearby users (simplified)
export function getNearbyUsers(userId: string): User[] {
  const currentUser = getUserById(userId);
  if (!currentUser) return [];
  
  // In a real app, we'd calculate distance and filter by proximity
  return mockUsers.filter(user => user.id !== userId);
}

// Utility function to get nearby games (simplified)
export function getNearbyGames(userId: string): Game[] {
  // In a real app, we'd calculate distance and filter by proximity
  return mockGames;
}

// Utility function to get games a user is part of
export function getUserGames(userId: string): Game[] {
  return mockGames.filter(game => game.currentPlayers.includes(userId));
}

// Utility function to join a game
export function joinGame(gameId: string, userId: string): boolean {
  const game = mockGames.find(g => g.id === gameId);
  if (!game) return false;
  
  if (game.currentPlayers.includes(userId)) return true; // Already joined
  
  if (game.currentPlayers.length < game.maxPlayers) {
    game.currentPlayers.push(userId);
    return true;
  }
  
  return false; // Game full
}
