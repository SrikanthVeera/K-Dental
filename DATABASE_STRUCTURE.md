# DentalShop Database Structure - Complete Documentation

## 📊 Database Overview

**Database Name:** `dentalshop`  
**Database Type:** MySQL 8.0+  
**Character Set:** utf8mb4  
**Collation:** utf8mb4_unicode_ci  
**ORM:** Sequelize

---

## 🗂️ Table Structure

### 1. **users** - User Accounts Table

Stores all user information including customers and administrators.

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(15) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  dentalCoins INT DEFAULT 0,
  street VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  pincode VARCHAR(10),
  country VARCHAR(100) DEFAULT 'India',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Columns:**
- `id` - Primary key, auto-increment
- `name` - Full name of user
- `email` - Unique email address
- `phone` - Unique 10-digit phone number
- `password` - Bcrypt hashed password (60 chars)
- `role` - User role: 'user' or 'admin'
- `dentalCoins` - Reward points (500 on signup)
- `street`, `city`, `state`, `pincode`, `country` - Address fields
- `createdAt`, `updatedAt` - Timestamps

**Indexes:**
- PRIMARY KEY on `id`
- UNIQUE on `email`
- UNIQUE on `phone`
- INDEX on `role`

**Sample Data:**
```sql
-- Admin
email: admin@dentalshop.com
phone: 9876543210
password: admin123 (hashed)

-- User
email: rajesh@example.com
phone: 9876543211
password: user123 (hashed)
```

---

### 2. **products** - Product Catalog Table

Stores all dental products available for purchase.

```sql
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  category ENUM('Equipment', 'Instruments', 'Materials', 'Consumables', 'Furniture', 'Other'),
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  mrp DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0,
  image VARCHAR(500),
  images JSON,
  rating DECIMAL(2,1) DEFAULT 0,
  numReviews INT DEFAULT 0,
  discount INT DEFAULT 0,
  inStock BOOLEAN DEFAULT TRUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Columns:**
- `id` - Primary key
- `name` - Product name
- `brand` - Manufacturer/brand name
- `category` - Product category (Equipment, Instruments, etc.)
- `description` - Detailed product description
- `price` - Selling price in INR
- `mrp` - Maximum Retail Price
- `stock` - Available quantity
- `image` - Main product image URL
- `images` - Additional images (JSON array)
- `rating` - Average rating (0-5)
- `numReviews` - Total review count
- `discount` - Discount percentage (auto-calculated)
- `inStock` - Availability flag (auto-updated)

**Indexes:**
- PRIMARY KEY on `id`
- INDEX on `brand`
- INDEX on `category`
- INDEX on `price`
- INDEX on `rating`
- FULLTEXT on `name, brand, description`

**Sample Products:**
- Dental Ultrasonic Scaler - ₹12,999
- LED Curing Light - ₹8,499
- Dental Composite Kit - ₹3,299
- Surgical Extraction Kit - ₹5,999

---

### 3. **reviews** - Product Reviews Table

Stores customer reviews and ratings for products.

```sql
CREATE TABLE reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  productId INT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE KEY (userId, productId)
);
```

**Columns:**
- `id` - Primary key
- `userId` - User who wrote review (FK)
- `productId` - Product being reviewed (FK)
- `rating` - Star rating (1-5)
- `comment` - Review text

**Constraints:**
- One review per user per product
- Rating must be between 1-5
- Cascade delete when user/product deleted

**Triggers:**
- Auto-update product rating after insert/update/delete

---

### 4. **carts** - Shopping Carts Table

Stores shopping cart for each user (one cart per user).

```sql
CREATE TABLE carts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT UNIQUE NOT NULL,
  totalPrice DECIMAL(10,2) DEFAULT 0,
  totalItems INT DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

**Columns:**
- `id` - Primary key
- `userId` - Cart owner (FK, unique)
- `totalPrice` - Total cart value (auto-calculated)
- `totalItems` - Total item count (auto-calculated)

