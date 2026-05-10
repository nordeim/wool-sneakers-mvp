import { useActionState, useState } from 'react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { newsletterSchema } from '@/lib/schemas'

interface FormState {
  readonly message: string
  readonly type: 'idle' | 'success' | 'error'
}

export function NewsletterSection() {
  const [email, setEmail] = useState('')

  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (_prevState: FormState, formData: FormData): Promise<FormState> => {
      const data = Object.fromEntries(formData) as Record<string, string>
      const result = newsletterSchema.safeParse({ email: data.email })
      if (!result.success) {
        return { message: result.error.issues[0].message, type: 'error' }
      }
      await new Promise((r) => setTimeout(r, 1000))
      return {
        message: 'Welcome to the flock! Check your inbox.',
        type: 'success',
      }
    },
    { message: '', type: 'idle' }
  )

  return (
    <section
      id="journal"
      className="py-24 md:py-32 lg:py-40 text-center relative overflow-hidden"
      style={{
        background:
          'linear-gradient(170deg, #E0D4C2 0%, #D4C4B0 50%, #D8D4CE 100%)',
      }}
      aria-labelledby="cta-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(61,56,53,0.01) 5px, rgba(61,56,53,0.01) 10px)`,
        }}
        aria-hidden="true"
      />
      <div className="container mx-auto max-w-[1280px] px-6 relative z-[2]">
        <ScrollReveal>
          <p className="font-accent text-[0.7rem] tracking-[0.12em] uppercase text-[#8C8580] mb-3">
            Stay in the Loop
          </p>
          <h2
            id="cta-heading"
            className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-tight mb-4"
          >
            Step Into Comfort
          </h2>
          <p className="text-[#6B6460] max-w-[420px] mx-auto mb-8">
            Be the first to know about new drops, Singapore-exclusive
            colourways, and the science behind our wool.
          </p>
          <form
            action={formAction}
            className="flex flex-col sm:flex-row gap-3 max-w-[440px] mx-auto"
          >
            <label htmlFor="cta-email" className="sr-only">
              Email address
            </label>
            <Input
              id="cta-email"
              name="email"
              type="email"
              placeholder="your@email.com"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 !bg-white/10 !border-white/20 !text-[#3D3835] !placeholder-[#B5AFA9] focus:!border-[#C5B49A]"
              disabled={isPending}
            />
            <Button type="submit" size="sm" isLoading={isPending}>
              Subscribe
            </Button>
          </form>
          {state.type !== 'idle' && (
            <p
              className={`mt-4 text-sm font-accent ${
                state.type === 'error'
                  ? 'text-red-600'
                  : 'text-[#3D3835]'
              }`}
              role="status"
              aria-live="polite"
            >
              {state.message}
            </p>
          )}
        </ScrollReveal>
      </div>
    </section>
  )
}
