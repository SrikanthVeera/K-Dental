# 🛒 Cart with Nested Format - Complete Guide

## ✅ Using Nested Structure

Your cart now uses the **nested format**: `{ state: { items: [] }, version: 0 }`

---

## Storage Structure

### ✅ Correct Format (Nested):
```json
{
  "state": {
    "items": [
      {
        "id": 1,
        "name": "Toothpaste",
        "price": 100,
        "quantity": 1
      }
    ]
  },
  "version": 0
}
```

---

## How It Works

### 1. Add to Cart Function

```typescript
function addToCart(product) {
  // 1️⃣ Get the cart from localStorage
  let cart = JSON.parse(localStorage.getItem("dental-cart-storage"));
  
  // If cart doesn't exist or structure is wrong, initialize it
  if (!cart || !cart.state || !Array.isArray(cart.state.items)) {
    cart = { state: { items: [] }, version: 0 };
  }
  
  // 2️⃣ Check if product already exists in cart
  const existingIndex = cart.state.items.findIndex(item => item.id === product.id);
  
  if (existingIndex > -1) {
    // If product exists, increase quantity
    cart.state.items[existingIndex].quantity += product.quantity || 1;
  } else {
    // Add new product
    cart.state.items.push({ ...product, quantity: product.quantity || 1 });
  }
  
  // 3️⃣ Save updated cart back to localStorage
  localStorage.setItem("dental-cart-storage", JSON.stringify(cart));
  
  // 4️⃣ Optional: log cart to confirm
  console.log("Cart updated:", cart);
}
```

### 2. Get Cart Items

```typescript
function getCartItems() {
  const cart = JSON.parse(localStorage.getItem("dental-cart-storage"));
  return cart?.state?.items || [];
}
```

### 3. Get Cart Count

```typescript
function getCartCount() {
  const cart = JSON.parse(localStorage.getItem("dental-cart-storage"));
  const items = cart?.state?.items || [];
  return items.reduce((total, item) => total + item.quantity, 0);
}
```

### 4. Remove from Cart

```typescript
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("dental-cart-storage"));
  
  if (!cart || !cart.state || !cart.state.items) {
    return;
  }
  
  cart.state.items = cart.state.items.filter(item => item.id !== productId);
  localStorage.setItem("dental-cart-storage", JSON.stringify(cart));
  
  console.log("Product removed from cart");
}
```

### 5. Update Quantity

```typescript
function updateQuantity(productId, newQuantity) {
  let cart = JSON.parse(localStorage.getItem("dental-cart-storage"));
  
  if (!cart || !cart.state || !cart.state.items) {
    return;
  }
  
  const itemIndex = cart.state.items.findIndex(item => item.id === productId);
  
  if (itemIndex > -1) {
    if (newQuantity <= 0) {
      // Remove item if quantity is 0
      cart.state.items.splice(itemIndex, 1);
    } else {
      cart.state.items[itemIndex].quantity = newQuantity;
    }
    
    localStorage.setItem("dental-cart-storage", JSON.stringify(cart));
    console.log("Quantity updated");
  }
}
```

---

## Your Zustand Store

Your Zustand store automatically handles the nested format:

```typescript
// When you call:
addItem(product);

// Zustand saves to localStorage as:
{
  "state": {
    "items": [...]
  },
  "version": 0
}
```

---

## Testing

### Test 1: Add Product
```javascript
// Clear cart
localStorage.removeItem('dental-cart-storage');

// Add product (click "Add to Cart" button)

// Check structure
const cart = JSON.parse(localStorage.getItem('dental-cart-storage'));
console.log('Structure:', cart);
// Should show: { state: { items: [...] }, version: 0 }
```

### Test 2: Verify Nested Format
```javascript
const cart = JSON.parse(localStorage.getItem('dental-cart-storage'));

console.log('Has state:', !!cart.state); // Should be true
console.log('Has items:', !!cart.state?.items); // Should be true
console.log('Has version:', cart.version !== undefined); // Should be true
console.log('Items count:', cart.state?.items?.length || 0);
```

### Test 3: Get Cart Count
```javascript
const cart = JSON.parse(localStorage.getItem('dental-cart-storage'));
const count = cart.state.items.reduce((t, i) => t + i.quantity, 0);
console.log('Total items:', count);
```

---

## Quick Validation

Paste this after adding a product:

```javascript
const cart = JSON.parse(localStorage.getItem('dental-cart-storage'));
const isCorrect = cart?.state?.items && cart?.version !== undefined;
console.log(isCorrect ? '✅ CORRECT FORMAT' : '❌ WRONG FORMAT');
console.log('Structure:', cart);
```

**Expected:** `✅ CORRECT FORMAT`

---

## In Your Components

### ProductCard.tsx (Already Working)
```tsx
const { addItem } = useCartStore();

// This automatically saves in nested format
addItem(product);
```

### Header.tsx (Already Working)
```tsx
const { getTotalItems } = useCartStore();

// This reads from nested format automatically
<span>Cart ({getTotalItems()})</span>
```

---

## Migration

The app automatically ensures nested format on startup:

```typescript
// In App.tsx
useEffect(() => {
  migrateCartStorage(); // Ensures nested format
}, []);
```

---

## Success Indicators

✅ localStorage has this structure:
```json
{
  "state": {
    "items": [...]
  },
  "version": 0
}
```

✅ Console shows:
```
💾 Cart saved to localStorage (nested format): 1 items
```

✅ Navbar badge updates

✅ Cart persists on refresh

---

## Quick Commands

### Check Format:
```javascript
const cart = JSON.parse(localStorage.getItem('dental-cart-storage'));
console.log('Format:', cart.state ? 'Nested ✅' : 'Flat ❌');
```

### Get Items:
```javascript
const cart = JSON.parse(localStorage.getItem('dental-cart-storage'));
console.log('Items:', cart.state.items);
```

### Reset Cart:
```javascript
const emptyCart = { state: { items: [] }, version: 0 };
localStorage.setItem('dental-cart-storage', JSON.stringify(emptyCart));
location.reload();
```

---

**Your cart now uses the nested format as requested!** ✅

All Zustand operations automatically save/load in this format.
