import { ScrollReveal } from '@/components/shared/ScrollReveal'

const features = [
  {
    title: 'Naturally Cooling',
    description:
      'Merino fibres breathe at a microscopic level, wicking moisture 30% faster than synthetic mesh. Your feet stay dry even at 32°C.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#6B6460"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
  },
  {
    title: 'Machine Washable',
    description:
      'Toss them in on a gentle cycle, air dry overnight. Our proprietary knit construction maintains shape wash after wash.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#6B6460"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.38 5.9A10.02 10.02 0 002.7 9.1M4 14.5a10.02 10.02 0 0017.38-7.4" />
        <path d="M5 14.5L3 14l1.5-1.5" />
        <path d="M19 9.5l2-1-1.5-1.5" />
      </svg>
    ),
  },
  {
    title: 'Odour Resistant',
    description:
      "Natural lanolin and the fibre's complex structure inhibit bacterial growth. Go sock-free — we won't tell.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#6B6460"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
] as const

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-24 md:py-32 lg:py-40 bg-[#F5F0E8]"
      aria-labelledby="features-heading"
    >
      <div className="container mx-auto max-w-[1280px] px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="font-accent text-[0.7rem] tracking-[0.12em] uppercase text-[#B5AFA9] mb-3">
              Why Wool
            </p>
            <h2
              id="features-heading"
              className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-tight"
            >
              Natural Wool Meets Urban Function
            </h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <ScrollReveal key={feat.title} delay={i * 100}>
              <article className="p-10 bg-[#FDFBF8] rounded-xl border border-[#E0D4C2] transition-all duration-300 hover:border-[#D4C4B0] hover:shadow-[0_4px_16px_rgba(61,56,53,0.06)]">
                <div className="w-14 h-14 rounded-xl bg-[#EDE5D8] flex items-center justify-center mb-6 group-hover:bg-[#E0D4C2] transition-colors">
                  {feat.icon}
                </div>
                <h3 className="font-display text-[1.15rem] mb-3">
                  {feat.title}
                </h3>
                <p className="text-[0.9rem] text-[#6B6460] leading-relaxed">
                  {feat.description}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
