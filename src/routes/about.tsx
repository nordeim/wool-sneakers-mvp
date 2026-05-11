import { Link } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="py-24 md:py-32">
      <div className="container-custom max-w-[720px]">
        <ScrollReveal>
          <p className="font-accent text-[0.7rem] tracking-[0.12em] uppercase text-wool-100 mb-3">
            Our Story
          </p>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.15] tracking-tight mb-8">
            Wool, born from<br />
            <em className="italic text-oat-500">necessity</em>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="space-y-6 text-wool-500 leading-relaxed text-[1.05rem]">
            <p>
              In 2022, our founder was walking through Orchard Road in July. The
              sneakers were synthetic. The feet were suffocating. The question was
              obvious:{' '}
              <strong className="text-wool-900 font-medium">
                why isn&apos;t anyone making wool sneakers for tropical cities?
              </strong>
            </p>
            <p>
              The answer was more complex than expected. Merino wool had been
              optimised for cold climates for decades. Every supplier, every
              knitting technique, every test was designed for Scandinavia, not
              Singapore.
            </p>
            <p>
              So we started from scratch. Two years of R&amp;D, 47 prototype
              iterations, and a partnership with New Zealand&apos;s finest merino
              farms later, MĀMĀ was born &mdash; the world&apos;s first wool
              sneaker brand designed specifically for tropical urban living.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="mt-10 flex gap-4">
            <Link to="/products">
              <Button size="lg">Shop Collection</Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
