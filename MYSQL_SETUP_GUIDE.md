# DentalShop Backend - MySQL Setup Guide

Complete guide to set up and run the Node.js + Express + MySQL backend using Sequelize ORM.

## 🎯 Quick Start (5 Minutes)

### Step 1: Install MySQL

**Windows:**
1. Download MySQL Community Server from https://dev.mysql.com/downloads/mysql/
2. Run the installer
3. Set root password during installation
4. MySQL will start automatically as a service

**Mac:**
```bash
brew install mysql
brew services start mysql
mysql_secure_installation
```

**Linux (Ubuntu):**
```bash
sudo apt-get update
sudo apt-get install mysql-server
sudo systemctl start mysql
sudo mysql_secure_installation
```

**Verify MySQL is running:**
```bash
mysql -u root -p
# Enter your password
```

### Step 2: Create Database
```bash
mysql -u root -p
```

In MySQL shell:
```sql
CREATE DATABASE dentalshop;
SHOW DATABASES;
EXIT;
```

### Step 3: Install Backend Dependencies
```bash
cd backend
npm install
```

Required packages:
- `sequelize` - MySQL ORM
- `mysql2` - MySQL driver
- `bcrypt` - Password hashing
- `jsonwebtoken` - JWT authentication
- `express`, `cors`, `helmet`, `multer`, etc.

### Step 4: Create Uploads Directory
```bash
mkdir uploads
```

### Step 5: Environment Variables
Create `.env` file in backend directory:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=dentalshop
JWT_SECRET=dentalshop_super_secret_jwt_key_2024_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Important:** Replace `your_mysql_password` with your actual MySQL root password!

### Step 6: Start Backend Server
```bash
npm run dev
```

The server will:
1. Connect to MySQL database
2. Auto-create all tables (users, products, carts, orders, etc.)
3. Run on `http://localhost:5000`

### Step 7: Seed Database (Optional)
```bash
npm run seed
```

This creates:
- **3 Users** (1 admin + 2 regular users)
- **12 Products** (dental equipment, instruments, materials)

### Step 8: Test API
Open browser or Postman:
```
http://localhost:5000/health
```

You should see:
```json
{
  "success": true,
  "message": "DentalShop API with MySQL is running",
  "timestamp": "2024-...",
  "database": "MySQL"
}
```

## ✅ Verify Setup

### 1. Check MySQL Connection
```bash
mysql -u root -p
```

In MySQL shell:
```sql
USE dentalshop;
SHOW TABLES;

-- Should show:
-- users
-- products
-- carts
-- cart_items
-- orders
-- order_items
-- reviews

SELECT * FROM users;
SELECT * FROM products;
```

### 2. Check Tables Structure
```sql
DESCRIBE users;
DESCRIBE products;
DESCRIBE orders;
```

### 3. Test Login API
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@dentalkart.com",
    "password": "admin123"
  }'
```

### 4. Test Products API
```bash
curl http://localhost:5000/api/products
```

## 🔐 Default Credentials

After seeding:

### Admin Account
- **Email:** `admin@dentalkart.com`
- **Phone:** `9876543210`
- **Password:** `admin123`
- **Role:** admin

### User Accounts
**User 1:**
- **Email:** `rajesh@example.com`
- **Phone:** `9876543211`
- **Password:** `user123`

**User 2:**
- **Email:** `priya@example.com`
- **Phone:** `9876543212`
- **Password:** `user123`

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(15) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  dentalCoins INT DEFAULT 0,
  street VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  pincode VARCHAR(10),
  country VARCHAR(100) DEFAULT 'India',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  category ENUM('Equipment', 'Instruments', 'Materials', 'Consumables', 'Furniture', 'Other'),
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  mrp DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0,
  image VARCHAR(500),
  images JSON,
  rating DECIMAL(2,1) DEFAULT 0,
  numReviews INT DEFAULT 0,
  discount INT DEFAULT 0,
  inStock BOOLEAN DEFAULT TRUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  orderNumber VARCHAR(50) UNIQUE,
  shippingName VARCHAR(100) NOT NULL,
  shippingPhone VARCHAR(15) NOT NULL,
  shippingStreet VARCHAR(255) NOT NULL,
  shippingCity VARCHAR(100) NOT NULL,
  shippingState VARCHAR(100) NOT NULL,
  shippingPincode VARCHAR(10) NOT NULL,
  shippingCountry VARCHAR(100) DEFAULT 'India',
  paymentMethod ENUM('COD', 'Card', 'UPI', 'NetBanking') DEFAULT 'COD',
  paymentStatus ENUM('Pending', 'Paid', 'Failed') DEFAULT 'Pending',
  itemsPrice DECIMAL(10,2) DEFAULT 0,
  shippingPrice DECIMAL(10,2) DEFAULT 0,
  taxPrice DECIMAL(10,2) DEFAULT 0,
  totalPrice DECIMAL(10,2) DEFAULT 0,
  status ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Pending',
  deliveredAt TIMESTAMP NULL,
  cancelledAt TIMESTAMP NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);
```

