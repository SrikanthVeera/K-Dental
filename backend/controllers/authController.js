import { User, PasswordResetToken } from '../models/index.js';
import { generateToken } from '../middleware/authMiddleware.js';
import { sendPasswordResetEmail, sendWelcomeEmail } from '../utils/emailService.js';
import crypto from 'crypto';
import { Op } from 'sequelize';

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // Check if user exists
    const userExists = await User.findOne({
      where: {
        [Op.or]: [{ email }, { phone }],
      },
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or phone',
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password,
      role: role || 'user',
      dentalCoins: 500, // Welcome bonus
    });

    if (user) {
      // Send welcome email (non-blocking)
      sendWelcomeEmail(user.email, user.name).catch(err => 
        console.error('Failed to send welcome email:', err)
      );

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          dentalCoins: user.dentalCoins,
          profileImage: user.profileImage,
          token: generateToken(user.id),
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid user data',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Login user (any role)
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, phone, password, role } = req.body;

    // Find user by email or phone
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email }, { phone }],
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email',
      });
    }

    // Check password
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password',
      });
    }

    // Check if role matches (if role is specified in request)
    if (role && user.role !== role) {
      return res.status(403).json({
        success: false,
        message: `This account is not registered as ${role}. Please use the correct login portal.`,
      });
    }

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        dentalCoins: user.dentalCoins,
        profileImage: user.profileImage,
        token: generateToken(user.id),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      
      if (req.body.address) {
        user.street = req.body.address.street || user.street;
        user.city = req.body.address.city || user.city;
        user.state = req.body.address.state || user.state;
        user.pincode = req.body.address.pincode || user.pincode;
        user.country = req.body.address.country || user.country;
      }

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          phone: updatedUser.phone,
          role: updatedUser.role,
          address: {
            street: updatedUser.street,
            city: updatedUser.city,
            state: updatedUser.state,
            pincode: updatedUser.pincode,
            country: updatedUser.country,
          },
          token: generateToken(updatedUser.id),
        },
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Forgot password - send reset email
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email address',
      });
    }

    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this email address',
      });
    }

    // Generate secure random token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Set expiry time (1 hour from now)
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    // Save token to database
    await PasswordResetToken.create({
      userId: user.id,
      token: resetToken,
      expiresAt: expiresAt,
      used: false,
    });

    // Send email
    await sendPasswordResetEmail(user.email, resetToken, user.name);

    res.json({
      success: true,
      message: 'Password reset email sent successfully. Please check your inbox.',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process password reset request. Please try again later.',
    });
  }
};

// @desc    Reset password with token
// @route   POST /api/auth/reset-password/:token
// @access  Public
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a new password',
      });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
    }

    // Find valid token
    const resetToken = await PasswordResetToken.findOne({
      where: {
        token: token,
        used: false,
        expiresAt: {
          [Op.gt]: new Date(),
        },
      },
    });

    if (!resetToken) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token',
      });
    }

    // Find user
    const user = await User.findByPk(resetToken.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Update password (will be hashed by beforeUpdate hook)
    user.password = password;
    await user.save();

    // Mark token as used
    resetToken.used = true;
    await resetToken.save();

    res.json({
      success: true,
      message: 'Password reset successful. You can now login with your new password.',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset password. Please try again.',
    });
  }
};


// @desc    Customer Login
// @route   POST /api/auth/login/customer
// @access  Public
export const customerLogin = async (req, res) => {
  req.body.role = 'customer';
  return login(req, res);
};

// @desc    Serviceman Login
// @route   POST /api/auth/login/serviceman
// @access  Public
export const servicemanLogin = async (req, res) => {
  req.body.role = 'serviceman';
  return login(req, res);
};

// @desc    Admin Login
// @route   POST /api/auth/login/admin
// @access  Public
export const adminLogin = async (req, res) => {
  req.body.role = 'admin';
  return login(req, res);
};
