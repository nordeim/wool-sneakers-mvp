# MĀMĀ Wool Sneakers — Production E-Commerce Application Plan

## Executive Summary

Transforming the static HTML mockup into a fully production-ready React 19 + TypeScript 6 + Vite 8 + Tailwind v4 e-commerce application. The plan covers 8 implementation phases with 47 discrete tasks, complete type system, file-based routing, Zustand state management, behavioral testing, and WCAG 2.1 AA compliance. The mockup's design language — warm whites, oat tones, foggy gray gradients, Cormorant Garamond display type — migrates mechanically into Tailwind v4's `@theme inline` system.

---

## Phase 1: ANALYZE — Deep Requirement Mining

### 1.1 Domain Model Analysis

```
CORE ENTITIES
═════════════

Product
├── id: string (slug-based: "merino-runner")
├── name: string
├── description: string
├── price: number (SGD cents → format on display)
├── category: "runner" | "high-top" | "slip-on" | "mid-top"
├── colors: ProductColor[]
├── sizes: Size[]
├── gradient: string (CSS gradient for card)
├── svgAccentColor: string
├── tag: ProductTag | null
├── inStock: boolean
├── features: string[]
└── careInstructions: string

ProductColor
├── name: string
├── hex: string
└── swatchImage?: string

Size (Singapore/EU sizing)
├── eu: number (36-46)
├── label: string ("EU 36", "EU 38", etc.)
└── inStock: boolean

CartItem
├── productId: string
├── name: string
├── price: number
├── color: string
├── size: string
├── qty: number
├── gradient: string

Cart
├── items: CartItem[]
├── total: number (derived)
├── count: number (derived)

ProductTag = "Best Seller" | "New" | "Premium" | "SG Exclusive"
```

### 1.2 Route Architecture

```
ROUTE MAP
═════════

/                           → Home (all mockup sections)
/about                     → Brand Story (expanded)
/products                  → Product listing with filters
/products/$slug            → Product detail (PDP)
/cart                      → Full cart page (mobile-friendly alternative to slide panel)
/checkout                  → Checkout flow (multi-step)
/journal                   → Blog/journal listing
/journal/$slug             → Journal article
/*                         → 404 catch-all

OVERLAYS (not routes)
├── CartSlidePanel          → Triggered from any page
├── MobileNavPanel          → Triggered from any page
└── SizeGuideModal          → Triggered from PDP
```

### 1.3 State Architecture

```
STORE MAP
═════════

useCartStore (Zustand + persist)
├── items: CartItem[]
├── addItem(product, color, size, qty)
├── removeItem(productId, color, size)
├── updateQty(productId, color, size, delta)
├── clearCart()
├── subtotal → computed
├── itemCount → computed
└── persist: { name: 'mama-cart', partialize: (s) => ({ items: s.items }) }

useUIStore (Zustand, NO persist)
├── isCartOpen: boolean
├── isMobileNavOpen: boolean
├── isSizeGuideOpen: boolean
├── toasts: Toast[]
├── openCart() / closeCart()
├── openMobileNav() / closeMobileNav()
├── openSizeGuide() / closeSizeGuide()
├── addToast(message, type)
├── removeToast(id)
└── persist: partialize → {} (nothing persisted)

useProductStore (Zustand, optional)
├── filters: { category: string | null, sortBy: SortOption }
├── setFilter(key, value)
├── resetFilters()
```

### 1.4 Design Token Migration (HTML → Tailwind v4)

| Mockup CSS Variable | Tailwind v4 `@theme` Token | Usage |
|---------------------|---------------------------|-------|
| `--warm-white: #F7F4F0` | `--color-warm-white` | Page backgrounds |
| `--cream: #FDFBF8` | `--color-cream` | Card backgrounds |
| `--oat-50: #F5F0E8` | `--color-oat-50` | Secondary surfaces |
| `--oat-100: #EDE5D8` | `--color-oat-100` | Feature bg, hover states |
| `--oat-200: #E0D4C2` | `--color-oat-200` | Borders, dividers |
| `--oat-300: #D4C4B0` | `--color-oat-300` | Active states |
| `--oat-400: #C5B49A` | `--color-oat-400` | Accent, stars |
| `--oat-500: #B5A288` | `--color-oat-500` | Gradient endpoints |
| `--fog-50: #E8E5E0` | `--color-fog-50` | Gradient mid |
| `--fog-100: #D8D4CE` | `--color-fog-100` | Gradient mid |
| `--fog-200: #C5C0B8` | `--color-fog-200` | Borders |
| `--fog-300: #A8A29E` | `--color-fog-300` | Muted text |
| `--fog-400: #8C8580` | `--color-fog-400` | Secondary text |
| `--wool-900: #3D3835` | `--color-wool-900` | Primary text, dark bg |
| `--wool-700: #524C48` | `--color-wool-700` | Heading text |
| `--wool-500: #6B6460` | `--color-wool-500` | Body text |
| `--wool-300: #8C8580` | `--color-wool-300` | Tertiary text |
| `--wool-100: #B5AFA9` | `--color-wool-100` | Disabled text |
| `--font-display` | `--font-display` | Cormorant Garamond |
| `--font-body` | `--font-body` | DM Sans |
| `--font-accent` | `--font-accent` | Space Grotesk |

