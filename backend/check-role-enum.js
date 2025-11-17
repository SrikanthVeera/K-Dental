import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const checkRoles = async () => {
  const { sequelize } = await import('./config/database.js');
  
  const [result] = await sequelize.query('SHOW COLUMNS FROM users LIKE "role"');
  console.log('Current role column definition:');
  console.log(JSON.stringify(result[0], null, 2));
  
  const [users] = await sequelize.query('SELECT id, name, role FROM users');
  console.log('\nCurrent users:');
  console.log(users);
  
  process.exit(0);
};

checkRoles();
