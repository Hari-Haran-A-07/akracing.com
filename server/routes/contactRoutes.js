import express from 'express';
import { sendMessage, getMessages, updateMessageStatus } from '../controllers/contactController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.post('/', sendMessage);
router.get('/', protect, adminOnly, getMessages);
router.put('/:id', protect, adminOnly, updateMessageStatus);

export default router;
