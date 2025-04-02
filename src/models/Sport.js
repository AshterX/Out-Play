
import mongoose from 'mongoose';

const sportSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
});

const Sport = mongoose.models.Sport || mongoose.model('Sport', sportSchema);

export default Sport;
