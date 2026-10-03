import mongoose from 'mongoose';

const raceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  round: { type: String, required: true },
  title: { type: String, required: true },
  circuit: { type: String, required: true },
  country: { type: String, required: true },
  location: { type: String },
  date: { type: String, required: true },
  status: { type: String, enum: ['upcoming', 'live', 'completed'], default: 'upcoming' },
  trackLength: { type: String },
  lapCount: { type: String },
  weather: { type: String },
  championship: { type: String },
  circuitMapUrl: { type: String }
}, { timestamps: true });

export default mongoose.models.Race || mongoose.model('Race', raceSchema);
