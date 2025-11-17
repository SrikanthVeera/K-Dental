-- ============================================
-- DentalShop E-commerce Database Schema
-- Database: MySQL
-- Description: Complete database structure for dental e-commerce platform
-- ============================================

-- Create Database
CREATE DATABASE IF NOT EXISTS dentalshop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE dentalshop;

-- ============================================
-- Table: users
-- Description: Stores user account information (customers and admins)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Unique user identifier',
  name VARCHAR(100) NOT NULL COMMENT 'Full name of the user',
  email VARCHAR(100) UNIQUE NOT NULL COMMENT 'Email address (unique)',
  phone VARCHAR(15) UNIQUE NOT NULL COMMENT '10-digit phone number (unique)',
  password VARCHAR(255) NOT NULL COMMENT 'Hashed password using bcrypt',
  role ENUM('user', 'admin') DEFAULT 'user' COMMENT 'User role: user or admin',
  dentalCoins INT DEFAULT 0 COMMENT 'Reward points/coins for purchases',
  street VARCHAR(255) DEFAULT NULL COMMENT 'Street address',
  city VARCHAR(100) DEFAULT NULL COMMENT 'City name',
  state VARCHAR(100) DEFAULT NULL COMMENT 'State name',
  pincode VARCHAR(10) DEFAULT NULL COMMENT 'Postal code',
  country VARCHAR(100) DEFAULT 'India' COMMENT 'Country name',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Account creation timestamp',
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp',
  INDEX idx_email (email),
  INDEX idx_phone (phone),
  INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='User accounts table';

