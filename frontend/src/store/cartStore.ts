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
        const items = get().items;
        const existingItem = items.find(item => item.id === product.id);

        if (existingItem) {
          // Increase quantity if item already exists
          set({
            items: items.map(item =>
              item.id === product.id
                ? { ...item, quantity: Math.min(item.quantity + 1, item.maxQuantity || 10) }
                : item
            )
          });
        } else {
          // Add new item
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
      partialize: (state) => ({ items: state.items })
    }
  )
);