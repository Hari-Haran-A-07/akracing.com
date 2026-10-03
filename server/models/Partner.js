import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  tier: { type: String, default: 'OFFICIAL' },
  category: { type: String, required: true },
  description: { type: String, required: true },
  logo: { type: String, required: true },
  website: { type: String }
}, { timestamps: true });

export default mongoose.models.Partner || mongoose.model('Partner', partnerSchema);
