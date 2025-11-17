// Script to update user roles in database
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const updateRoles = async () => {
  try {
    const { sequelize } = await import('./config/database.js');
    
    console.log('🔄 Updating user roles from (user, admin) to (customer, serviceman, admin)...\n');

    // Step 1: First expand the enum to include all values
    console.log('Step 1: Expanding enum to include all roles...');
    await sequelize.query(`
      ALTER TABLE users 
      MODIFY COLUMN role ENUM('user', 'admin', 'customer', 'serviceman') DEFAULT 'user'
    `);
    console.log('✅ Enum expanded');

    // Step 2: Update 'user' to 'customer'
    console.log('\nStep 2: Converting "user" roles to "customer"...');
    const [result] = await sequelize.query(`
      UPDATE users 
      SET role = 'customer' 
      WHERE role = 'user'
    `);
    console.log(`✅ Updated ${result.affectedRows || 0} users`);

    // Step 3: Remove 'user' from enum and set default to 'customer'
    console.log('\nStep 3: Finalizing enum (customer, serviceman, admin)...');
    await sequelize.query(`
      ALTER TABLE users 
      MODIFY COLUMN role ENUM('customer', 'serviceman', 'admin') DEFAULT 'customer'
    `);
    console.log('✅ Enum finalized');

    // Step 4: Show current distribution
    console.log('\n📊 Current roles in database:');
    const [roles] = await sequelize.query(`
      SELECT role, COUNT(*) as count 
      FROM users 
      GROUP BY role
    `);

    roles.forEach(r => {
      console.log(`  ${r.role}: ${r.count} users`);
    });

    console.log('\n✅ Role update complete!');
    console.log('\n📝 Available roles:');
    console.log('  - customer (default for regular users)');
    console.log('  - serviceman (for service providers)');
    console.log('  - admin (for administrators)');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating roles:', error.message);
    process.exit(1);
  }
};

updateRoles();
