import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { products, sortProducts, type SortOption } from '@/lib/products'
import { formatPrice } from '@/lib/format'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { SneakerSVG } from '@/components/shared/SneakerSVG'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/products/')({
  component: ProductsPage,
})

function ProductsPage() {
  const [sortBy, setSortBy] = useState<SortOption>('featured')
  const sorted = sortProducts(products, sortBy)

  return (
    <div className="py-24 md:py-32">
      <div className="container-custom">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="font-accent text-[0.7rem] tracking-[0.12em] uppercase text-wool-100 mb-3">
              The Collection
            </p>
            <h1 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-tight mb-4">
              All Sneakers
            </h1>
            <p className="text-wool-500 max-w-[480px] mx-auto">
              Merino wool sneakers designed for the way you actually live.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex justify-end mb-8">
          <label htmlFor="sort" className="sr-only">
            Sort by
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="font-accent text-xs tracking-widest uppercase text-wool-500 bg-oat-50 border border-oat-200 rounded-full px-4 py-2 outline-hidden focus:border-oat-400"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((prod, i) => (
            <ScrollReveal key={prod.id} delay={i * 80}>
              <Link
                to="/products/$slug"
                params={{ slug: prod.slug }}
                className="group block relative rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(61,56,53,0.10)]"
              >
                <div
                  className="relative aspect-square flex items-center justify-center overflow-hidden"
                  style={{ background: prod.gradient }}
                >
                  {prod.tag && (
                    <Badge
                      variant={
                        prod.tag === 'SG Exclusive' ? 'exclusive' : 'default'
                      }
                    >
                      {prod.tag}
                    </Badge>
                  )}
                  <SneakerSVG
                    accentColor={prod.svgAccentColor}
                    variant={
                      prod.category === 'mid-top'
                        ? 'mid'
                        : prod.category === 'high-top'
                          ? 'high'
                          : prod.category === 'slip-on'
                            ? 'slip-on'
                            : 'low'
                    }
                    className="w-[65%] opacity-70 group-hover:opacity-90 group-hover:scale-[1.03] transition-all duration-500"
                  />
                </div>
                <div className="p-6 bg-cream">
                  <h3 className="font-display text-[1.2rem] mb-0.5">
                    {prod.name}
                  </h3>
                  <p className="text-[0.85rem] text-wool-100 mb-2">
                    {prod.description}
                  </p>
                  <span className="font-accent text-[0.95rem] font-medium">
                    {formatPrice(prod.price)}
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  )
}
