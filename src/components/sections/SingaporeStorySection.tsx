import { useEffect, useRef, useState } from 'react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

export function SingaporeStorySection() {
  return (
    <section
      id="sg-story"
      className="py-24 md:py-32 lg:py-40 bg-wool-900 text-warm-white relative overflow-hidden"
      aria-labelledby="sg-heading"
    >
      <div
        className="absolute -top-[30%] -right-[20%] w-[60%] h-[160%] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(212,196,176,0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div className="container-custom relative z-[2]">
        <div className="grid grid-cols-1 md:grid-cols-[5fr_4fr] gap-8 md:gap-12">
          <ScrollReveal>
            <div>
              <p className="font-accent text-[0.7rem] tracking-[0.12em] uppercase text-oat-400 mb-3">
                The Singapore Proof
              </p>
              <h2
                id="sg-heading"
                className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-tight text-warm-white mb-6"
              >
                Engineered for{' '}
                <em className="italic text-oat-300">32°C</em>
                <br />
                and 85% Humidity
              </h2>
              <div className="space-y-4 text-wool-100 leading-relaxed">
                <p>
                  Most wool brands are designed for Scandinavian winters. We
                  designed ours for the MRT at 8:47 AM, the walk from Tanjong
                  Pagar to Chinatown, and every hawker centre queue in between.
                </p>
                <p>
                  Our Wool-Air&trade; knit structure creates micro-ventilation
                  channels that allow heat to escape while maintaining the soft,
                  structured silhouette that makes our sneakers look as good at a
                  client dinner as they do on a weekend stroll.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-10">
                {[
                  { value: '18.5', label: 'Micron Fibre' },
                  { value: '30%', label: 'Faster Wicking' },
                  { value: '2.3M', label: 'Steps Tested' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-4 rounded-xl bg-white/[0.04] border border-white/[0.06]"
                  >
                    <div className="font-display text-[2rem] font-light text-oat-300 mb-1">
                      {stat.value}
                    </div>
                    <div className="font-accent text-[0.6rem] tracking-[0.12em] uppercase text-wool-100">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="flex items-center justify-center">
              <ClimateCard />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

function ClimateCard() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const bars = [
    { label: 'Avg. Temperature', value: '32°C', width: '85%' },
    { label: 'Relative Humidity', value: '85%', width: '92%' },
    { label: 'Wool Moisture Wicking', value: '97%', width: '97%' },
  ]

  return (
    <div
      ref={ref}
      className="bg-white/[0.04] border border-white/[0.08] rounded-[20px] p-8 w-full max-w-[360px]"
    >
      <h3 className="font-display text-[1.1rem] text-warm-white mb-6">
        Singapore Climate Profile
      </h3>
      {bars.map((bar) => (
        <div key={bar.label} className="mb-5 last:mb-6">
          <div className="flex justify-between text-[0.8rem] mb-1.5">
            <span className="text-wool-100">{bar.label}</span>
            <span className="font-accent font-semibold text-oat-300">
              {bar.value}
            </span>
          </div>
          <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-linear-to-r from-oat-300 to-oat-400 transition-all duration-[1500ms] ease-out"
              style={{ width: visible ? bar.width : '0%' }}
            />
          </div>
        </div>
      ))}
      <p className="text-[0.78rem] text-wool-100 leading-relaxed pt-5 border-t border-white/[0.06]">
        Our merino wool fibre can absorb up to 35% of its weight in moisture
        before feeling wet — keeping your feet comfortable even in tropical
        conditions.
      </p>
    </div>
  )
}
