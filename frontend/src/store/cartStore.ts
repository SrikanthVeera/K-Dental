import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  mrp: number;
  image: string;
  brand: string;
  category: string;
  quantity: number;
  inStock: boolean;
  maxQuantity?: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  
  // Actions
  addItem: (product: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  
  // Computed values
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getTotalMRP: () => number;
  getTotalSavings: () => number;
  getItemById: (id: number) => CartItem | undefined;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product) => {
        // Validate product ID
        if (!product || product.id === undefined || product.id === null) {
          console.error('❌ Product ID missing, cannot add to cart', product);
          return;
        }

        const items = get().items;
        const existingItem = items.find(item => item.id === product.id);

        if (existingItem) {
          // Increase quantity if item already exists
          console.log('✅ Product exists, increasing quantity');
          set({
            items: items.map(item =>
              item.id === product.id
                ? { ...item, quantity: Math.min(item.quantity + 1, item.maxQuantity || 10) }
                : item
            )
          });
        } else {
          // Add new item
          console.log('✅ Adding new product to cart');
          set({
            items: [...items, { ...product, quantity: 1 }]
          });
        }
      },

      removeItem: (id) => {
        set({
          items: get().items.filter(item => item.id !== id)
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set({
          items: get().items.map(item =>
            item.id === id
              ? { ...item, quantity: Math.min(quantity, item.maxQuantity || 10) }
              : item
          )
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set({ isOpen: !get().isOpen });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      getTotalMRP: () => {
        return get().items.reduce((total, item) => total + (item.mrp * item.quantity), 0);
      },

      getTotalSavings: () => {
        return get().getTotalMRP() - get().getTotalPrice();
      },

      getItemById: (id) => {
        return get().items.find(item => item.id === id);
      }
    }),
    {
      name: 'dental-cart-storage',
      // ✅ Custom storage to use nested structure { state: { items: [] }, version: 0 }
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          
          try {
            const parsed = JSON.parse(str);
            
            // Handle nested format: { state: { items: [] }, version: 0 }
            if (parsed.state && parsed.state.items) {
              return { state: { items: parsed.state.items, isOpen: false } };
            }
            // Handle flat format and convert to nested
            else if (parsed.items) {
              return { state: { items: parsed.items, isOpen: false } };
            }
            // Initialize empty cart
            return { state: { items: [], isOpen: false } };
          } catch (e) {
            console.error('Failed to parse cart from localStorage:', e);
            return { state: { items: [], isOpen: false } };
          }
        },
        setItem: (name, value) => {
          try {
            // ✅ Save in nested format: { state: { items: [] }, version: 0 }
            const items = value.state.items;
            const cart = {
              state: {
                items: items
              },
              version: 0
            };
            localStorage.setItem(name, JSON.stringify(cart));
            console.log('💾 Cart saved to localStorage (nested format):', items.length, 'items');
          } catch (e) {
            console.error('Failed to save cart to localStorage:', e);
          }
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        }
      }
    }
  )
);