import { describe, it, expect, beforeEach } from 'vitest'
import { act } from '@testing-library/react'
import { type CartItem } from '@/types/cart'
import {
  useCartStore,
  selectCartSubtotal,
  selectCartCount,
  selectCartIsEmpty,
} from '@/stores/cart'

function mockItem(overrides: Partial<CartItem> = {}): CartItem {
  return {
    productId: '1',
    slug: 'merino-runner',
    name: 'The Merino Runner',
    price: 18900,
    color: 'Natural Oat',
    colorHex: '#E0D4C2',
    size: 'EU 40',
    qty: 1,
    gradient: 'linear-gradient(#fff, #eee)',
    ...overrides,
  }
}

describe('useCartStore', () => {
  beforeEach(() => {
    act(() => useCartStore.getState().clearCart())
  })

  it('adds a new item', () => {
    act(() => {
      useCartStore.getState().addItem(mockItem())
    })
    expect(useCartStore.getState().items).toHaveLength(1)
  })

  it('increments qty if same product/color/size', () => {
    act(() => {
      useCartStore.getState().addItem(mockItem())
      useCartStore.getState().addItem(mockItem())
    })
    expect(useCartStore.getState().items[0].qty).toBe(2)
  })

  it('creates separate line items for different colors', () => {
    act(() => {
      useCartStore.getState().addItem(mockItem({ color: 'Oat' }))
      useCartStore.getState().addItem(mockItem({ color: 'Gray' }))
    })
    expect(useCartStore.getState().items).toHaveLength(2)
  })

  it('removes a specific line item', () => {
    act(() => {
      useCartStore.getState().addItem(mockItem({ productId: '1', color: 'A', size: '40' }))
      useCartStore.getState().addItem(mockItem({ productId: '2', color: 'B', size: '40' }))
    })
    act(() => useCartStore.getState().removeItem('1', 'A', '40'))
    expect(useCartStore.getState().items).toHaveLength(1)
    expect(useCartStore.getState().items[0].productId).toBe('2')
  })

  it('calculates subtotal correctly', () => {
    act(() => {
      useCartStore.getState().addItem(mockItem({ price: 18900, qty: 2 }))
      useCartStore.getState().addItem(mockItem({ productId: '2', price: 21900, qty: 1 }))
    })
    expect(selectCartSubtotal(useCartStore.getState())).toBe(18900 * 2 + 21900)
  })

  it('calculates item count', () => {
    act(() => useCartStore.getState().addItem(mockItem({ qty: 3 })))
    expect(selectCartCount(useCartStore.getState())).toBe(3)
  })

  it('reports empty state', () => {
    expect(selectCartIsEmpty(useCartStore.getState())).toBe(true)
    act(() => useCartStore.getState().addItem(mockItem()))
    expect(selectCartIsEmpty(useCartStore.getState())).toBe(false)
  })

  it('updates quantity and removes if zero', () => {
    act(() => useCartStore.getState().addItem(mockItem({ qty: 2 })))
    act(() =>
      useCartStore.getState().updateQty('1', 'Natural Oat', 'EU 40', -1)
    )
    expect(useCartStore.getState().items[0].qty).toBe(1)
    act(() =>
      useCartStore.getState().updateQty('1', 'Natural Oat', 'EU 40', -1)
    )
    expect(useCartStore.getState().items).toHaveLength(0)
  })

  it('clears cart', () => {
    act(() => {
      useCartStore.getState().addItem(mockItem())
      useCartStore.getState().clearCart()
    })
    expect(useCartStore.getState().items).toHaveLength(0)
  })
})
