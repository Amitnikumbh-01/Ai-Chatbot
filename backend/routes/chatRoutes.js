import express from 'express';
import {
  sendMessage,
  getChatHistory,
  deleteMessage,
  clearChatHistory,
} from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all routes
router.use(protect);

// Chat routes
router.post('/send', sendMessage);
router.get('/history', getChatHistory);
router.delete('/message/:messageId', deleteMessage);
router.delete('/clear', clearChatHistory);

export default router;