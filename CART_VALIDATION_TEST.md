# 🧪 Cart Validation Test Snippet

## Quick 30-Second Test

### Step 1: Clear Old Cart
Open browser console (F12) and paste:

```javascript
// Clear old cart and reload
localStorage.removeItem('dental-cart-storage');
console.log('✅ Old cart cleared');
location.reload();
```

---

### Step 2: Add Product & Validate
After page reloads, click "Add to Cart" on any product, then run in console:

```javascript
// Validate cart structure
const cart = JSON.parse(localStorage.getItem('dental-cart-storage'));

console.log('=== CART VALIDATION ===');
console.log('1. Storage Key:', localStorage.getItem('dental-cart-storage') ? '✅ EXISTS' : '❌ MISSING');
console.log('2. Cart Object:', cart);
console.log('3. Has items array:', cart?.items ? '✅ YES' : '❌ NO');
console.log('4. Has nested state:', cart?.state ? '❌ WRONG FORMAT' : '✅ CORRECT');
console.log('5. Items count:', cart?.items?.length || 0);
console.log('6. Total quantity:', cart?.items?.reduce((t, i) => t + i.quantity, 0) || 0);

// Final verdict
if (cart?.items && !cart?.state) {
  console.log('%c✅ CART IS WORKING CORRECTLY!', 'color: green; font-size: 16px; font-weight: bold');
  console.log('Structure: { items: [...] } ✅');
} else if (cart?.state) {
  console.log('%c❌ CART HAS WRONG FORMAT!', 'color: red; font-size: 16px; font-weight: bold');
  console.log('Found nested state - needs fix');
} else {
  console.log('%c⚠️ CART IS EMPTY', 'color: orange; font-size: 16px; font-weight: bold');
  console.log('Add a product first');
}
```

---

### Step 3: Test Persistence
Refresh the page (F5), then run:

```javascript
// Check if cart persisted
const cart = JSON.parse(localStorage.getItem('dental-cart-storage'));
const itemCount = cart?.items?.length || 0;

console.log('=== PERSISTENCE TEST ===');
console.log('Items after refresh:', itemCount);
console.log(itemCount > 0 ? '✅ CART PERSISTED!' : '❌ CART LOST!');
```

---

### Step 4: Test Duplicate Prevention
Add the same product twice, then run:

```javascript
// Check duplicate prevention
const cart = JSON.parse(localStorage.getItem('dental-cart-storage'));
const firstItem = cart?.items?.[0];

console.log('=== DUPLICATE TEST ===');
console.log('First item quantity:', firstItem?.quantity);
console.log('Total items in cart:', cart?.items?.length);
console.log(firstItem?.quantity > 1 ? '✅ DUPLICATE PREVENTION WORKS!' : '⚠️ Add same product twice');
```

---

## One-Line Quick Check

Paste this after adding a product:

```javascript
const c=JSON.parse(localStorage.getItem('dental-cart-storage'));console.log(c?.items&&!c?.state?'✅ WORKING':'❌ BROKEN',c);
```

---

## Expected Results

### ✅ Success Output:
```
=== CART VALIDATION ===
1. Storage Key: ✅ EXISTS
2. Cart Object: { items: [...] }
3. Has items array: ✅ YES
4. Has nested state: ✅ CORRECT
5. Items count: 1
6. Total quantity: 1
✅ CART IS WORKING CORRECTLY!
Structure: { items: [...] } ✅
```

### ❌ Failure Output:
```
=== CART VALIDATION ===
1. Storage Key: ✅ EXISTS
2. Cart Object: { state: { items: [...] }, version: 0 }
3. Has items array: ❌ NO
4. Has nested state: ❌ WRONG FORMAT
❌ CART HAS WRONG FORMAT!
Found nested state - needs fix
```

---

## Visual Test Checklist

After adding a product:

- [ ] Console shows: `💾 Cart saved: 1 items`
- [ ] Navbar badge shows count
- [ ] localStorage has `{ items: [...] }` format
- [ ] No `state` property in localStorage
- [ ] Refresh page - cart persists
- [ ] Add same product - quantity increases
- [ ] No console errors

