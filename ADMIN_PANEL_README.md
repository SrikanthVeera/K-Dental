# DentalKart Admin Panel

A modern, responsive admin dashboard for managing your dental e-commerce website.

## 🚀 Features

### Dashboard Overview (`/admin/dashboard`)
- Summary cards showing:
  - Total Products
  - Total Orders
  - Total Users
  - Total Revenue
- Recent orders table with status tracking
- Growth metrics with percentage changes

### Products Management (`/admin/products`)
- View all products in a clean table layout
- Search products by name or brand
- Filter by brand and category
- Add new products (`/admin/add-product`)
- Edit and delete existing products
- Stock level indicators (color-coded)

### Add Product Form (`/admin/add-product`)
- Complete form with validation:
  - Product Name (required)
  - Brand (required)
  - Category dropdown (required)
  - Price & MRP (required)
  - Stock quantity (required)
  - Description (required)
  - Image upload with preview
- Real-time validation feedback
- Image preview before upload

### Orders Management (`/admin/orders`)
- View all orders with customer details
- Search by order ID or customer name
- Filter by order status
- Update order status directly from table:
  - Pending
  - Shipped
  - Delivered
  - Cancelled
- Color-coded status badges

### Users Management (`/admin/users`)
- List all registered users
- Search by name or email
- Filter by role (User/Admin)
- Promote users to admin or demote to user
- View user statistics (join date, total orders)

### Settings (`/admin/settings`)
- Update admin profile information
- Change password with validation
- System settings:
  - Email notifications toggle
  - Low stock alerts toggle

## 🎨 Design Theme

- **Background Colors**: #F7FAFC (light gray), #FFFFFF (white)
- **Primary Color**: #007AFF (blue)
- **Clean UI**: Rounded corners, subtle shadows, smooth transitions
- **Responsive**: Works on mobile, tablet, and desktop

## 🔐 Authentication

The admin panel includes basic auth logic in `AdminLayout.tsx`:

```typescript
const useAuth = () => {
  const isAdmin = true; // Change to false to test redirect
  return { isAdmin };
};
```

**To implement real authentication:**
1. Replace the mock `useAuth` hook with your actual auth logic
2. Check user role from your backend/auth state
3. Non-admin users will be redirected to home page

## 📁 File Structure

```
frontend/src/
├── components/
│   └── admin/
│       └── AdminLayout.tsx          # Main admin layout with sidebar
├── pages/
│   └── admin/
│       ├── Dashboard.tsx            # Dashboard overview
│       ├── Products.tsx             # Products list & management
│       ├── AddProduct.tsx           # Add new product form
│       ├── Orders.tsx               # Orders management
│       ├── Users.tsx                # Users management
│       └── Settings.tsx             # Admin settings
├── data/
│   └── adminData.ts                 # Dummy data for demo
└── types/
    └── admin.ts                     # TypeScript interfaces
```

## 🛠️ Tech Stack

- **React** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Framer Motion** for animations

## 🚦 Getting Started

1. Start the development server:
   ```bash
   cd frontend
   npm run dev
   ```

2. Access the admin panel:
   - Dashboard: `http://localhost:5173/admin/dashboard`
   - Products: `http://localhost:5173/admin/products`
   - Add Product: `http://localhost:5173/admin/add-product`
   - Orders: `http://localhost:5173/admin/orders`
   - Users: `http://localhost:5173/admin/users`
   - Settings: `http://localhost:5173/admin/settings`

## 📝 Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/admin/dashboard` | Dashboard | Overview with stats and recent orders |
| `/admin/products` | Products | Product list with search & filters |
| `/admin/add-product` | AddProduct | Form to add new products |
| `/admin/orders` | Orders | Order management with status updates |
| `/admin/users` | Users | User management with role control |
| `/admin/settings` | Settings | Admin profile and system settings |

## 🔄 Next Steps

To connect with your backend:

1. Replace dummy data in `adminData.ts` with API calls
2. Implement real authentication in `AdminLayout.tsx`
3. Add API endpoints for CRUD operations
4. Connect form submissions to backend
5. Add image upload to cloud storage (AWS S3, Cloudinary, etc.)
6. Implement pagination for large datasets
7. Add export functionality (CSV, PDF)

## 📱 Responsive Design

The admin panel is fully responsive:
- **Mobile**: Hamburger menu, stacked layout
- **Tablet**: Optimized grid layouts
- **Desktop**: Full sidebar navigation

## 🎯 Key Features

✅ Clean, professional UI  
✅ Fully responsive design  
✅ Search and filter functionality  
✅ Form validation  
✅ Image upload with preview  
✅ Status management  
✅ Role-based access control  
✅ Smooth animations  
✅ TypeScript for type safety  
✅ Modular component structure  

---

**Note**: This is a frontend implementation with dummy data. Connect it to your backend API for full functionality.
