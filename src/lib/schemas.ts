import { z } from 'zod'

// ── Newsletter ──────────────────────────────
export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address.'),
})

export type NewsletterInput = z.infer<typeof newsletterSchema>

// ── Checkout ────────────────────────────────
export const checkoutSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Please keep your name under 100 characters.'),
  email: z
    .string()
    .email('Please enter a valid email address.'),
  address: z
    .string()
    .min(5, 'Please enter a complete address.'),
  city: z
    .string()
    .min(1, 'City is required.'),
  postalCode: z
    .string()
    .regex(/^\d{3,6}$/, 'Please enter a valid postal code.'),
})

export type CheckoutInput = z.infer<typeof checkoutSchema>