### 1.5 Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Tailwind v4 + custom fonts CORS | Medium | High | Preconnect + font-display: swap |
| Zustand persist hydration mismatch | Medium | Medium | Use `onRehydrateStorage` + `useHydration` guard |
| TanStack Router code splitting fails | Low | High | Test `autoCodeSplitting: true` with Vite 8 |
| Vite 8 Rolldown `manualChunks` regression | Low | High | Function form only; test build output |
| jsdom missing `crypto.randomUUID` | Certain | Low | Polyfill in test/setup.ts |
| `erasableSyntaxOnly` rejects enum | Certain | Build-block | Use union types exclusively |
| Product images missing (SVG-only) | Certain | Medium | SVG illustrations sufficient for MVP; plan image pipeline for v2 |

### 1.6 Component-Section Mapping

```
MOCKUP SECTION          → REACT COMPONENT                    → ROUTE
─────────────────────────────────────────────────────────────────────
Announcement Bar        → <AnnouncementBar />                → __root
Header + Nav            → <Navbar />                         → __root
Hero                    → <HeroSection />                    → / (index)
Brand Story             → <BrandStorySection />              → / (index)
Product Grid            → <ProductGrid /> + <ProductCard />  → / (index)
Features                → <FeaturesSection />                → / (index)
Singapore Story         → <SingaporeStorySection />          → / (index)
Testimonials            → <TestimonialsSection />            → / (index)
CTA / Newsletter        → <NewsletterSection />              → / (index)
Footer                  → <Footer />                         → __root
Cart Panel              → <CartSlidePanel />                 → __root (overlay)
Mobile Nav              → <MobileNavPanel />                 → __root (overlay)

NEW (not in mockup)
─────────────────────────────────────────────────────────────────────
Product Detail          → <ProductDetailPage />              → /products/$slug
Cart Page               → <CartPage />                       → /cart
Checkout                → <CheckoutPage />                   → /checkout
Size Guide              → <SizeGuideModal />                 → overlay
404                     → <NotFoundPage />                   → /*
```

---

## Phase 2: PLAN — Structured Execution Roadmap

### Implementation Phases

