import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  section: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  heroImage: { type: String, required: true },
  readTime: { type: String, default: '5 MIN READ' },
  quotes: [String],
  gallery: [String]
}, { timestamps: true });

export default mongoose.models.Story || mongoose.model('Story', storySchema);
