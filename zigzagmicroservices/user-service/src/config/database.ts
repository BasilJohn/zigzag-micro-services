import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const dbConnect = async () => {
  try {
    const uri = process.env.MONGO_URI || '';
    if (!uri) {
      throw new Error('MONGO_URI not found in environment variables');
    }

    await mongoose.connect(uri);
    console.log(`Connected to MongoDB:${uri}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};