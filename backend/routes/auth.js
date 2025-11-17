import express from 'express';
import {
  register,
  login,
  customerLogin,
  servicemanLogin,
  adminLogin,
  getMe,
  updateProfile,
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Role-specific login routes
router.post('/login/customer', customerLogin);
router.post('/login/serviceman', servicemanLogin);
router.post('/login/admin', adminLogin);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

export default router;
