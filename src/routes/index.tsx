import { createFileRoute } from '@tanstack/react-router'
import { HeroSection } from '@/components/sections/HeroSection'
import { BrandStorySection } from '@/components/sections/BrandStorySection'
import { ProductGrid } from '@/components/sections/ProductGrid'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { SingaporeStorySection } from '@/components/sections/SingaporeStorySection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { NewsletterSection } from '@/components/sections/NewsletterSection'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandStorySection />
      <ProductGrid />
      <FeaturesSection />
      <SingaporeStorySection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  )
}
