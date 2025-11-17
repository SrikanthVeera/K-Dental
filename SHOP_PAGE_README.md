# Advanced Shop Page with Filters

A complete e-commerce shop page with advanced filtering, search, and backend integration inspired by DentalKart.

## 🎯 Features

### Search Functionality
- **Real-time search**: Search across product names, brands, and categories
- **Sticky header**: Search bar stays visible while scrolling
- **Search over 20,000 products** placeholder text

### Advanced Filters

#### 1. **Sort By**
- Relevance (default)
- Price: Low to High
- Price: High to Low
- Rating (highest first)
- Name: A to Z (alphabetical)
- Name: Z to A (reverse alphabetical)

#### 2. **Price Range Filter**
- Min/Max input fields
- Range slider for quick selection
- Real-time price display
- Default range: ₹0 - ₹100,000

#### 3. **Rating Filter**
- Filter by minimum rating (4★, 3★, 2★, 1★ & Up)
- Visual star display
- Toggle selection

#### 4. **Manufacturers Filter**
- Checkbox list of all brands
- Scrollable list for many brands
- Multi-select capability
- Alphabetically sorted

#### 5. **Category Filter**
- Checkbox list of categories
- Multi-select capability
- Equipment, Instruments, Materials, Furniture, etc.

### Product Display
- **Grid layout**: Responsive (1-4 columns)
- **Product cards** with:
  - High-quality images
  - Discount badges
  - Wishlist button
  - Brand name
  - Product name (2-line clamp)
  - Rating with review count
  - Price with MRP strikethrough
  - Add to Cart button
  - "View Similar Products" link
  - Out of stock overlay

### Animations
- Smooth filter sidebar slide-in/out
- Product card hover effects
- Image zoom on hover
- Layout animations when filtering

### Backend Integration
- RESTful API endpoints
- Query parameter support
- Pagination ready
- Filter options endpoint

## 📁 File Structure

```
frontend/src/
└── pages/
    └── ShopPage.tsx              # Main shop page with filters

backend/src/
└── routes/
    └── products.ts               # Products API endpoints
```

## 🚀 API Endpoints

### GET /api/products
Get all products with optional filters

**Query Parameters:**
- `search` - Search term
- `brand` - Comma-separated brand names
- `category` - Comma-separated categories
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `minRating` - Minimum rating
- `sortBy` - Sort option (price-low, price-high, rating, name-az, name-za)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)

**Example:**
```
GET /api/products?search=scaler&brand=Woodpecker&minPrice=10000&maxPrice=20000&sortBy=price-low
```

**Response:**
```json
{
  "success": true,
  "data": [...products],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 20,
    "totalPages": 3
  }
}
```

### GET /api/products/:id
Get single product by ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Dental Ultrasonic Scaler",
    "brand": "Woodpecker",
    "price": 12999,
    ...
  }
}
```

### GET /api/products/filters/options
Get available filter options

**Response:**
```json
{
  "success": true,
  "data": {
    "brands": ["3M ESPE", "Dentsply", "Hu-Friedy", ...],
    "categories": ["Equipment", "Instruments", "Materials", ...],
    "priceRange": {
      "min": 3299,
      "max": 189999
    }
  }
}
```

## 🔧 Setup & Usage

### 1. Start Backend
```bash
cd backend
npm install
npm run dev
```
Backend runs on `http://localhost:4000`

### 2. Start Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

### 3. Access Shop Page
```
http://localhost:5173/shop-new
```

## 💡 How It Works

### Frontend Flow
1. Component mounts → Fetch products from API
2. User applies filters → Update state
3. `useEffect` triggers → Apply filters locally
4. Products re-render with animations
5. User can search, sort, filter simultaneously

### Filter Logic
```typescript
// All filters work together
const filtered = products
  .filter(search)
  .filter(manufacturers)
  .filter(categories)
  .filter(priceRange)
  .filter(rating)
  .sort(sortBy);
```

### Backend Flow
1. Receive request with query params
2. Filter products based on params
3. Sort results
4. Paginate
5. Return JSON response