**Triggers:**
- Auto-update totals when cart items change

---

### 5. **cart_items** - Cart Items Table

Stores individual items in each cart.

```sql
CREATE TABLE cart_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  cartId INT NOT NULL,
  productId INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
  price DECIMAL(10,2) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (cartId) REFERENCES carts(id) ON DELETE CASCADE,
  FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE KEY (cartId, productId)
);
```

**Columns:**
- `id` - Primary key
- `cartId` - Parent cart (FK)
- `productId` - Product in cart (FK)
- `quantity` - Quantity (must be > 0)
- `price` - Price snapshot

**Constraints:**
- One entry per product per cart
- Quantity must be positive

---

### 6. **orders** - Orders Table

Stores customer orders with shipping and payment details.

```sql
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  orderNumber VARCHAR(50) UNIQUE NOT NULL,
  
  -- Shipping Address
  shippingName VARCHAR(100) NOT NULL,
  shippingPhone VARCHAR(15) NOT NULL,
  shippingStreet VARCHAR(255) NOT NULL,
  shippingCity VARCHAR(100) NOT NULL,
  shippingState VARCHAR(100) NOT NULL,
  shippingPincode VARCHAR(10) NOT NULL,
  shippingCountry VARCHAR(100) DEFAULT 'India',
  
  -- Payment
  paymentMethod ENUM('COD', 'Card', 'UPI', 'NetBanking') DEFAULT 'COD',
  paymentStatus ENUM('Pending', 'Paid', 'Failed') DEFAULT 'Pending',
  
  -- Pricing
  itemsPrice DECIMAL(10,2) DEFAULT 0,
  shippingPrice DECIMAL(10,2) DEFAULT 0,
  taxPrice DECIMAL(10,2) DEFAULT 0,
  totalPrice DECIMAL(10,2) DEFAULT 0,
  
  -- Status
  status ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Pending',
  deliveredAt TIMESTAMP NULL,
  cancelledAt TIMESTAMP NULL,
  
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

**Columns:**
- `id` - Primary key
- `userId` - Customer (FK)
- `orderNumber` - Human-readable order ID (e.g., ORD-202401-00001)
- Shipping fields - Delivery address
- Payment fields - Method and status
- Price fields - Items, shipping, tax, total
- Status fields - Order status and timestamps

**Order Number Format:**
```
ORD-YYYYMM-XXXXX
ORD-202401-00001 (January 2024, Order #1)
```

**Order Status Flow:**
```
Pending → Processing → Shipped → Delivered
         ↓
      Cancelled
```

**Pricing Calculation:**
```
itemsPrice = Sum of (price × quantity) for all items
shippingPrice = 0 if itemsPrice > 5000, else 100
taxPrice = itemsPrice × 0.18 (18% GST)
totalPrice = itemsPrice + shippingPrice + taxPrice
```

---

### 7. **order_items** - Order Items Table

Stores individual items in each order (snapshot of product at order time).

```sql
CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  orderId INT NOT NULL,
  productId INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  quantity INT NOT NULL CHECK (quantity > 0),
  price DECIMAL(10,2) NOT NULL,
  image VARCHAR(500),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (productId) REFERENCES products(id) ON DELETE RESTRICT
);
```

**Columns:**
- `id` - Primary key
- `orderId` - Parent order (FK)
- `productId` - Product reference (FK)
- `name` - Product name snapshot
- `quantity` - Quantity ordered
- `price` - Price snapshot
- `image` - Image snapshot

**Why Snapshots?**
- Product details may change after order
- Preserves order history accurately
- Price/name at time of purchase

---

## 🔗 Relationships

### Entity Relationship Diagram

```
users (1) ──────< (M) reviews
users (1) ──────< (1) carts
users (1) ──────< (M) orders

products (1) ────< (M) reviews
products (1) ────< (M) cart_items
products (1) ────< (M) order_items

