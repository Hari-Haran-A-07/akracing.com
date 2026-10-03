import express from 'express';
import { getLiveTelemetry, updateTelemetry } from '../controllers/telemetryController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/live', getLiveTelemetry);
router.put('/live', protect, adminOnly, updateTelemetry);

export default router;
