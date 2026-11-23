import express from 'express';
import { getEcosystemHealth } from '../controllers/ecosystemController.js';

const router = express.Router();

// GET /api/ecosystem/health - Live health status of all 5 connected repositories
router.get('/health', getEcosystemHealth);

export default router;
