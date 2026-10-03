import express from 'express';
import { getStories, getStoryBySlug, createStory, updateStory, deleteStory } from '../controllers/storyController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getStories);
router.get('/:slug', getStoryBySlug);
router.post('/', protect, adminOnly, createStory);
router.put('/:id', protect, adminOnly, updateStory);
router.delete('/:id', protect, adminOnly, deleteStory);

export default router;
