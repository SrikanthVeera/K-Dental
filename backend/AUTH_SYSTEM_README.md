# 🔐 DentalShop Authentication System

Complete secure authentication system with JWT, password reset, and profile management.

## 📋 Features

### ✅ Implemented Features

1. **User Registration** - POST `/api/auth/register`
2. **User Login** - POST `/api/auth/login`
3. **Forgot Password** - POST `/api/auth/forgot-password`
4. **Reset Password** - POST `/api/auth/reset-password/:token`
5. **Get User Profile** - GET `/api/user/profile`
6. **Update Profile** - PUT `/api/user/profile`
7. **Upload Profile Image** - POST `/api/user/profile/image`
8. **Delete Profile Image** - DELETE `/api/user/profile/image`
9. **Role-Based Access Control** (Admin middleware)
10. **JWT Authentication** with Bearer tokens

---

## 🗄️ Database Models

### User Model
```javascript
{
  id: INTEGER (auto-increment, primary key),
  name: STRING (required),
  email: STRING (unique, required),
  phone: STRING (unique, required),
  password: STRING (hashed with bcrypt, required),
  role: ENUM['user', 'admin'] (default: 'user'),
  profileImage: STRING (nullable),
  street: STRING,
  city: STRING,
  state: STRING,
  pincode: STRING,
  country: STRING (default: 'India'),
  dentalCoins: INTEGER (default: 0),
  createdAt: DATE,
  updatedAt: DATE
}
```

### PasswordResetToken Model
```javascript
{
  id: INTEGER (auto-increment, primary key),
  userId: INTEGER (foreign key to User),
  token: STRING (unique, required),
  expiresAt: DATE (required),
  used: BOOLEAN (default: false),
  createdAt: DATE,
  updatedAt: DATE
}
```

---

## 🔌 API Endpoints

### 1️⃣ Register User
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "securePassword123",
  "role": "user"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "role": "user",
    "dentalCoins": 500,
    "profileImage": null,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 2️⃣ Login User
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "role": "user",
    "dentalCoins": 500,
    "profileImage": "/uploads/profiles/profile-1-1234567890.jpg",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- Invalid email: `{ "success": false, "message": "Invalid email" }`
- Wrong password: `{ "success": false, "message": "Incorrect password" }`

---

### 3️⃣ Forgot Password
**POST** `/api/auth/forgot-password`

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password reset email sent successfully. Please check your inbox."
}
```

**Email Content:**
- Subject: "Password Reset Request - DentalShop"
- Contains reset link: `https://yourfrontend.com/reset-password/:token`
- Token expires in 1 hour

---

### 4️⃣ Reset Password
**POST** `/api/auth/reset-password/:token`

**Request Body:**
```json
{
  "password": "newSecurePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password reset successful. You can now login with your new password."
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Invalid or expired reset token"
}
```

---

### 5️⃣ Get User Profile
**GET** `/api/user/profile`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "profileImage": "/uploads/profiles/profile-1-1234567890.jpg",
    "role": "user",
    "phone": "1234567890",
    "dentalCoins": 500,
    "address": {
      "street": "123 Main St",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400001",
      "country": "India"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 6️⃣ Update Profile
**PUT** `/api/user/profile`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
```
name: John Updated
email: john.updated@example.com
phone: 9876543210
street: 456 New Street
city: Delhi
state: Delhi
pincode: 110001
country: India
profileImage: [FILE]
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": 1,
    "name": "John Updated",
    "email": "john.updated@example.com",
    "profileImage": "/uploads/profiles/profile-1-1234567890.jpg",
    "role": "user",
    "phone": "9876543210",
    "dentalCoins": 500,
    "address": {
      "street": "456 New Street",
      "city": "Delhi",
      "state": "Delhi",
      "pincode": "110001",
      "country": "India"
    }
  }
}
```

---

### 7️⃣ Upload Profile Image
**POST** `/api/user/profile/image`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
```
profileImage: [IMAGE_FILE]
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile image uploaded successfully",
  "data": {
    "profileImage": "/uploads/profiles/profile-1-1234567890.jpg"
  }
}
```

**Constraints:**
- Max file size: 5MB
- Allowed formats: jpeg, jpg, png, gif, webp

---

### 8️⃣ Delete Profile Image
**DELETE** `/api/user/profile/image`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile image deleted successfully"
}
```

---

## 🔒 Security Features

### Password Hashing
- Uses **bcrypt** with salt rounds = 10
- Passwords automatically hashed on user creation and update
- Never returned in API responses

### JWT Authentication
- Token format: `Bearer <token>`
- Expiry: 7 days (configurable via `JWT_EXPIRE` env variable)
- Stored in `Authorization` header

### Role-Based Access Control
```javascript
// Protect route (requires authentication)
router.get('/profile', protect, getUserProfile);

// Admin-only route
router.get('/admin/dashboard', protect, admin, getAdminDashboard);
```

### Password Reset Security
- Tokens are cryptographically secure (32 bytes random)
- Tokens expire after 1 hour
- Tokens can only be used once
- Old tokens invalidated after use

---

## 📧 Email Configuration

### Gmail SMTP Setup

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password:**
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. **Update .env file:**
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-digit-app-password
```

### Email Templates

#### Welcome Email
- Sent automatically on registration
- Includes welcome message and bonus coins info

