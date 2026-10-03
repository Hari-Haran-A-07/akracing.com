import express from 'express';
import { getChampionships, getChampionshipById, createChampionship, updateChampionship, deleteChampionship } from '../controllers/championshipController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getChampionships);
router.get('/:id', getChampionshipById);
router.post('/', protect, adminOnly, createChampionship);
router.put('/:id', protect, adminOnly, updateChampionship);
router.delete('/:id', protect, adminOnly, deleteChampionship);

export default router;
