import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import { seedContent } from './contentSeed.js';
import { seedTeam } from './teamSeed.js';

dotenv.config();

const runSeed = async () => {
  try {
    await connectDB();
    await seedTeam();
    await seedContent();
    console.log('Database content seed completed successfully');
  } catch (error) {
    console.error('Database content seed failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

runSeed();