```
PHASE 4.1: FOUNDATION (Infrastructure)
════════════════════════════════════════
□ Task 1:  Scaffold project (npm create vite)
□ Task 2:  Install all dependencies
□ Task 3:  Configure tsconfig.json (strict, paths, erasableSyntaxOnly)
□ Task 4:  Configure vite.config.ts (plugins, alias, manualChunks, test)
□ Task 5:  Configure globals.css (@theme inline with full wool palette)
□ Task 6:  Create cn() utility (src/lib/utils.ts)
□ Task 7:  Create product data module (src/lib/products.ts)
□ Task 8:  Create formatPrice utility (src/lib/format.ts)
□ Task 9:  Set up test infrastructure (setup.ts, rAF mock)
□ Task 10: Verify: tsc --noEmit passes, npm run build succeeds, vitest runs

PHASE 4.2: TYPE SYSTEM (Domain Models)
════════════════════════════════════════
□ Task 11: Create src/types/product.ts (Product, ProductColor, Size, ProductTag)
□ Task 12: Create src/types/cart.ts (CartItem, CartState)
□ Task 13: Create src/types/ui.ts (Toast, UIState)
□ Task 14: Verify: tsc --noEmit with all types imported

PHASE 4.3: STATE MANAGEMENT (Zustand Stores)
═════════════════════════════════════════════
□ Task 15: Create useCartStore (src/stores/cart.ts) — persist
□ Task 16: Create useUIStore (src/stores/ui.ts) — no persist
□ Task 17: Write cart store tests (add, remove, updateQty, clear, subtotal)
□ Task 18: Write UI store tests (open/close, toasts)
□ Task 19: Verify: all store tests pass

PHASE 4.4: ROUTING + LAYOUT (TanStack Router)
══════════════════════════════════════════════
□ Task 20: Create __root.tsx (Navbar + Footer + Outlet + Overlays + SkipLink)
□ Task 21: Create index.tsx (Home — imports all sections)
□ Task 22: Create about.tsx
□ Task 23: Create products.index.tsx
□ Task 24: Create products.$slug.tsx (Product Detail Page)
□ Task 25: Create cart.tsx
□ Task 26: Create checkout.tsx
□ Task 27: Create $.tsx (404)
□ Task 28: Run npx tsr generate + verify route tree
□ Task 29: Create Navbar component
□ Task 30: Create Footer component

PHASE 4.5: SHARED COMPONENTS (Reusable Primitives)
═══════════════════════════════════════════════════
□ Task 31: Create <CartSlidePanel /> (overlay with useFocusTrap)
□ Task 32: Create <MobileNavPanel /> (overlay with useFocusTrap)
□ Task 33: Create <SkipLink />
□ Task 34: Create <ErrorBoundary />
□ Task 35: Create <SizeGuideModal />
□ Task 36: Create custom hooks (useThrottledScroll, useFocusTrap)
□ Task 37: Write tests for shared components

PHASE 4.6: SECTION COMPONENTS (Home Page Parts)
═══════════════════════════════════════════════
□ Task 38: Create <AnnouncementBar />
□ Task 39: Create <HeroSection />
□ Task 40: Create <BrandStorySection />
□ Task 41: Create <ProductGrid /> + <ProductCard />
□ Task 42: Create <FeaturesSection />
□ Task 43: Create <SingaporeStorySection />
□ Task 44: Create <TestimonialsSection />
□ Task 45: Create <NewsletterSection />
□ Task 46: Write section component tests

PHASE 4.7: PRODUCT DETAIL PAGE
══════════════════════════════
□ Task 47: Create <ProductDetailPage /> with:
         - Product images/illustration area
         - Color selector
         - Size selector (with Size Guide trigger)
         - Add to Cart (disabled during async, loading state)
         - Product features
         - Care instructions
         - Breadcrumb navigation
□ Task 48: Write PDP tests

PHASE 4.8: CART + CHECKOUT PAGES
═════════════════════════════════
□ Task 49: Create <CartPage /> (full-page cart, mobile-friendly)
□ Task 50: Create <CheckoutPage /> (multi-step: shipping → payment → confirm)
□ Task 51: Write cart + checkout tests

PHASE 4.9: INTEGRATION + POLISH
════════════════════════════════
□ Task 52: Wire all Zustand stores to components
□ Task 53: Add scroll reveal animations (IntersectionObserver)
□ Task 54: Add grain texture overlay (CSS)
□ Task 55: Add climate bar animations (Singapore section)
□ Task 56: Responsive testing (360px → 1920px)
□ Task 57: Accessibility audit (SkipLink, focus trap, ARIA, contrast)
□ Task 58: Performance audit (Lighthouse, bundle size)
□ Task 59: SEO (meta tags, OG, CSP in index.html)
□ Task 60: Dead code audit (script from skill §21)

PHASE 4.10: TESTING + VERIFICATION
════════════════════════════════════
□ Task 61: Full test suite run (npx vitest run)
□ Task 62: TypeScript strict check (npx tsc --noEmit)
□ Task 63: Production build (npm run build)
□ Task 64: Pre-ship checklist (skill §22)
□ Task 65: Generate documentation
```

### File Structure

