import { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { useUIStore } from '@/stores/ui'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { cn } from '@/lib/utils'

export function MobileNavPanel() {
  const isOpen = useUIStore((s) => s.isMobileNavOpen)
  const close = useUIStore((s) => s.closeMobileNav)
  const panelRef = useRef<HTMLDivElement>(null)

  useFocusTrap(isOpen, panelRef)

  return (
    <div
      className={cn(
        'fixed inset-0 z-[300] transition-all duration-300',
        isOpen
          ? 'pointer-events-auto visible'
          : 'pointer-events-none invisible'
      )}
      role="dialog"
      aria-label="Mobile navigation"
      aria-hidden={!isOpen}
    >
      <div
        className={cn(
          'absolute inset-0 bg-wool-900/30 backdrop-blur-sm transition-opacity',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={close}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        className={cn(
          'absolute top-0 right-0 w-[min(320px,85vw)] h-full bg-warm-white p-6',
          'transition-transform duration-500 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <button
          onClick={close}
          className="ml-auto w-10 h-10 flex items-center justify-center rounded-full hover:bg-oat-100 transition-colors mb-8"
          aria-label="Close menu"
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
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
          <MobileNavLink to="/" onClick={close}>
            Home
          </MobileNavLink>
          <MobileNavLink to="/products" onClick={close}>
            Shop
          </MobileNavLink>
          <MobileNavLink to="/about" onClick={close}>
            About
          </MobileNavLink>
          <MobileAnchorLink href="#features" onClick={close}>
            Why Wool
          </MobileAnchorLink>
          <MobileAnchorLink href="#sg-story" onClick={close}>
            Singapore
          </MobileAnchorLink>
        </nav>
      </div>
    </div>
  )
}

function MobileNavLink({
  to,
  onClick,
  children,
}: {
  to: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="font-display text-[1.8rem] text-wool-900 hover:text-wool-300 transition-colors duration-300"
    >
      {children}
    </Link>
  )
}

function MobileAnchorLink({
  href,
  onClick,
  children,
}: {
  href: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="font-display text-[1.8rem] text-wool-900 hover:text-wool-300 transition-colors duration-300"
    >
      {children}
    </a>
  )
}
