import express from 'express';
import { store } from '../utils/store.js';
import { getDbStatus } from '../config/db.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/metrics', protect, adminOnly, async (req, res) => {
  try {
    const metrics = {
      dbStatus: getDbStatus(),
      counts: {
        cars: store.get('cars').length,
        championships: store.get('championships').length,
        races: store.get('races').length,
        results: store.get('results').length,
        news: store.get('news').length,
        stories: store.get('stories').length,
        media: store.get('media').length,
        team: store.get('team').length,
        partners: store.get('partners').length,
        products: store.get('products').length,
        orders: store.get('orders').length,
        messages: store.get('messages').length,
        subscribers: store.get('subscribers').length
      },
      system: {
        serverTime: new Date().toISOString(),
        uptime: process.uptime(),
        nodeVersion: process.version,
        environment: process.env.NODE_ENV || 'development'
      }
    };
    res.json({ success: true, data: metrics });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