-- ============================================
-- Table: products
-- Description: Stores dental product catalog
-- ============================================
CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Unique product identifier',
  name VARCHAR(255) NOT NULL COMMENT 'Product name',
  brand VARCHAR(100) NOT NULL COMMENT 'Brand/manufacturer name',
  category ENUM('Equipment', 'Instruments', 'Materials', 'Consumables', 'Furniture', 'Other') NOT NULL COMMENT 'Product category',
  description TEXT NOT NULL COMMENT 'Detailed product description',
  price DECIMAL(10,2) NOT NULL COMMENT 'Selling price in INR',
  mrp DECIMAL(10,2) NOT NULL COMMENT 'Maximum Retail Price in INR',
  stock INT DEFAULT 0 COMMENT 'Available stock quantity',
  image VARCHAR(500) DEFAULT 'https://via.placeholder.com/400' COMMENT 'Main product image URL',
  images JSON DEFAULT NULL COMMENT 'Additional product images (JSON array)',
  rating DECIMAL(2,1) DEFAULT 0 COMMENT 'Average rating (0-5)',
  numReviews INT DEFAULT 0 COMMENT 'Total number of reviews',
  discount INT DEFAULT 0 COMMENT 'Discount percentage',
  inStock BOOLEAN DEFAULT TRUE COMMENT 'Stock availability flag',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Product creation timestamp',
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp',
  INDEX idx_brand (brand),
  INDEX idx_category (category),
  INDEX idx_price (price),
  INDEX idx_rating (rating),
  INDEX idx_inStock (inStock),
  FULLTEXT idx_search (name, brand, description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Product catalog table';

-- ============================================
-- Table: reviews
-- Description: Stores product reviews and ratings
-- ============================================
CREATE TABLE IF NOT EXISTS reviews (
  id INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Unique review identifier',
  userId INT NOT NULL COMMENT 'User who wrote the review',
  productId INT NOT NULL COMMENT 'Product being reviewed',
  rating INT NOT NULL COMMENT 'Rating (1-5 stars)',
  comment TEXT NOT NULL COMMENT 'Review text/comment',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Review creation timestamp',
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp',
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE COMMENT 'Link to user',
  FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE COMMENT 'Link to product',
  UNIQUE KEY unique_user_product (userId, productId) COMMENT 'One review per user per product',
  INDEX idx_productId (productId),
  INDEX idx_rating (rating),
  CHECK (rating >= 1 AND rating <= 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Product reviews table';

-- ============================================
-- Table: carts
-- Description: Stores shopping cart for each user
-- ============================================
CREATE TABLE IF NOT EXISTS carts (
  id INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Unique cart identifier',
  userId INT UNIQUE NOT NULL COMMENT 'User who owns this cart',
  totalPrice DECIMAL(10,2) DEFAULT 0 COMMENT 'Total cart value in INR',
  totalItems INT DEFAULT 0 COMMENT 'Total number of items in cart',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Cart creation timestamp',
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp',
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE COMMENT 'Link to user',
  INDEX idx_userId (userId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Shopping carts table';

-- ============================================
-- Table: cart_items
-- Description: Stores individual items in shopping cart
-- ============================================
CREATE TABLE IF NOT EXISTS cart_items (
  id INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Unique cart item identifier',
  cartId INT NOT NULL COMMENT 'Cart this item belongs to',
  productId INT NOT NULL COMMENT 'Product in cart',
  quantity INT NOT NULL DEFAULT 1 COMMENT 'Quantity of product',
  price DECIMAL(10,2) NOT NULL COMMENT 'Price at time of adding to cart',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Item added timestamp',
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp',
  FOREIGN KEY (cartId) REFERENCES carts(id) ON DELETE CASCADE COMMENT 'Link to cart',
  FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE COMMENT 'Link to product',
  UNIQUE KEY unique_cart_product (cartId, productId) COMMENT 'One entry per product per cart',
  INDEX idx_cartId (cartId),
  INDEX idx_productId (productId),
  CHECK (quantity > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Cart items table';

-- ============================================
-- Table: orders
-- Description: Stores customer orders
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
  id INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Unique order identifier',
  userId INT NOT NULL COMMENT 'User who placed the order',
  orderNumber VARCHAR(50) UNIQUE NOT NULL COMMENT 'Human-readable order number (e.g., ORD-202401-00001)',
  
  -- Shipping Address
  shippingName VARCHAR(100) NOT NULL COMMENT 'Recipient name',
  shippingPhone VARCHAR(15) NOT NULL COMMENT 'Recipient phone',
  shippingStreet VARCHAR(255) NOT NULL COMMENT 'Street address',
  shippingCity VARCHAR(100) NOT NULL COMMENT 'City',
  shippingState VARCHAR(100) NOT NULL COMMENT 'State',
  shippingPincode VARCHAR(10) NOT NULL COMMENT 'Postal code',
  shippingCountry VARCHAR(100) DEFAULT 'India' COMMENT 'Country',
  
  -- Payment Details
  paymentMethod ENUM('COD', 'Card', 'UPI', 'NetBanking') DEFAULT 'COD' COMMENT 'Payment method',
  paymentStatus ENUM('Pending', 'Paid', 'Failed') DEFAULT 'Pending' COMMENT 'Payment status',
  
  -- Pricing
  itemsPrice DECIMAL(10,2) NOT NULL DEFAULT 0 COMMENT 'Total items price',
  shippingPrice DECIMAL(10,2) NOT NULL DEFAULT 0 COMMENT 'Shipping charges',
  taxPrice DECIMAL(10,2) NOT NULL DEFAULT 0 COMMENT 'Tax amount (GST)',
  totalPrice DECIMAL(10,2) NOT NULL DEFAULT 0 COMMENT 'Final total price',
  
  -- Order Status
  status ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Pending' COMMENT 'Order status',
  deliveredAt TIMESTAMP NULL DEFAULT NULL COMMENT 'Delivery timestamp',
  cancelledAt TIMESTAMP NULL DEFAULT NULL COMMENT 'Cancellation timestamp',
  
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Order creation timestamp',
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp',
  
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE COMMENT 'Link to user',
  INDEX idx_userId (userId),
  INDEX idx_orderNumber (orderNumber),
  INDEX idx_status (status),
  INDEX idx_createdAt (createdAt)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Orders table';

-- ============================================
-- Table: order_items
-- Description: Stores individual items in each order
-- ============================================
CREATE TABLE IF NOT EXISTS order_items (
  id INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Unique order item identifier',
  orderId INT NOT NULL COMMENT 'Order this item belongs to',
  productId INT NOT NULL COMMENT 'Product ordered',
  name VARCHAR(255) NOT NULL COMMENT 'Product name (snapshot)',
  quantity INT NOT NULL COMMENT 'Quantity ordered',
  price DECIMAL(10,2) NOT NULL COMMENT 'Price at time of order',
  image VARCHAR(500) DEFAULT NULL COMMENT 'Product image (snapshot)',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Item creation timestamp',
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp',
  FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE COMMENT 'Link to order',
  FOREIGN KEY (productId) REFERENCES products(id) ON DELETE RESTRICT COMMENT 'Link to product',
  INDEX idx_orderId (orderId),
  INDEX idx_productId (productId),
  CHECK (quantity > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Order items table';

-- ============================================
-- Create Views for Common Queries
-- ============================================

-- View: Product details with review statistics
CREATE OR REPLACE VIEW product_details AS
SELECT 
  p.*,
  COUNT(DISTINCT r.id) as total_reviews,
  AVG(r.rating) as avg_rating
FROM products p
LEFT JOIN reviews r ON p.id = r.productId
GROUP BY p.id;

-- View: Order summary with user details
CREATE OR REPLACE VIEW order_summary AS
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

-- View: User statistics
CREATE OR REPLACE VIEW user_stats AS
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

-- ============================================
-- Create Stored Procedures
-- ============================================

DELIMITER //

-- Procedure: Calculate order totals
CREATE PROCEDURE calculate_order_totals(IN order_id INT)
BEGIN
  DECLARE items_total DECIMAL(10,2);
  DECLARE shipping_cost DECIMAL(10,2);
  DECLARE tax_amount DECIMAL(10,2);
  DECLARE final_total DECIMAL(10,2);
  
  -- Calculate items total
  SELECT SUM(price * quantity) INTO items_total
  FROM order_items
  WHERE orderId = order_id;
  
  -- Calculate shipping (free above 5000)
  SET shipping_cost = IF(items_total > 5000, 0, 100);
  
  -- Calculate tax (18% GST)
  SET tax_amount = items_total * 0.18;
  
  -- Calculate final total
  SET final_total = items_total + shipping_cost + tax_amount;
  
  -- Update order
  UPDATE orders
  SET itemsPrice = items_total,
      shippingPrice = shipping_cost,
      taxPrice = tax_amount,
      totalPrice = final_total
  WHERE id = order_id;
END //

-- Procedure: Update product rating
CREATE PROCEDURE update_product_rating(IN product_id INT)
BEGIN
  DECLARE avg_rating DECIMAL(2,1);
  DECLARE review_count INT;
  
  SELECT AVG(rating), COUNT(*) INTO avg_rating, review_count
  FROM reviews
  WHERE productId = product_id;
  
  UPDATE products
  SET rating = COALESCE(avg_rating, 0),
      numReviews = review_count
  WHERE id = product_id;
END //

DELIMITER ;

-- ============================================
-- Create Triggers
-- ============================================

DELIMITER //

-- Trigger: Auto-update product stock status
CREATE TRIGGER update_product_stock_status
BEFORE UPDATE ON products
FOR EACH ROW
BEGIN
  SET NEW.inStock = IF(NEW.stock > 0, TRUE, FALSE);
  SET NEW.discount = IF(NEW.mrp > NEW.price, 
                        ROUND(((NEW.mrp - NEW.price) / NEW.mrp) * 100), 
                        0);
END //

-- Trigger: Update cart totals when cart item changes
CREATE TRIGGER update_cart_totals_insert
AFTER INSERT ON cart_items
FOR EACH ROW
BEGIN
  UPDATE carts
  SET totalItems = (SELECT SUM(quantity) FROM cart_items WHERE cartId = NEW.cartId),
      totalPrice = (SELECT SUM(price * quantity) FROM cart_items WHERE cartId = NEW.cartId)
  WHERE id = NEW.cartId;
END //

CREATE TRIGGER update_cart_totals_update
AFTER UPDATE ON cart_items
FOR EACH ROW
BEGIN
  UPDATE carts
  SET totalItems = (SELECT SUM(quantity) FROM cart_items WHERE cartId = NEW.cartId),
      totalPrice = (SELECT SUM(price * quantity) FROM cart_items WHERE cartId = NEW.cartId)
  WHERE id = NEW.cartId;
END //

CREATE TRIGGER update_cart_totals_delete
AFTER DELETE ON cart_items
FOR EACH ROW
BEGIN
  UPDATE carts
  SET totalItems = (SELECT COALESCE(SUM(quantity), 0) FROM cart_items WHERE cartId = OLD.cartId),
      totalPrice = (SELECT COALESCE(SUM(price * quantity), 0) FROM cart_items WHERE cartId = OLD.cartId)
  WHERE id = OLD.cartId;
END //

-- Trigger: Update product rating after review insert/update/delete
CREATE TRIGGER update_rating_after_review_insert
AFTER INSERT ON reviews
FOR EACH ROW
BEGIN
  CALL update_product_rating(NEW.productId);
END //

CREATE TRIGGER update_rating_after_review_update
AFTER UPDATE ON reviews
FOR EACH ROW
BEGIN
  CALL update_product_rating(NEW.productId);
END //

CREATE TRIGGER update_rating_after_review_delete
AFTER DELETE ON reviews
FOR EACH ROW
BEGIN
  CALL update_product_rating(OLD.productId);
END //

DELIMITER ;

-- ============================================
-- Create Indexes for Performance
-- ============================================

-- Additional indexes for better query performance
CREATE INDEX idx_products_brand_category ON products(brand, category);
CREATE INDEX idx_products_price_rating ON products(price, rating);
CREATE INDEX idx_orders_user_status ON orders(userId, status);
CREATE INDEX idx_orders_created_status ON orders(createdAt, status);

-- ============================================
-- Grant Permissions (Optional)
-- ============================================

-- Create application user (recommended for production)
-- CREATE USER 'dentalkart_app'@'localhost' IDENTIFIED BY 'secure_password';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON dentalkart.* TO 'dentalkart_app'@'localhost';
-- FLUSH PRIVILEGES;

-- ============================================
-- Database Schema Complete
-- ============================================

SELECT 'Database schema created successfully!' as Status;
