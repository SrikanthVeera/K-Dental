# Admin Inline Controls - Implementation Steps

## ✅ COMPLETED
1. Created `AdminControls.tsx` component with:
   - Dropdown menu for Edit/Delete/Add/Upload
   - AdminButtonBar for section controls
   - AdminBadge to show admin mode
   - Only visible when `user.role === 'admin'`

## 🔧 TODO - STEP BY STEP

### STEP 1: Update Header Component
**File:** `frontend/src/components/Header.tsx`

Add after the user profile section:
```tsx
{/* Admin Navigation Bar */}
{isAuthenticated && user?.role === 'admin' && (
  <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-2">
    <div className="container mx-auto px-4 flex gap-6 text-white text-sm">
      <Link to="/admin/dashboard">Dashboard</Link>
      <Link to="/admin/products">Manage Products</Link>
      <Link to="/admin/orders">Manage Orders</Link>
      <Link to="/admin/users">Manage Users</Link>
      <Link to="/admin/settings">Settings</Link>
    </div>
  </div>
)}
```

### STEP 2: Add Admin Controls to HomePage
**File:** `frontend/src/pages/HomePage.tsx`

Import at top:
```tsx
import { AdminButtonBar, AdminBadge } from '../components/AdminControls';
```

Add to Hot Selling section:
```tsx
<AdminButtonBar 
  label="Hot Selling Products"
  onEdit={() => console.log('Edit hot selling')}
  onAdd={() => console.log('Add product')}
/>
```

Add before closing tag:
```tsx
<AdminBadge />
```

### STEP 3: Add Admin Controls to Product Cards
**File:** `frontend/src/components/ProductGrid.tsx` or wherever product cards are

Import:
```tsx
import AdminControls from './AdminControls';
```

Add to each product card:
```tsx
<div className="product-card relative">
  <img src={product.image} alt={product.name} />
  <h3>{product.name}</h3>
  <p>₹{product.price}</p>
  
  {/* Admin Controls */}
  <AdminControls
    type="product"
    position="top-right"
    onEdit={() => handleEditProduct(product.id)}
    onDelete={() => handleDeleteProduct(product.id)}
    onUploadImage={() => handleUploadImage(product.id)}
  />
</div>
```

### STEP 4: Add Admin Controls to BrandsPage
**File:** `frontend/src/pages/BrandsPage.tsx`

```tsx
import { AdminButtonBar } from '../components/AdminControls';
import AdminControls from '../components/AdminControls';

// At top of page
<AdminButtonBar 
  label="Brands"
  onAdd={() => setShowAddBrandModal(true)}
/>

// On each brand card
<AdminControls
  type="brand"
  onEdit={() => handleEditBrand(brand.id)}
  onDelete={() => handleDeleteBrand(brand.id)}
  onUploadImage={() => handleUploadBrandLogo(brand.id)}
/>
```

### STEP 5: Add Admin Controls to CategoryPage
**File:** `frontend/src/pages/CategoryPage.tsx`

```tsx
<AdminButtonBar 
  label="Categories"
  onAdd={() => setShowAddCategoryModal(true)}
  onEdit={() => setShowEditCategoryModal(true)}
/>
```

### STEP 6: Add Admin Controls to Hero Banner
**File:** Wherever hero banner is (HomePage or separate component)

```tsx
<div className="hero-banner relative">
  <img src={banner.image} alt="Banner" />
  
  <AdminControls
    type="banner"
    position="top-right"
    onDelete={() => handleDeleteBanner(banner.id)}
    onUploadImage={() => handleReplaceBannerImage(banner.id)}
  />
</div>
```

### STEP 7: Backend - Update Auth to Check Admin Email
**File:** `backend/routes/auth.js`

In registration/login:
```javascript
// Auto-assign admin role for admin@dental.com
const role = email === 'admin@dental.com' ? 'admin' : 
             email.includes('service') ? 'serviceman' : 'customer';

const user = await User.create({
  name,
  email,
  password: hashedPassword,
  role
});
```

### STEP 8: Backend - Create Admin Middleware
**File:** `backend/middleware/adminAuth.js`

