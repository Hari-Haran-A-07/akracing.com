import express from 'express';
import { getDriver, updateDriver } from '../controllers/driverController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getDriver);
router.put('/', protect, adminOnly, updateDriver);

export default router;
