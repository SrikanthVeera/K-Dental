# DentalShop - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js 16+ installed
- MySQL 8.0+ installed
- Git installed

---

## Step 1: Install MySQL

**Already have MySQL?** Skip to Step 2.

**Windows:**
- Download from https://dev.mysql.com/downloads/mysql/
- Install and set root password

**Mac:**
```bash
brew install mysql
brew services start mysql
```

**Linux:**
```bash
sudo apt-get install mysql-server
sudo systemctl start mysql
```

---

## Step 2: Create Database

```bash
mysql -u root -p
```

In MySQL shell:
```sql
CREATE DATABASE dentalshop;
EXIT;
```

---

## Step 3: Setup Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env-mysql .env

# Edit .env and set your MySQL password
# DB_PASSWORD=your_mysql_password
```

---

## Step 4: Initialize Database

```bash
# Run schema (creates all tables)
mysql -u root -p dentalshop < database/schema.sql

# Insert sample data
mysql -u root -p dentalshop < database/sample-data.sql
```

---

## Step 5: Start Backend

```bash
npm run dev
```

✅ Backend running on: `http://localhost:5000`

Test: `http://localhost:5000/health`

---

## Step 6: Setup Frontend

Open new terminal:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start frontend
npm run dev
```

✅ Frontend running on: `http://localhost:5173`

---

## 🎉 You're Ready!

### Test Login

**Admin Account:**
- Email: `admin@dentalshop.com`
- Password: `admin123`
- Access: `http://localhost:5173/login`

**User Account:**
- Email: `rajesh@example.com`
- Password: `user123`

### Explore

- **Shop Page:** `http://localhost:5173/shop-new`
- **Admin Dashboard:** `http://localhost:5173/admin/dashboard`
- **Products Demo:** `http://localhost:5173/products-demo`

---

## 📊 Database Info

**Database:** dentalshop  
**Tables:** 7 (users, products, carts, orders, reviews, etc.)  
**Sample Data:**
- 5 Users (1 admin + 4 users)
- 18 Products
- 10 Reviews
- 4 Sample Orders

---

## 🔧 Troubleshooting

### MySQL Connection Error
```bash
# Check MySQL is running
mysql -u root -p

# Verify database exists
SHOW DATABASES;
```

### Port Already in Use
Change PORT in `.env`:
```
PORT=5001
```

### Tables Not Created
```bash
mysql -u root -p dentalshop < database/schema.sql
```

---

## 📚 Next Steps

1. ✅ Backend & Frontend running
2. ✅ Database initialized
3. 🔄 Explore the admin panel
4. 🔄 Test product filtering
5. 🔄 Place a test order
6. 🔄 Review API documentation

---

## 📖 Documentation

- **Database Structure:** `DATABASE_STRUCTURE.md`
- **MySQL Setup:** `MYSQL_SETUP_GUIDE.md`
- **Backend API:** `backend/README.md`
- **Shop Page:** `SHOP_PAGE_README.md`

---

## 🆘 Need Help?

Check the detailed guides:
- MySQL issues → `MYSQL_SETUP_GUIDE.md`
- Database questions → `DATABASE_STRUCTURE.md`
- API endpoints → `backend/README.md`

---

**Project:** DentalShop E-commerce  
**Database:** MySQL (dentalshop)  
**Backend:** http://localhost:5000  
**Frontend:** http://localhost:5173
