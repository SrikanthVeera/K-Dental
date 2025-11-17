import { create } from "zustand";
import type { Product } from "../mock/data";

type CartItem = { product: Product; qty: number; variant?: string };

type CartState = {
  items: CartItem[];
  add: (product: Product, qty?: number, variant?: string) => void;
  remove: (slug: string, variant?: string) => void;
  clear: () => void;
  total: () => number;
};

export const useCart = create<CartState>((set, get) => ({
  items: [],
  add: (product, qty = 1, variant) =>
    set(state => {
      const idx = state.items.findIndex(
        i => i.product.slug === product.slug && i.variant === variant
      );
      if (idx >= 0) {
        const copy = [...state.items];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
        return { items: copy };
      }
      return { items: [...state.items, { product, qty, variant }] };
    }),
  remove: (slug, variant) =>
    set(state => ({
      items: state.items.filter(i => !(i.product.slug === slug && i.variant === variant))
    })),
  clear: () => set({ items: [] }),
  total: () => get().items.reduce((sum, i) => sum + i.product.price * i.qty, 0)
}));
