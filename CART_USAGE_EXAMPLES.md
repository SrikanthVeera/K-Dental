# 🛒 Cart Usage Examples

## Quick Start

### 1. Basic Add to Cart Button

```tsx
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

function ProductCard({ product }) {
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      mrp: product.mrp,
      image: product.image,
      brand: product.brand,
      category: product.category,
      inStock: true,
      maxQuantity: 10
    });
    
    toast.success('Added to cart!');
  };

  return (
    <button onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
}
```

### 2. Using the Custom Hook (Recommended)

```tsx
import { useCartActions } from '../hooks/useCartActions';

function ProductCard({ product }) {
  const { addToCart, isInCart, getCartQuantity } = useCartActions();

  return (
    <div>
      <button onClick={() => addToCart(product)}>
        {isInCart(product.id) 
          ? `In Cart (${getCartQuantity(product.id)})` 
          : 'Add to Cart'}
      </button>
    </div>
  );
}
```

### 3. Show Cart Count in Navbar

```tsx
import { useCartStore } from '../store/cartStore';

function Navbar() {
  const { getTotalItems, toggleCart } = useCartStore();

  return (
    <button onClick={toggleCart}>
      Cart ({getTotalItems()})
    </button>
  );
}
```

### 4. Display Cart Items

```tsx
import { useCartStore } from '../store/cartStore';

function CartPage() {
  const { items, updateQuantity, removeItem } = useCartStore();

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>₹{item.price} × {item.quantity}</p>
          
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
            -
          </button>
          <span>{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
            +
          </button>
          
          <button onClick={() => removeItem(item.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
```

### 5. Cart Summary

```tsx
import { useCartStore } from '../store/cartStore';

function CartSummary() {
  const { 
    getTotalItems, 
    getTotalPrice, 
    getTotalMRP, 
    getTotalSavings 
  } = useCartStore();

  return (
    <div>
      <p>Items: {getTotalItems()}</p>
      <p>Total: ₹{getTotalPrice()}</p>
      <p>MRP: ₹{getTotalMRP()}</p>
      <p>Savings: ₹{getTotalSavings()}</p>
    </div>
  );
}
```

### 6. Check if Product is in Cart

```tsx
import { useCartStore } from '../store/cartStore';

function ProductDetail({ product }) {
  const { getItemById } = useCartStore();
  const cartItem = getItemById(product.id);

  return (
    <div>
      {cartItem ? (
        <p>Already in cart: {cartItem.quantity} items</p>
      ) : (
        <p>Not in cart</p>
      )}
    </div>
  );
}
```

### 7. Clear Cart with Confirmation

```tsx
import { useCartActions } from '../hooks/useCartActions';

function CartPage() {
  const { clearCartWithConfirm } = useCartActions();

  return (
    <button onClick={clearCartWithConfirm}>
      Clear Cart
    </button>
  );
}
```

### 8. Add Multiple Quantities

```tsx
import { useCartStore } from '../store/cartStore';

function ProductDetail({ product }) {
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Add the item first
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      mrp: product.mrp,
      image: product.image,
      brand: product.brand,
      category: product.category,
      inStock: true,
      maxQuantity: 10
    });
    
    // Then update quantity if more than 1
    if (quantity > 1) {
      updateQuantity(product.id, quantity);
    }
  };

  return (
    <div>
      <input 
        type="number" 
        value={quantity} 
        onChange={(e) => setQuantity(Number(e.target.value))}
        min="1"
        max="10"
      />
      <button onClick={handleAddToCart}>
        Add {quantity} to Cart
      </button>
    </div>
  );
}
```

### 9. Conditional Rendering Based on Cart State

```tsx
import { useCartStore } from '../store/cartStore';

function CheckoutButton() {
  const { items, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return <p>Add items to cart to checkout</p>;
  }

  if (getTotalPrice() < 500) {
    return <p>Minimum order value: ₹500</p>;
  }

  return (
    <button>Proceed to Checkout</button>
  );
}
```

### 10. Cart Badge with Animation

```tsx
import { useCartStore } from '../store/cartStore';

function CartBadge() {
  const { getTotalItems } = useCartStore();
  const count = getTotalItems();

  if (count === 0) return null;

  return (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
      {count}
    </span>
  );
}
```

## Available Functions

### From `useCartStore`:
- `addItem(product)` - Add item to cart
- `removeItem(id)` - Remove item from cart
- `updateQuantity(id, quantity)` - Update item quantity
- `clearCart()` - Clear entire cart
- `toggleCart()` - Toggle cart sidebar
- `getTotalItems()` - Get total item count
- `getTotalPrice()` - Get total price
- `getTotalMRP()` - Get total MRP
- `getTotalSavings()` - Get total savings
- `getItemById(id)` - Get specific item

### From `useCartActions` (with toast notifications):
- `addToCart(product)` - Add with toast
- `removeFromCart(id, name)` - Remove with toast
- `updateCartQuantity(id, quantity)` - Update quantity
- `clearCartWithConfirm()` - Clear with confirmation
- `isInCart(id)` - Check if in cart
- `getCartQuantity(id)` - Get item quantity

## Product Object Structure

```typescript
{
  id: number;           // Required: Unique product ID
  name: string;         // Required: Product name
  price: number;        // Required: Selling price
  mrp: number;          // Required: Maximum retail price
  image: string;        // Required: Product image URL
  brand: string;        // Required: Brand name
  category: string;     // Required: Product category
  inStock: boolean;     // Required: Stock status
  maxQuantity?: number; // Optional: Max quantity (default: 10)
}
```

## Tips

1. **Use the custom hook** (`useCartActions`) for cleaner code with built-in notifications
2. **Check cart state** before rendering conditional UI
3. **Validate quantities** before updating (min: 1, max: maxQuantity)
4. **Handle edge cases** like out-of-stock products
5. **Test persistence** by refreshing the page
6. **Clear localStorage** during development: `localStorage.clear()`

## Testing

```typescript
// In browser console:
localStorage.getItem('dental-cart-storage') // View cart data
localStorage.clear() // Clear cart
```
