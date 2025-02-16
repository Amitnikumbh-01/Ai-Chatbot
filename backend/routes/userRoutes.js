import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // Protect all user routes

router.route('/profile')
  .get(getUserProfile)
  .put(updateUserProfile);

export default router;