import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ShoppingBag } from 'lucide-react'
import { useCartStore, selectCartCount } from '@/stores/cart'
import { useUIStore } from '@/stores/ui'
import { useThrottledScroll } from '@hooks/useThrottledScroll'
import { cn } from '@/lib/utils'

export function Navbar() {
  const cartCount = useCartStore(selectCartCount)
  const openCart = useUIStore((s) => s.openCart)
  const openMobileNav = useUIStore((s) => s.openMobileNav)
  const [scrolled, setScrolled] = useState(false)

  useThrottledScroll((scrollY) => {
    setScrolled(scrollY > 20)
  }, 100)

  return (
    <header
      className={cn(
        'sticky top-0 z-[100] transition-all duration-300 backdrop-blur-xl',
        scrolled
          ? 'bg-[#F7F4F0]/95 border-b border-[#E0D4C2]'
          : 'bg-[#F7F4F0]/85 border-b border-transparent'
      )}
    >
      <div className="container mx-auto max-w-[1280px] px-6 flex items-center justify-between h-[72px]">
        <Link
          to="/"
          className="font-["Cormorant_Garamond",serif] text-[1.6rem] font-medium tracking-[0.15em] text-[#3D3835]"
        >
          MĀMĀ
        </Link>

        <nav
          className="hidden md:flex items-center gap-10"
          aria-label="Main navigation"
        >
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Shop</NavLink>
          <NavLink to="/about">About</NavLink>
          <a
            href="#features"
            className="font-["Space_Grotesk",sans-serif] text-[0.72rem] tracking-widest uppercase text-[#6B6460] hover:text-[#3D3835] transition-colors duration-300"
          >
            Why Wool
          </a>
          <a
            href="#sg-story"
            className="font-["Space_Grotesk",sans-serif] text-[0.72rem] tracking-widest uppercase text-[#6B6460] hover:text-[#3D3835] transition-colors duration-300"
          >
            Singapore
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#EDE5D8] transition-colors"
            aria-label={`Shopping cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}
          >
            <ShoppingBag
              size={20}
              strokeWidth={1.5}
              className="text-[#3D3835]"
            />
            <span
              className={cn(
                'absolute top-0 right-0 min-w-[18px] h-[18px] rounded-full',
                'bg-[#3D3835] text-[#F7F4F0] font-["Space_Grotesk",sans-serif] text-[0.55rem] font-semibold',
                'flex items-center justify-center px-1',
                'transition-all duration-300',
                cartCount > 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'
              )}
            >
              {cartCount}
            </span>
          </button>

          <button
            onClick={openMobileNav}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#EDE5D8] transition-colors"
            aria-label="Open menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#3D3835"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

function NavLink({
  to,
  children,
}: {
  to: string
  children: React.ReactNode
}) {
  return (
    <Link
      to={to}
      className="font-["Space_Grotesk",sans-serif] text-[0.72rem] tracking-widest uppercase text-[#6B6460] hover:text-[#3D3835] transition-colors duration-300"
    >
      {children}
    </Link>
  )
}
