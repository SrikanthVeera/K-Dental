# Dentalkart Backend API

Complete Node.js + Express + MongoDB backend for Dentalkart dental e-commerce platform.

## 🚀 Features

- ✅ JWT-based authentication
- ✅ Role-based access control (User & Admin)
- ✅ Product management with image upload
- ✅ Shopping cart functionality
- ✅ Order management system
- ✅ Product reviews and ratings
- ✅ Admin dashboard with statistics
- ✅ User profile management
- ✅ Advanced product filtering
- ✅ Stock management
- ✅ Order status tracking

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── productController.js  # Product CRUD operations
│   ├── cartController.js     # Cart management
│   ├── orderController.js    # Order processing
│   └── adminController.js    # Admin operations
├── middleware/
│   ├── authMiddleware.js     # JWT verification & role check
│   └── errorMiddleware.js    # Error handling
├── models/
│   ├── User.js              # User schema
│   ├── Product.js           # Product schema
│   ├── Cart.js              # Cart schema
│   └── Order.js             # Order schema
├── routes/
│   ├── auth.js              # Auth routes
│   ├── productsRoutes.js    # Product routes
│   ├── cart.js              # Cart routes
│   ├── orders.js            # Order routes
│   └── admin.js             # Admin routes
├── utils/
│   └── seeder.js            # Database seeder
├── uploads/                 # Uploaded images
├── .env.example             # Environment variables template
├── .gitignore
├── package.json
└── server.js                # Entry point
```

## 🛠️ Installation

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Setup Environment Variables
Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dentalkart
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 3. Install MongoDB
Make sure MongoDB is installed and running on your system.

**For Windows:**
- Download from https://www.mongodb.com/try/download/community
- Install and start MongoDB service

**For Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**For Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### 4. Create Uploads Directory
```bash
mkdir uploads
```

### 5. Seed Database (Optional)
```bash
npm run seed
```

This will create:
- 3 sample users (1 admin, 2 regular users)
- 12 sample products

### 6. Start Server
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/register` | Register new user | Public |
| POST | `/login` | Login user | Public |
| GET | `/me` | Get current user | Private |
| PUT | `/profile` | Update profile | Private |

### Products (`/api/products`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all products | Public |
| GET | `/filters/options` | Get filter options | Public |
| GET | `/:id` | Get single product | Public |
| POST | `/` | Create product | Admin |
| PUT | `/:id` | Update product | Admin |
| DELETE | `/:id` | Delete product | Admin |
| GET | `/:id/reviews` | Get product reviews | Public |
| POST | `/:id/reviews` | Add review | Private |

### Cart (`/api/cart`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get user cart | Private |
| POST | `/` | Add to cart | Private |
| PUT | `/:itemId` | Update cart item | Private |
| DELETE | `/:itemId` | Remove from cart | Private |
| DELETE | `/` | Clear cart | Private |

### Orders (`/api/orders`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/` | Create order | Private |
| GET | `/myorders` | Get user orders | Private |
| GET | `/:id` | Get order by ID | Private |
| PUT | `/:id/cancel` | Cancel order | Private |
| GET | `/` | Get all orders | Admin |
| PUT | `/:id/status` | Update order status | Admin |

### Admin (`/api/admin`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/stats` | Dashboard statistics | Admin |
| GET | `/users` | Get all users | Admin |
| PUT | `/users/:id/role` | Update user role | Admin |
| DELETE | `/users/:id` | Delete user | Admin |

## 🔐 Authentication

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "Dr. John Doe",
  "email": "john@example.com",
  "phone": "9876543213",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "...",
    "name": "Dr. John Doe",
    "email": "john@example.com",
    "phone": "9876543213",
    "role": "user",
    "dentalCoins": 500,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@dentalkart.com",
  "password": "admin123"
}
```

### Protected Routes
Include JWT token in Authorization header:
```bash
GET /api/auth/me
Authorization: Bearer YOUR_JWT_TOKEN
```

## 🛍️ Product Management

### Get Products with Filters
```bash
GET /api/products?search=scaler&brand=Woodpecker&minPrice=10000&maxPrice=20000&sortBy=price-low
```

**Query Parameters:**
- `search` - Search term
- `brand` - Filter by brand (comma-separated)
- `category` - Filter by category (comma-separated)
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `minRating` - Minimum rating
- `sortBy` - Sort option (price-low, price-high, rating, name-az, name-za)
- `page` - Page number
- `limit` - Items per page

### Create Product (Admin)
```bash
POST /api/products
Authorization: Bearer ADMIN_TOKEN
Content-Type: multipart/form-data

