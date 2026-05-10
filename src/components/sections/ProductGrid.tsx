import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { products } from '@/lib/products'
import { formatPrice } from '@/lib/format'
import { useCartStore } from '@/stores/cart'
import { useUIStore } from '@/stores/ui'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { SneakerSVG } from '@/components/shared/SneakerSVG'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Product } from '@/types/product'

export function ProductGrid() {
  return (
    <section
      id="products"
      className="py-24 md:py-32 lg:py-40 bg-[#F7F4F0]"
      aria-labelledby="products-heading"
    >
      <div className="container mx-auto max-w-[1280px] px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="font-["Space_Grotesk",sans-serif] text-[0.7rem] tracking-[0.12em] uppercase text-[#B5AFA9] mb-3">
              The Collection
            </p>
            <h2
              id="products-heading"
              className="font-["Cormorant_Garamond",serif] text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-tight mb-4"
            >
              Every Step, Naturally Crafted
            </h2>
            <p className="text-[#B5AFA9] max-w-[480px] mx-auto">
              Six silhouettes. One philosophy. Merino wool sneakers designed for
              the way you actually live.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, idx) => (
            <ScrollReveal key={product.id} delay={idx * 100}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductCard({ product }: { product: Product }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isAdding, setIsAdding] = useState(false)
  const addItem = useCartStore((s) => s.addItem)
  const addToast = useUIStore((s) => s.addToast)
  const activeColor = product.colors[activeIdx]

  async function handleAddToCart() {
    setIsAdding(true)
    await new Promise((r) => setTimeout(r, 400))
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      color: activeColor.name,
      colorHex: activeColor.hex,
      size: product.sizes.find((s) => s.inStock)?.label ?? 'EU 40',
      qty: 1,
      gradient: product.gradient,
    })
    addToast(`${product.name} added to cart`, 'success')
    setIsAdding(false)
  }

  const sizeVariant: Record<string, 'low' | 'mid' | 'high' | 'slip-on'> = {
    runner: 'low',
    'mid-top': 'mid',
    'high-top': 'high',
    'slip-on': 'slip-on',
  }
  const variant = sizeVariant[product.category] ?? 'low'

  return (
    <div className="group relative rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(61,56,53,0.10)]">
      <Link to="/products/$slug" params={{ slug: product.slug }}>
        <div
          className="relative aspect-square flex items-center justify-center overflow-hidden"
          style={{ background: product.gradient }}
        >
          {product.tag && (
            <Badge variant={product.tag === 'SG Exclusive' ? 'exclusive' : 'default'}>
              {product.tag}
            </Badge>
          )}
          <SneakerSVG
            accentColor={product.svgAccentColor}
            variant={variant}
            className="w-[65%] opacity-70 group-hover:opacity-90 group-hover:scale-105 group-hover:-rotate-1 transition-all duration-500 ease-out"
          />
        </div>
      </Link>
      <div className="p-6 bg-[#FDFBF8]">
        <Link to="/products/$slug" params={{ slug: product.slug }}>
          <h3 className="font-["Cormorant_Garamond",serif] text-[1.2rem] mb-0.5">
            {product.name}
          </h3>
        </Link>
        <p className="text-[0.85rem] text-[#B5AFA9] mb-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-3">
          <span className="font-["Space_Grotesk",sans-serif] text-[0.95rem] font-medium">
            {formatPrice(product.price)}
          </span>
          <div className="flex gap-1.5">
            {product.colors.map((color, i) => (
              <button
                key={color.hex}
                onClick={() => setActiveIdx(i)}
                className={cn(
                  'w-3.5 h-3.5 rounded-full border-1.5 transition-transform duration-150',
                  i === activeIdx
                    ? 'border-[#3D3835] shadow-[0_0_0_2px_#F7F4F0,0_0_0_3.5px_#3D3835] scale-110'
                    : 'border-[#E0D4C2] hover:scale-110'
                )}
                style={{ backgroundColor: color.hex }}
                aria-label={`Color: ${color.name}`}
                aria-pressed={i === activeIdx}
              />
            ))}
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={cn(
            'w-full py-3 rounded-md font-["Space_Grotesk",sans-serif] text-[0.7rem] tracking-widest uppercase font-medium transition-all',
            isAdding
              ? 'bg-[#C5B49A] text-[#3D3835]'
              : 'bg-[#3D3835] text-[#F7F4F0] hover:bg-[#524C48] hover:-translate-y-px'
          )}
        >
          {isAdding ? 'Adding...' : 'Quick Add'}
        </button>
      </div>
    </div>
  )
}
