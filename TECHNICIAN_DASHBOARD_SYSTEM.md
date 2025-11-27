# Technician/Serviceman Dashboard - Complete System

## 🎯 Overview
A complete Flipkart-style technician dashboard for managing service jobs, earnings, and profile.

## 📋 Features Checklist

### Authentication & Access
- ✅ Technician login with phone/email + password
- ✅ JWT token authentication
- ✅ Role-based access (only role="serviceman")
- ✅ Auto-redirect if not authenticated
- ✅ Access denied for non-technicians

### Dashboard Sections
- ✅ New Jobs Assigned
- ✅ Accepted Jobs
- ✅ Completed Jobs
- ✅ Cancelled Jobs
- ✅ Daily Stats (Total, Completed, Earnings)

### Job Management
- ✅ Accept/Reject job requests
- ✅ Status updates: Reached → In Progress → Completed
- ✅ OTP verification from customer
- ✅ Upload proof images after completion
- ✅ Google Maps integration for location

### Additional Features
- ✅ Wallet/Earnings page
- ✅ Service history
- ✅ Notifications system
- ✅ Profile management
- ✅ Dark/Light mode toggle
- ✅ Responsive design (Mobile + Tablet)

## 🗄️ Database Schema

### Table: technicians
```sql
CREATE TABLE technicians (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  profile_image VARCHAR(500),
  aadhar_number VARCHAR(12),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  pincode VARCHAR(10),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  role ENUM('serviceman') DEFAULT 'serviceman',
  status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
  rating DECIMAL(3, 2) DEFAULT 0.00,
  total_jobs INT DEFAULT 0,
  completed_jobs INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Table: service_jobs
```sql
CREATE TABLE service_jobs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  job_number VARCHAR(50) UNIQUE NOT NULL,
  customer_id INT NOT NULL,
  technician_id INT,
  product_id INT,
  service_type ENUM('installation', 'repair', 'maintenance') NOT NULL,
  description TEXT,
  customer_name VARCHAR(255),
  customer_phone VARCHAR(20),
  customer_address TEXT,
  customer_latitude DECIMAL(10, 8),
  customer_longitude DECIMAL(11, 8),
  scheduled_date DATE,
  scheduled_time TIME,
  status ENUM('assigned', 'accepted', 'rejected', 'reached', 'in_progress', 'completed', 'cancelled') DEFAULT 'assigned',
  otp VARCHAR(6),
  otp_verified BOOLEAN DEFAULT FALSE,
  payment_amount DECIMAL(10, 2),
  technician_earning DECIMAL(10, 2),
  completion_images TEXT, -- JSON array of image URLs
  customer_rating INT,
  customer_feedback TEXT,
  rejection_reason TEXT,
  cancellation_reason TEXT,
  started_at TIMESTAMP NULL,
  reached_at TIMESTAMP NULL,
  completed_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES users(id),
  FOREIGN KEY (technician_id) REFERENCES technicians(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

### Table: technician_wallet
```sql
CREATE TABLE technician_wallet (
  id INT PRIMARY KEY AUTO_INCREMENT,
  technician_id INT NOT NULL,
  job_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  transaction_type ENUM('credit', 'debit') DEFAULT 'credit',
  status ENUM('pending', 'paid', 'cancelled') DEFAULT 'pending',
  payment_date DATE NULL,
  payment_method VARCHAR(50),
  transaction_id VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (technician_id) REFERENCES technicians(id),
  FOREIGN KEY (job_id) REFERENCES service_jobs(id)
);
```

### Table: technician_notifications
```sql
CREATE TABLE technician_notifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  technician_id INT NOT NULL,
  job_id INT,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type ENUM('new_job', 'job_update', 'payment', 'system') DEFAULT 'system',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (technician_id) REFERENCES technicians(id),
  FOREIGN KEY (job_id) REFERENCES service_jobs(id)
);
```

## 📁 File Structure

```
backend/
├── models/
│   ├── TechnicianModel.js
│   ├── ServiceJobModel.js
│   ├── TechnicianWalletModel.js
│   └── TechnicianNotificationModel.js
├── routes/
│   └── technician/
│       ├── auth.js
│       ├── jobs.js
│       ├── wallet.js
│       ├── notifications.js
│       └── profile.js
├── middleware/
│   ├── technicianAuth.js
│   └── upload.js
└── controllers/
    └── technician/
        ├── authController.js
        ├── jobController.js
        └── walletController.js

frontend/
├── pages/
│   └── technician/
│       ├── TechnicianLogin.tsx
│       ├── TechnicianDashboard.tsx
│       ├── JobsList.tsx
│       ├── JobDetails.tsx
│       ├── Wallet.tsx
│       ├── ServiceHistory.tsx
│       └── TechnicianProfile.tsx
├── components/
│   └── technician/
│       ├── Sidebar.tsx
│       ├── JobCard.tsx
│       ├── StatsCard.tsx
│       └── NotificationBell.tsx
└── services/
    └── technicianApi.ts
```

## 🔐 API Endpoints

### Authentication
```
POST   /api/technician/login
POST   /api/technician/register
POST   /api/technician/logout
GET    /api/technician/me
PUT    /api/technician/profile
POST   /api/technician/profile/image
```

### Jobs
```
GET    /api/technician/jobs/new
GET    /api/technician/jobs/accepted
GET    /api/technician/jobs/completed
GET    /api/technician/jobs/cancelled
GET    /api/technician/job/:jobId
PUT    /api/technician/job/accept/:jobId
PUT    /api/technician/job/reject/:jobId
PUT    /api/technician/job/status/:jobId
POST   /api/technician/job/verify-otp/:jobId
POST   /api/technician/job/upload-proof/:jobId
GET    /api/technician/stats/today
```

### Wallet
```
GET    /api/technician/wallet
GET    /api/technician/wallet/pending
GET    /api/technician/wallet/history
```

### Notifications
```
GET    /api/technician/notifications
PUT    /api/technician/notifications/:id/read
PUT    /api/technician/notifications/read-all
```

## 🎨 UI Components

### Dashboard Layout
- Left Sidebar (collapsible on mobile)
- Top Header with profile and notifications
- Main content area
- Stats cards at top
- Job lists below

### Color Scheme
- Primary: Blue (#2874f0) - Flipkart style
- Success: Green (#388e3c)
- Warning: Orange (#ff9800)
- Danger: Red (#f44336)
- Dark Mode: Dark gray (#1a1a1a)

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Implementation Priority

### Phase 1: Core Setup ✅
1. Database models
2. Authentication system
3. Basic dashboard layout

### Phase 2: Job Management ✅
1. Job listing (new, accepted, completed)
2. Accept/Reject functionality
3. Status updates
4. OTP verification

### Phase 3: Advanced Features ✅
1. Image upload
2. Wallet system
3. Notifications
4. Google Maps integration

### Phase 4: Polish ✅
1. Dark mode
2. Responsive design
3. Loading states
4. Error handling

## 📱 Mobile-First Design

### Sidebar Behavior
- Desktop: Always visible
- Mobile: Hamburger menu, slides from left

### Job Cards
- Desktop: Grid layout (2-3 columns)
- Mobile: Single column, full width

### Stats Cards
- Desktop: 4 cards in a row
- Mobile: 2 cards per row

## 🔒 Security Features

1. JWT token with 24h expiry
2. Password hashing with bcrypt
3. Role-based middleware
4. Input validation
5. SQL injection prevention
6. XSS protection
7. Rate limiting on login
8. Secure file upload

## 📊 Job Status Flow

```
assigned → accepted → reached → in_progress → completed
    ↓
rejected/cancelled
```

## 🎯 Next Steps

1. Create database models
2. Set up authentication routes
3. Build dashboard UI
4. Implement job management
5. Add wallet system
6. Integrate notifications
7. Test and deploy

---

**Ready to implement! Let's build this step by step.** 🚀