```javascript
const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false,
      message: 'Admin access required' 
    });
  }
  next();
};

module.exports = verifyAdmin;
```

### STEP 9: Backend - Create Admin Routes
**File:** `backend/routes/admin/products.js`

```javascript
const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/auth');
const verifyAdmin = require('../../middleware/adminAuth');
const Product = require('../../models/ProductModel');

// Add Product
router.post('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update Product
router.put('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    await Product.update(req.body, { where: { id: req.params.id } });
    res.json({ success: true, message: 'Product updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete Product
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
```

### STEP 10: Backend - File Upload Setup
**File:** `backend/middleware/upload.js`

```javascript
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Only image files are allowed!'));
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter
});

module.exports = upload;
```

**File:** `backend/routes/admin/upload.js`

```javascript
const express = require('express');
const router = express.Router();
const upload = require('../../middleware/upload');
const verifyToken = require('../../middleware/auth');
const verifyAdmin = require('../../middleware/adminAuth');
const Product = require('../../models/ProductModel');

// Upload Product Image
router.post('/product/:id', 
  verifyToken, 
  verifyAdmin, 
  upload.single('image'),
  async (req, res) => {
    try {
      const imageUrl = `/uploads/${req.file.filename}`;
      await Product.update({ image: imageUrl }, { where: { id: req.params.id } });
      res.json({ success: true, imageUrl });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

module.exports = router;
```

### STEP 11: Backend - Register Admin Routes in server.js
**File:** `backend/server.js`

```javascript
// Admin Routes
const adminProductsRoutes = require('./routes/admin/products');
const adminUploadRoutes = require('./routes/admin/upload');

app.use('/api/admin/products', adminProductsRoutes);
app.use('/api/admin/upload', adminUploadRoutes);

// Serve uploaded files
app.use('/uploads', express.static('uploads'));
```

### STEP 12: Frontend - Create Admin API Service
**File:** `frontend/src/services/adminApi.ts`

```typescript
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

export const adminApi = {
  // Products
  addProduct: (data: any) => 
    axios.post(`${API_URL}/products`, data, { headers: getAuthHeader() }),
  
  updateProduct: (id: number, data: any) => 
    axios.put(`${API_URL}/products/${id}`, data, { headers: getAuthHeader() }),
  
  deleteProduct: (id: number) => 
    axios.delete(`${API_URL}/products/${id}`, { headers: getAuthHeader() }),
  
  uploadProductImage: (id: number, file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return axios.post(`${API_URL}/upload/product/${id}`, formData, {
      headers: { ...getAuthHeader(), 'Content-Type': 'multipart/form-data' }
    });
  }
};
```

### STEP 13: Frontend - Create Image Upload Modal
**File:** `frontend/src/components/ImageUploadModal.tsx`

```tsx
import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => Promise<void>;
  title: string;
}

export const ImageUploadModal = ({ isOpen, onClose, onUpload, title }: ImageUploadModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      await onUpload(file);
      onClose();
    } catch (error) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />

          {preview && (
            <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
          )}

          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 flex items-center justify-center gap-2"
          >
            <Upload className="w-5 h-5" />
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
```

## TESTING CHECKLIST

- [ ] Register new user → Should be 'customer'
- [ ] Login as customer → No admin controls visible
- [ ] Login as admin@dental.com → Admin controls visible everywhere
- [ ] Admin can see purple navigation bar
- [ ] Admin can click edit on products
- [ ] Admin can delete products
- [ ] Admin can upload images
- [ ] Customer cannot access admin APIs (403 error)
- [ ] File upload works and saves to /uploads
- [ ] Images display correctly after upload

## QUICK START

1. Install dependencies:
```bash
cd backend
npm install multer
```

2. Create uploads folder:
```bash
mkdir uploads
```

3. Add AdminControls to any page:
```tsx
import AdminControls from '../components/AdminControls';

<AdminControls
  type="product"
  onEdit={() => handleEdit()}
  onDelete={() => handleDelete()}
  onUploadImage={() => handleUpload()}
/>
```

4. Test with admin@dental.com login

---

**Your system is ready for admin inline controls!**
