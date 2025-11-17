require('dotenv').config();
const { sequelize } = require('./config/database');

const migrateAuthFeatures = async () => {
  try {
    console.log('🔄 Starting authentication features migration...\n');

    await sequelize.authenticate();
    console.log('✅ Database connection established\n');

    // 1. Add profileImage column to users table
    console.log('📝 Adding profileImage column to users table...');
    try {
      await sequelize.query(`
        ALTER TABLE users 
        ADD COLUMN profileImage VARCHAR(500) NULL AFTER country
      `);
      console.log('✅ profileImage column added successfully');
    } catch (error) {
      if (error.message.includes('Duplicate column')) {
        console.log('ℹ️  profileImage column already exists');
      } else {
        throw error;
      }
    }

    // 2. Create password_reset_tokens table
    console.log('\n📝 Creating password_reset_tokens table...');
    try {
      await sequelize.query(`
        CREATE TABLE IF NOT EXISTS password_reset_tokens (
          id INT AUTO_INCREMENT PRIMARY KEY,
          userId INT NOT NULL,
          token VARCHAR(255) NOT NULL UNIQUE,
          expiresAt DATETIME NOT NULL,
          used TINYINT(1) DEFAULT 0,
          createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
          INDEX idx_token (token),
          INDEX idx_userId (userId),
          INDEX idx_expiresAt (expiresAt)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);
      console.log('✅ password_reset_tokens table created successfully');
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log('ℹ️  password_reset_tokens table already exists');
      } else {
        throw error;
      }
    }

    // 3. Verify changes
    console.log('\n🔍 Verifying changes...\n');

    const [userColumns] = await sequelize.query('DESCRIBE users');
    const hasProfileImage = userColumns.some(col => col.Field === 'profileImage');
    console.log(`  Users.profileImage: ${hasProfileImage ? '✅' : '❌'}`);

    const [tables] = await sequelize.query("SHOW TABLES LIKE 'password_reset_tokens'");
    const hasResetTable = tables.length > 0;
    console.log(`  password_reset_tokens table: ${hasResetTable ? '✅' : '❌'}`);

    if (hasProfileImage && hasResetTable) {
      console.log('\n✅ All authentication features migrated successfully!');
      console.log('\n📋 Summary:');
      console.log('  ✅ Users table updated with profileImage field');
      console.log('  ✅ PasswordResetTokens table created');
      console.log('\n🚀 You can now use:');
      console.log('  - Profile image upload/update/delete');
      console.log('  - Forgot password functionality');
      console.log('  - Password reset via email');
    } else {
      console.log('\n⚠️  Some features may not have been migrated correctly');
    }

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    console.error(error);
    process.exit(1);
  }
};

migrateAuthFeatures();
