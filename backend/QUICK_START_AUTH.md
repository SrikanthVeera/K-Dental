# 🚀 Quick Start - Authentication System

Get the authentication system up and running in 5 minutes!

---

## ⚡ Prerequisites

- Node.js installed (v14+)
- MySQL installed and running
- Gmail account (for email features)

---

## 📦 Step 1: Install Dependencies

```bash
cd backend
npm install
```

This installs:
- express, cors, helmet
- sequelize, mysql2
- bcrypt, jsonwebtoken
- multer (file uploads)
- nodemailer (emails)

---

## ⚙️ Step 2: Configure Environment

1. **Copy the example environment file:**
```bash
cp .env.example .env
```

2. **Edit `.env` file with your settings:**
```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=dentalshop

# JWT
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d

# Email (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-digit-app-password
```

3. **Get Gmail App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Enable 2-Factor Authentication first
   - Generate app password for "Mail"
   - Copy the 16-digit password to `.env`

---

## 🗄️ Step 3: Setup Database

1. **Create database:**
```bash
mysql -u root -p
```

```sql
CREATE DATABASE dentalshop;
EXIT;
```

2. **Sync models (create tables):**
```bash
npm run sync
```

This creates:
- Users table (with profileImage field)
- PasswordResetTokens table
- All other tables (Products, Orders, etc.)

---

## 🎯 Step 4: Start Server

```bash
npm run dev
```

You should see:
```
🚀 Server running in development mode on port 5000
📊 Database: MySQL
✅ MySQL connected: dentalshop
```

---

## ✅ Step 5: Test It!

### Test 1: Health Check
```bash
curl http://localhost:5000/health
```

Expected:
```json
{
  "success": true,
  "message": "DentalShop API with MySQL is running ✅",
  "database": "MySQL"
}
```

### Test 2: Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "1234567890",
    "password": "password123"
  }'
```

Expected:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "Test User",
    "email": "test@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Test 3: Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Test 4: Get Profile (use token from login)
```bash
curl -X GET http://localhost:5000/api/user/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🎉 You're Done!

Your authentication system is now running with:

✅ User registration & login  
✅ JWT authentication  
✅ Password reset via email  
✅ Profile management  
✅ Image upload  
✅ Role-based access (user/admin)  

---

## 📚 Next Steps

1. **Read full documentation:**
   - `AUTH_SYSTEM_README.md` - Complete feature guide
   - `API_TESTING_GUIDE.md` - Test all endpoints

2. **Test with Postman:**
   - Import the API collection
   - Test all endpoints interactively

3. **Integrate with Frontend:**
   - Use the JWT token in Authorization header
   - Build login/register forms
   - Implement password reset flow

---

## 🐛 Common Issues

### Issue: "Cannot connect to MySQL"
**Solution:**
```bash
# Check MySQL is running
mysql -u root -p

# Verify credentials in .env
DB_USER=root
DB_PASSWORD=your_password
```

### Issue: "Email not sending"
**Solution:**
- Use Gmail App Password (not regular password)
- Enable 2-Factor Authentication first
- Check EMAIL_USER and EMAIL_PASSWORD in .env

### Issue: "Token invalid"
**Solution:**
- Check JWT_SECRET is set in .env
- Use format: `Authorization: Bearer <token>`
- Token expires after 7 days (get new one by logging in)

---

## 📞 Need Help?

Check the logs:
```bash
npm run dev
```

Look for:
- ✅ MySQL connected
- ✅ Server running on port 5000
- ❌ Any error messages

---

**Happy Coding! 🚀**
