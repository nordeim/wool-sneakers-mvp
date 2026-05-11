import { Link } from '@tanstack/react-router'

export function Footer() {
  return (
    <footer className="bg-wool-900 text-wool-100 py-20 px-6" role="contentinfo">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-16">
          <div>
            <Link
              to="/"
              className="font-display text-[1.6rem] font-medium tracking-[0.15em] text-warm-white inline-block mb-4"
            >
              MĀMĀ
            </Link>
            <p className="text-[0.85rem] text-wool-100 leading-relaxed max-w-[280px]">
              Wool sneakers, born in Singapore. Natural comfort meets urban
              function, one step at a time.
            </p>
          </div>

          <FooterColumn
            title="Shop"
            links={[
              { label: 'All Sneakers', to: '/products' },
              { label: 'New Arrivals', to: '/products' },
            ]}
          />
          <FooterColumn
            title="Help"
            links={[
              { label: 'Sizing Guide', to: '#' },
              { label: 'Shipping & Returns', to: '#' },
              { label: 'Care Instructions', to: '#' },
              { label: 'Contact Us', to: '#' },
            ]}
          />
          <FooterColumn
            title="Company"
            links={[
              { label: 'Our Story', to: '/about' },
              { label: 'Sustainability', to: '#' },
              { label: 'Press', to: '#' },
            ]}
          />
        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <span className="text-[0.75rem] text-wool-300">
            &copy; 2025 MĀMĀ. Designed in Singapore. All rights reserved.
          </span>
          <div className="flex gap-3">
            <a
              href="#"
              aria-label="Instagram"
              rel="noopener noreferrer"
              target="_blank"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-wool-300 hover:border-white/30 hover:bg-white/5 hover:text-warm-white transition-all duration-300"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              rel="noopener noreferrer"
              target="_blank"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-wool-300 hover:border-white/30 hover:bg-white/5 hover:text-warm-white transition-all duration-300"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: readonly { label: string; to: string }[]
}) {
  return (
    <div>
      <h4 className="font-accent text-[0.65rem] tracking-[0.14em] uppercase text-wool-100 mb-4">
        {title}
      </h4>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.label}>
            {link.to.startsWith('/') ? (
              <Link
                to={link.to}
                className="text-[0.85rem] text-wool-300 hover:text-warm-white transition-colors duration-300"
              >
                {link.label}
              </Link>
            ) : (
              <a
                href={link.to}
                className="text-[0.85rem] text-wool-300 hover:text-warm-white transition-colors duration-300"
              >
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
