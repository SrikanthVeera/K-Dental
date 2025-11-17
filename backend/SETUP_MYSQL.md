# MySQL Setup for DentalShop Backend

## ⚠️ Current Issue
Your server is trying to use MongoDB models but you're using MySQL. Follow these steps to fix it.

## 🔧 Quick Fix

### Step 1: Create Database

Open MySQL Workbench or MySQL Command Line and run:

```sql
CREATE DATABASE IF NOT EXISTS dentalshop;
USE dentalshop;
```

### Step 2: Run Schema

In MySQL Workbench or Command Line:

```sql
SOURCE C:/Users/srika/OneDrive/Desktop/K Dental/backend/database/schema.sql;
```

Or copy and paste the contents of `backend/database/schema.sql` into MySQL Workbench and execute.

### Step 3: Insert Sample Data

```sql
SOURCE C:/Users/srika/OneDrive/Desktop/K Dental/backend/database/sample-data.sql;
```

Or copy and paste the contents of `backend/database/sample-data.sql` and execute.

### Step 4: Verify Database

```sql
USE dentalshop;
SHOW TABLES;
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM products;
```

You should see:
- 7 tables created
- 5 users
- 18 products

### Step 5: Restart Server

```bash
npm run dev
```

## ✅ What Was Fixed

1. **Created MySQL routes:**
   - `routes/cartMySQL.js`
   - `routes/ordersMySQL.js`
   - `routes/adminMySQL.js`

2. **Updated server.js:**
   - Now uses MySQL models (Sequelize)
   - Connects to MySQL database
   - Uses correct routes

3. **Configuration:**
   - `.env` is already configured correctly
   - `package.json` has MySQL dependencies

## 🧪 Test the Server

After starting, test these endpoints:

### Health Check
```
GET http://localhost:5000/health
```

Should return:
```json
{
  "success": true,
  "message": "DentalShop API with MySQL is running ✅",
  "timestamp": "2024-...",
  "database": "MySQL"
}
```

### Get Products
```
GET http://localhost:5000/api/products
```

### Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@dentalshop.com",
  "password": "admin123"
}
```

## 📊 Database Connection

Your `.env` file is configured:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=srikanth12345
DB_NAME=dentalshop
```

## 🔍 Troubleshooting

### Error: "Cannot find module 'mongoose'"
✅ **FIXED** - Server now uses Sequelize (MySQL) instead of Mongoose (MongoDB)

### Error: "Unknown database 'dentalshop'"
**Solution:** Create the database using Step 1 above

### Error: "Table 'dentalshop.users' doesn't exist"
**Solution:** Run the schema using Step 2 above

### Error: "Access denied for user 'root'@'localhost'"
**Solution:** Check your MySQL password in `.env` file

## 📝 Next Steps

1. ✅ Database created
2. ✅ Tables created
3. ✅ Sample data inserted
4. ✅ Server configured for MySQL
5. 🔄 Start server: `npm run dev`
6. 🔄 Test endpoints
7. 🔄 Start frontend

## 🎯 Default Credentials

**Admin:**
- Email: admin@dentalshop.com
- Password: admin123

**User:**
- Email: rajesh@example.com
- Password: user123

---

**Need help?** Check `MYSQL_SETUP_GUIDE.md` for detailed instructions.
