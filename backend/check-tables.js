require('dotenv').config();
const { sequelize } = require('./config/database');

const checkTables = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to database');

    const [results] = await sequelize.query('SHOW TABLES');
    
    console.log('\n📊 Tables in database:');
    results.forEach((row, index) => {
      const tableName = Object.values(row)[0];
      console.log(`  ${index + 1}. ${tableName}`);
    });

    // Check Users table structure
    const [userColumns] = await sequelize.query('DESCRIBE users');
    console.log('\n👤 Users table columns:');
    userColumns.forEach(col => {
      console.log(`  - ${col.Field} (${col.Type})`);
    });

    // Check PasswordResetTokens table
    const [tokenColumns] = await sequelize.query('DESCRIBE password_reset_tokens');
    console.log('\n🔑 PasswordResetTokens table columns:');
    tokenColumns.forEach(col => {
      console.log(`  - ${col.Field} (${col.Type})`);
    });

    console.log('\n✅ All tables verified!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

checkTables();
