import express from 'express';
import { getMedia, createMedia, deleteMedia } from '../controllers/mediaController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getMedia);
router.post('/', protect, adminOnly, createMedia);
router.delete('/:id', protect, adminOnly, deleteMedia);

export default router;
