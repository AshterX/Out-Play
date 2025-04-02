
import mongoose from 'mongoose';

const venueSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
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
  sports: {
    type: [String],
    default: []
  },
  pricing: {
    type: String,
    default: ''
  },
  availability: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: ''
  },
  amenities: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Venue = mongoose.models.Venue || mongoose.model('Venue', venueSchema);

export default Venue;
