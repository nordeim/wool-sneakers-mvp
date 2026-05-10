import { describe, it, expect } from 'vitest'
import { useUIStore } from '@/stores/ui'
import type { ToastType } from '@/types/ui'

describe('useUIStore', () => {
  it('opens and closes the cart', () => {
    useUIStore.getState().openCart()
    expect(useUIStore.getState().isCartOpen).toBe(true)
    useUIStore.getState().closeCart()
    expect(useUIStore.getState().isCartOpen).toBe(false)
  })

  it('opens and closes the mobile nav', () => {
    useUIStore.getState().openMobileNav()
    expect(useUIStore.getState().isMobileNavOpen).toBe(true)
    useUIStore.getState().closeMobileNav()
    expect(useUIStore.getState().isMobileNavOpen).toBe(false)
  })

  it('closes cart when opening mobile nav', () => {
    useUIStore.getState().openCart()
    useUIStore.getState().openMobileNav()
    expect(useUIStore.getState().isCartOpen).toBe(false)
    expect(useUIStore.getState().isMobileNavOpen).toBe(true)
  })

  it('adds and removes toasts', () => {
    useUIStore.getState().addToast('Hello world', 'success' as ToastType)
    const toasts = useUIStore.getState().toasts
    expect(toasts).toHaveLength(1)
    const toastId = toasts[0].id
    useUIStore.getState().removeToast(toastId)
    expect(useUIStore.getState().toasts).toHaveLength(0)
  })
})