{
  "name": "Dental Scaler",
  "brand": "Woodpecker",
  "category": "Equipment",
  "description": "Professional scaler",
  "price": 12999,
  "mrp": 15999,
  "stock": 50,
  "image": [file upload]
}
```

## 🛒 Cart & Orders

### Add to Cart
```bash
POST /api/cart
Authorization: Bearer USER_TOKEN
Content-Type: application/json

{
  "productId": "product_id_here",
  "quantity": 2
}
```

### Create Order
```bash
POST /api/orders
Authorization: Bearer USER_TOKEN
Content-Type: application/json

{
  "items": [
    {
      "product": "product_id",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "name": "Dr. John Doe",
    "phone": "9876543213",
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001"
  },
  "paymentMethod": "COD"
}
```

## 👨‍💼 Admin Features

### Get Dashboard Stats
```bash
GET /api/admin/stats
Authorization: Bearer ADMIN_TOKEN
```

**Response includes:**
- Total users, orders, products, revenue
- Orders by status
- Recent orders
- Top selling products
- Monthly revenue
- Low stock products

### Update Order Status
```bash
PUT /api/orders/:orderId/status
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json

{
  "status": "Shipped"
}
```

**Status Options:**
- Pending
- Processing
- Shipped
- Delivered
- Cancelled

## 🧪 Testing with Postman

1. Import the API endpoints into Postman
2. Create an environment with:
   - `baseUrl`: `http://localhost:5000`
   - `token`: (will be set after login)

3. Test flow:
   - Register/Login → Save token
   - Get products
   - Add to cart
   - Create order
   - Admin: View stats

## 📦 Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  phone: String (unique),
  password: String (hashed),
  role: String (user/admin),
  address: Object,
  dentalCoins: Number,
  timestamps: true
}
```

### Product Model
```javascript
{
  name: String,
  brand: String,
  category: String,
  description: String,
  price: Number,
  mrp: Number,
  stock: Number,
  image: String,
  rating: Number,
  numReviews: Number,
  reviews: Array,
  timestamps: true
}
```

### Order Model
```javascript
{
  user: ObjectId,
  orderNumber: String (auto-generated),
  items: Array,
  shippingAddress: Object,
  paymentMethod: String,
  paymentStatus: String,
  status: String,
  itemsPrice: Number,
  shippingPrice: Number,
  taxPrice: Number,
  totalPrice: Number,
  timestamps: true
}
```

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Role-based access control
- ✅ Helmet.js for security headers
- ✅ CORS configuration
- ✅ Input validation
- ✅ Error handling middleware

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_production_secret
FRONTEND_URL=https://your-frontend-domain.com
```

### Deploy to Heroku
```bash
heroku create dentalkart-api
heroku config:set MONGODB_URI=your_uri
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

## 📝 Default Credentials

After running seeder:

**Admin:**
- Email: `admin@dentalkart.com`
- Phone: `9876543210`
- Password: `admin123`

**User:**
- Email: `rajesh@example.com`
- Phone: `9876543211`
- Password: `user123`

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify network connectivity

### JWT Token Error
- Check JWT_SECRET is set
- Verify token format: `Bearer <token>`
- Check token expiration

### Image Upload Error
- Ensure `uploads/` directory exists
- Check file size (max 5MB)
- Verify file type (jpeg, jpg, png, gif, webp)

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Documentation](https://jwt.io/)

---

**API Base URL**: `http://localhost:5000/api`

**Health Check**: `http://localhost:5000/health`
