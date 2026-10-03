import express from 'express';
import {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  createOrder,
  getOrders,
  updateOrderStatus
} from '../controllers/shopController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:slug', getProductBySlug);
router.post('/products', protect, adminOnly, createProduct);
router.put('/products/:id', protect, adminOnly, updateProduct);
router.delete('/products/:id', protect, adminOnly, deleteProduct);

// Orders
router.post('/orders', createOrder);
router.get('/orders', protect, adminOnly, getOrders);
router.put('/orders/:id', protect, adminOnly, updateOrderStatus);

export default router;
