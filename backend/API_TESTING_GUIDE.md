# 🧪 API Testing Guide - DentalShop Authentication

Complete guide to test all authentication endpoints using Postman, Thunder Client, or cURL.

---

## 🚀 Quick Start

1. **Start the server:**
```bash
cd backend
npm run dev
```

2. **Sync database (first time only):**
```bash
node sync-database.js
```

3. **Base URL:** `http://localhost:5000`

---

## 📋 Test Sequence

Follow this order to test all features:

### 1. Register a New User ✅

**Endpoint:** `POST /api/auth/register`

**Request:**
```json
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "password123"
}
```

**Expected Response (201):**
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

**Save the token** for subsequent requests!

---

### 2. Login with Credentials ✅

**Endpoint:** `POST /api/auth/login`

**Request:**
```json
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Expected Response (200):**
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
    "profileImage": null,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Test Error Cases:**

**Wrong Email:**
```json
{
  "email": "wrong@example.com",
  "password": "password123"
}
```
Response: `{ "success": false, "message": "Invalid email" }`

**Wrong Password:**
```json
{
  "email": "john@example.com",
  "password": "wrongpassword"
}
```
Response: `{ "success": false, "message": "Incorrect password" }`

---

### 3. Get User Profile ✅

**Endpoint:** `GET /api/user/profile`

**Request:**
```
GET http://localhost:5000/api/user/profile
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "profileImage": null,
    "role": "user",
    "phone": "1234567890",
    "dentalCoins": 500,
    "address": {
      "street": null,
      "city": null,
      "state": null,
      "pincode": null,
      "country": "India"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 4. Upload Profile Image ✅

**Endpoint:** `POST /api/user/profile/image`

**Request (Multipart Form Data):**
```
POST http://localhost:5000/api/user/profile/image
Authorization: Bearer YOUR_JWT_TOKEN_HERE
Content-Type: multipart/form-data

Form Data:
  profileImage: [SELECT AN IMAGE FILE]
```

**Postman Instructions:**
1. Select POST method
2. Enter URL: `http://localhost:5000/api/user/profile/image`
3. Go to "Authorization" tab → Select "Bearer Token" → Paste your JWT
4. Go to "Body" tab → Select "form-data"
5. Add key: `profileImage` (change type to "File")
6. Click "Select Files" and choose an image

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Profile image uploaded successfully",
  "data": {
    "profileImage": "/uploads/profiles/profile-1-1699876543210-123456789.jpg"
  }
}
```

**Constraints:**
- Max file size: 5MB
- Allowed formats: jpeg, jpg, png, gif, webp

---

### 5. Update Profile (with Image) ✅

**Endpoint:** `PUT /api/user/profile`

**Request (Multipart Form Data):**
```
PUT http://localhost:5000/api/user/profile
Authorization: Bearer YOUR_JWT_TOKEN_HERE
Content-Type: multipart/form-data

Form Data:
  name: John Updated
  email: john.updated@example.com
  phone: 9876543210
  street: 123 Main Street
  city: Mumbai
  state: Maharashtra
  pincode: 400001
  country: India
  profileImage: [OPTIONAL - SELECT NEW IMAGE]
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": 1,
    "name": "John Updated",
    "email": "john.updated@example.com",
    "profileImage": "/uploads/profiles/profile-1-1699876543210-123456789.jpg",
    "role": "user",
    "phone": "9876543210",
    "dentalCoins": 500,
    "address": {
      "street": "123 Main Street",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400001",
      "country": "India"
    }
  }
}
```

---

### 6. Forgot Password ✅

**Endpoint:** `POST /api/auth/forgot-password`

**Request:**
```json
POST http://localhost:5000/api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Password reset email sent successfully. Please check your inbox."
}
```

**What Happens:**
1. Server generates a secure random token
2. Token saved to database with 1-hour expiry
3. Email sent to user with reset link
4. Check your email inbox for the reset link

**Email Configuration Required:**
Make sure `.env` has:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

---

### 7. Reset Password ✅

**Endpoint:** `POST /api/auth/reset-password/:token`

**Get Token:** Check the email sent in step 6, extract token from URL

**Request:**
```json
POST http://localhost:5000/api/auth/reset-password/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
Content-Type: application/json

{
  "password": "newPassword123"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Password reset successful. You can now login with your new password."
}
```

**Test Error Cases:**

**Invalid Token:**
```
POST /api/auth/reset-password/invalid-token
```
Response: `{ "success": false, "message": "Invalid or expired reset token" }`

**Expired Token (after 1 hour):**
Response: `{ "success": false, "message": "Invalid or expired reset token" }`

**Used Token (already used once):**
Response: `{ "success": false, "message": "Invalid or expired reset token" }`

---

### 8. Login with New Password ✅

**Endpoint:** `POST /api/auth/login`

**Request:**
```json
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "newPassword123"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": 1,
    "name": "John Updated",
    "email": "john.updated@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 9. Delete Profile Image ✅

