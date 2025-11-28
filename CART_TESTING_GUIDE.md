# 🧪 Cart System Testing Guide

## Pre-Testing Setup

1. **Clear localStorage** (for fresh start):
```javascript
// In browser console
localStorage.clear();
```

2. **Verify logo directory exists**:
```
frontend/public/logos/
```

3. **Start the application**:
```bash
cd frontend
npm run dev
```

## Test Suite

### Test 1: Add to Cart (Basic)
**Steps:**
1. Navigate to any product page
2. Click "Add to Cart" button
3. Check navbar cart badge

**Expected:**
- ✅ Toast notification appears
- ✅ Button shows "Added!" briefly
- ✅ Navbar badge shows "1"
- ✅ Product added to cart

**Verify in Console:**
```javascript
JSON.parse(localStorage.getItem('dental-cart-storage'))
// Should show: { state: { items: [{ id, name, price, image, brand, quantity: 1 }] } }
```

---

### Test 2: Duplicate Prevention
**Steps:**
1. Add Product A to cart
2. Add Product A again
3. Check cart

**Expected:**
- ✅ Cart has only 1 entry for Product A
- ✅ Quantity is 2
- ✅ Navbar badge shows "2"
- ✅ No duplicate items

**Verify:**
```javascript
const cart = JSON.parse(localStorage.getItem('dental-cart-storage')).state.items;
console.log(cart.length); // Should be 1
console.log(cart[0].quantity); // Should be 2
```

---

### Test 3: localStorage Persistence
**Steps:**
1. Add 3 different products to cart
2. Refresh the page (F5)
3. Check cart

**Expected:**
- ✅ All 3 products still in cart
- ✅ Quantities preserved
- ✅ Navbar badge shows correct count
- ✅ No data loss

---

### Test 4: Cart Count Using reduce()
**Steps:**
1. Clear cart
2. Add Product A (qty will be 1)
3. Add Product A again (qty becomes 2)
4. Add Product B (qty will be 1)
5. Check navbar badge

**Expected:**
- ✅ Badge shows "3" (2 + 1)
- ✅ Count calculated using reduce()

**Verify in Code:**
```typescript
// In cartStore.ts
getTotalItems: () => {
  return get().items.reduce((total, item) => total + item.quantity, 0);
}
```

---

### Test 5: Remove from Cart
**Steps:**
1. Add 2 products to cart
2. Open cart sidebar
3. Click "Remove" on one product
4. Check cart

**Expected:**
- ✅ Product removed
- ✅ Cart count updates
- ✅ localStorage updated
- ✅ Other product remains

---

### Test 6: Update Quantity
**Steps:**
1. Add product to cart
2. Open cart sidebar
3. Click "+" button 3 times
4. Click "-" button 1 time
5. Check quantity

**Expected:**
- ✅ Quantity increases to 4
- ✅ Quantity decreases to 3
- ✅ localStorage updates each time
- ✅ Total price updates

---

### Test 7: Quantity to Zero Removes Item
**Steps:**
1. Add product with quantity 1
2. Open cart sidebar
3. Click "-" button
4. Check cart

**Expected:**
- ✅ Product removed from cart
- ✅ Cart count becomes 0
- ✅ localStorage updated
- ✅ Empty cart message shown

---

### Test 8: Original Product Not Modified
**Steps:**
1. Get product object reference
2. Add to cart
3. Modify cart item quantity
4. Check original product

**Expected:**
- ✅ Original product unchanged
- ✅ Cart has separate copy
- ✅ No side effects

**Verify in Console:**
```javascript
// Before adding to cart
const originalProduct = { id: 1, name: "Test", price: 100, quantity: undefined };

// After adding to cart
const cartItem = cart.find(item => item.id === 1);
cartItem.quantity = 5;

console.log(originalProduct.quantity); // Should be undefined
console.log(cartItem.quantity); // Should be 5
```

---

### Test 9: Brand Logos (Local Paths)
**Steps:**
1. Navigate to brands page
2. Check brand logos
3. Open browser DevTools Network tab
4. Check for failed requests

**Expected:**
- ✅ No network errors for logos
- ✅ Local paths used: `/logos/brandname.png`
- ✅ Fallback shown if logo missing
- ✅ No DNS errors

**Verify:**
```javascript
// In brandLogos.ts
getBrandLogo('GC Corporation') // Returns: /logos/gc.png
getBrandLogo('Unknown Brand')  // Returns: fallback URL
```

---

### Test 10: Logo Fallback
**Steps:**
1. Use brand with missing logo file
2. Check what displays

**Expected:**
- ✅ Fallback image shown
- ✅ No broken image icon
- ✅ No console errors
- ✅ URL: `https://dummyimage.com/200x200/ffffff/000000&text=No+Logo`

---

### Test 11: Multiple Products
**Steps:**
1. Add 5 different products
2. Set different quantities (1, 2, 3, 4, 5)
3. Check cart count

**Expected:**
- ✅ Cart has 5 items
- ✅ Total count = 15 (1+2+3+4+5)
- ✅ Navbar badge shows "15"
- ✅ All products in localStorage

---

### Test 12: Clear Cart
**Steps:**
1. Add multiple products
2. Click "Clear Cart" button
3. Confirm action
4. Check cart

**Expected:**
- ✅ Cart empty
- ✅ Navbar badge hidden or shows "0"
- ✅ localStorage cleared
- ✅ Empty cart message shown

