import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  number: { type: String, required: true },
  nationality: { type: String, default: 'Indian' },
  team: { type: String, default: 'AJITH KUMAR RACING (AKR)' },
  role: { type: String, default: 'Lead Driver & Team Principal' },
  status: { type: String },
  bio: { type: String, required: true },
  philosophy: { type: String },
  stats: {
    raceStarts: { type: Number, default: 0 },
    podiums: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    polePositions: { type: Number, default: 0 },
    fastestLaps: { type: Number, default: 0 },
    championships: { type: Number, default: 0 },
    careerKm: { type: String },
    maxGForce: { type: String }
  },
  specs: {
    height: String,
    weight: String,
    bloodType: String,
    homeCircuit: String,
    preferredSetup: String
  },
  images: {
    portrait: String,
    racingSuit: String,
    helmet: String,
    action: String,
    cockpit: String
  },
  careerTimeline: [
    {
      year: String,
      period: String,
      category: String,
      circuit: String,
      description: String,
      achievement: String,
      image: String
    }
  ]
}, { timestamps: true });

export default mongoose.models.Driver || mongoose.model('Driver', driverSchema);
