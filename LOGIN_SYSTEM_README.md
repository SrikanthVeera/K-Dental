# Login System Implementation

A complete authentication system with a modern login modal inspired by DentalKart.

## 🎯 Features

### Login Page (`/login`)
- **Split-screen design**:
  - Left: Hero section with features and branding (desktop only)
  - Right: Login card with call-to-action button
- **Responsive**: Mobile-friendly with stacked layout
- **Quick stats**: Shows 2L+ dentists, 20K+ products, 100% genuine
- **Signup bonus**: Highlights 500 Dentalcoins for new users

### Login Modal
- **Two login methods**:
  1. **Phone + OTP**: 
     - Enter 10-digit mobile number
     - Receive 6-digit OTP
     - Verify OTP to login
  2. **Email + Password**:
     - Traditional email/password login
     - Direct authentication

- **Additional features**:
  - Google OAuth button (ready for integration)
  - Referral code option
  - Help/support link
  - Terms & policy links
  - Smooth animations with Framer Motion

### Authentication Store (Zustand)
- **Persistent auth state**: Saved to localStorage
- **User management**: Stores user info (name, email, phone, role)
- **Role-based access**: Supports 'user' and 'admin' roles
- **Mock users for demo**:
  - Admin: Phone `9876543210` (redirects to `/admin/dashboard`)
  - User: Phone `9876543211` (redirects to `/`)
  - Any new number creates a new user account

## 🔐 How It Works

### 1. Login Flow
```
User clicks "Login / Sign Up" 
  → Modal opens
  → Choose login method (Phone/Email)
  → Enter credentials
  → Click "Send OTP" or "Login"
  → (For phone) Enter 6-digit OTP
  → Authentication successful
  → Redirect based on role:
     - Admin → /admin/dashboard
     - User → /
```

### 2. Admin Access Control
- Admin routes are protected by `AdminLayout`
- Checks if user is authenticated AND has admin role
- Non-admin users are redirected to `/login`
- Logout button clears auth state and redirects to login

### 3. Mock Authentication
Currently uses mock data for demo:
```typescript
// Admin user
Phone: 9876543210
Role: admin

// Regular user
Phone: 9876543211
Role: user

// Any other number creates new user
```

## 📁 File Structure

```
frontend/src/
├── store/
│   └── authStore.ts              # Zustand auth store with persistence
├── components/
│   └── auth/
│       └── LoginModal.tsx        # Login modal component
├── pages/
│   └── Login.tsx                 # Login page
└── components/admin/
    └── AdminLayout.tsx           # Updated with auth integration
```

## 🚀 Usage

### Access the Login Page
```
http://localhost:5173/login
```

### Test Admin Login
1. Go to `/login`
2. Click "Login / Sign Up"
3. Enter phone: `9876543210`
4. Click "Send OTP"
5. Enter any 6-digit OTP (e.g., `123456`)
6. Click "Verify OTP"
7. Redirected to `/admin/dashboard`

### Test User Login
1. Go to `/login`
2. Click "Login / Sign Up"
3. Enter phone: `9876543211`
4. Click "Send OTP"
5. Enter any 6-digit OTP
6. Redirected to home page

### Test Email Login
1. Go to `/login`
2. Click "Login / Sign Up"
3. Switch to "Login with Email" tab
4. Enter email: `admin@dentalkart.com`
5. Enter any password
6. Click "Login"
7. Redirected based on role

## 🔄 Integration with Real Backend

To connect with your actual backend API:

### 1. Update `authStore.ts`
```typescript
login: async (phoneOrEmail: string, otpOrPassword?: string) => {
  try {
    // Replace with actual API call
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneOrEmail, otpOrPassword })
    });
    
    const data = await response.json();
    
    if (data.success) {
      set({ 
        user: data.user, 
        isAuthenticated: true 
      });
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}
```

### 2. Add OTP Sending API
```typescript
const sendOTP = async (phone: string) => {
  const response = await fetch('/api/auth/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone })
  });
  return response.json();
};
```

### 3. Implement Google OAuth
```typescript
const handleGoogleLogin = () => {
  window.location.href = '/api/auth/google';
};
```

## 🎨 Customization

### Change Colors
Update colors in components:
- Primary: `#007AFF` (blue)
- Dark: `#1e3a5f` (navy)
- Background: `#F4F9FF` (light blue)

### Modify Mock Users
Edit `authStore.ts`:
```typescript
const mockUsers = [
  {
    id: 1,
    name: 'Your Name',
    email: 'your@email.com',
    phone: '1234567890',
    role: 'admin'
  }
];
```

### Add More Login Methods
Add new tabs in `LoginModal.tsx`:
- Social logins (Facebook, Apple)
- Username/password
- Magic link

## 🔒 Security Notes

⚠️ **Important**: This is a demo implementation with mock authentication.

For production:
1. ✅ Use HTTPS only
2. ✅ Implement proper OTP verification
3. ✅ Add rate limiting
4. ✅ Hash passwords (bcrypt)
5. ✅ Use JWT tokens
6. ✅ Implement refresh tokens
7. ✅ Add CSRF protection
8. ✅ Validate all inputs
9. ✅ Add 2FA option
10. ✅ Log authentication attempts

## 📱 Responsive Design

- **Desktop**: Split-screen with hero section
- **Tablet**: Optimized layout
- **Mobile**: Stacked layout, full-width modal

## 🎯 Next Steps

1. Connect to backend API
2. Implement real OTP service (Twilio, AWS SNS)
3. Add Google OAuth integration
4. Implement password reset flow
5. Add email verification
6. Create user profile page
7. Add session management
8. Implement remember me functionality

---

**Demo Credentials:**
- Admin Phone: `9876543210`
- User Phone: `9876543211`
- Any OTP works in demo mode
