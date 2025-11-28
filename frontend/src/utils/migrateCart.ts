/**
 * Cart Migration Utility
 * Converts old nested format to new flat format
 */

const CART_STORAGE_KEY = 'dental-cart-storage';

/**
 * Ensure cart is in correct nested format
 * Correct: { state: { items: [] }, version: 0 }
 */
export const migrateCartStorage = (): void => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    
    if (!stored) {
      console.log('📦 Initializing empty cart');
      const emptyCart = { state: { items: [] }, version: 0 };
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(emptyCart));
      return;
    }

    const parsed = JSON.parse(stored);

    // Check if it's already in correct nested format
    if (parsed.state && parsed.state.items) {
      console.log('✅ Cart is in correct nested format');
      return;
    }
    
    // If it's flat format, convert to nested
    if (parsed.items) {
      console.log('📦 Converting flat format to nested format...');
      const items = parsed.items;
      const nestedFormat = {
        state: { items },
        version: 0
      };
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nestedFormat));
      console.log('✅ Cart converted to nested format!');
      console.log(`Converted ${items.length} items`);
    } else {
      console.warn('⚠️ Unknown cart format, initializing empty cart');
      const emptyCart = { state: { items: [] }, version: 0 };
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(emptyCart));
    }
  } catch (error) {
    console.error('❌ Error migrating cart:', error);
    // Reset cart on error
    const emptyCart = { state: { items: [] }, version: 0 };
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(emptyCart));
  }
};

/**
 * Clear cart and reset to empty nested format
 */
export const resetCart = (): void => {
  const emptyCart = { state: { items: [] }, version: 0 };
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(emptyCart));
  console.log('🗑️ Cart reset to empty');
};

/**
 * Verify cart format
 */
export const verifyCartFormat = (): boolean => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return true;

    const parsed = JSON.parse(stored);
    
    // Check if it's in correct nested format
    if (parsed.state && parsed.state.items && Array.isArray(parsed.state.items)) {
      console.log('✅ Cart format is correct (nested)');
      return true;
    }

    console.error('❌ Cart format is incorrect:', parsed);
    return false;
  } catch (error) {
    console.error('❌ Error verifying cart format:', error);
    return false;
  }
};

// Auto-migrate on import
if (typeof window !== 'undefined') {
  migrateCartStorage();
}