**Endpoint:** `DELETE /api/user/profile/image`

**Request:**
```
DELETE http://localhost:5000/api/user/profile/image
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Profile image deleted successfully"
}
```

---

### 10. Register Admin User ✅

**Endpoint:** `POST /api/auth/register`

**Request:**
```json
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@dentalshop.com",
  "phone": "9999999999",
  "password": "admin123",
  "role": "admin"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 2,
    "name": "Admin User",
    "email": "admin@dentalshop.com",
    "role": "admin",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## 🔐 Testing Protected Routes

### Without Token (Should Fail)
```
GET http://localhost:5000/api/user/profile
```

**Expected Response (401):**
```json
{
  "success": false,
  "message": "Not authorized, no token"
}
```

### With Invalid Token (Should Fail)
```
GET http://localhost:5000/api/user/profile
Authorization: Bearer invalid_token_here
```

**Expected Response (401):**
```json
{
  "success": false,
  "message": "Not authorized, token failed"
}
```

### With Valid Token (Should Succeed)
```
GET http://localhost:5000/api/user/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": { ... }
}
```

---

## 🧪 cURL Commands

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","phone":"1234567890","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Get Profile
```bash
curl -X GET http://localhost:5000/api/user/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Forgot Password
```bash
curl -X POST http://localhost:5000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com"}'
```

### Reset Password
```bash
curl -X POST http://localhost:5000/api/auth/reset-password/TOKEN_HERE \
  -H "Content-Type: application/json" \
  -d '{"password":"newPassword123"}'
```

### Upload Profile Image
```bash
curl -X POST http://localhost:5000/api/user/profile/image \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "profileImage=@/path/to/image.jpg"
```

---

## 📊 Postman Collection

Create a Postman collection with these requests:

1. **Environment Variables:**
   - `baseUrl`: `http://localhost:5000`
   - `token`: (will be set automatically)

2. **Pre-request Script (for Login/Register):**
```javascript
// Save token from response
pm.test("Save token", function () {
    var jsonData = pm.response.json();
    if (jsonData.data && jsonData.data.token) {
        pm.environment.set("token", jsonData.data.token);
    }
});
```

3. **Authorization Header (for protected routes):**
```
Authorization: Bearer {{token}}
```

---

## ✅ Test Checklist

- [ ] User can register with valid data
- [ ] Registration fails with duplicate email
- [ ] Registration fails with duplicate phone
- [ ] User can login with correct credentials
- [ ] Login fails with wrong email
- [ ] Login fails with wrong password
- [ ] User receives welcome email on registration
- [ ] Protected routes require valid JWT token
- [ ] User can view their profile
- [ ] User can update profile information
- [ ] User can upload profile image (< 5MB)
- [ ] Upload fails with non-image files
- [ ] Upload fails with files > 5MB
- [ ] User can delete profile image
- [ ] User can request password reset
- [ ] Password reset email is sent
- [ ] User can reset password with valid token
- [ ] Reset fails with invalid token
- [ ] Reset fails with expired token (> 1 hour)
- [ ] Token can only be used once
- [ ] User can login with new password
- [ ] Admin user has role "admin"
- [ ] Passwords are hashed in database
- [ ] Passwords never returned in responses

---

## 🐛 Troubleshooting

### Email Not Sending
1. Check `.env` has correct EMAIL_USER and EMAIL_PASSWORD
2. Verify Gmail App Password (not regular password)
3. Check server logs for email errors
4. Test with a different email service if needed

### Token Invalid
1. Verify JWT_SECRET in `.env`
2. Check token format: `Bearer <token>`
3. Token may have expired (default 7 days)
4. Generate new token by logging in again

### File Upload Fails
1. Check `uploads/profiles` directory exists
2. Verify file size < 5MB
3. Ensure file is an image format
4. Check server has write permissions

### Database Errors
1. Run `node sync-database.js` to sync models
2. Check MySQL is running
3. Verify database credentials in `.env`
4. Check database exists: `CREATE DATABASE dentalshop;`

---

## 📝 Notes

- All timestamps are in ISO 8601 format
- Tokens expire after 7 days (configurable)
- Password reset tokens expire after 1 hour
- Profile images stored in `uploads/profiles/`
- Old profile images automatically deleted on update
- Welcome bonus: 500 Dental Coins on registration

---

**Happy Testing! 🚀**
