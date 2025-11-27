import bcrypt from 'bcrypt';
import { User } from './models/index.js';

const createDemoUsers = async () => {
  try {
    console.log('🔄 Creating demo users...');

    const demoUsers = [
      {
        name: 'Dr. Rajesh Kumar',
        email: 'rajesh@dentalkart.com',
        phone: '9876543210',
        password: await bcrypt.hash('password123', 10),
        role: 'customer',
        isVerified: true
      },
      {
        name: 'Admin User',
        email: 'admin@dentalkart.com',
        phone: '9876543211',
        password: await bcrypt.hash('admin123', 10),
        role: 'admin',
        isVerified: true
      },
      {
        name: 'Dr. Priya Sharma',
        email: 'priya@dentalkart.com',
        phone: '9876543212',
        password: await bcrypt.hash('password123', 10),
        role: 'customer',
        isVerified: true
      },
      {
        name: 'Service Manager',
        email: 'service@dentalkart.com',
        phone: '9876543213',
        password: await bcrypt.hash('service123', 10),
        role: 'serviceman',
        isVerified: true
      }
    ];

    for (const userData of demoUsers) {
      const existingUser = await User.findOne({ where: { email: userData.email } });
      
      if (!existingUser) {
        await User.create(userData);
        console.log(`✅ Created user: ${userData.name} (${userData.email})`);
      } else {
        console.log(`⚠️  User already exists: ${userData.email}`);
      }
    }

    console.log('🎉 Demo users creation completed!');
    console.log('\n📋 Test Credentials:');
    console.log('Customer: rajesh@dentalkart.com / password123');
    console.log('Admin: admin@dentalkart.com / admin123');
    console.log('Customer 2: priya@dentalkart.com / password123');
    console.log('Serviceman: service@dentalkart.com / service123');

  } catch (error) {
    console.error('❌ Error creating demo users:', error);
  }
};

export default createDemoUsers;