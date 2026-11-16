import express from 'express';
import { healthCheck, readiness } from '../controllers/healthController.js';

const router = express.Router();

// GET /api/health - Server health status
router.get('/', healthCheck);

// GET /api/health/ready - Readiness probe
router.get('/ready', readiness);

export default router;
