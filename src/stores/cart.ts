import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@/types/cart'

interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string, color: string, size: string) => void
  updateQty: (
    productId: string,
    color: string,
    size: string,
    delta: number
  ) => void
  clearCart: () => void
}

function itemKey(productId: string, color: string, size: string): string {
  return `${productId}-${color}-${size}`
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const key = itemKey(item.productId, item.color, item.size)
          const exists = state.items.find(
            (i) => itemKey(i.productId, i.color, i.size) === key
          )
          if (exists) {
            return {
              items: state.items.map((i) =>
                itemKey(i.productId, i.color, i.size) === key
                  ? { ...i, qty: i.qty + item.qty }
                  : i
              ),
            }
          }
          return { items: [...state.items, item] }
        }),

      removeItem: (productId, color, size) =>
        set((state) => ({
          items: state.items.filter(
            (i) =>
              itemKey(i.productId, i.color, i.size) !==
              itemKey(productId, color, size)
          ),
        })),

      updateQty: (productId, color, size, delta) =>
        set((state) => {
          const key = itemKey(productId, color, size)
          const updated = state.items.map((i) =>
            itemKey(i.productId, i.color, i.size) === key
              ? { ...i, qty: i.qty + delta }
              : i
          )
          return { items: updated.filter((i) => i.qty > 0) }
        }),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'mama-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
)

export const selectCartSubtotal = (state: CartState): number =>
  state.items.reduce((sum, item) => sum + item.price * item.qty, 0)

export const selectCartCount = (state: CartState): number =>
  state.items.reduce((sum, item) => sum + item.qty, 0)

export const selectCartIsEmpty = (state: CartState): boolean =>
  state.items.length === 0