**If all checked: ✅ CART IS WORKING!**

---

## Automated Test Function

Copy and paste this complete test function:

```javascript
function testCart() {
  console.clear();
  console.log('%c🧪 CART SYSTEM TEST', 'color: blue; font-size: 20px; font-weight: bold');
  console.log('');
  
  const cart = JSON.parse(localStorage.getItem('dental-cart-storage'));
  
  // Test 1: Storage exists
  const test1 = !!localStorage.getItem('dental-cart-storage');
  console.log(test1 ? '✅' : '❌', 'Test 1: localStorage exists');
  
  // Test 2: Flat structure
  const test2 = cart?.items && !cart?.state;
  console.log(test2 ? '✅' : '❌', 'Test 2: Flat structure { items: [] }');
  
  // Test 3: Items array
  const test3 = Array.isArray(cart?.items);
  console.log(test3 ? '✅' : '❌', 'Test 3: Items is an array');
  
  // Test 4: Has items
  const test4 = cart?.items?.length > 0;
  console.log(test4 ? '✅' : '⚠️', 'Test 4: Cart has items', `(${cart?.items?.length || 0})`);
  
  // Test 5: Items have required fields
  const firstItem = cart?.items?.[0];
  const test5 = firstItem?.id && firstItem?.name && firstItem?.price && firstItem?.quantity;
  console.log(test5 ? '✅' : '⚠️', 'Test 5: Items have required fields');
  
  // Test 6: Quantity calculation
  const totalQty = cart?.items?.reduce((t, i) => t + i.quantity, 0) || 0;
  const test6 = totalQty > 0;
  console.log(test6 ? '✅' : '⚠️', 'Test 6: Total quantity:', totalQty);
  
  console.log('');
  
  // Final result
  const allPassed = test1 && test2 && test3;
  if (allPassed && test4) {
    console.log('%c✅ ALL TESTS PASSED!', 'color: green; font-size: 18px; font-weight: bold');
    console.log('Your cart is working correctly! 🎉');
  } else if (allPassed) {
    console.log('%c⚠️ CART IS EMPTY', 'color: orange; font-size: 18px; font-weight: bold');
    console.log('Add a product to fully test');
  } else {
    console.log('%c❌ TESTS FAILED', 'color: red; font-size: 18px; font-weight: bold');
    console.log('Cart structure is incorrect');
  }
  
  console.log('');
  console.log('Cart data:', cart);
  
  return { passed: allPassed, cart };
}

// Run test
testCart();
```

---

## Quick Fix Commands

### If cart is broken:
```javascript
// Reset to correct format
localStorage.setItem('dental-cart-storage', JSON.stringify({ items: [] }));
console.log('✅ Cart reset to correct format');
location.reload();
```

### If migration needed:
```javascript
// Force migration
const old = JSON.parse(localStorage.getItem('dental-cart-storage'));
if (old?.state?.items) {
  localStorage.setItem('dental-cart-storage', JSON.stringify({ items: old.state.items }));
  console.log('✅ Migrated to flat format');
  location.reload();
}
```

---

## Success Criteria

Your cart is working if:

1. ✅ localStorage key is `'dental-cart-storage'`
2. ✅ Structure is `{ items: [...] }` (flat)
3. ✅ No `state` property exists
4. ✅ Items array is accessible
5. ✅ Cart persists on refresh
6. ✅ Navbar badge updates
7. ✅ No console errors

---

## Copy-Paste Test (Easiest)

**After adding a product, paste this:**

```javascript
(function(){const c=JSON.parse(localStorage.getItem('dental-cart-storage'));const ok=c?.items&&!c?.state;console.log('%c'+(ok?'✅ WORKING':'❌ BROKEN'),'font-size:20px;font-weight:bold;color:'+(ok?'green':'red'));console.log('Format:',ok?'{ items: [] } ✅':'{ state: { items: [] } } ❌');console.log('Items:',c?.items?.length||0);console.log('Data:',c);})();
```

**Expected:** `✅ WORKING` in green

---

**Run these tests after the fix to confirm everything works!** 🎉