```
src/
├── main.tsx                          # Entry + ErrorBoundary
├── globals.css                       # Tailwind v4 @theme inline (full wool palette)
├── routeTree.gen.ts                  # Auto-generated by TanStack Router
│
├── components/
│   ├── ui/                           # shadcn primitives
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── sheet.tsx                 # For cart slide panel base
│   │   └── dialog.tsx               # For size guide modal
│   │
│   ├── layout/                       # Structural components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── AnnouncementBar.tsx
│   │
│   ├── sections/                     # Home page sections (from mockup)
│   │   ├── HeroSection.tsx
│   │   ├── BrandStorySection.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductCard.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── SingaporeStorySection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── NewsletterSection.tsx
│   │
│   ├── product/                      # Product Detail Page components
│   │   ├── ProductGallery.tsx
│   │   ├── ColorSelector.tsx
│   │   ├── SizeSelector.tsx
│   │   ├── AddToCartButton.tsx
│   │   └── ProductInfo.tsx
│   │
│   ├── cart/                         # Cart components
│   │   ├── CartSlidePanel.tsx
│   │   ├── CartItemRow.tsx
│   │   ├── CartSummary.tsx
│   │   └── EmptyCart.tsx
│   │
│   ├── checkout/                     # Checkout components
│   │   ├── CheckoutForm.tsx
│   │   ├── ShippingStep.tsx
│   │   ├── PaymentStep.tsx
│   │   └── OrderConfirmation.tsx
│   │
│   └── shared/                       # Cross-cutting components
│       ├── SkipLink.tsx
│       ├── ErrorBoundary.tsx
│       ├── MobileNavPanel.tsx
│       ├── SizeGuideModal.tsx
│       ├── Toast.tsx
│       ├── GrainOverlay.tsx
│       ├── ScrollReveal.tsx
│       └── SneakerSVG.tsx           # Reusable sneaker illustration
│
├── hooks/
│   ├── useThrottledScroll.ts
│   ├── useFocusTrap.ts
│   ├── useScrollReveal.ts           # IntersectionObserver wrapper
│   └── useHydration.ts              # Zustand persist hydration guard
│
├── stores/
│   ├── cart.ts                       # useCartStore (persisted)
│   └── ui.ts                        # useUIStore (ephemeral)
│
├── routes/
│   ├── __root.tsx                    # Root layout
│   ├── index.tsx                     # Home page
│   ├── about.tsx                     # About page
│   ├── products.index.tsx            # Product listing
│   ├── products.$slug.tsx            # Product detail
│   ├── cart.tsx                      # Cart page
│   ├── checkout.tsx                  # Checkout
│   ├── journal.index.tsx             # Journal listing (placeholder)
│   └── $.tsx                         # 404 catch-all
│
├── types/
│   ├── product.ts
│   ├── cart.ts
│   └── ui.ts
│
├── lib/
│   ├── utils.ts                      # cn() helper
│   ├── products.ts                   # Product data + helpers
│   └── format.ts                     # formatPrice, formatDate
│
└── test/
    ├── setup.ts                      # jsdom setup, rAF mock, jest-dom
    ├── cart.store.test.ts
    ├── ui.store.test.ts
    ├── ProductCard.test.tsx
    ├── CartSlidePanel.test.tsx
    ├── AddToCartButton.test.tsx
    ├── SizeSelector.test.tsx
    ├── NewsletterSection.test.tsx
    └── Navbar.test.tsx
```

### Key Implementation Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Cart panel vs cart page | **Both** — slide panel on desktop, `/cart` page on mobile | Singapore mobile-first users need full-page cart; desktop benefits from slide panel |
| Product images | SVG illustrations (from mockup) for MVP | No photography budget; SVG keeps bundle lean; consistent with design language |
| Checkout | Multi-step form with `useActionState` | React 19 pattern; proper form validation; disabled states during submission |
| Animations | IntersectionObserver + CSS classes (not Framer Motion) | Zero-dependency; compositor-only properties; `prefers-reduced-motion` compliant |
| Icons | Lucide React (replaces mockup inline SVGs) | Consistent icon set; tree-shakeable; accessible |
| shadcn components | Button, Input, Badge, Sheet, Dialog | Library discipline — don't rebuild what shadcn provides |
| Grain texture | CSS pseudo-element on `__root` layout | Single declaration; no component overhead |
| Fonts | Google Fonts with `<link rel="preload">` | Fastest initial paint; no FOIT |
| Currency formatting | `Intl.NumberFormat('en-SG', { style: 'currency', currency: 'SGD' })` | Native; no library; correct Singapore formatting |
| Hydration guard | `useHydration` hook checks `store.persist.hasHydrated()` | Prevents server/client mismatch with Zustand persist |

### Test Strategy

