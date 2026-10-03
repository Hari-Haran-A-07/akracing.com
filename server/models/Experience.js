import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  duration: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  includes: [String],
  price: { type: String, required: true },
  badge: { type: String }
}, { timestamps: true });

export default mongoose.models.Experience || mongoose.model('Experience', experienceSchema);
