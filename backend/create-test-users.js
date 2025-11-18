import { User } from './models/index.js';
import bcrypt from 'bcryptjs';

const createTestUsers = async () => {
  try {
    console.log('🔄 Creating test users...\n');

    // Test Customer
    const customerExists = await User.findOne({ where: { email: 'customer@test.com' } });
    if (!customerExists) {
      await User.create({
        name: 'Test Customer',
        email: 'customer@test.com',
        phone: '9876543210',
        password: 'password123',
        role: 'customer',
        dentalCoins: 500
      });
      console.log('✅ Customer created: customer@test.com / password123');
    } else {
      console.log('ℹ️  Customer already exists: customer@test.com');
    }

    // Test Serviceman
    const servicemanExists = await User.findOne({ where: { email: 'serviceman@test.com' } });
    if (!servicemanExists) {
      await User.create({
        name: 'Test Serviceman',
        email: 'serviceman@test.com',
        phone: '9876543211',
        password: 'password123',
        role: 'serviceman',
        dentalCoins: 0
      });
      console.log('✅ Serviceman created: serviceman@test.com / password123');
    } else {
      console.log('ℹ️  Serviceman already exists: serviceman@test.com');
    }

    // Test Admin
    const adminExists = await User.findOne({ where: { email: 'admin@test.com' } });
    if (!adminExists) {
      await User.create({
        name: 'Test Admin',
        email: 'admin@test.com',
        phone: '9876543212',
        password: 'password123',
        role: 'admin',
        dentalCoins: 0
      });
      console.log('✅ Admin created: admin@test.com / password123');
    } else {
      console.log('ℹ️  Admin already exists: admin@test.com