import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  uploadProfileImage,
  deleteProfileImage,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// All routes are protected (require authentication)
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, upload.single('profileImage'), updateUserProfile);
router.post('/profile/image', protect, upload.single('profileImage'), uploadProfileImage);
router.delete('/profile/image', protect, deleteProfileImage);

export default router;