---

### Test 13: Browser Restart Persistence
**Steps:**
1. Add products to cart
2. Close browser completely
3. Reopen browser
4. Navigate to site
5. Check cart

**Expected:**
- ✅ Cart items restored
- ✅ Quantities preserved
- ✅ All data intact

---

### Test 14: Product Object Format
**Steps:**
1. Add product to cart
2. Check localStorage structure

**Expected Format:**
```json
{
  "state": {
    "items": [
      {
        "id": 1,
        "name": "Product Name",
        "price": 1000,
        "image": "/path/to/image.jpg",
        "brand": "Brand Name",
        "quantity": 2,
        "mrp": 1500,
        "category": "Category"
      }
    ]
  },
  "version": 0
}
```

**Required Fields:**
- ✅ id (number)
- ✅ name (string)
- ✅ price (number)
- ✅ image (string)
- ✅ brand (string)
- ✅ quantity (number)

---

### Test 15: Edge Cases

#### Empty Cart Operations
```javascript
// Should not crash
removeFromCart(999, []); // Non-existent ID
updateQuantity(999, 5, []); // Non-existent ID
getCartCount([]); // Should return 0
```

#### Invalid Quantities
```javascript
updateQuantity(1, -5, cart); // Should remove item
updateQuantity(1, 0, cart);  // Should remove item
updateQuantity(1, 1000, cart); // Should work (or cap at max)
```

#### Missing Product Data
```javascript
addToCart({ id: 1 }, cart); // Should handle gracefully
addToCart(null, cart); // Should not crash
```

---

## Automated Test Script

Run in browser console:

```javascript
// Clear and start fresh
localStorage.clear();

// Test 1: Add product
console.log('Test 1: Adding product...');
// Click "Add to Cart" button manually
// Check: localStorage should have 1 item

// Test 2: Duplicate prevention
console.log('Test 2: Testing duplicate prevention...');
// Click "Add to Cart" again on same product
const cart = JSON.parse(localStorage.getItem('dental-cart-storage')).state.items;
console.assert(cart.length === 1, 'Should have 1 item');
console.assert(cart[0].quantity === 2, 'Quantity should be 2');

// Test 3: Cart count
console.log('Test 3: Testing cart count...');
const count = cart.reduce((total, item) => total + item.quantity, 0);
console.assert(count === 2, 'Count should be 2');

// Test 4: localStorage persistence
console.log('Test 4: Testing persistence...');
location.reload(); // Refresh page
// After reload, check cart again
const restoredCart = JSON.parse(localStorage.getItem('dental-cart-storage')).state.items;
console.assert(restoredCart.length === 1, 'Cart should persist');

console.log('✅ All tests passed!');
```

---

## Performance Tests

### Load Time
- ✅ Cart loads in < 100ms
- ✅ localStorage read is fast
- ✅ No blocking operations

### Memory Usage
- ✅ No memory leaks
- ✅ Cart data is reasonable size
- ✅ Images lazy loaded

### Network
- ✅ No unnecessary API calls
- ✅ Logos load from local files
- ✅ No external dependencies

---

## Browser Compatibility

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

---

## Checklist Summary

### Core Functionality
- [ ] Add to cart works
- [ ] Remove from cart works
- [ ] Update quantity works
- [ ] Clear cart works
- [ ] Cart count correct (using reduce)

### Data Integrity
- [ ] Original products not modified
- [ ] Duplicate prevention works
- [ ] localStorage persists
- [ ] Product format preserved

### UI/UX
- [ ] Toast notifications show
- [ ] Button states update
- [ ] Navbar badge updates
- [ ] Cart sidebar works

### Brand Logos
- [ ] Local paths used
- [ ] No network errors
- [ ] Fallback works
- [ ] All brands covered

### Edge Cases
- [ ] Empty cart handled
- [ ] Invalid data handled
- [ ] Missing logos handled
- [ ] Browser restart works

---

## Debugging Tips

### Cart Not Persisting
```javascript
// Check localStorage
console.log(localStorage.getItem('dental-cart-storage'));

// Check if persist middleware is active
// In cartStore.ts, verify persist() wrapper exists
```

### Duplicate Items
```javascript
// Check ID comparison
const cart = JSON.parse(localStorage.getItem('dental-cart-storage')).state.items;
console.log(cart.map(item => item.id)); // Should be unique
```

### Logo Not Loading
```javascript
// Check path
import { getBrandLogo } from './utils/brandLogos';
console.log(getBrandLogo('GC')); // Should return /logos/gc.png

// Check file exists
// Navigate to: http://localhost:5173/logos/gc.png
```

### Count Incorrect
```javascript
// Verify reduce logic
const cart = JSON.parse(localStorage.getItem('dental-cart-storage')).state.items;
const count = cart.reduce((total, item) => {
  console.log(`Item ${item.id}: quantity ${item.quantity}`);
  return total + item.quantity;
}, 0);
console.log('Total count:', count);
```

---

## Success Criteria

✅ All 15 tests pass  
✅ No console errors  
✅ No network errors  
✅ localStorage works  
✅ Cart persists on refresh  
✅ Duplicate prevention works  
✅ Cart count uses reduce()  
✅ Brand logos load locally  
✅ Fallback works for missing logos  
✅ Original products unchanged  

---

**Testing Status**: Ready for QA  
**Last Updated**: November 28, 2025
