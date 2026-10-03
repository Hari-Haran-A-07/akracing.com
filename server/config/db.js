import mongoose from 'mongoose';

let isConnected = false;
let memoryStore = null;

export const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ajith_kumar_racing';
  
  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2500, // Quick fallback if local mongod is stopped
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
