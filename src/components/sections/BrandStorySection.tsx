import { Link } from '@tanstack/react-router'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/button'

export function BrandStorySection() {
  return (
    <section
      id="about"
      className="py-24 md:py-32 lg:py-40 bg-[#FDFBF8]"
      aria-labelledby="brand-heading"
    >
      <div className="container mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <ScrollReveal>
            <div
              className="relative aspect-[4/5] rounded-[20px] overflow-hidden"
              style={{
                background:
                  'linear-gradient(135deg, #EDE5D8 0%, #E0D4C2 40%, #D8D4CE 100%)',
              }}
            >
              <svg
                viewBox="0 0 400 500"
                className="absolute inset-0 w-full h-full opacity-[0.08]"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="wool"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M0 10 Q5 5 10 10 Q15 15 20 10"
                      stroke="#3D3835"
                      strokeWidth="0.5"
                      fill="none"
                    />
                    <path
                      d="M0 20 Q5 15 10 20 Q15 25 20 20"
                      stroke="#3D3835"
                      strokeWidth="0.3"
                      fill="none"
                      opacity="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="400" height="500" fill="url(#wool)" />
              </svg>
              <span className="absolute bottom-8 left-6 font-accent text-[0.6rem] tracking-[0.15em] uppercase text-[#6B6460] opacity-60">
                Merino Wool Fibre &middot; 18.5&mu;m
              </span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div>
              <p className="font-accent text-[0.7rem] tracking-[0.12em] uppercase text-[#B5AFA9] mb-3">
                Our Philosophy
              </p>
              <h2
                id="brand-heading"
                className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-tight mb-6"
              >
                Born from the belief that comfort should never compromise style
              </h2>
              <div className="space-y-4 text-[#6B6460] leading-relaxed">
                <p>
                  <strong className="text-[#3D3835] font-medium">MĀMĀ</strong>{' '}
                  was born in Singapore &mdash; a city where tropical heat meets
                  urban ambition. We asked a simple question: why should you
                  choose between the breathability of wool and the functionality
                  of a modern sneaker?
                </p>
                <p>
                  Our merino wool is sourced from certified farms in New Zealand,
                  then engineered into knit uppers that breathe, wick, and adapt
                  to your environment. Each pair is designed in Singapore and
                  tested in the humidity we know best.
                </p>
                <p>
                  The result: a sneaker that{' '}
                  <strong className="text-[#3D3835] font-medium">
                    feels like a cloud
                  </strong>{' '}
                  and{' '}
                  <strong className="text-[#3D3835] font-medium">
                    looks like it belongs
                  </strong>{' '}
                  &mdash; on the MRT, at a meeting, or wandering through Tiong
                  Bahru on a Sunday morning.
                </p>
              </div>
              <div className="mt-4">
                <Link to="/about">
                  <Button variant="secondary" size="sm">
                    Read Our Full Story
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
