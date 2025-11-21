import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables FIRST
dotenv.config({ path: path.join(__dirname, '.env') });

const syncBrandTables = async () => {
  try {
    console.log('🔄 Syncing Brand tables with database...\n');

    // Dynamic import AFTER env variables are loaded
    const { sequelize, Brand, Product } = await import('./models/index.js');

    // Connect to database
    await sequelize.authenticate();
    console.log('✅ Database connected successfully\n');

    // Sync Brand table
    console.log('📦 Creating/Updating Brand table...');
    await Brand.sync({ alter: true });
    console.log('✅ Brand table synced\n');

    // Ensure Product table exists (it should already)
    console.log('🦷 Checking Product table...');
    await Product.sync({ alter: true });
    console.log('✅ Product table synced\n');

    console.log('✨ Database sync completed successfully!\n');
    console.log('You can now run: npm run seed:brands\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error syncing database:', error);
    process.exit(1);
  }
};

syncBrandTables();
