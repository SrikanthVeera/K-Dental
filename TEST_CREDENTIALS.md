# Test Credentials - K Dental

## 🔐 Admin Registration Code

**Admin Code**: `ADMIN2024`

Use this code when registering as an admin at `/register/admin`

---

## 📝 How to Create Test Accounts

### Customer Account
1. Click "Login" in header
2. Click "Customer Login"
3. Click "Register here"
4. Fill form:
   - Name: Test Customer
   - Email: customer@test.com
   - Phone: 9876543210
   - Password: test123
5. Submit → Auto login → Redirects to customer dashboard

### Serviceman Account
1. Click "Login" in header
2. Click "Serviceman Login"
3. Click "Register as Serviceman"
4. Fill form:
   - Name: Test Serviceman
   - Email: serviceman@test.com
   - Phone: 9876543211
   - Password: test123
5. Submit → Auto login → Redirects to serviceman dashboard

### Admin Account
1. Click "Login" in header
2. Click "Admin Login"
3. Click "Request Admin Account"
4. Fill form:
   - Name: Test Admin
   - Email: admin@test.com
   - Phone: 9876543212
   - **Admin Code: ADMIN2024** ⚠️ Important!
   - Password: test123
5. Submit → Auto login → Redirects to admin dashboard

---

## 🚨 Common Errors & Solutions

### Error: "Invalid admin registration code"
**Solution**: Use the code `ADMIN2024` (case-sensitive)

### Error: "403 Forbidden" when logging in
**Cause**: You're trying to login with wrong role
**Solution**: 
- If you registered as customer, use customer login
- If you registered as serviceman, use serviceman login
- If you registered as admin, use admin login

### Error: "401 Unauthorized"
**Cause**: Wrong email or password
**Solution**: Check your credentials or register a new account

### Error: "User already exists"
**Cause**: Email or phone already registered
**Solution**: Use different email/phone or login with existing account

### Error: "No routes matched location /dashboard/customer"
**Solution**: ✅ Fixed! Customer dashboard route added

---

## 🎯 Quick Test Flow

### Test All 3 Roles:

1. **Customer**:
   ```
   Email: customer@test.com
   Password: test123
   Dashboard: Blue/Cyan theme with orders & wishlist
   ```

2. **Serviceman**:
   ```
   Email: serviceman@test.com
   Password: test123
   Dashboard: Purple/Pink theme with services & schedule
   ```

3. **Admin**:
   ```
   Email: admin@test.com
   Password: test123
   Admin Code: ADMIN2024
   Dashboard: Orange/Red theme with system controls
   ```

---

## 📊 Dashboard Features

### Customer Dashboard
- ✅ Total Orders count
- ✅ Wishlist items
- ✅ Dental Coins balance
- ✅ Total Savings
- ✅ Recent orders list
- ✅ Quick actions (Browse, Track, Wishlist, Rewards)
- ✅ Profile card
- ✅ Membership status

### Serviceman Dashboard
- ✅ Active Services count
- ✅ Completed today
- ✅ Today's earnings
- ✅ Pending tasks
- ✅ Today's schedule with locations
- ✅ Performance metrics
- ✅ Recent activity feed

### Admin Dashboard
- ✅ System overview
- ✅ User management
- ✅ Analytics
- ✅ Settings

---

## 🔄 Reset Instructions

If you need to start fresh:

1. **Clear browser data**:
   - Open DevTools (F12)
   - Application tab → Local Storage
   - Clear all items

2. **Or logout**:
   - Click logout button in dashboard
   - This clears localStorage automatically

---

## ✅ All Routes Working

- `/` - Home page
- `/login/serviceman` - Serviceman login
- `/login/admin` - Admin login
- `/register/serviceman` - Serviceman registration
- `/register/admin` - Admin registration
- `/dashboard/customer` - Customer dashboard ✅ NEW
- `/dashboard/serviceman` - Serviceman dashboard
- `/dashboard/admin` - Admin dashboard

---

## 🎨 Color Themes

- **Customer**: Blue → Cyan (Shopping theme)
- **Serviceman**: Purple → Pink (Service theme)
- **Admin**: Orange → Red (Security theme)

---

**Remember**: Admin code is `ADMIN2024` 🔑
