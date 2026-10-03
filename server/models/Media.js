import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, enum: ['photo', 'video'], default: 'photo' },
  url: { type: String, required: true },
  thumbnailUrl: { type: String },
  caption: { type: String },
  location: { type: String },
  date: { type: String }
}, { timestamps: true });

export default mongoose.models.Media || mongoose.model('Media', mediaSchema);
