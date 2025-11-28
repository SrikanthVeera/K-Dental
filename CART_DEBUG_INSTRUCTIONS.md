# 🐛 Cart Debug Instructions

## Issue: Product added but not showing in cart page

### Step 1: Check localStorage

Open browser console (F12) and run:

```javascript
// Check what's in localStorage
const stored = localStorage.getItem('dental-cart-storage');
console.log('Raw localStorage:', stored);

// Parse and check structure
const cart = JSON.parse(stored);
console.log('Parsed cart:', cart);
console.log('Has state:', !!cart.state);
console.log('Has items:', !!cart.state?.items);
console.log('Items array:', cart.state?.items);
console.log('Items count:', cart.state?.items?.length);
```

### Step 2: Check Zustand Store

In console, run:

```javascript
// This will show what Zustand sees
// (You need to be on a page that uses the cart)
console.log('Checking Zustand store...');
```

### Step 3: Force Refresh Cart

Try this in console:

```javascript
// Clear and reload
localStorage.removeItem('dental-cart-storage');
location.reload();

// Then add a product again
```

### Step 4: Check Cart Page

1. Add a product
2. Navigate to `/cart`
3. Open console
4. Look for these logs:
   ```
   🛒 CartPage - Items from store: [...]
   🛒 CartPage - Total items: X
   🛒 CartPage - localStorage: {...}
   ```

### Expected Output:

**If working:**
```
🛒 CartPage - Items from store: [{id: 148, name: "...", quantity: 1}]
🛒 CartPage - Total items: 1
🛒 CartPage - localStorage: {"state":{"items":[...]},"version":0}
```

**If broken:**
```
🛒 CartPage - Items from store: []
🛒 CartPage - Total items: 0
🛒 CartPage - localStorage: {"state":{"items":[...]},"version":0}
```

### Step 5: Manual Test

Run this complete test:

```javascript
// 1. Clear cart
localStorage.removeItem('dental-cart-storage');

// 2. Initialize cart manually
const testCart = {
  state: {
    items: [
      {
        id: 999,
        name: "Test Product",
        price: 1000,
        mrp: 1500,
        image: "https://placehold.co/150",
        brand: "Test",
        category: "Test",
        quantity: 1,
        inStock: true
      }
    ]
  },
  version: 0
};

localStorage.setItem('dental-cart-storage', JSON.stringify(testCart));

// 3. Reload page
location.reload();

// 4. Navigate to /cart
// Should show 1 test product
```

### Step 6: Check if Zustand is Reading Correctly

The issue might be that Zustand isn't reading from localStorage on page load.

Try adding this to your browser console:

```javascript
// Force Zustand to reload from localStorage
// (This simulates what should happen automatically)
const stored = localStorage.getItem('dental-cart-storage');
if (stored) {
  const cart = JSON.parse(stored);
  console.log('Cart in localStorage:', cart.state.items);
  console.log('Should have', cart.state.items.length, 'items');
}
```

### Common Issues:

1. **localStorage has items but Zustand doesn't see them**
   - Solution: Zustand persist might not be hydrating correctly
   - Try: Refresh the page after adding

2. **Items array is empty in localStorage**
   - Solution: Product isn't being saved
   - Check: Console for "💾 Cart saved" message

3. **Wrong structure in localStorage**
   - Should be: `{ state: { items: [...] }, version: 0 }`
   - Not: `{ items: [...] }`

### Quick Fix:

If cart isn't showing, try this:

```javascript
// 1. Check what's saved
const cart = JSON.parse(localStorage.getItem('dental-cart-storage'));
console.log('Saved items:', cart.state.items);

// 2. If items exist but not showing, force reload
if (cart.state.items.length > 0) {
  console.log('Items exist, reloading...');
  location.reload();
}
```

### Report Back:

After running Step 1, paste the output here so I can see what's happening!
