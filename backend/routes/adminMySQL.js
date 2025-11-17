import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Placeholder controllers - will be created
const adminController = {
  getDashboardStats: (req, res) => {
    res.json({ 
      success: true, 
      data: {
        overview: {
          totalUsers: 5,
          totalOrders: 4,
          totalProducts: 18,
          totalRevenue: 50000
        }
      }
    });
  },
  getAllUsers: (req, res) => {
    res.json({ success: true, message: 'Get all users endpoint - coming soon' });
  },
  updateUserRole: (req, res) => {
    res.json({ success: true, message: 'Update user role endpoint - coming soon' });
  },
  deleteUser: (req, res) => {
    res.json({ success: true, message: 'Delete user endpoint - coming soon' });
  },
};

router.use(protect, admin); // All admin routes require authentication and admin role

router.get('/stats', adminController.getDashboardStats);
router.get('/users', adminController.getAllUsers);
router.put('/users/:id/role', adminController.updateUserRole);
router.delete('/users/:id', adminController.deleteUser);

export default router;
