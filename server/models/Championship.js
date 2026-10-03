import mongoose from 'mongoose';

const championshipSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  season: { type: String, required: true },
  category: { type: String, required: true },
  driver: { type: String },
  car: { type: String },
  currentPosition: { type: String },
  points: { type: Number, default: 0 },
  totalRounds: { type: Number, default: 0 },
  status: { type: String, default: 'Active' },
  banner: { type: String },
  description: { type: String }
}, { timestamps: true });

export default mongoose.models.Championship || mongoose.model('Championship', championshipSchema);
