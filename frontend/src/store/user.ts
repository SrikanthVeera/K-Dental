import { create } from 'zustand'
import type { User } from '@/lib/types'

type UserState = {
  user: User | null
  login: (user: User) => void
  logout: () => void
  toggleWishlist: (productId: string) => void
}

export const useUser = create<UserState>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  toggleWishlist: (productId) => set(state => {
    if (!state.user) return state
    const exists = state.user.wishlist.includes(productId)
    const wishlist = exists
      ? state.user.wishlist.filter(id => id !== productId)
      : [...state.user.wishlist, productId]
    return { user: { ...state.user, wishlist } }
  })
}))
