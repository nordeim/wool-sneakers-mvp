import { Link } from '@tanstack/react-router'
import { SneakerSVG } from '@/components/shared/SneakerSVG'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section
      className="relative min-h-[calc(100vh-112px)] flex items-center overflow-hidden"
      style={{
        background:
          'linear-gradient(170deg, #F7F4F0 0%, #F5F0E8 30%, #EDE5D8 60%, #E8E5E0 100%)',
      }}
      aria-labelledby="hero-heading"
    >
      <div
        className="absolute -top-[20%] -right-[10%] w-[60%] h-[120%] opacity-60 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, #E0D4C2 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div className="container-custom relative z-[2] max-w-[640px] py-16 md:py-0">
        <p className="font-accent text-[0.7rem] tracking-[0.12em] uppercase text-wool-100 mb-4">
          Singapore-Born Wool Sneakers
        </p>
        <h1
          id="hero-heading"
          className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.15] tracking-tight mb-6"
        >
          Wool, <em className="italic text-oat-500">Reimagined</em>
          <br />
          for the City
        </h1>
        <p className="text-[1.1rem] leading-relaxed text-wool-500 max-w-[480px] mb-8">
          Where natural merino meets modern stride. Engineered for tropical
          warmth, crafted for urban style. The sneaker your feet have been
          waiting for.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/products">
            <Button size="lg">Shop Collection</Button>
          </Link>
          <Link to="/about">
            <Button variant="secondary" size="lg">
              Our Story
            </Button>
          </Link>
        </div>
      </div>
      <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[50%] max-w-[600px] opacity-[0.12] pointer-events-none hidden md:block">
        <SneakerSVG variant="low" />
      </div>
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 hover:opacity-70 transition-opacity"
        aria-hidden="true"
      >
        <span className="font-accent text-[0.6rem] tracking-[0.15em] uppercase text-wool-100">
          Scroll
        </span>
        <div className="w-px h-10 bg-linear-to-b from-wool-100 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
