import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { getProductBySlug } from '@/lib/products'
import { formatPrice } from '@/lib/format'
import { useCartStore } from '@/stores/cart'
import { useUIStore } from '@/stores/ui'
import { SneakerSVG } from '@/components/shared/SneakerSVG'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/products/$slug')({
  component: ProductDetailPage,
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug)
    if (!product) throw new Error('Product not found')
    return { product }
  },
})

function ProductDetailPage() {
  const { product } = Route.useLoaderData()
  const [colorIdx, setColorIdx] = useState(0)
  const [sizeIdx, setSizeIdx] = useState(() =>
    product.sizes.findIndex((s) => s.inStock)
  )
  const [isAdding, setIsAdding] = useState(false)

  const addItem = useCartStore((s) => s.addItem)
  const openCart = useUIStore((s) => s.openCart)
  const addToast = useUIStore((s) => s.addToast)
  const openSizeGuide = useUIStore((s) => s.openSizeGuide)

  const selectedColor = product.colors[colorIdx]
  const selectedSize = product.sizes[sizeIdx]

  async function handleAddToCart() {
    if (!selectedSize?.inStock) return
    setIsAdding(true)
    await new Promise((r) => setTimeout(r, 500))
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      color: selectedColor.name,
      colorHex: selectedColor.hex,
      size: selectedSize.label,
      qty: 1,
      gradient: product.gradient,
    })
    addToast(`${product.name} added to cart`, 'success')
    setIsAdding(false)
    openCart()
  }

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto max-w-[1280px] px-6">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-[0.75rem] font-accent tracking-wider uppercase text-[#B5AFA9] mb-10"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="hover:text-[#3D3835] transition-colors">
            Home
          </Link>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <Link
            to="/products"
            className="hover:text-[#3D3835] transition-colors"
          >
            Shop
          </Link>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="text-[#3D3835]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Product Image */}
          <div
            className="aspect-square rounded-[20px] flex items-center justify-center"
            style={{ background: product.gradient }}
          >
            <SneakerSVG
              accentColor={product.svgAccentColor}
              variant={
                product.category === 'mid-top'
                  ? 'mid'
                  : product.category === 'high-top'
                    ? 'high'
                    : product.category === 'slip-on'
                      ? 'slip-on'
                      : 'low'
              }
              className="w-[60%] opacity-80"
            />
          </div>

          {/* Product Info */}
          <div>
            {product.tag && (
              <span className="inline-block font-accent text-[0.6rem] tracking-widest uppercase font-semibold bg-[#EDE5D8] text-[#6B6460] px-3 py-1 rounded-full mb-4">
                {product.tag}
              </span>
            )}
            <h1 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-tight mb-2">
              {product.name}
            </h1>
            <p className="text-[#6B6460] mb-6">{product.description}</p>
            <p className="font-accent text-[1.5rem] font-medium mb-8">
              {formatPrice(product.price)}
            </p>

            {/* Color Selector */}
            <div className="mb-8">
              <p className="font-accent text-[0.7rem] tracking-widest uppercase text-[#6B6460] mb-3">
                Color:{' '}
                <span className="text-[#3D3835] font-medium">
                  {selectedColor.name}
                </span>
              </p>
              <div className="flex gap-3">
                {product.colors.map((color, i) => (
                  <button
                    key={color.hex}
                    onClick={() => setColorIdx(i)}
                    className={cn(
                      'w-10 h-10 rounded-full border-2 transition-all duration-200',
                      i === colorIdx
                        ? 'border-[#3D3835] shadow-[0_0_0_2px_#F7F4F0,0_0_0_4px_#3D3835]'
                        : 'border-[#E0D4C2] hover:border-[#6B6460]'
                    )}
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Color: ${color.name}`}
                    aria-pressed={i === colorIdx}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="font-accent text-[0.7rem] tracking-widest uppercase text-[#6B6460]">
                  Size:{' '}
                  <span className="text-[#3D3835] font-medium">
                    {selectedSize?.label ?? 'Select'}
                  </span>
                </p>
                <button
                  onClick={openSizeGuide}
                  className="flex items-center gap-1.5 font-accent text-[0.65rem] tracking-widest uppercase text-[#B5AFA9] hover:text-[#6B6460] transition-colors"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect
                      x="2"
                      y="14"
                      width="8"
                      height="5"
                      rx="1"
                    />
                    <rect
                      x="14"
                      y="3"
                      width="5"
                      height="8"
                      rx="1"
                    />
                    <line x1="2" y1="16.5" x2="10" y2="16.5" />
                    <line x1="14" y1="7.5" x2="19" y2="7.5" />
                  </svg>
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {product.sizes.map((s, i) => (
                  <button
                    key={s.eu}
                    onClick={() => s.inStock && setSizeIdx(i)}
                    disabled={!s.inStock}
                    className={cn(
                      'py-2.5 rounded-md font-accent text-[0.7rem] tracking-wider font-medium border transition-all duration-200',
                      i === sizeIdx && s.inStock
                        ? 'border-[#3D3835] bg-[#3D3835] text-[#F7F4F0]'
                        : s.inStock
                          ? 'border-[#E0D4C2] text-[#6B6460] hover:border-[#3D3835]'
                          : 'border-[#F5F0E8] text-[#B5AFA9] line-through cursor-not-allowed opacity-40'
                    )}
                    aria-label={`EU size ${s.eu}${!s.inStock ? ' (out of stock)' : ''}`}
                    aria-pressed={i === sizeIdx}
                  >
                    {s.eu}
                  </button>
                ))}
              </div>
            </div>

            <Button
              size="lg"
              className="w-full !rounded-lg"
              onClick={handleAddToCart}
              isLoading={isAdding}
              disabled={!selectedSize?.inStock}
            >
              {selectedSize?.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>

            {/* Features / Care */}
            <div className="mt-10 pt-8 border-t border-[#E0D4C2]">
              <h3 className="font-accent text-[0.7rem] tracking-widest uppercase text-[#6B6460] mb-4">
                Features
              </h3>
              <ul className="space-y-2">
                {product.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-[0.9rem] text-[#6B6460]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5B49A] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 pt-8 border-t border-[#E0D4C2]">
              <h3 className="font-accent text-[0.7rem] tracking-widest uppercase text-[#6B6460] mb-4">
                Care Instructions
              </h3>
              <ul className="space-y-2">
                {product.careInstructions.map((c) => (
                  <li
                    key={c}
                    className="flex items-center gap-3 text-[0.9rem] text-[#6B6460]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A8A29E] flex-shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 pt-8 border-t border-[#E0D4C2]">
              <p className="text-[#6B6460] leading-relaxed">
                {product.longDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
