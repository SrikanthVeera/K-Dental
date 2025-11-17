# 🔐 Multi-Role Login System

Complete implementation of separate login portals for Customer, Serviceman, and Admin roles.

---

## 🎯 Overview

The system now supports three distinct user roles with separate login portals:

1. **Customer** - Regular users who purchase products
2. **Serviceman** - Service providers who offer dental services
3. **Admin** - Administrators who manage the platform

---

## 📋 Backend Implementation

### 1️⃣ User Roles

**Available Roles:**
- `customer` (default) - Regular users
- `serviceman` - Service providers
- `admin` - Administrators

### 2️⃣ API Endpoints

#### General Login (Any Role)
```
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Customer Login
```
POST /api/auth/login/customer
```

**Request Body:**
```json
{
  "email": "customer@example.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "customer@example.com",
    "role": "customer",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Response (Wrong Portal):**
```json
{
  "success": false,
  "message": "This account is not registered as customer. Please use the correct login portal."
}
```

#### Serviceman Login
```
POST /api/auth/login/serviceman
```

**Request Body:**
```json
{
  "email": "serviceman@example.com",
  "password": "password123"
}
```

#### Admin Login
```
POST /api/auth/login/admin
```

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

---

## 🔒 Middleware

### Role-Based Access Control

**Protect Middleware** - Requires authentication
```javascript
import { protect } from '../middleware/authMiddleware.js';
router.get('/profile', protect, getUserProfile);
```

**Customer Middleware** - Requires customer or admin role
```javascript
import { protect, customer } from '../middleware/authMiddleware.js';
router.get('/orders', protect, customer, getOrders);
```

**Serviceman Middleware** - Requires serviceman or admin role
```javascript
import { protect, serviceman } from '../middleware/authMiddleware.js';
router.get('/services', protect, serviceman, getServices);
```

**Admin Middleware** - Requires admin role only
```javascript
import { protect, admin } from '../middleware/authMiddleware.js';
router.get('/users', protect, admin, getAllUsers);
```

---

## 🧪 Testing

### Test Customer Login
```bash
curl -X POST http://localhost:5000/api/auth/login/customer \
  -H "Content-Type: application/json" \
  -d '{"email":"customer@example.com","password":"password123"}'
```

### Test Serviceman Login
```bash
curl -X POST http://localhost:5000/api/auth/login/serviceman \
  -H "Content-Type: application/json" \
  -d '{"email":"serviceman@example.com","password":"password123"}'
```

### Test Admin Login
```bash
curl -X POST http://localhost:5000/api/auth/login/admin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@dentalshop.com","password":"admin123"}'
```

### Test Wrong Portal
```bash
# Try to login as customer with admin account
curl -X POST http://localhost:5000/api/auth/login/customer \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@dentalshop.com","password":"admin123"}'

# Response: "This account is not registered as customer..."
```

---

## 👥 Creating Test Users

### Create Customer
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Customer",
    "email": "customer@example.com",
    "phone": "1234567890",
    "password": "password123",
    "role": "customer"
  }'
```

### Create Serviceman
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mike Serviceman",
    "email": "serviceman@example.com",
    "phone": "9876543210",
    "password": "password123",
    "role": "serviceman"
  }'
```

### Create Admin
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@dentalshop.com",
    "phone": "5555555555",
    "password": "admin123",
    "role": "admin"
  }'
```

---

## 🎨 Frontend Implementation

### Login Page Structure

```
/login
  ├── /login/customer    → Customer Login Portal
  ├── /login/serviceman  → Serviceman Login Portal
  └── /login/admin       → Admin Login Portal
```

### Dashboard Routes

```
After Login → Redirect based on role:

customer    → /dashboard/customer
serviceman  → /dashboard/serviceman
admin       → /dashboard/admin
```

---

## 📊 Role Permissions

### Customer Permissions
- ✅ Browse products
- ✅ Add to cart
- ✅ Place orders
- ✅ View order history
- ✅ Write reviews
- ✅ Update profile
- ❌ Access serviceman features
- ❌ Access admin panel

### Serviceman Permissions
- ✅ View service requests
- ✅ Accept/reject services
- ✅ Update service status
- ✅ View earnings
- ✅ Update profile
- ❌ Access customer orders
- ❌ Access admin panel

### Admin Permissions
- ✅ All customer permissions
- ✅ All serviceman permissions
- ✅ Manage users
- ✅ Manage products
- ✅ View all orders
- ✅ View analytics
- ✅ System settings

---

## 🔄 Database Migration

The database has been updated to support the new role system:

**Before:**
- Roles: `user`, `admin`

**After:**
- Roles: `customer`, `serviceman`, `admin`

**Migration Script:**
```bash
node update-roles.js
```

This script:
1. Expands enum to include all roles
2. Converts existing `user` → `customer`
3. Finalizes enum with new roles
4. Shows role distribution

---

## 🚀 Quick Start

### 1. Update Database
```bash
cd backend
node update-roles.js
```

### 2. Restart Server
```bash
npm run dev
```

### 3. Test Endpoints
```bash
# Test customer login
curl -X POST http://localhost:5000/api/auth/login/customer \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

---

## 📝 Frontend Integration Guide

### 1. Create Login Selection Page

```jsx
// LoginSelection.jsx
import { Link } from 'react-router-dom';

export default function LoginSelection() {
  return (
    <div className="login-selection">
      <h1>Select Login Type</h1>
      
      <Link to="/login/customer" className="login-card">
        <h2>Customer Login</h2>
        <p>Shop for dental products</p>
      </Link>

      <Link to="/login/serviceman" className="login-card">
        <h2>Serviceman Login</h2>
        <p>Manage your services</p>
      </Link>

      <Link to="/login/admin" className="login-card">
        <h2>Admin Login</h2>
        <p>Manage the platform</p>
      </Link>
    </div>
  );
}
```

### 2. Create Role-Specific Login Pages

```jsx
// CustomerLogin.jsx
import { useState } from 'react';
import axios from 'axios';

export default function CustomerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/login/customer', {
        email,
        password
      });
      
      // Store token
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('role', data.data.role);
      
      // Redirect to customer dashboard
      window.location.href = '/dashboard/customer';
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Customer Login</h2>
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

### 3. Protected Route Component

```jsx
// ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
```

### 4. Router Setup

```jsx
// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginSelection />} />
        <Route path="/login/customer" element={<CustomerLogin />} />
        <Route path="/login/serviceman" element={<ServicemanLogin />} />
        <Route path="/login/admin" element={<AdminLogin />} />

        <Route 
          path="/dashboard/customer" 
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <CustomerDashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/dashboard/serviceman" 
          element={
            <ProtectedRoute allowedRoles={['serviceman']}>
              <ServicemanDashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/dashboard/admin" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## ✅ Implementation Checklist

### Backend
- [x] Update User model with serviceman role
- [x] Create role-specific middleware
- [x] Add role-specific login endpoints
- [x] Update database enum
- [x] Migrate existing users
- [x] Test all endpoints

### Frontend (To Do)
- [ ] Create login selection page
- [ ] Create customer login page
- [ ] Create serviceman login page
- [ ] Create admin login page
- [ ] Create customer dashboard
- [ ] Create serviceman dashboard
- [ ] Create admin dashboard
- [ ] Implement protected routes
- [ ] Add role-based navigation

---

## 🎉 Success!

Your multi-role login system is now ready! Users can:

1. **Choose their login portal** from the main login page
2. **Login with role validation** - wrong portal shows error
3. **Access role-specific dashboards** after login
4. **Have role-based permissions** throughout the app

---

**Next Steps:** Implement the frontend pages following the integration guide above!
