import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, default: 'EUR' },
  images: [String],
  description: { type: String, required: true },
  sizes: [String],
  inStock: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  specs: [String]
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', productSchema);
