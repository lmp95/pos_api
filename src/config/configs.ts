import { config } from 'dotenv';

config();
// Mongodb URL
export const mongoURI = process.env.MONGODB_URI;
