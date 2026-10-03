import mongoose from 'mongoose';

let isConnected = false;
let memoryStore = null;

export const connectDB = async () => {
  if (isConnected) return mongoose.connection;
  
  const mongoUri = process.env.MONGODB_URI || (!process.env.VERCEL ? 'mongodb://127.0.0.1:27017/ajith_kumar_racing' : null);
  
  if (!mongoUri) {
    console.log(`[AKR DATABASE] In-Memory High-Speed Storage Engine Active.`);
    isConnected = false;
    return null;
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2000,
    });
    isConnected = true;
    console.log(`[AKR DATABASE] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`[AKR DATABASE] MongoDB daemon not reachable (${error.message}). Activating High-Speed Dynamic In-Memory / Cached Storage Engine.`);
    isConnected = false;
    return null;
  }
};

export const getDbStatus = () => ({
  connected: isConnected,
  mode: isConnected ? 'MongoDB Live Cluster' : 'In-Memory High-Speed Storage Engine'
});
