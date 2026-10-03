import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  modelCode: { type: String, required: true },
  class: { type: String, required: true },
  season: { type: String, default: '2026' },
  subtitle: { type: String },
  description: { type: String, required: true },
  specs: {
    engine: String,
    power: String,
    torque: String,
    topSpeed: String,
    acceleration: String,
    weight: String,
    transmission: String,
    brakes: String,
    downforce: String,
    electronics: String
  },
  images: {
    hero: String,
    front: String,
    side: String,
    cockpit: String,
    engine: String,
    track: String
  },
  hotspots: [
    {
      id: String,
      title: String,
      category: String,
      x: Number,
      y: Number,
      summary: String,
      detail: String
    }
  ]
}, { timestamps: true });

export default mongoose.models.Car || mongoose.model('Car', carSchema);
