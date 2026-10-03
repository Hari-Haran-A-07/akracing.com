import express from 'express';
import {
  getRaces,
  getRaceById,
  createRace,
  updateRace,
  deleteRace,
  getResults,
  createResult,
  updateResult,
  deleteResult
} from '../controllers/raceController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getRaces);
router.get('/results', getResults);
router.get('/:id', getRaceById);
router.post('/', protect, adminOnly, createRace);
router.put('/:id', protect, adminOnly, updateRace);
router.delete('/:id', protect, adminOnly, deleteRace);

// Results sub-endpoints
router.post('/results', protect, adminOnly, createResult);
router.put('/results/:id', protect, adminOnly, updateResult);
router.delete('/results/:id', protect, adminOnly, deleteResult);

export default router;
