import { store } from '../utils/store.js';

export const getProducts = async (req, res) => {
  try {
    const { category, featured } = req.query;
    let products = store.get('products');

    if (category && category !== 'ALL') {
      products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (featured === 'true') {
      products = products.filter(p => p.featured);
    }

    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const product = store.findById('products', req.params.slug);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const slug = req.body.slug || req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newProduct = store.create('products', { ...req.body, slug });
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updated = store.update('products', req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deleted = store.delete('products', req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { customer, items, totalAmount } = req.body;
    if (!customer || !items || !items.length) {
      return res.status(400).json({ success: false, message: 'Invalid order payload' });
    }

    const newOrder = store.create('orders', {
      customer,
      items,
      totalAmount,
      currency: 'EUR',
      status: 'processing',
      paymentStatus: 'paid',
      trackingNumber: `AKR-EXP-${Math.floor(100000 + Math.random() * 900000)}`
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully. Welcome to the AKR paddock.',
      data: newOrder
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = store.get('orders');
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const updated = store.update('orders', req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
