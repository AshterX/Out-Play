
import { MongoClient } from 'mongodb';

// MongoDB Connection URI (should be stored in environment variables in production)
const uri = "mongodb://localhost:27017/playconnect";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Create a MongoDB client
let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
