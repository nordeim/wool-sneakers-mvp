import { create } from 'zustand'
import type { Toast } from '@/types/ui'

interface UIState {
  isCartOpen: boolean
  isMobileNavOpen: boolean
  isSizeGuideOpen: boolean
  toasts: Toast[]
  openCart: () => void
  closeCart: () => void
  openMobileNav: () => void
  closeMobileNav: () => void
  openSizeGuide: () => void
  closeSizeGuide: () => void
  addToast: (message: string, type: Toast['type']) => void
  removeToast: (id: string) => void
}

export const useUIStore = create<UIState>()((set) => ({
  isCartOpen: false,
  isMobileNavOpen: false,
  isSizeGuideOpen: false,
  toasts: [],

  openCart: () => set({ isCartOpen: true, isMobileNavOpen: false }),
  closeCart: () => set({ isCartOpen: false }),

  openMobileNav: () => set({ isMobileNavOpen: true, isCartOpen: false }),
  closeMobileNav: () => set({ isMobileNavOpen: false }),

  openSizeGuide: () => set({ isSizeGuideOpen: true }),
  closeSizeGuide: () => set({ isSizeGuideOpen: false }),

  addToast: (message, type) =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          message,
          type,
        },
      ],
    })),

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}))