## 🎨 Customization

### Change API URL
Update in `ShopPage.tsx`:
```typescript
const response = await axios.get('YOUR_API_URL/api/products');
```

### Add More Filters
1. Add filter state
2. Add UI component
3. Add filter logic in `applyFilters()`
4. Update backend route

### Modify Product Card
Edit the product card section in `ShopPage.tsx`:
```typescript
<motion.div className="bg-white rounded-xl...">
  {/* Your custom card design */}
</motion.div>
```

## 🔄 Connect to Real Database

### Using Prisma (Recommended)

1. **Define Product Model** (`backend/prisma/schema.prisma`):
```prisma
model Product {
  id          Int      @id @default(autoincrement())
  name        String
  brand       String
  category    String
  price       Int
  mrp         Int
  rating      Float
  reviews     Int
  image       String
  inStock     Boolean  @default(true)
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

2. **Update Products Route**:
```typescript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const { search, brand, minPrice, maxPrice } = req.query;
  
  const products = await prisma.product.findMany({
    where: {
      AND: [
        search ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { brand: { contains: search, mode: 'insensitive' } }
          ]
        } : {},
        brand ? { brand: { in: brand.split(',') } } : {},
        minPrice ? { price: { gte: Number(minPrice) } } : {},
        maxPrice ? { price: { lte: Number(maxPrice) } } : {}
      ]
    },
    orderBy: { createdAt: 'desc' }
  });
  
  res.json({ success: true, data: products });
});
```

3. **Run Migrations**:
```bash
npx prisma migrate dev --name add_products
npx prisma generate
```

## 📱 Responsive Design

- **Desktop (1280px+)**: 4 columns, sidebar visible
- **Laptop (1024px)**: 3 columns, sidebar visible
- **Tablet (768px)**: 2 columns, collapsible sidebar
- **Mobile (< 768px)**: 1 column, modal sidebar

## 🎯 Features Comparison

| Feature | Implemented | Notes |
|---------|-------------|-------|
| Search | ✅ | Real-time, multi-field |
| Price Filter | ✅ | Range slider + inputs |
| Rating Filter | ✅ | Star-based selection |
| Brand Filter | ✅ | Multi-select checkboxes |
| Category Filter | ✅ | Multi-select checkboxes |
| Alphabetical Sort | ✅ | A-Z and Z-A |
| Price Sort | ✅ | Low-High, High-Low |
| Rating Sort | ✅ | Highest first |
| Wishlist | ✅ | Local state (add backend) |
| Add to Cart | ✅ | Button ready (add logic) |
| Pagination | 🔄 | Backend ready, add UI |
| Product Images | ✅ | Hover zoom effect |
| Discount Badges | ✅ | Percentage display |
| Out of Stock | ✅ | Overlay + disabled button |
| Animations | ✅ | Framer Motion |

## 🚀 Next Steps

1. **Add to Cart Functionality**
   - Create cart store (Zustand)
   - Add cart API endpoints
   - Implement cart page

2. **Wishlist Backend**
   - Save to database
   - User-specific wishlists
   - Sync across devices

3. **Pagination UI**
   - Add page numbers
   - Previous/Next buttons
   - Items per page selector

4. **Product Quick View**
   - Modal with product details
   - Add to cart from modal
   - Image gallery

5. **Filter Persistence**
   - Save filters to URL
   - Shareable filtered links
   - Browser back/forward support

6. **Advanced Features**
   - Recently viewed products
   - Product recommendations
   - Compare products
   - Bulk actions

## 🐛 Troubleshooting

### Products not loading?
- Check backend is running on port 4000
- Check CORS settings in backend
- Open browser console for errors

### Filters not working?
- Check filter state in React DevTools
- Verify `applyFilters()` logic
- Check console for errors

### API errors?
- Verify backend route is registered
- Check request URL in Network tab
- Verify response format

---

**Demo URL**: `http://localhost:5173/shop-new`

**API Base URL**: `http://localhost:4000/api`