carts (1) ───────< (M) cart_items

orders (1) ──────< (M) order_items
```

### Relationship Details

1. **User → Reviews** (One-to-Many)
   - One user can write many reviews
   - CASCADE delete

2. **User → Cart** (One-to-One)
   - One user has one cart
   - CASCADE delete

3. **User → Orders** (One-to-Many)
   - One user can place many orders
   - CASCADE delete

4. **Product → Reviews** (One-to-Many)
   - One product can have many reviews
   - CASCADE delete

5. **Product → Cart Items** (One-to-Many)
   - One product can be in many carts
   - CASCADE delete

6. **Product → Order Items** (One-to-Many)
   - One product can be in many orders
   - RESTRICT delete (preserve order history)

7. **Cart → Cart Items** (One-to-Many)
   - One cart contains many items
   - CASCADE delete

8. **Order → Order Items** (One-to-Many)
   - One order contains many items
   - CASCADE delete

---

## 🎯 Views

### 1. product_details
Complete product information with review statistics.

```sql
CREATE VIEW product_details AS
SELECT 
  p.*,
  COUNT(DISTINCT r.id) as total_reviews,
  AVG(r.rating) as avg_rating
FROM products p
LEFT JOIN reviews r ON p.id = r.productId
GROUP BY p.id;
```

### 2. order_summary
Order overview with user details and item count.

```sql
CREATE VIEW order_summary AS
SELECT 
  o.id,
  o.orderNumber,
  o.userId,
  u.name as userName,
  u.email as userEmail,
  o.totalPrice,
  o.status,
  o.paymentStatus,
  o.createdAt,
  COUNT(oi.id) as itemCount
FROM orders o
JOIN users u ON o.userId = u.id
LEFT JOIN order_items oi ON o.id = oi.orderId
GROUP BY o.id;
```

### 3. user_stats
User statistics including orders and spending.

```sql
CREATE VIEW user_stats AS
SELECT 
  u.id,
  u.name,
  u.email,
  u.role,
  u.dentalCoins,
  COUNT(DISTINCT o.id) as totalOrders,
  COALESCE(SUM(o.totalPrice), 0) as totalSpent,
  COUNT(DISTINCT r.id) as totalReviews
FROM users u
LEFT JOIN orders o ON u.id = o.userId
LEFT JOIN reviews r ON u.id = r.userId
GROUP BY u.id;
```

---

## ⚡ Triggers

### 1. update_product_stock_status
Auto-update product stock status and discount.

```sql
CREATE TRIGGER update_product_stock_status
BEFORE UPDATE ON products
FOR EACH ROW
BEGIN
  SET NEW.inStock = IF(NEW.stock > 0, TRUE, FALSE);
  SET NEW.discount = IF(NEW.mrp > NEW.price, 
                        ROUND(((NEW.mrp - NEW.price) / NEW.mrp) * 100), 
                        0);
END;
```

### 2. update_cart_totals
Auto-update cart totals when items change.

```sql
-- Triggers on INSERT, UPDATE, DELETE of cart_items
-- Automatically recalculates totalItems and totalPrice
```

### 3. update_rating_after_review
Auto-update product rating when reviews change.

```sql
-- Triggers on INSERT, UPDATE, DELETE of reviews
-- Calls update_product_rating() stored procedure
```

---

## 📦 Stored Procedures

### 1. calculate_order_totals
Calculate all order pricing fields.

```sql
CALL calculate_order_totals(order_id);
```

**Logic:**
- Calculate items total from order_items
- Set shipping: ₹0 if total > ₹5000, else ₹100
- Calculate tax: 18% GST
- Update order with all totals

### 2. update_product_rating
Recalculate product rating from reviews.

```sql
CALL update_product_rating(product_id);
```

**Logic:**
- Calculate average rating from all reviews
- Count total reviews
- Update product.rating and product.numReviews

---

## 📊 Sample Queries

### Get Products with Filters
```sql
SELECT * FROM products
WHERE category = 'Equipment'
  AND price BETWEEN 10000 AND 50000
  AND rating >= 4.0
  AND inStock = TRUE
