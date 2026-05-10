import { ScrollReveal } from '@/components/shared/ScrollReveal'

const testimonials = [
  {
    quote:
      "I was sceptical about wool sneakers in Singapore. After one week, I donated all my other shoes. These are genuinely the most comfortable things I've ever worn.",
    name: 'Jamie Tan',
    role: 'Product Designer · Tiong Bahru',
    initials: 'J',
    bg: 'bg-[#D4C4B0]',
  },
  {
    quote:
      'I wear The Merino Runner to client meetings and then walk 10K steps after work. No break-in period, no blisters, no odour. It\'s almost unfair.',
    name: 'Rishi Kapoor',
    role: 'Consultant · Marina Bay',
    initials: 'R',
    bg: 'bg-[#A8A29E]',
  },
  {
    quote:
      'The Tropical is my go-to for hawker centre hopping. Breathable, easy to clean after a chili mishap, and they still look sharp.',
    name: 'Lim Wei Ling',
    role: 'Architect · Telok Ayer',
    initials: 'L',
    bg: 'bg-[#C5B49A]',
  },
] as const

export function TestimonialsSection() {
  return (
    <section
      className="py-24 md:py-32 lg:py-40 bg-[#FDFBF8]"
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto max-w-[1280px] px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="font-accent text-[0.7rem] tracking-[0.12em] uppercase text-[#B5AFA9] mb-3">
              What Singapore Says
            </p>
            <h2
              id="testimonials-heading"
              className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-tight"
            >
              Trusted by 12,000+ Pairs of Feet
            </h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 100}>
              <article className="p-8 bg-[#F7F4F0] rounded-xl border border-[#E0D4C2]">
                <div className="flex gap-0.5 mb-4" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg
                      key={j}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="#C5B49A"
                      stroke="#C5B49A"
                      strokeWidth="0.5"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <blockquote className="font-display text-[1.05rem] italic leading-relaxed text-[#6B6460] mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-display text-[0.85rem] font-medium text-[#F7F4F0] ${t.bg}`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <strong className="block font-semibold text-[0.85rem]">
                      {t.name}
                    </strong>
                    <span className="text-[#B5AFA9] text-[0.75rem]">
                      {t.role}
                    </span>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