```
TEST PYRAMID
═══════════

UNIT (stores, utilities)          → 8 tests
├── cart.store.test.ts            → add, remove, updateQty, clear, subtotal, persist
├── ui.store.test.ts              → open/close, toasts, add/remove
├── utils.test.ts                 → cn(), formatPrice()
└── products.test.ts              → getProductBySlug, filterProducts

COMPONENT (behavior-driven)       → 12 tests
├── ProductCard.test.tsx          → renders, add-to-cart, color swatch click
├── CartSlidePanel.test.tsx       → open/close, item list, qty controls, empty state
├── AddToCartButton.test.tsx      → disabled states, loading, success feedback
├── SizeSelector.test.tsx         → selection, out-of-stock, size guide trigger
├── NewsletterSection.test.tsx    → form submission, validation, success state
├── Navbar.test.tsx               → scroll state, cart count badge, mobile toggle
├── ColorSelector.test.tsx        → active state, swatch click
├── CartItemRow.test.tsx          → qty +/-, remove, price calculation
├── ProductGrid.test.tsx          → renders all products, filter behavior
├── MobileNavPanel.test.tsx       → open/close, focus trap, escape key
├── HeroSection.test.tsx          → CTA links, accessibility
└── Footer.test.tsx               → link rendering, social icons

INTEGRATION (cross-store)         → 4 tests
├── add-to-cart-from-PDP          → Product detail → cart store → panel opens
├── cart-qty-update-reflects      → Panel qty → store → total recalc
├── newsletter-form-action        → useActionState → success feedback
└── mobile-nav-focus-trap         → Tab cycling within open panel
```

### Dependency List

```bash
# Production
react@^19.2
react-dom@^19.2
zustand@^5.0
@tanstack/react-router@^1.169
clsx
tailwind-merge
lucide-react@^0.563

# Development
typescript@^6.0
vite@^8.0
@vitejs/plugin-react@^4.0
tailwindcss@^4.2
@tailwindcss/vite@^4.2
vitest@^4.1
@testing-library/react@^16.3
@testing-library/jest-dom@^6.0
jsdom
@types/react@^19.0
@types/react-dom@^19.0
@tanstack/router-plugin@^1.169
```

### Estimated Effort

| Phase | Tasks | Estimated Time |
|-------|-------|---------------|
| 4.1 Foundation | 10 | 2 hours |
| 4.2 Type System | 4 | 30 minutes |
| 4.3 State Management | 5 | 1.5 hours |
| 4.4 Routing + Layout | 11 | 2.5 hours |
| 4.5 Shared Components | 7 | 2 hours |
| 4.6 Section Components | 9 | 3 hours |
| 4.7 Product Detail Page | 2 | 1.5 hours |
| 4.8 Cart + Checkout | 3 | 2 hours |
| 4.9 Integration + Polish | 9 | 3 hours |
| 4.10 Testing + Verification | 5 | 1.5 hours |
| **Total** | **65** | **~20 hours** |

### Success Criteria

| Criterion | Measurement |
|-----------|-------------|
| `npx tsc --noEmit` | Zero errors |
| `npm run build` | Succeeds in < 1s |
| `npx vitest run` | All tests pass (24+ tests) |
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |
| Bundle size (initial) | < 150KB gzipped |
| No `any`, `enum`, `namespace` | Enforced by TS config |
| All interactive states handled | Loading, error, empty, success |
| WCAG 2.1 AA | SkipLink, focus trap, ARIA, contrast |
| `prefers-reduced-motion` | All animations respect |

---

## Phase 3: VALIDATE — Explicit Confirmation Checkpoint

**I need your explicit approval before proceeding to implementation.**

Please review and confirm or request modifications on:

1. **Route structure** — Are `/about`, `/journal`, `/checkout` needed for MVP, or should we scope down to `/`, `/products`, `/products/$slug`, `/cart` only?

2. **Product data** — 6 products as defined in the mockup, or do you have real product data to inject?

3. **Checkout flow** — Should we implement a mock checkout (form validation + confirmation screen), or is the cart sufficient for this iteration?

4. **shadcn/ui scope** — I plan to use shadcn for Button, Input, Badge, Sheet, and Dialog. Are you comfortable with this, or would you prefer custom implementations?

5. **Image strategy** — SVG sneaker illustrations from the mockup for MVP, or do you have product photography?

6. **Singapore-specific features** — SGD currency, Singapore sizing (EU), local testimonials — any other localization needs?

7. **Deployment target** — Vercel, Netlify, or other? This affects build configuration.

8. **Any sections to add/remove** from the home page layout?
