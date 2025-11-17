const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupDatabase() {
  console.log('🔧 Setting up DentalShop MySQL Database...\n');

  try {
    // Connect to MySQL without database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      multipleStatements: true
    });

    console.log('✅ Connected to MySQL server');

    // Create database
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'dentalshop'}`);
    console.log(`✅ Database '${process.env.DB_NAME || 'dentalshop'}' created/verified`);

    // Use the database
    await connection.query(`USE ${process.env.DB_NAME || 'dentalshop'}`);

    // Read and execute schema
    console.log('\n📋 Creating tables...');
    const schemaPath = path.join(__dirname, 'database', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Split by delimiter and execute
    const statements = schema.split(';').filter(stmt => stmt.trim());
    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await connection.query(statement);
        } catch (err) {
          // Ignore errors for CREATE DATABASE, USE, etc.
          if (!err.message.includes('already exists')) {
            console.log('⚠️  Warning:', err.message.substring(0, 100));
          }
        }
      }
    }
    console.log('✅ Tables created successfully');

    // Read and execute sample data
    console.log('\n📦 Inserting sample data...');
    const dataPath = path.join(__dirname, 'database', 'sample-data.sql');
    const data = fs.readFileSync(dataPath, 'utf8');
    
    const dataStatements = data.split(';').filter(stmt => stmt.trim());
    for (const statement of dataStatements) {
      if (statement.trim() && !statement.includes('USE dentalshop')) {
        try {
          await connection.query(statement);
        } catch (err) {
          // Ignore duplicate entry errors
          if (!err.message.includes('Duplicate entry')) {
            console.log('⚠️  Warning:', err.message.substring(0, 100));
          }
        }
      }
    }
    console.log('✅ Sample data inserted successfully');

    // Verify setup
    console.log('\n🔍 Verifying setup...');
    const [tables] = await connection.query('SHOW TABLES');
    console.log(`✅ Found ${tables.length} tables`);

    const [users] = await connection.query('SELECT COUNT(*) as count FROM users');
    console.log(`✅ Users: ${users[0].count}`);

    const [products] = await connection.query('SELECT COUNT(*) as count FROM products');
    console.log(`✅ Products: ${products[0].count}`);

    await connection.end();

    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📝 Default Credentials:');
    console.log('   Admin: admin@dentalshop.com / admin123');
    console.log('   User:  rajesh@example.com / user123');
    console.log('\n🚀 You can now start the server with: npm run dev');

  } catch (error) {
    console.error('\n❌ Error setting up database:', error.message);
    console.error('\n💡 Make sure:');
    console.error('   1. MySQL is running');
    console.error('   2. Your .env file has correct credentials');
    console.error('   3. DB_PASSWORD in .env matches your MySQL root password');
    process.exit(1);
  }
}

setupDatabase();
