import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: String,
    country: String,
    postalCode: String,
    phone: String
  },
  items: [
    {
      productId: String,
      name: String,
      size: String,
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: { type: Number, required: true },
  currency: { type: String, default: 'EUR' },
  status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'processing' },
  paymentStatus: { type: String, enum: ['paid', 'pending', 'refunded'], default: 'paid' },
  trackingNumber: { type: String }
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
