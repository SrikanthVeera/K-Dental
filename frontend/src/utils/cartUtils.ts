/**
 * Cart Utility Functions
 * Complete implementation with localStorage persistence
 */

export interface CartProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: string;
  quantity: number;
  mrp?: number;
  category?: string;
}

const CART_STORAGE_KEY = 'dental-cart-storage';

/**
 * Get cart from localStorage
 * ✅ Reads from nested structure: { state: { items: [] }, version: 0 }
 */
export const getCartFromStorage = (): CartProduct[] => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // ✅ Read from nested structure
      return parsed.state?.items || parsed.items || [];
    }
    return [];
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return [];
  }
};

/**
 * Save cart to localStorage
 * ✅ Saves in nested structure: { state: { items: [] }, version: 0 }
 */
export const saveCartToLocalStorage = (cart: CartProduct[]): void => {
  try {
    // ✅ Save in nested format
    const data = {
      state: {
        items: cart
      },
      version: 0
    };
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(data));
    console.log('💾 Cart saved:', cart.length, 'items');
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

/**
 * Add product to cart
 * If product exists, increase quantity
 * If new product, add with quantity 1
 */
export const addToCart = (product: Omit<CartProduct, 'quantity'>, currentCart: CartProduct[]): CartProduct[] => {
  const existingItemIndex = currentCart.findIndex(item => item.id === product.id);
  
  let newCart: CartProduct[];
  
  if (existingItemIndex >= 0) {
    // Product exists - increase quantity
    newCart = currentCart.map((item, index) => 
      index === existingItemIndex 
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    // New product - add with quantity 1
    newCart = [...currentCart, { ...product, quantity: 1 }];
  }
  
  // Save to localStorage
  saveCartToLocalStorage(newCart);
  
  return newCart;
};

/**
 * Remove product from cart by ID
 */
export const removeFromCart = (productId: number, currentCart: CartProduct[]): CartProduct[] => {
  const newCart = currentCart.filter(item => item.id !== productId);
  
  // Save to localStorage
  saveCartToLocalStorage(newCart);
  
  return newCart;
};

/**
 * Update product quantity
 * If quantity is 0 or less, remove the product
 */
export const updateQuantity = (productId: number, newQty: number, currentCart: CartProduct[]): CartProduct[] => {
  if (newQty <= 0) {
    return removeFromCart(productId, currentCart);
  }
  
  const newCart = currentCart.map(item =>
    item.id === productId
      ? { ...item, quantity: newQty }
      : item
  );
  
  // Save to localStorage
  saveCartToLocalStorage(newCart);
  
  return newCart;
};

/**
 * Get total cart item count using reduce()
 */
export const getCartCount = (cart: CartProduct[]): number => {
  return cart.reduce((total, item) => total + item.quantity, 0);
};

/**
 * Get total cart price
 */
export const getCartTotal = (cart: CartProduct[]): number => {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

/**
 * Clear entire cart
 */
export const clearCart = (): void => {
  saveCartToLocalStorage([]);
};

/**
 * Check if product is in cart
 */
export const isInCart = (productId: number, cart: CartProduct[]): boolean => {
  return cart.some(item => item.id === productId);
};

/**
 * Get product quantity in cart
 */
export const getProductQuantity = (productId: number, cart: CartProduct[]): number => {
  const item = cart.find(item => item.id === productId);
  return item?.quantity || 0;
};
