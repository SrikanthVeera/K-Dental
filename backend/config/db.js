const { Sequelize } = require('sequelize');

// Create a new Sequelize instance for MySQL
const sequelize = new Sequelize('dentalshop', 'root', 'srikanth12345', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // set true to see SQL logs
});

// Test connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the MySQL database:', error);
  }
})();

module.exports = sequelize;
