import { Sequelize } from 'sequelize';

// Create sequelize instance
// Note: This will use environment variables that should be loaded before this module is imported
export const sequelize = new Sequelize(
  process.env.DB_NAME || 'dentalshop',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL Database Connected Successfully');
    console.log('✅ Using existing database tables');
  } catch (error) {
    console.error('❌ Unable to connect to database:', error.message);
    process.exit(1);
  }
};
