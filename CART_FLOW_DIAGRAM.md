# 🛒 Cart System Flow Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CART SYSTEM FLOW                         │
└─────────────────────────────────────────────────────────────┘

┌──────────────┐
│   Product    │
│   Component  │
└──────┬───────┘
       │
       │ User clicks "Add to Cart"
       │
       ▼
┌──────────────────────┐
│   useCartStore()     │◄──────────────┐
│   or                 │               │
│   useCartActions()   │               │
└──────┬───────────────┘               │
       │                               │
       │ addItem(product)              │
       │                               │
       ▼                               │
┌──────────────────────┐               │
│   cartStore.ts       │               │
│   (Zustand Store)    │               │
│                      │               │
│   • Check if exists  │               │
│   • Add or increase  │               │
│   • Update state     │               │
└──────┬───────────────┘               │
       │                               │
       │ State updated                 │
       │                               │
       ├─────────────────┬─────────────┤
       │                 │             │
       ▼                 ▼             ▼
┌─────────────┐   ┌──────────┐  ┌──────────────┐
│ localStorage│   │  Header  │  │  CartSidebar │
│   Persist   │   │  Badge   │  │     UI       │
│             │   │          │   │              │
│ Auto-save   │   │ Count: 3 │  │ • Item list  │
└─────────────┘   └──────────┘  │ • Quantity   │
                                 │ • Remove     │
                                 │ • Total      │
                                 └──────────────┘
```

## Data Flow

```
USER ACTION → COMPONENT → STORE → STATE UPDATE → UI UPDATE + PERSIST
```

## Add to Cart Flow

```
1. User clicks "Add to Cart"
   │
   ▼
2. Component calls addItem(product)
   │
   ▼
3. Store checks if product exists
   │
   ├─ YES → Increase quantity
   │         │
   │         ▼
   │      Update existing item
   │
   └─ NO → Add new item
             │
             ▼
          Create cart item with quantity: 1
   │
   ▼
4. State updates
   │
   ├─ Save to localStorage
   │
   ├─ Update navbar badge
   │
   └─ Update cart sidebar
   │
   ▼
5. Show toast notification
   │
   ▼
6. Visual feedback (button state change)
```

## Component Interaction

```
┌─────────────────────────────────────────────────────────┐
│                    COMPONENTS                            │
└─────────────────────────────────────────────────────────┘

ProductCard.tsx
    │
    │ addItem()
    │
    ▼
┌──────────────┐
│  cartStore   │◄──── ProductDetail.tsx
│              │
│  • items[]   │◄──── Header.tsx (getTotalItems)
│  • actions   │
│              │◄──── CartSidebar.tsx (items, updateQuantity)
└──────────────┘
    │
    │ persist
    ▼
localStorage
```

## State Structure

```typescript
CartStore {
  items: [
    {
      id: 1,
      name: "Product A",
      price: 1000,
      mrp: 1500,
      image: "...",
      brand: "Brand X",
      category: "Category Y",
      quantity: 2,        // ← Managed by store
      inStock: true,
      maxQuantity: 10
    },
    // ... more items
  ],
  isOpen: false,
  
  // Actions
  addItem(),
  removeItem(),
  updateQuantity(),
  clearCart(),
  toggleCart(),
  
  // Computed
  getTotalItems(),
  getTotalPrice(),
  getTotalMRP(),
  getTotalSavings()
}
```

## Duplicate Prevention Logic

```
┌─────────────────────────────────────────┐
│  addItem(product) called                │
└─────────────┬───────────────────────────┘
              │
              ▼
    ┌─────────────────────┐
    │ Find existing item  │
    │ by product.id       │
    └─────────┬───────────┘
              │
        ┌─────┴─────┐
        │           │
    Found?      Not Found?
        │           │
        ▼           ▼
  ┌─────────┐  ┌──────────┐
  │ Increase│  │ Add new  │
  │ quantity│  │ item     │
  │ by 1    │  │ qty = 1  │
  └─────────┘  └──────────┘
        │           │
        └─────┬─────┘
              │
              ▼
    ┌─────────────────┐
    │ Update state    │
    │ Save to storage │
    └─────────────────┘
```

## localStorage Persistence

```
┌──────────────────────────────────────────┐
│         PERSISTENCE FLOW                  │
└──────────────────────────────────────────┘

Cart State Changes
    │
    ▼
Zustand Persist Middleware
    │
    ├─ Serialize state
    │
    ├─ Save to localStorage
    │   Key: "dental-cart-storage"
    │   Value: { items: [...] }
    │
    └─ On page load:
        │
        ├─ Read from localStorage
        │
        ├─ Deserialize
        │
        └─ Restore state
```

## Function Call Chain

```
Component Level:
  onClick={() => addToCart(product)}
      │
      ▼
Hook Level (useCartActions):
  addToCart(product) {
    addItem(product)
    toast.success()
  }
      │
      ▼
Store Level (cartStore):
  addItem(product) {
    set(state => {
      // Check duplicate
      // Add or update
      // Return new state
    })
  }
      │
      ▼
Middleware Level (persist):
  localStorage.setItem()
      │
      ▼
UI Updates:
  - Navbar badge
  - Cart sidebar
  - Product button
```

## Real-time Updates

```
State Change in Store
    │
    ├─────────────┬─────────────┬─────────────┐
    │             │             │             │
    ▼             ▼             ▼             ▼
Header.tsx   CartSidebar   ProductCard   Any other
(badge)      (items list)  (button)      component
    │             │             │             │
    │             │             │             │
Re-renders   Re-renders   Re-renders   Re-renders
automatically automatically automatically automatically
```

## Error Handling

```
addItem(product)
    │
    ▼
Validation
    │
    ├─ Product has ID? ──NO──► Error
    │
    ├─ Valid price? ──NO──► Error
    │
    └─ In stock? ──NO──► Show message
    │
    ▼
Add to Cart
    │
    ▼
Success
```

## Summary

```
┌─────────────────────────────────────────────────┐
│  KEY POINTS                                      │
├─────────────────────────────────────────────────┤
│  ✅ Centralized state (Zustand)                 │
│  ✅ Automatic persistence (localStorage)        │
│  ✅ Duplicate prevention (by ID)                │
│  ✅ Real-time updates (reactive)                │
│  ✅ Type-safe (TypeScript)                      │
│  ✅ User feedback (toast notifications)         │
│  ✅ Clean API (simple functions)                │
└─────────────────────────────────────────────────┘
```

---

This diagram shows how all pieces work together to create a seamless cart experience!