ORDER BY rating DESC, price ASC
LIMIT 20;
```

### Get User's Cart
```sql
SELECT c.*, ci.*, p.name, p.image, p.stock
FROM carts c
JOIN cart_items ci ON c.id = ci.cartId
JOIN products p ON ci.productId = p.id
WHERE c.userId = 2;
```

### Get Order Details
```sql
SELECT o.*, oi.*, u.name as userName, u.email
FROM orders o
JOIN order_items oi ON o.id = oi.orderId
JOIN users u ON o.userId = u.id
WHERE o.orderNumber = 'ORD-202401-00001';
```

### Get Top Selling Products
```sql
SELECT p.name, p.brand, SUM(oi.quantity) as total_sold
FROM products p
JOIN order_items oi ON p.id = oi.productId
JOIN orders o ON oi.orderId = o.id
WHERE o.status IN ('Delivered', 'Shipped')
GROUP BY p.id
ORDER BY total_sold DESC
LIMIT 10;
```

### Get Revenue by Month
```sql
SELECT 
  DATE_FORMAT(createdAt, '%Y-%m') as month,
  COUNT(*) as total_orders,
  SUM(totalPrice) as revenue
FROM orders
WHERE status IN ('Delivered', 'Shipped')
GROUP BY month
ORDER BY month DESC;
```

---

## 🔧 Setup Instructions

### 1. Create Database
```bash
mysql -u root -p
```

```sql
CREATE DATABASE dentalshop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE dentalshop;
```

### 2. Run Schema
```bash
mysql -u root -p dentalshop < backend/database/schema.sql
```

### 3. Insert Sample Data
```bash
mysql -u root -p dentalshop < backend/database/sample-data.sql
```

### 4. Verify Setup
```sql
SHOW TABLES;
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM products;
SELECT COUNT(*) FROM orders;
```

---

## 📈 Performance Optimization

### Indexes Created
- Primary keys on all tables
- Foreign key indexes
- Composite indexes for common queries
- Fulltext index for product search

### Query Optimization Tips
1. Use indexes for WHERE, ORDER BY, JOIN
2. Avoid SELECT * in production
3. Use LIMIT for pagination
4. Use prepared statements
5. Cache frequently accessed data

---

## 🔒 Security Considerations

1. **Password Storage**
   - Bcrypt hashing (10 rounds)
   - Never store plain text passwords

2. **SQL Injection Prevention**
   - Use Sequelize ORM (parameterized queries)
   - Validate all inputs

3. **Access Control**
   - Role-based permissions (user/admin)
   - JWT token authentication

4. **Data Validation**
   - CHECK constraints on tables
   - Application-level validation

---

## 📝 Maintenance

### Backup Database
```bash
mysqldump -u root -p dentalshop > backup.sql
```

### Restore Database
```bash
mysql -u root -p dentalshop < backup.sql
```

### Check Table Status
```sql
SHOW TABLE STATUS;
```

### Optimize Tables
```sql
OPTIMIZE TABLE products, orders, users;
```

---

## 🆘 Troubleshooting

### Common Issues

1. **Foreign Key Constraint Fails**
   - Check referenced records exist
   - Verify ON DELETE/UPDATE rules

2. **Duplicate Entry Error**
   - Check UNIQUE constraints
   - Verify email/phone uniqueness

3. **Trigger Not Firing**
   - Check trigger syntax
   - Verify trigger is enabled

4. **Slow Queries**
   - Add missing indexes
   - Optimize query structure
   - Use EXPLAIN to analyze

---

**Database Version:** MySQL 8.0+  
**Last Updated:** 2024  
**Total Tables:** 7  
**Total Views:** 3  
**Total Triggers:** 6  
**Total Procedures:** 2
