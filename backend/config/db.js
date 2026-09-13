import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('MongoDB configuration error: MONGO_URI/MONGODB_URI is missing in .env');
}

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB runtime error:', error.message);
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});

const connectDB = async () => {
  if (!mongoUri) {
    console.error('MongoDB startup failed: MONGO_URI is undefined. Check your .env file.');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(`MongoDB connected using URI: ${mongoUri.replace(/:([^@]+)@/, ':***@')}`);
    return true;
  } catch (error) {
    console.error('MongoDB connection failed. Real error:', error.message);

    if (error?.reason) {
      console.error('Connection reason:', error.reason);
    }

    const message = error.message.toLowerCase();
    if (message.includes('authentication failed') || message.includes('auth')) {
      console.error('Possible cause: MongoDB username/password is incorrect or the database user does not have access.');
    } else if (message.includes('econnrefused') || message.includes('not running') || message.includes('timeout')) {
      console.error('Possible cause: MongoDB is not running, is not listening on the port, or the network cannot reach it.');
    } else if (message.includes('invalid uri') || message.includes('mongodburi')) {
      console.error('Possible cause: the MongoDB URI is malformed or missing required credentials/host details.');
    } else {
      console.error('Possible cause: wrong URI, MongoDB service not available, network issue, or authentication failure.');
    }

    process.exit(1);
  }
};

export default connectDB;