#### Password Reset Email
- Professional HTML template
- Includes reset link with token
- Shows expiry time (1 hour)

---

## 🛠️ Middleware

### Authentication Middleware (`protect`)
```javascript
const { protect } = require('../middleware/authMiddleware');

// Usage
router.get('/profile', protect, getUserProfile);
```

### Admin Middleware (`admin`)
```javascript
const { protect, admin } = require('../middleware/authMiddleware');

// Usage
router.get('/admin/users', protect, admin, getAllUsers);
```

### File Upload Middleware
```javascript
const upload = require('../middleware/uploadMiddleware');

// Single file upload
router.post('/profile/image', protect, upload.single('profileImage'), uploadProfileImage);
```

---

## 📁 Project Structure

```
backend/
├── controllers/
│   ├── authController.js       # Auth logic (register, login, forgot/reset password)
│   └── userController.js       # User profile management
├── middleware/
│   ├── authMiddleware.js       # JWT verification & role checking
│   └── uploadMiddleware.js     # Multer file upload configuration
├── models/
│   ├── UserModel.js            # User schema with bcrypt hooks
│   ├── PasswordResetTokenModel.js  # Password reset tokens
│   └── index.js                # Model associations
├── routes/
│   ├── auth.js                 # Auth routes
│   └── user.js                 # User profile routes
├── utils/
│   └── emailService.js         # Nodemailer email functions
├── uploads/
│   └── profiles/               # Profile images storage
├── .env                        # Environment variables
└── server.js                   # Express app setup
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
Update `.env` file with your credentials:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=dentalshop
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### 3. Create Database
```bash
mysql -u root -p
CREATE DATABASE dentalshop;
```

### 4. Run Migrations
```bash
node setup-database.js
```

### 5. Start Server
```bash
npm run dev
```

Server runs on: `http://localhost:5000`

---

## 🧪 Testing with Postman/Thunder Client

### Test Registration
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "phone": "1234567890",
  "password": "password123"
}
```

### Test Login
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### Test Protected Route
```bash
GET http://localhost:5000/api/user/profile
Authorization: Bearer <YOUR_JWT_TOKEN>
```

### Test Forgot Password
```bash
POST http://localhost:5000/api/auth/forgot-password
Content-Type: application/json

{
  "email": "test@example.com"
}
```

### Test Reset Password
```bash
POST http://localhost:5000/api/auth/reset-password/<TOKEN_FROM_EMAIL>
Content-Type: application/json

{
  "password": "newPassword123"
}
```

### Test Profile Image Upload
```bash
POST http://localhost:5000/api/user/profile/image
Authorization: Bearer <YOUR_JWT_TOKEN>
Content-Type: multipart/form-data

profileImage: [SELECT_IMAGE_FILE]
```

---

## 🐛 Common Issues & Solutions

### Issue: Email not sending
**Solution:** 
- Verify Gmail App Password is correct
- Check 2FA is enabled on Gmail
- Ensure EMAIL_USER and EMAIL_PASSWORD are set in .env

### Issue: JWT token invalid
**Solution:**
- Check JWT_SECRET matches in .env
- Verify token format: `Bearer <token>`
- Token may have expired (default 7 days)

### Issue: File upload fails
**Solution:**
- Check uploads/profiles directory exists
- Verify file size < 5MB
- Ensure file is an image (jpeg, jpg, png, gif, webp)

### Issue: Password reset token expired
**Solution:**
- Tokens expire after 1 hour
- Request new reset email
- Check system time is correct

---

## 📝 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `DB_HOST` | MySQL host | `localhost` |
| `DB_USER` | MySQL username | `root` |
| `DB_PASSWORD` | MySQL password | `your_password` |
| `DB_NAME` | Database name | `dentalshop` |
| `JWT_SECRET` | JWT signing key | `your_secret_key` |
| `JWT_EXPIRE` | Token expiry | `7d` |
| `NODE_ENV` | Environment | `development` |
| `FRONTEND_URL` | Frontend URL | `http://localhost:5173` |
| `EMAIL_USER` | Gmail address | `your@gmail.com` |
| `EMAIL_PASSWORD` | Gmail app password | `16-digit-password` |

---

## ✅ Security Checklist

- [x] Passwords hashed with bcrypt (salt rounds: 10)
- [x] JWT tokens with expiration
- [x] Role-based access control (user/admin)
- [x] Secure password reset with time-limited tokens
- [x] Email validation
- [x] File upload validation (type & size)
- [x] SQL injection protection (Sequelize ORM)
- [x] CORS configuration
- [x] Helmet.js security headers
- [x] Environment variables for sensitive data

---

## 🎯 Next Steps

1. **Frontend Integration:**
   - Create login/register forms
   - Implement JWT storage (localStorage/cookies)
   - Add password reset flow
   - Build profile management UI

2. **Additional Features:**
   - Email verification on registration
   - Two-factor authentication (2FA)
   - Session management
   - Account deletion
   - Activity logs

3. **Production Deployment:**
   - Use strong JWT_SECRET
   - Enable HTTPS
   - Configure production database
   - Set up email service (SendGrid/AWS SES)
   - Add rate limiting
   - Implement logging

---

## 📞 Support

For issues or questions, please check:
- Server logs: `npm run dev`
- Database connection: Check MySQL is running
- Environment variables: Verify .env file

---

**Built with ❤️ for DentalShop E-commerce Platform**
