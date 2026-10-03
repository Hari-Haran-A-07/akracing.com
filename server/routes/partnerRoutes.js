import express from 'express';
import { getPartners, createPartner, deletePartner } from '../controllers/partnerController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPartners);
router.post('/', protect, adminOnly, createPartner);
router.delete('/:id', protect, adminOnly, deletePartner);

export default router;
