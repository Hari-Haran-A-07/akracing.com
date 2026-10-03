import mongoose from 'mongoose';

const raceResultSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  round: { type: String, required: true },
  season: { type: String, required: true },
  raceTitle: { type: String, required: true },
  circuit: { type: String, required: true },
  date: { type: String, required: true },
  qualifying: { type: String },
  racePosition: { type: String, required: true },
  points: { type: Number, default: 0 },
  status: { type: String },
  fastestLap: { type: String },
  gap: { type: String },
  sectorTimes: {
    s1: String,
    s2: String,
    s3: String
  },
  highlights: { type: String }
}, { timestamps: true });

export default mongoose.models.RaceResult || mongoose.model('RaceResult', raceResultSchema);
