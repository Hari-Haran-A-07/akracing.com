import express from 'express';
import { subscribe, getSubscribers } from '../controllers/newsletterController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.post('/subscribe', subscribe);
router.get('/subscribers', protect, adminOnly, getSubscribers);

export default router;
