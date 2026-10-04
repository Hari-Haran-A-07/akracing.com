import express from 'express';
import { getDriver, getDrivers, getDriverById, updateDriver } from '../controllers/driverController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getDriver);
router.get('/all', getDrivers);
router.get('/:id', getDriverById);
router.put('/', protect, adminOnly, updateDriver);

export default router;
