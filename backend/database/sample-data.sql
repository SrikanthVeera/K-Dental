-- ============================================
-- DentalShop E-commerce Sample Data
-- Description: Sample data for testing and development
-- ============================================

USE dentalshop;

-- ============================================
-- Sample Users Data
-- Password: All passwords are 'password123' (hashed with bcrypt)
-- ============================================

INSERT INTO users (name, email, phone, password, role, dentalCoins, street, city, state, pincode, country) VALUES
-- Admin User
('Admin User', 'admin@dentalshop.com', '9876543210', '$2b$10$rKvVJH7qXQxJ5vZ5YqXqXeYqXqXqXqXqXqXqXqXqXqXqXqXqXqXqX', 'admin', 1000, '123 Admin Street', 'Mumbai', 'Maharashtra', '400001', 'India'),

-- Regular Users
('Dr. Rajesh Kumar', 'rajesh@example.com', '9876543211', '$2b$10$rKvVJH7qXQxJ5vZ5YqXqXeYqXqXqXqXqXqXqXqXqXqXqXqXqXqXqX', 'user', 500, '456 Dental Clinic Road', 'Delhi', 'Delhi', '110001', 'India'),

('Dr. Priya Sharma', 'priya@example.com', '9876543212', '$2b$10$rKvVJH7qXQxJ5vZ5YqXqXeYqXqXqXqXqXqXqXqXqXqXqXqXqXqXqX', 'user', 500, '789 Medical Plaza', 'Bangalore', 'Karnataka', '560001', 'India'),

('Dr. Amit Patel', 'amit@example.com', '9876543213', '$2b$10$rKvVJH7qXQxJ5vZ5YqXqXeYqXqXqXqXqXqXqXqXqXqXqXqXqXqXqX', 'user', 300, '321 Health Center', 'Ahmedabad', 'Gujarat', '380001', 'India'),

('Dr. Sneha Reddy', 'sneha@example.com', '9876543214', '$2b$10$rKvVJH7qXQxJ5vZ5YqXqXeYqXqXqXqXqXqXqXqXqXqXqXqXqXqXqX', 'user', 750, '654 Dental Care', 'Hyderabad', 'Telangana', '500001', 'India');

-- ============================================
-- Sample Products Data
-- ============================================

INSERT INTO products (name, brand, category, description, price, mrp, stock, image, rating, numReviews, discount, inStock) VALUES

