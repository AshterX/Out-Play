
import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  sport: {
    type: String,
    required: true
  },
  creatorId: {
    type: String,
    required: true
  },
  location: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  maxPlayers: {
    type: Number,
    required: true
  },
  currentPlayers: {
    type: [String],
    default: []
  },
  description: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Game = mongoose.models.Game || mongoose.model('Game', gameSchema);

export default Game;
