import { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { useCartStore, selectCartSubtotal, selectCartIsEmpty } from '@/stores/cart'
import { useUIStore } from '@/stores/ui'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { formatPrice } from '@/lib/format'
import { cn } from '@/lib/utils'

export function CartSlidePanel() {
  const isOpen = useUIStore((s) => s.isCartOpen)
  const close = useUIStore((s) => s.closeCart)
  const panelRef = useRef<HTMLDivElement>(null)

  useFocusTrap(isOpen, panelRef)

  return (
    <div
      className={cn(
        'fixed inset-0 z-[300] transition-all duration-300',
        isOpen
          ? 'pointer-events-auto visible'
          : 'pointer-events-none invisible'
      )}
      role="dialog"
      aria-label="Shopping cart"
      aria-hidden={!isOpen}
    >
      <div
        className={cn(
          'absolute inset-0 bg-wool-900/35 backdrop-blur-sm transition-opacity',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={close}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        className={cn(
          'absolute top-0 right-0 w-[min(420px,90vw)] h-full bg-warm-white',
          'flex flex-col transition-transform duration-500 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <CartPanelContent close={close} />
      </div>
    </div>
  )
}

function CartPanelContent({ close }: { close: () => void }) {
  const items = useCartStore((s) => s.items)
  const isEmpty = useCartStore(selectCartIsEmpty)
  const subtotal = useCartStore(selectCartSubtotal)
  const count = items.reduce((sum, i) => sum + i.qty, 0)
  const updateQty = useCartStore((s) => s.updateQty)
  const removeItem = useCartStore((s) => s.removeItem)

  return (
    <>
      <div className="flex items-center justify-between px-6 py-5 border-b border-oat-200">
        <h3 className="font-display text-[1.1rem]">
          Your Cart
        </h3>
        <button
          onClick={close}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-oat-100 transition-colors"
          aria-label="Close cart"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3D3835"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-wool-100">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C5C0B8"
              strokeWidth="1"
              className="mb-4"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <p className="text-[0.9rem] mb-4">Your cart is empty</p>
            <button
              onClick={close}
              className="font-accent text-xs tracking-widest uppercase text-wool-500 border border-fog-200 rounded-full px-5 py-2.5 hover:border-wool-500 hover:text-wool-900 transition-all"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-0">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.color}-${item.size}`}
                className="flex gap-4 py-4 border-b border-oat-50"
              >
                <div
                  className="w-[72px] h-[72px] rounded-md shrink-0"
                  style={{ background: item.gradient }}
                />
                <div className="flex-1 flex flex-col justify-center">
                  <div className="font-display text-[0.95rem]">
                    {item.name}
                  </div>
                  <div className="text-[0.75rem] text-wool-100 mb-1.5">
                    {item.color} &middot; {item.size}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-fog-200 rounded-md overflow-hidden">
                      <button
                        onClick={() =>
                          updateQty(
                            item.productId,
                            item.color,
                            item.size,
                            -1
                          )
                        }
                        className="w-7 h-7 flex items-center justify-center text-wool-500 hover:bg-oat-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </button>
                      <span className="w-8 text-center font-accent text-[0.75rem] font-medium border-x border-fog-200 leading-[28px]">
                        {item.qty}
                      </span>
                      <button
                        onClick={() =>
                          updateQty(
                            item.productId,
                            item.color,
                            item.size,
                            1
                          )
                        }
                        className="w-7 h-7 flex items-center justify-center text-wool-500 hover:bg-oat-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </button>
                    </div>
                    <span className="font-accent text-[0.85rem] font-medium">
                      {formatPrice(item.price * item.qty)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() =>
                    removeItem(item.productId, item.color, item.size)
                  }
                  className="self-start p-1 text-wool-100 hover:text-red-500 transition-colors"
                  aria-label={`Remove ${item.name}`}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {!isEmpty && (
        <div className="px-6 py-5 border-t border-oat-200 bg-cream">
          <div className="flex justify-between mb-1.5 text-[0.9rem]">
            <span className="text-wool-500">Subtotal</span>
            <span className="font-accent font-semibold">
              {formatPrice(subtotal)}
            </span>
          </div>
          <div className="flex justify-between mb-4 text-[0.8rem]">
            <span className="text-wool-100">Shipping</span>
            <span className="text-oat-400 font-accent font-medium">
              Free
            </span>
          </div>
          <div className="flex gap-3">
            <Link
              to="/cart"
              onClick={close}
              className="flex-1 font-accent text-[0.7rem] tracking-widest uppercase font-medium text-wool-900 border border-fog-200 rounded-full py-3 text-center hover:border-wool-500 transition-all"
            >
              View Cart
            </Link>
            <Link
              to="/checkout"
              onClick={close}
              className="flex-1 bg-wool-900 text-warm-white font-accent text-[0.7rem] tracking-widest uppercase font-medium rounded-full py-3 text-center hover:bg-wool-700 transition-colors"
            >
              Checkout
            </Link>
          </div>
          <p className="text-[0.7rem] text-wool-100 mt-2 text-center">
            {count} {count === 1 ? 'item' : 'items'} in cart
          </p>
        </div>
      )}
    </>
  )
}
