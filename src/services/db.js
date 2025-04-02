
import clientPromise from '../config/mongodb';

// Generic function to get a collection
export async function getCollection(collectionName) {
  const client = await clientPromise;
  const db = client.db();
  return db.collection(collectionName);
}

// User functions
export async function getUsers() {
  const collection = await getCollection('users');
  return collection.find({}).toArray();
}

export async function getUserById(id) {
  const collection = await getCollection('users');
  return collection.findOne({ id });
}

export async function getNearbyUsers(userId, maxDistance = 10) {
  // In a real app, we would use geospatial queries
  // For now, just return all users except the current one
  const collection = await getCollection('users');
  return collection.find({ id: { $ne: userId } }).toArray();
}

export async function createUser(user) {
  const collection = await getCollection('users');
  return collection.insertOne(user);
}

export async function updateUser(id, updates) {
  const collection = await getCollection('users');
  return collection.updateOne({ id }, { $set: updates });
}

// Game functions
export async function getGames() {
  const collection = await getCollection('games');
  return collection.find({}).toArray();
}

export async function getGameById(id) {
  const collection = await getCollection('games');
  return collection.findOne({ id });
}

export async function getNearbyGames(userId, maxDistance = 10) {
  // In a real app, we would use geospatial queries
  // For now, just return all games
  const collection = await getCollection('games');
  return collection.find({}).toArray();
}

export async function getUserGames(userId) {
  const collection = await getCollection('games');
  return collection.find({ currentPlayers: userId }).toArray();
}

export async function createGame(game) {
  const collection = await getCollection('games');
  return collection.insertOne(game);
}

export async function updateGame(id, updates) {
  const collection = await getCollection('games');
  return collection.updateOne({ id }, { $set: updates });
}

export async function joinGame(gameId, userId) {
  const game = await getGameById(gameId);
  if (!game) return false;
  
  if (game.currentPlayers.includes(userId)) return true; // Already joined
  
  if (game.currentPlayers.length < game.maxPlayers) {
    const collection = await getCollection('games');
    await collection.updateOne(
      { id: gameId }, 
      { $push: { currentPlayers: userId } }
    );
    return true;
  }
  
  return false; // Game full
}

// Sport functions
export async function getSports() {
  const collection = await getCollection('sports');
  return collection.find({}).toArray();
}

// Venue functions
export async function getVenues() {
  const collection = await getCollection('venues');
  return collection.find({}).toArray();
}

export async function getVenueById(id) {
  const collection = await getCollection('venues');
  return collection.findOne({ id });
}

export async function getNearbyVenues(location, maxDistance = 10) {
  // In a real app, we would use geospatial queries
  // For now, just return all venues
  const collection = await getCollection('venues');
  return collection.find({}).toArray();
}

export async function createVenue(venue) {
  const collection = await getCollection('venues');
  return collection.insertOne(venue);
}

export async function updateVenue(id, updates) {
  const collection = await getCollection('venues');
  return collection.updateOne({ id }, { $set: updates });
}
