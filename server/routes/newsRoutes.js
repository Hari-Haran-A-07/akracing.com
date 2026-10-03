import express from 'express';
import { getNews, getNewsBySlug, createNews, updateNews, deleteNews } from '../controllers/newsController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getNews);
router.get('/:slug', getNewsBySlug);
router.post('/', protect, adminOnly, createNews);
router.put('/:id', protect, adminOnly, updateNews);
router.delete('/:id', protect, adminOnly, deleteNews);

export default router;