-- Equipment Category
('Dental Ultrasonic Scaler', 'Woodpecker', 'Equipment', 
'Professional ultrasonic scaler with LED light and multiple tips for effective cleaning. Features automatic frequency tracking and water control system.', 
12999.00, 15999.00, 45, 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400', 4.5, 128, 19, TRUE),

('LED Curing Light', '3M ESPE', 'Equipment', 
'High-intensity LED curing light with multiple modes and long battery life. Wavelength: 420-480nm, Light intensity: 1200mW/cm².', 
8499.00, 10999.00, 32, 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400', 4.8, 256, 23, TRUE),

('Apex Locator', 'Dentsply', 'Equipment', 
'Electronic apex locator for accurate root canal length determination. Features color LCD display and audio signals.', 
15999.00, 18999.00, 18, 'https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=400', 4.6, 178, 16, TRUE),

('Dental Loupes 3.5x', 'Orascoptic', 'Equipment', 
'Professional dental loupes with LED light and adjustable magnification. Lightweight titanium frame with anti-fog coating.', 
24999.00, 29999.00, 8, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400', 4.9, 312, 17, TRUE),

('Autoclave Sterilizer', 'Tuttnauer', 'Equipment', 
'Medical grade autoclave sterilizer with automatic cycle control. Capacity: 18L, Temperature: 121-134°C.', 
45999.00, 45999.00, 5, 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=400', 4.4, 67, 0, TRUE),

('Dental Handpiece', 'NSK', 'Equipment', 
'High-speed dental handpiece with fiber optic light and push button chuck. Speed: 300,000-400,000 RPM.', 
18999.00, 22999.00, 25, 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400', 4.7, 203, 17, TRUE),

('Dental X-Ray Unit', 'Carestream', 'Equipment', 
'Digital dental X-ray imaging system with high resolution sensor. Low radiation dose with instant image processing.', 
125000.00, 145000.00, 2, 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=400', 4.6, 89, 14, TRUE),

-- Instruments Category
('Surgical Extraction Kit', 'Hu-Friedy', 'Instruments', 
'Premium surgical extraction instruments made from high-grade stainless steel. Includes elevators, forceps, and curettes.', 
5999.00, 7499.00, 28, 'https://images.unsplash.com/photo-1598531228433-d9f0b5f9c4e0?w=400', 4.7, 145, 20, TRUE),

('Dental Burs Set', 'Mani', 'Instruments', 
'Complete set of dental burs for various procedures. Includes diamond burs, carbide burs, and finishing burs.', 
1999.00, 2499.00, 200, 'https://images.unsplash.com/photo-1598531228433-d9f0b5f9c4e0?w=400', 4.4, 234, 20, TRUE),

('Endodontic File Set', 'Dentsply', 'Instruments', 
'Complete endodontic file set with various sizes. Made from nickel-titanium for flexibility and durability.', 
3499.00, 4299.00, 85, 'https://images.unsplash.com/photo-1598531228433-d9f0b5f9c4e0?w=400', 4.6, 167, 19, TRUE),

-- Materials Category
('Dental Composite Kit', 'Dentsply', 'Materials', 
'Complete composite restoration kit with multiple shades and bonding agents. Nano-hybrid composite with excellent polishability.', 
3299.00, 3299.00, 120, 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400', 4.6, 89, 0, TRUE),

('Dental Impression Material', '3M ESPE', 'Materials', 
'High-quality impression material with excellent detail reproduction. Fast setting time with dimensional stability.', 
2499.00, 2999.00, 150, 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400', 4.5, 167, 17, TRUE),

('Dental Cement', 'GC Corporation', 'Materials', 
'Glass ionomer cement for permanent cementation. High bond strength with fluoride release.', 
1899.00, 2299.00, 180, 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400', 4.3, 142, 17, TRUE),

-- Furniture Category
('Dental Chair Unit', 'Sirona', 'Furniture', 
'Complete dental chair unit with integrated delivery system and LED light. Programmable positions with memory function.', 
189999.00, 219999.00, 3, 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=400', 4.8, 45, 14, TRUE),

('Dental Stool', 'Ergonomic Plus', 'Furniture', 
'Adjustable dental stool with lumbar support. Height adjustable with 360° rotation and smooth casters.', 
8999.00, 11999.00, 35, 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=400', 4.5, 98, 25, TRUE),

-- Consumables Category
('Disposable Gloves (100pcs)', 'Medline', 'Consumables', 
'Latex-free nitrile gloves for dental procedures. Powder-free with textured fingertips for better grip.', 
599.00, 799.00, 500, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400', 4.7, 456, 25, TRUE),

('Dental Masks (50pcs)', '3M', 'Consumables', 
'3-ply surgical masks with ear loops. High filtration efficiency with comfortable fit.', 
299.00, 399.00, 800, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400', 4.6, 523, 25, TRUE),

('Dental Bibs (500pcs)', 'Medicom', 'Consumables', 
'Disposable dental bibs with poly backing. Absorbent tissue with waterproof barrier.', 
899.00, 1099.00, 300, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400', 4.4, 287, 18, TRUE);

-- ============================================
-- Sample Reviews Data
-- ============================================

INSERT INTO reviews (userId, productId, rating, comment) VALUES
-- Reviews for Dental Ultrasonic Scaler (Product ID: 1)
(2, 1, 5, 'Excellent product! Very efficient and easy to use. The LED light is a great feature.'),
(3, 1, 4, 'Good quality scaler. Works well for routine cleaning procedures.'),
(4, 1, 5, 'Best investment for my clinic. Patients are very satisfied with the results.'),

-- Reviews for LED Curing Light (Product ID: 2)
(2, 2, 5, 'Amazing curing light! Fast and efficient. Battery life is excellent.'),
(3, 2, 5, 'Very happy with this purchase. Light intensity is perfect for all composite work.'),
(5, 2, 4, 'Good product but slightly expensive. Overall satisfied with performance.'),

-- Reviews for Dental Composite Kit (Product ID: 11)
(2, 11, 5, 'Great shade matching and excellent polishability. Highly recommended!'),
(4, 11, 4, 'Good quality composite. Easy to work with and gives natural results.'),

-- Reviews for Surgical Extraction Kit (Product ID: 8)
(3, 8, 5, 'Premium quality instruments. Very sharp and durable.'),
(5, 8, 5, 'Excellent kit for surgical procedures. Worth every penny!'),

-- Reviews for Disposable Gloves (Product ID: 16)
(2, 16, 5, 'Perfect fit and good quality. No allergic reactions.'),
(3, 16, 4, 'Good value for money. Comfortable to wear for long procedures.'),
(4, 16, 5, 'Best gloves I have used. Highly recommend for dental practice.');

-- ============================================
-- Sample Carts Data
-- ============================================

-- Cart for Dr. Rajesh Kumar (User ID: 2)
INSERT INTO carts (userId, totalPrice, totalItems) VALUES (2, 0, 0);
SET @cart_id = LAST_INSERT_ID();

INSERT INTO cart_items (cartId, productId, quantity, price) VALUES
(@cart_id, 1, 1, 12999.00),  -- Dental Ultrasonic Scaler
(@cart_id, 16, 5, 599.00);   -- Disposable Gloves

-- Cart for Dr. Priya Sharma (User ID: 3)
INSERT INTO carts (userId, totalPrice, totalItems) VALUES (3, 0, 0);
SET @cart_id = LAST_INSERT_ID();

INSERT INTO cart_items (cartId, productId, quantity, price) VALUES
(@cart_id, 2, 1, 8499.00),   -- LED Curing Light
(@cart_id, 11, 2, 3299.00);  -- Dental Composite Kit

-- ============================================
-- Sample Orders Data
-- ============================================

-- Order 1: Delivered
INSERT INTO orders (
  userId, orderNumber, 
  shippingName, shippingPhone, shippingStreet, shippingCity, shippingState, shippingPincode, shippingCountry,
  paymentMethod, paymentStatus,
  itemsPrice, shippingPrice, taxPrice, totalPrice,
  status, deliveredAt
) VALUES (
  2, 'ORD-202401-00001',
  'Dr. Rajesh Kumar', '9876543211', '456 Dental Clinic Road', 'Delhi', 'Delhi', '110001', 'India',
  'Card', 'Paid',
  18999.00, 0, 3419.82, 22418.82,
  'Delivered', '2024-01-15 14:30:00'
);

SET @order_id = LAST_INSERT_ID();

INSERT INTO order_items (orderId, productId, name, quantity, price, image) VALUES
(@order_id, 6, 'Dental Handpiece', 1, 18999.00, 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400');

-- Order 2: Shipped
INSERT INTO orders (
  userId, orderNumber,
  shippingName, shippingPhone, shippingStreet, shippingCity, shippingState, shippingPincode, shippingCountry,
  paymentMethod, paymentStatus,
  itemsPrice, shippingPrice, taxPrice, totalPrice,
  status
) VALUES (
  3, 'ORD-202401-00002',
  'Dr. Priya Sharma', '9876543212', '789 Medical Plaza', 'Bangalore', 'Karnataka', '560001', 'India',
  'UPI', 'Paid',
  12999.00, 0, 2339.82, 15338.82,
  'Shipped'
);

SET @order_id = LAST_INSERT_ID();

INSERT INTO order_items (orderId, productId, name, quantity, price, image) VALUES
(@order_id, 1, 'Dental Ultrasonic Scaler', 1, 12999.00, 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400');

-- Order 3: Processing
INSERT INTO orders (
  userId, orderNumber,
  shippingName, shippingPhone, shippingStreet, shippingCity, shippingState, shippingPincode, shippingCountry,
  paymentMethod, paymentStatus,
  itemsPrice, shippingPrice, taxPrice, totalPrice,
  status
) VALUES (
  4, 'ORD-202401-00003',
  'Dr. Amit Patel', '9876543213', '321 Health Center', 'Ahmedabad', 'Gujarat', '380001', 'India',
  'COD', 'Pending',
  8499.00, 0, 1529.82, 10028.82,
  'Processing'
);

SET @order_id = LAST_INSERT_ID();

INSERT INTO order_items (orderId, productId, name, quantity, price, image) VALUES
(@order_id, 2, 'LED Curing Light', 1, 8499.00, 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400');

-- Order 4: Pending
INSERT INTO orders (
  userId, orderNumber,
  shippingName, shippingPhone, shippingStreet, shippingCity, shippingState, shippingPincode, shippingCountry,
  paymentMethod, paymentStatus,
  itemsPrice, shippingPrice, taxPrice, totalPrice,
  status
) VALUES (
  5, 'ORD-202401-00004',
  'Dr. Sneha Reddy', '9876543214', '654 Dental Care', 'Hyderabad', 'Telangana', '500001', 'India',
  'COD', 'Pending',
  3299.00, 100, 611.82, 4010.82,
  'Pending'
);

SET @order_id = LAST_INSERT_ID();

INSERT INTO order_items (orderId, productId, name, quantity, price, image) VALUES
(@order_id, 11, 'Dental Composite Kit', 1, 3299.00, 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400');

-- ============================================
-- Verify Data Insertion
-- ============================================

SELECT 'Sample data inserted successfully!' as Status;

-- Display summary
SELECT 
  (SELECT COUNT(*) FROM users) as total_users,
  (SELECT COUNT(*) FROM products) as total_products,
  (SELECT COUNT(*) FROM reviews) as total_reviews,
  (SELECT COUNT(*) FROM carts) as total_carts,
  (SELECT COUNT(*) FROM orders) as total_orders;

-- ============================================
-- Useful Queries for Testing
-- ============================================

-- Get all products with their reviews
-- SELECT p.*, COUNT(r.id) as review_count, AVG(r.rating) as avg_rating
-- FROM products p
-- LEFT JOIN reviews r ON p.id = r.productId
-- GROUP BY p.id;

-- Get user's cart with items
-- SELECT c.*, ci.*, p.name, p.image
-- FROM carts c
-- JOIN cart_items ci ON c.id = ci.cartId
-- JOIN products p ON ci.productId = p.id
-- WHERE c.userId = 2;

-- Get order details with items
-- SELECT o.*, oi.*, u.name as userName, u.email
-- FROM orders o
-- JOIN order_items oi ON o.id = oi.orderId
-- JOIN users u ON o.userId = u.id
-- WHERE o.orderNumber = 'ORD-202401-00001';

-- Get top selling products
-- SELECT p.name, p.brand, SUM(oi.quantity) as total_sold
-- FROM products p
-- JOIN order_items oi ON p.id = oi.productId
-- GROUP BY p.id
-- ORDER BY total_sold DESC
-- LIMIT 10;
