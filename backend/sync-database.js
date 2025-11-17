// Sync database with new models (PasswordResetToken, updated User model)
require('dotenv').config();
const { sequelize } = require('./config/database');
const {
  User,
  Product,
  Review,
  Cart,
  CartItem,
  Order,
  OrderItem,
  PasswordResetToken,
} = require('./models');

const syncDatabase = async () => {
  try {
    console.log('🔄 Starting database synchronization...');

    // Authenticate connection
    await sequelize.authenticate();
    console.log('✅ Database connection established');

    // Sync all models (alter: true will update existing tables without dropping them)
    await sequelize.sync({ alter: true });
    console.log('✅ All models synchronized successfully');

    console.log('\n📊 Synchronized Models:');
    console.log('  - User (with profileImage field)');
    console.log('  - PasswordResetToken');
    console.log('  - Product');
    console.log('  - Review');
    console.log('  - Cart & CartItem');
    console.log('  - Order & OrderItem');

    console.log('\n✅ Database sync complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database sync failed:', error);
    process.exit(1);
  }
};

syncDatabase();
