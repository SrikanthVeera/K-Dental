# 🔧 Fix: Routes Not Found Issue

## Problem
Getting error: `"Not Found - /api/auth/login"`

## Root Cause
The server needs to be restarted after the code changes. The old server instance is still running with outdated code.

---

## ✅ Solution

### Step 1: Stop the Current Server

**Option A: If running in terminal**
- Press `Ctrl + C` in the terminal where server is running

**Option B: If running in background**
```bash
# Windows PowerShell
Get-Process -Name node | Stop-Process -Force

# Or find and kill specific port
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

### Step 2: Restart the Server

```bash
cd backend
npm run dev
```

You should see:
```
✅ MySQL Database Connected Successfully
🚀 Server running in development mode on port 5000
📊 Database: MySQL
```

### Step 3: Test the Routes

**Quick Test:**
```bash
# Test health endpoint
curl http://localhost:5000/health

# Test registration
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"phone\":\"1234567890\",\"password\":\"test123\"}"

# Test login
curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"test123\"}"
```

**Or use the test script:**
```bash
node test-auth-routes.js
```

---

## 🔍 Verification

After restart, verify these routes work:

✅ POST `/api/auth/register` - Register user  
✅ POST `/api/auth/login` - Login user  
✅ POST `/api/auth/forgot-password` - Request password reset  
✅ POST `/api/auth/reset-password/:token` - Reset password  
✅ GET `/api/user/profile` - Get profile (requires token)  
✅ PUT `/api/user/profile` - Update profile (requires token)  
✅ POST `/api/user/profile/image` - Upload image (requires token)  
✅ DELETE `/api/user/profile/image` - Delete image (requires token)  

---

## 🐛 If Still Not Working

### Check 1: Verify Files Exist
```bash
ls routes/auth.js
ls routes/user.js
ls controllers/authController.js
ls controllers/userController.js
```

### Check 2: Check for Syntax Errors
```bash
node -c routes/auth.js
node -c controllers/authController.js
```

### Check 3: Test Route Loading
```bash
node -e "const routes = require('./routes/auth'); console.log('Routes loaded:', routes.stack.map(r => r.route.path));"
```

### Check 4: Check Server Logs
Look for any error messages when starting the server.

### Check 5: Verify Port
Make sure port 5000 is not blocked:
```bash
netstat -ano | findstr :5000
```

---

## 📝 Common Issues

### Issue: "Cannot find module"
**Solution:** Run `npm install` to ensure all dependencies are installed

### Issue: "Port already in use"
**Solution:** Kill the process using port 5000 (see Step 1)

### Issue: "Database connection failed"
**Solution:** 
- Check MySQL is running
- Verify credentials in `.env`
- Run `npm run migrate:auth`

### Issue: "Email not sending"
**Solution:**
- This won't prevent routes from working
- Configure email later (see AUTH_SYSTEM_README.md)

---

## ✅ Success Indicators

When everything is working, you should see:

1. **Server starts without errors**
2. **Health endpoint returns 200**
3. **Registration creates user and returns token**
4. **Login returns token**
5. **Profile endpoint works with token**

---

## 🚀 Quick Restart Script

Create a file `restart.bat` (Windows) or `restart.sh` (Linux/Mac):

**Windows (restart.bat):**
```batch
@echo off
echo Stopping server...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul
echo Starting server...
cd backend
start cmd /k npm run dev
```

**Linux/Mac (restart.sh):**
```bash
#!/bin/bash
echo "Stopping server..."
pkill -f "node.*server.js"
sleep 2
echo "Starting server..."
cd backend
npm run dev
```

---

## 📞 Still Having Issues?

1. Check server logs for specific errors
2. Verify all files from FILES_CREATED.md exist
3. Run database migration: `npm run migrate:auth`
4. Check diagnostics: `node check-tables.js`
5. Review SETUP_CHECKLIST.md

---

**The routes are correctly configured. Just restart the server!**
