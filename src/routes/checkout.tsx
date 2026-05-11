import { createFileRoute, Link } from '@tanstack/react-router'
import { useActionState } from 'react'
import { useCartStore, selectCartSubtotal } from '@/stores/cart'
import { formatPrice } from '@/lib/format'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { checkoutSchema } from '@/lib/schemas'

interface CheckoutState {
  readonly step: 'shipping' | 'confirmation'
  readonly error: string
}

export const Route = createFileRoute('/checkout')({
  component: CheckoutPage,
})

function CheckoutPage() {
  const isEmpty = useCartStore((s) => s.items.length === 0)
  const subtotal = useCartStore(selectCartSubtotal)

  if (isEmpty) {
    return (
      <div className="py-24 text-center">
        <div className="container-custom">
          <h1 className="font-display text-[clamp(2rem,4vw,3rem)] mb-4">
            Your cart is empty
          </h1>
          <p className="text-wool-500 mb-8">
            Add some sneakers before checking out.
          </p>
          <Link to="/products">
            <Button size="lg">Browse Collection</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto max-w-[640px] px-6">
        <h1 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-tight mb-2">
          Checkout
        </h1>
        <p className="text-wool-500 mb-10">
          Subtotal:{' '}
          <span className="font-accent font-semibold text-wool-900">
            {formatPrice(subtotal)}
          </span>
          <span className="text-oat-400 ml-2">+ Free shipping</span>
        </p>
        <CheckoutForm />
      </div>
    </div>
  )
}

function CheckoutForm() {
  const clearCart = useCartStore((s) => s.clearCart)

  const [state, formAction, isPending] = useActionState<CheckoutState, FormData>(
    async (_prev: CheckoutState, formData: FormData): Promise<CheckoutState> => {
      const data = Object.fromEntries(formData) as Record<string, string>
      const result = checkoutSchema.safeParse({
        fullName: data.fullName,
        email: data.email,
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
      })
      if (!result.success) {
        return { step: 'shipping', error: result.error.issues[0].message }
      }
      await new Promise((r) => setTimeout(r, 2000))
      clearCart()
      return { step: 'confirmation', error: '' }
    },
    { step: 'shipping', error: '' }
  )

  if (state.step === 'confirmation') {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-oat-100 flex items-center justify-center mx-auto mb-6">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6B6460"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="font-display text-[2rem] mb-3">Order Confirmed!</h2>
        <p className="text-wool-500 mb-8 max-w-[400px] mx-auto">
          Thank you for your order. You&apos;ll receive a confirmation email
          shortly with tracking details.
        </p>
        <Link to="/">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-8">
      <div>
        <h2 className="font-accent text-[0.7rem] tracking-widest uppercase text-wool-500 mb-6">
          Shipping Information
        </h2>
        <div className="space-y-4">
          <Input
            label="Full Name"
            name="fullName"
            placeholder="Jamie Tan"
            required
            disabled={isPending}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="jamie@example.com"
            required
            disabled={isPending}
            autoComplete="email"
          />
          <Input
            label="Address"
            name="address"
            placeholder="123 Tiong Bahru Road, #04-56"
            required
            disabled={isPending}
            autoComplete="street-address"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="City"
              name="city"
              placeholder="Singapore"
              required
              disabled={isPending}
              defaultValue="Singapore"
              autoComplete="address-level2"
            />
            <Input
              label="Postal Code"
              name="postalCode"
              placeholder="158742"
              required
              disabled={isPending}
              autoComplete="postal-code"
            />
          </div>
        </div>
      </div>
      <div>
        <h2 className="font-accent text-[0.7rem] tracking-widest uppercase text-wool-500 mb-6">
          Payment Method
        </h2>
        <div className="bg-cream rounded-xl border border-oat-200 p-6">
          <p className="text-[0.85rem] text-wool-500">
            This is a demo store. No real payment will be processed. Click
            &ldquo;Place Order&rdquo; to simulate checkout.
          </p>
        </div>
      </div>
      {state.error && (
        <p
          className="text-red-600 text-sm font-accent"
          role="alert"
        >
          {state.error}
        </p>
      )}
      <Button
        type="submit"
        size="lg"
        className="w-full !rounded-lg"
        isLoading={isPending}
      >
        Place Order
      </Button>
      <p className="text-[0.7rem] text-wool-100 text-center">
        By placing this order, you agree to our terms of service. This is a
        simulated checkout.
      </p>
    </form>
  )
}
