# 🦷 K-Dental Brands & Products Seeding Guide

This guide explains how to populate your database with sample dental brands and products.

## 📦 What Gets Created

### Brands (20 total)
- **3M ESPE** - Leading dental materials manufacturer
- **Dentsply Sirona** - Complete dental solutions
- **Ivoclar Vivadent** - Innovative dental products
- **Kerr Dental** - Quality dental supplies
- **GC Corporation** - Japanese dental excellence
- **Ultradent** - Advanced dental materials
- **Shofu Dental** - Premium dental products
- **Septodont** - Anesthesia specialists
- **Bisco Dental** - Bonding & restorative
- **Coltene** - Swiss dental quality
- **Angelus** - Endodontic solutions
- **Miltex** - Surgical instruments
- **Woodpecker** - Dental equipment
- **NSK** - High-speed handpieces
- **Hu-Friedy** - Premium instruments
- **Straumann** - Dental implant systems
- **Nobel Biocare** - Implant innovations
- **Zimmer Biomet** - Regenerative solutions
- **Colgate Professional** - Oral care products
- **Oral-B Professional** - Dental hygiene

### Products (200+ total)
Each brand gets 8-12 random products from categories:
- **Equipment**: Dental chairs, LED curing lights, ultrasonic scalers
- **Instruments**: Burs, mirrors, endodontic files
- **Materials**: Composites, bonding agents, impression materials
- **Consumables**: Gloves, scaler tips, polishing kits

## 🚀 How to Run

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Run the Seeder
```bash
npm run seed:brands
```

### Expected Output
```
🌱 Starting database seeding...

✅ Database connected successfully

🗑️  Clearing existing data...
✅ Existing data cleared

📦 Creating brands...
   ✓ Created: 3M ESPE
   ✓ Created: Dentsply Sirona
   ✓ Created: Ivoclar Vivadent
   ...
✅ Created 20 brands

🦷 Creating products...
   ✓ Created 10 products for 3M ESPE
   ✓ Created 12 products for Dentsply Sirona
   ...
✅ Created 200+ products

📊 Seeding Summary:
   • Brands: 20
   • Products: 200+
   • Featured Brands: 6

✨ Database seeding completed successfully!
```

## 📋 Product Details

Each product includes:
- **Name**: Brand name + product type
- **Brand**: Associated brand name
- **Price**: Realistic pricing (₹800 - ₹125,000)
- **MRP**: Original price with discount
- **Discount**: 5-35% off
- **Rating**: 3.0-5.0 stars
- **Reviews**: 10-200 reviews
- **Category**: equipment/instruments/materials/consumables
- **Stock Status**: 90% in stock
- **Featured**: 30% marked as featured
- **Description**: Professional product description
- **Specifications**: Manufacturer, warranty, origin, certification

## 🔄 Re-running the Seeder

⚠️ **Warning**: Running the seeder will:
1. Delete all existing brands
2. Delete all existing products
3. Create fresh sample data

To re-run:
```bash
npm run seed:brands
```

## 🌐 Testing the Frontend

After seeding, test these pages:

### 1. Brands Page
```
http://localhost:5173/brands
```
- View all 20 brands
- Search brands
- Filter by alphabet
- See featured brands section

### 2. Category Pages
```
http://localhost:5173/category/equipment
http://localhost:5173/category/instruments
http://localhost:5173/category/materials
http://localhost:5173/category/consumables
```
- Filter by brand
- Filter by price
- Filter by rating
- View products in grid

### 3. HomePage
```
http://localhost:5173/
```
- Top Brands section
- Featured products
- Click "View All" to go to brands page

## 🛠️ Customization

To customize the seeder, edit `backend/seedBrands.js`:

### Add More Brands
```javascript
const brandsData = [
  // Add your brand here
  {
    name: 'Your Brand Name',
    logo: 'https://via.placeholder.com/200x100',
    description: 'Your brand description',
    featured: false
  },
  // ... existing brands
];
```

### Add More Product Types
```javascript
const productsTemplate = [
  // Add your product type here
  {
    suffix: 'Your Product Type',
    category: 'equipment', // or instruments/materials/consumables
    basePrice: 5000,
    image: 'https://your-image-url.com'
  },
  // ... existing products
];
```

### Adjust Product Count Per Brand
```javascript
// In seedDatabase function, change this line:
const numProducts = Math.floor(Math.random() * 5) + 8; // Currently 8-12 products
// To:
const numProducts = 15; // Fixed 15 products per brand
```

## 📊 Database Schema

### Brands Table
```sql
CREATE TABLE Brands (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  logo VARCHAR(500),
  description TEXT,
  featured BOOLEAN DEFAULT false,
  createdAt DATETIME,
  updatedAt DATETIME
);
```

### Products Table
```sql
CREATE TABLE Products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(255),
  price DECIMAL(10,2),
  mrp DECIMAL(10,2),
  discount INT,
  rating DECIMAL(2,1),
  numReviews INT,
  image VARCHAR(500),
  category VARCHAR(100),
  inStock BOOLEAN,
  featured BOOLEAN,
  description TEXT,
  specifications JSON,
  createdAt DATETIME,
  updatedAt DATETIME
);
```

## 🐛 Troubleshooting

### Error: "Cannot connect to database"
- Check your `.env` file has correct database credentials
- Ensure MySQL server is running
- Verify database exists

### Error: "Table doesn't exist"
- Run database sync first: `npm run sync`
- Then run seeder: `npm run seed:brands`

### Products not showing on frontend
- Check browser console for API errors
- Verify backend is running: `npm run dev`
- Check API endpoint: `http://localhost:5000/api/brands`

## 📝 Notes

- The seeder uses placeholder images from Unsplash
- All prices are in Indian Rupees (₹)
- Product ratings are randomly generated between 3.0-5.0
- 90% of products are marked as "in stock"
- 30% of products are marked as "featured"
- 6 brands are marked as "featured brands"

## 🎯 Next Steps

After seeding:
1. ✅ Visit `/brands` page to see all brands
2. ✅ Test search and filter functionality
3. ✅ Click on brands to see their products
4. ✅ Test category pages with brand filters
5. ✅ Verify Header brand dropdown works
6. ✅ Check HomePage "Top Brands" section

---

**Happy Seeding! 🌱**
