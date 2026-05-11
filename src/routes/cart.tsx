import { Link } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import { useCartStore, selectCartSubtotal, selectCartIsEmpty } from '@/stores/cart'
import { formatPrice } from '@/lib/format'

export const Route = createFileRoute('/cart')({
  component: CartPage,
})

function CartPage() {
  const items = useCartStore((s) => s.items)
  const isEmpty = useCartStore(selectCartIsEmpty)
  const subtotal = useCartStore(selectCartSubtotal)
  const updateQty = useCartStore((s) => s.updateQty)
  const removeItem = useCartStore((s) => s.removeItem)
  const clearCart = useCartStore((s) => s.clearCart)

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto max-w-[900px] px-6">
        <h1 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-tight mb-10">
          Your Cart
        </h1>
        {isEmpty ? (
          <div className="text-center py-20">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C5C0B8"
              strokeWidth="1"
              className="mx-auto mb-6"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <p className="text-wool-500 text-lg mb-6">Your cart is empty</p>
            <Link
              to="/products"
              className="inline-block bg-wool-900 text-warm-white font-accent text-xs tracking-widest uppercase font-medium rounded-full px-8 py-3.5 hover:bg-wool-700 transition-colors"
            >
              Browse Collection
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-0">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.color}-${item.size}`}
                  className="flex gap-5 py-6 border-b border-oat-200"
                >
                  <div
                    className="w-[100px] h-[100px] rounded-lg shrink-0"
                    style={{ background: item.gradient }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <Link
                        to="/products/$slug"
                        params={{ slug: item.slug }}
                        className="font-display text-[1.1rem] hover:text-wool-500 transition-colors"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() =>
                          removeItem(item.productId, item.color, item.size)
                        }
                        className="p-1 text-wool-100 hover:text-red-500 transition-colors"
                        aria-label={`Remove ${item.name}`}
                      >
                        <svg
                          width="16"
                          height="16"
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
                    <p className="text-[0.8rem] text-wool-100 mb-3">
                      {item.color} &middot; {item.size}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-oat-200 rounded-md overflow-hidden">
                        <button
                          onClick={() =>
                            updateQty(
                              item.productId,
                              item.color,
                              item.size,
                              -1
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center text-wool-900 hover:bg-oat-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </button>
                        <span className="w-10 text-center font-accent text-sm font-medium border-x border-oat-200 leading-[32px]">
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
                          className="w-8 h-8 flex items-center justify-center text-wool-900 hover:bg-oat-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <svg
                            width="14"
                            height="14"
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
                      <span className="font-accent text-[1rem] font-medium">
                        {formatPrice(item.price * item.qty)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-cream rounded-xl p-8">
              <div className="flex justify-between mb-2">
                <span className="text-wool-500">Subtotal</span>
                <span className="font-accent font-semibold text-lg">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between mb-6">
                <span className="text-wool-100 text-sm">Shipping</span>
                <span className="text-oat-400 font-accent font-medium text-sm">
                  Free
                </span>
              </div>
              <div className="flex gap-4">
                <Link
                  to="/checkout"
                  className="flex-1 bg-wool-900 text-warm-white font-accent text-xs tracking-widest uppercase font-medium rounded-full py-4 text-center hover:bg-wool-700 transition-colors"
                >
                  Checkout
                </Link>
                <button
                  onClick={clearCart}
                  className="font-accent text-xs tracking-widest uppercase font-medium text-wool-500 border border-fog-200 rounded-full px-6 py-4 hover:border-wool-500 hover:text-wool-900 transition-all"
                >
                  Clear
                </button>
              </div>
              <p className="text-[0.75rem] text-wool-100 mt-4 text-center">
                Free 30-day returns &middot; 2-year warranty
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
