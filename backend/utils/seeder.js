const dotenv = require('dotenv');
const sequelize = require('../config/db'); // Sequelize MySQL connection
const User = require('../models/User');    // Sequelize User model
const Product = require('../models/Product'); // Sequelize Product model
const bcrypt = require('bcrypt');

dotenv.config();

// ✅ Users to seed
const users = [
  {
    name: 'Admin User',
    email: 'admin@dentalkart.com',
    phone: '9876543210',
    password: 'admin123',
    role: 'admin',
    dentalCoins: 1000,
  },
  {
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh@example.com',
    phone: '9876543211',
    password: 'user123',
    role: 'user',
    dentalCoins: 500,
  },
  {
    name: 'Dr. Priya Sharma',
    email: 'priya@example.com',
    phone: '9876543212',
    password: 'user123',
    role: 'user',
    dentalCoins: 500,
  },
];

// ✅ Products to seed
const products = [
  {
    name: 'Dental Ultrasonic Scaler',
    brand: 'Woodpecker',
    category: 'Equipment',
    description: 'Professional ultrasonic scaler with LED light and multiple tips for effective cleaning',
    price: 12999,
    mrp: 15999,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400',
    rating: 4.5,
    numReviews: 128,
  },
  {
    name: 'LED Curing Light',
    brand: '3M ESPE',
    category: 'Equipment',
    description: 'High-intensity LED curing light with multiple modes and long battery life',
    price: 8499,
    mrp: 10999,
    stock: 32,
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400',
    rating: 4.8,
    numReviews: 256,
  },
  {
    name: 'Dental Composite Kit',
    brand: 'Dentsply',
    category: 'Materials',
    description: 'Complete composite restoration kit with multiple shades and bonding agents',
    price: 3299,
    mrp: 3299,
    stock: 120,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400',
    rating: 4.6,
    numReviews: 89,
  },
  // ... (keep the rest of your products unchanged)
];

// ✅ Import Data
const importData = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL Connected');

    // Sync models (recreates tables)
    await sequelize.sync({ force: true });
    console.log('✅ All tables dropped & recreated');

    // Hash user passwords
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return { ...user, password: hashedPassword };
      })
    );

    // Insert users
    await User.bulkCreate(hashedUsers);
    console.log('✅ Users imported');

    // Insert products
    await Product.bulkCreate(products);
    console.log('✅ Products imported');

    console.log('🎉 Data Import Success!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error importing data: ${error.message}`);
    process.exit(1);
  }
};

// ✅ Destroy Data
const destroyData = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL Connected');

    await Product.destroy({ where: {} });
    await User.destroy({ where: {} });

    console.log('🗑️  Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

// CLI options
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
