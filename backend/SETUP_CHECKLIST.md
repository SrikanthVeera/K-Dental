# ✅ Authentication System Setup Checklist

Use this checklist to ensure everything is properly configured.

---

## 📦 1. Installation

- [ ] Node.js installed (v14 or higher)
- [ ] MySQL installed and running
- [ ] Navigate to backend directory: `cd backend`
- [ ] Install dependencies: `npm install`
- [ ] Verify nodemailer installed: `npm list nodemailer`

---

## 🗄️ 2. Database Setup

- [ ] MySQL server is running
- [ ] Database created: `CREATE DATABASE dentalshop;`
- [ ] Run migration: `npm run migrate:auth`
- [ ] Verify tables: `node check-tables.js`
- [ ] Confirm `users` table has `profileImage` column
- [ ] Confirm `password_reset_tokens` table exists

---

## ⚙️ 3. Environment Configuration

- [ ] Copy `.env.example` to `.env`
- [ ] Set `DB_HOST` (default: localhost)
- [ ] Set `DB_USER` (default: root)
- [ ] Set `DB_PASSWORD` (your MySQL password)
- [ ] Set `DB_NAME` (default: dentalshop)
- [ ] Set `JWT_SECRET` (strong random string)
- [ ] Set `JWT_EXPIRE` (default: 7d)
- [ ] Set `FRONTEND_URL` (default: http://localhost:5173)
- [ ] Set `EMAIL_USER` (your Gmail address)
- [ ] Set `EMAIL_PASSWORD` (Gmail app password - see below)

---

## 📧 4. Email Configuration

### Gmail Setup
- [ ] Gmail account exists
- [ ] 2-Factor Authentication enabled on Gmail
- [ ] Go to: https://myaccount.google.com/apppasswords
- [ ] Generate app password for "Mail"
- [ ] Copy 16-digit password to `.env` as `EMAIL_PASSWORD`
- [ ] Update `EMAIL_USER` with your Gmail address

### Test Email (Optional)
- [ ] Create test script to send email
- [ ] Verify email is received
- [ ] Check spam folder if not in inbox

---

## 📁 5. Directory Structure

- [ ] `backend/uploads/` directory exists
- [ ] `backend/uploads/profiles/` directory exists
- [ ] Directory has write permissions

To create:
```bash
mkdir -p uploads/profiles
```

---

## 🔧 6. File Verification

### Controllers
- [ ] `backend/controllers/authController.js` exists
- [ ] `backend/controllers/userController.js` exists

### Routes
- [ ] `backend/routes/auth.js` exists
- [ ] `backend/routes/user.js` exists

### Models
- [ ] `backend/models/UserModel.js` exists
- [ ] `backend/models/PasswordResetTokenModel.js` exists
- [ ] `backend/models/index.js` updated with PasswordResetToken

### Middleware
- [ ] `backend/middleware/authMiddleware.js` exists
- [ ] `backend/middleware/uploadMiddleware.js` exists

### Utils
- [ ] `backend/utils/emailService.js` exists

### Server
- [ ] `backend/server.js` includes `/api/user` route

---

## 🚀 7. Server Startup

- [ ] Start server: `npm run dev`
- [ ] Server runs on port 5000 (or configured PORT)
- [ ] No errors in console
- [ ] See: "✅ MySQL Database Connected Successfully"
- [ ] See: "🚀 Server running in development mode"

---

## 🧪 8. API Testing

### Health Check
- [ ] `GET http://localhost:5000/health` returns 200
- [ ] Response includes: `"database": "MySQL"`

### Registration
- [ ] `POST /api/auth/register` with valid data returns 201
- [ ] Response includes `token` and user data
- [ ] User saved in database
- [ ] Password is hashed (not plain text)
- [ ] Welcome email received (check inbox/spam)

### Login
- [ ] `POST /api/auth/login` with correct credentials returns 200
- [ ] Response includes `token` and user data
- [ ] Login with wrong email returns "Invalid email"
- [ ] Login with wrong password returns "Incorrect password"

### Profile
- [ ] `GET /api/user/profile` with token returns 200
- [ ] Response includes user data (no password)
- [ ] Request without token returns 401
- [ ] Request with invalid token returns 401

### Forgot Password
- [ ] `POST /api/auth/forgot-password` with valid email returns 200
- [ ] Email received with reset link
- [ ] Token saved in `password_reset_tokens` table
- [ ] Token has correct expiry (1 hour from now)

### Reset Password
- [ ] `POST /api/auth/reset-password/:token` with valid token returns 200
- [ ] Password updated in database
- [ ] Token marked as used
- [ ] Can login with new password
- [ ] Cannot reuse same token

### Profile Image Upload
- [ ] `POST /api/user/profile/image` with image file returns 200
- [ ] Image saved in `uploads/profiles/`
- [ ] Database updated with image path
- [ ] Old image deleted (if exists)
- [ ] Upload fails with file > 5MB
- [ ] Upload fails with non-image file

### Profile Update
- [ ] `PUT /api/user/profile` updates user data
- [ ] Can update name, email, phone
- [ ] Can update address fields
- [ ] Can upload image in same request
- [ ] Old image deleted when new one uploaded

### Profile Image Delete
- [ ] `DELETE /api/user/profile/image` returns 200
- [ ] Image file deleted from server
- [ ] Database field set to null

---

## 🔐 9. Security Verification

### Password Security
- [ ] Passwords hashed in database (not plain text)
- [ ] bcrypt salt rounds = 10
- [ ] Passwords never returned in API responses

### JWT Security
- [ ] Token format: `Bearer <token>`
- [ ] Token expires after configured time (7 days)
- [ ] Invalid tokens rejected
- [ ] Expired tokens rejected

### Role-Based Access
- [ ] Regular users can access user routes
- [ ] Admin users can access admin routes
- [ ] Regular users cannot access admin routes

### File Upload Security
- [ ] Only image files accepted
- [ ] File size limited to 5MB
- [ ] Unique filenames generated
- [ ] Old files cleaned up

---

## 📚 10. Documentation

- [ ] `AUTH_SYSTEM_README.md` reviewed
- [ ] `API_TESTING_GUIDE.md` reviewed
- [ ] `QUICK_START_AUTH.md` reviewed
- [ ] `AUTHENTICATION_COMPLETE.md` reviewed
- [ ] `AUTH_FLOW_DIAGRAM.md` reviewed
- [ ] `.env.example` file exists

---

## 🎯 11. Production Readiness

### Security
- [ ] Strong `JWT_SECRET` set (not default)
- [ ] HTTPS enabled (production)
- [ ] CORS configured for production domain
- [ ] Rate limiting added (recommended)
- [ ] Helmet security headers enabled

### Email
- [ ] Production email service configured (SendGrid/AWS SES)
- [ ] Email templates tested
- [ ] Unsubscribe links added (if required)

### Database
- [ ] Production database configured
- [ ] Database backups enabled
- [ ] Connection pooling configured

### Monitoring
- [ ] Logging configured (Winston/Morgan)
- [ ] Error tracking (Sentry/similar)
- [ ] Performance monitoring
- [ ] Uptime monitoring

### Performance
- [ ] Database indexes added
- [ ] Image optimization enabled
- [ ] Caching configured (Redis)
- [ ] CDN for static files

---

## 🐛 12. Troubleshooting

### Common Issues Checked

#### Database Connection
- [ ] MySQL is running: `mysql -u root -p`
- [ ] Database exists: `SHOW DATABASES;`
- [ ] Credentials correct in `.env`
- [ ] Tables exist: `SHOW TABLES;`

#### Email Not Sending
- [ ] Gmail App Password (not regular password)
- [ ] 2FA enabled on Gmail
- [ ] `EMAIL_USER` and `EMAIL_PASSWORD` set
- [ ] Check server logs for errors
- [ ] Test with different email service

#### Token Issues
- [ ] `JWT_SECRET` set in `.env`
- [ ] Token format: `Bearer <token>`
- [ ] Token not expired
- [ ] User exists in database

#### File Upload Issues
- [ ] `uploads/profiles/` directory exists
- [ ] Directory has write permissions
- [ ] File size < 5MB
- [ ] File is an image format

#### Server Won't Start
- [ ] Port 5000 not in use
- [ ] All dependencies installed
- [ ] No syntax errors in code
- [ ] `.env` file exists and valid

---

## ✅ Final Verification

Run all checks:

```bash
# 1. Check database tables
node check-tables.js

# 2. Start server
npm run dev

# 3. Test health endpoint
curl http://localhost:5000/health

# 4. Test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","phone":"1234567890","password":"test123"}'

# 5. Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

---

## 📊 Success Criteria

All of the following should be true:

- [x] Server starts without errors
- [x] Database connection successful
- [x] All tables exist with correct schema
- [x] User registration works
- [x] User login works
- [x] JWT authentication works
- [x] Password reset email sent
- [x] Password reset works
- [x] Profile management works
- [x] Image upload works
- [x] All security features enabled
- [x] Documentation complete

---

## 🎉 Completion

When all items are checked:

✅ **Your authentication system is fully operational!**

Next steps:
1. Integrate with frontend
2. Add additional features
3. Deploy to production

---

## 📞 Support

If any items fail:
1. Check server logs: `npm run dev`
2. Review documentation in `/backend/`
3. Verify `.env` configuration
4. Test database connection
5. Check file permissions

---

**Last Updated:** November 2024