## 🔧 Common Issues & Solutions

### Issue 1: MySQL Connection Error
```
Error: Access denied for user 'root'@'localhost'
```

**Solution:**
- Check MySQL password in `.env`
- Reset MySQL root password:
  ```bash
  mysql -u root
  ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
  FLUSH PRIVILEGES;
  ```

### Issue 2: Database Not Found
```
Error: Unknown database 'dentalshop'
```

**Solution:**
```bash
mysql -u root -p
CREATE DATABASE dentalshop;
```

### Issue 3: Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
- Change PORT in `.env` to 5001
- Or kill process using port 5000

### Issue 4: Tables Not Created
```
Error: Table 'dentalshop.users' doesn't exist
```

**Solution:**
- Restart server (tables auto-create on startup)
- Or manually run:
  ```bash
  mysql -u root -p dentalshop < schema.sql
  ```

### Issue 5: Sequelize Sync Error
```
Error: Sequelize sync failed
```

**Solution:**
- Check MySQL is running
- Verify database credentials in `.env`
- Check MySQL user has CREATE TABLE permissions

## 📦 Key Differences from MongoDB

| Feature | MongoDB | MySQL |
|---------|---------|-------|
| Database | NoSQL | SQL (Relational) |
| ORM | Mongoose | Sequelize |
| Schema | Flexible | Strict |
| Queries | find(), findOne() | findAll(), findByPk() |
| Relations | populate() | include (joins) |
| IDs | ObjectId (_id) | Integer (id) |

## 🔄 Migration from MongoDB

If you have MongoDB data:

1. Export MongoDB data:
```bash
mongoexport --db dentalkart --collection products --out products.json
```

2. Convert and import to MySQL:
```bash
node utils/mongoToMySQL.js
```

## 🚀 Production Deployment

### 1. Use Cloud MySQL
- **AWS RDS MySQL**
- **Google Cloud SQL**
- **Azure Database for MySQL**
- **PlanetScale** (serverless MySQL)

### 2. Update .env for Production
```env
NODE_ENV=production
DB_HOST=your-mysql-host.com
DB_USER=your_db_user
DB_PASSWORD=your_secure_password
DB_NAME=dentalshop_prod
JWT_SECRET=your_production_secret_key
```

### 3. Deploy to Heroku with ClearDB
```bash
heroku create dentalshop-api
heroku addons:create cleardb:ignite
heroku config:get CLEARDB_DATABASE_URL
# Parse URL and set individual env vars
heroku config:set DB_HOST=...
heroku config:set DB_USER=...
heroku config:set DB_PASSWORD=...
heroku config:set DB_NAME=...
git push heroku main
```

## 📊 Database Management Tools

### 1. MySQL Workbench (GUI)
- Download: https://dev.mysql.com/downloads/workbench/
- Visual database design and management

### 2. phpMyAdmin (Web-based)
- Install with XAMPP or WAMP
- Access: http://localhost/phpmyadmin

### 3. DBeaver (Universal)
- Download: https://dbeaver.io/
- Supports multiple databases

### 4. Command Line
```bash
mysql -u root -p dentalshop

-- Common commands
SHOW TABLES;
SELECT * FROM users;
SELECT * FROM products WHERE price > 10000;
SELECT * FROM orders WHERE status = 'Pending';
```

## 🔍 Monitoring & Debugging

### Check Server Logs
```bash
npm run dev
# Watch terminal for SQL queries and errors
```

### Enable SQL Query Logging
In `config/database.js`:
```javascript
logging: console.log  // Shows all SQL queries
```

### Check Database Stats
```sql
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM products;
SELECT COUNT(*) FROM orders;
SELECT SUM(totalPrice) FROM orders WHERE status = 'Delivered';
```

## 📝 API Endpoints

All endpoints remain the same as MongoDB version:

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/products` - Get products with filters
- `POST /api/cart` - Add to cart
- `POST /api/orders` - Create order
- `GET /api/admin/stats` - Admin dashboard

See `backend/README.md` for complete API documentation.

## 🆘 Need Help?

1. Check MySQL is running: `mysql -u root -p`
2. Verify database exists: `SHOW DATABASES;`
3. Check tables created: `USE dentalshop; SHOW TABLES;`
4. Review server logs for errors
5. Test with Postman/curl

---

**Backend URL:** `http://localhost:5000`

**Database:** MySQL (Sequelize ORM)

**Health Check:** `http://localhost:5000/health`
