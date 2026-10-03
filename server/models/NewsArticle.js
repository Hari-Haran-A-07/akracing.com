import mongoose from 'mongoose';

const newsArticleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  coverImage: { type: String, required: true },
  author: { type: String, default: 'AKR Press Office' },
  publishDate: { type: String, required: true },
  readTime: { type: String, default: '4 MIN READ' },
  tags: [String],
  featured: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.NewsArticle || mongoose.model('NewsArticle', newsArticleSchema);
