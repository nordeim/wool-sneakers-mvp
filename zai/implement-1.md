# Phase 4: IMPLEMENT — MĀMĀ Production E-Commerce Application

I'll now deliver the complete implementation, file by file, following the plan. Every file is production-ready, TypeScript-strict, and follows the skill file conventions exactly.

---

## 4.1 — Setup Commands

```bash
# Step 1: Scaffold
npm create vite@latest mama-wool -- --template react-ts
cd mama-wool

# Step 2: Production dependencies
npm install react@^19.2 react-dom@^19.2 zustand@^5.0 @tanstack/react-router@^1.169 clsx tailwind-merge lucide-react@^0.563 @radix-ui/react-dialog @radix-ui/react-slot

# Step 3: Dev dependencies
npm install --legacy-peer-deps -D \
  typescript@^6.0 vite@^8.0 @vitejs/plugin-react@^4.0 \
  tailwindcss@^4.2 @tailwindcss/vite@^4.2 vitest@^4.1 \
  @testing-library/react@^16.3 @testing-library/jest-dom@^6.0 \
  jsdom @types/react@^19.0 @types/react-dom@^19.0 \
  @tanstack/router-plugin@^1.169
```

---

## 4.1 — Configuration Files

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "erasableSyntaxOnly": true,
    "verbatimModuleSyntax": true,
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@lib/*": ["./src/lib/*"],
      "@routes/*": ["./src/routes/*"],
      "@stores/*": ["./src/stores/*"],
      "@shared/*": ["./src/components/shared/*"],
      "@ui/*": ["./src/components/ui/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### `tsconfig.node.json`

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

### `vite.config.ts`

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    tailwindcss(),
    react()
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@hooks': '/src/hooks',
      '@lib': '/src/lib',
      '@routes': '/src/routes',
      '@stores': '/src/stores',
      '@shared': '/src/components/shared',
      '@ui': '/src/components/ui'
    }
  },
  build: {
    manualChunks: (id: string) => {
      if (id.includes('react')) return 'react-vendor'
      if (id.includes('tanstack')) return 'router-vendor'
      if (id.includes('lucide')) return 'lucide'
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts'
  }
})
```

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MĀMĀ — Wool Sneakers for the Modern City</title>
    <meta name="description" content="Singapore-born wool sneakers. Natural merino meets urban functionality. Engineered for tropical living." />

    <!-- Fonts: Preconnect + Stylesheet -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

    <!-- Open Graph -->
    <meta property="og:title" content="MĀMĀ — Wool Sneakers for the Modern City" />
    <meta property="og:description" content="Singapore-born wool sneakers. Natural merino meets urban functionality." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />

    <!-- CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https: data:; connect-src 'self';" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## 4.1 — CSS Foundation

### `src/globals.css`

```css
@import "tailwindcss";

@theme inline {
  /* ── Wool Color System ─────────────────────────── */
  --color-warm-white: #F7F4F0;
  --color-cream: #FDFBF8;
  --color-oat-50: #F5F0E8;
  --color-oat-100: #EDE5D8;
  --color-oat-200: #E0D4C2;
  --color-oat-300: #D4C4B0;
  --color-oat-400: #C5B49A;
  --color-oat-500: #B5A288;
  --color-fog-50: #E8E5E0;
  --color-fog-100: #D8D4CE;
  --color-fog-200: #C5C0B8;
  --color-fog-300: #A8A29E;
  --color-fog-400: #8C8580;
  --color-wool-900: #3D3835;
  --color-wool-700: #524C48;
  --color-wool-500: #6B6460;
  --color-wool-300: #8C8580;
  --color-wool-100: #B5AFA9;

  /* ── Typography ────────────────────────────────── */
  --font-display: 'Cormorant Garamond', 'Georgia', serif;
  --font-body: 'DM Sans', 'Helvetica Neue', sans-serif;
  --font-accent: 'Space Grotesk', 'Helvetica Neue', sans-serif;

  /* ── Spacing (8px grid) ────────────────────────── */
  --spacing-1: 8px;
  --spacing-2: 16px;
  --spacing-3: 24px;
  --spacing-4: 32px;
  --spacing-5: 40px;
  --spacing-6: 48px;
  --spacing-8: 64px;
  --spacing-10: 80px;
  --spacing-12: 96px;
  --spacing-16: 128px;
  --spacing-20: 160px;

  /* ── Z-Index ───────────────────────────────────── */
  --z-base: 0;
  --z-raised: 10;
  --z-sticky: 100;
  --z-overlay: 200;
  --z-panel: 300;
  --z-modal: 400;
  --z-toast: 500;
  --z-grain: 10000;

  /* ── Custom Animations ─────────────────────────── */
  --animate-fade-in-up: fade-in-up 800ms ease-out forwards;
  --animate-scroll-pulse: scroll-pulse 2s ease-in-out infinite;
  --animate-slide-in-right: slide-in-right 500ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
  --animate-slide-out-right: slide-out-right 300ms cubic-bezier(0.4, 0, 1, 1) forwards;

  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes scroll-pulse {
    0%, 100% { opacity: 0.3; transform: scaleY(1); }
    50%      { opacity: 0.8; transform: scaleY(0.6); }
  }

  @keyframes slide-in-right {
    from { transform: translateX(100%); }
    to   { transform: translateX(0); }
  }

  @keyframes slide-out-right {
    from { transform: translateX(0); }
    to   { transform: translateX(100%); }
  }
}

@layer base {
  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: var(--font-body);
    color: var(--color-wool-900);
    background-color: var(--color-warm-white);
    overflow-x: hidden;
  }

  :focus-visible {
    outline: 2px solid var(--color-oat-400);
    outline-offset: 2px;
    border-radius: 6px;
  }
}

@layer utilities {
  .container-custom {
    width: 100%;
    max-width: 1280px;
    margin-inline: auto;
    padding-inline: 24px;
  }

  .text-eyebrow {
    font-family: var(--font-accent);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-size: 0.7rem;
    font-weight: 500;
    color: var(--color-wool-300);
  }

  .grain-overlay {
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: var(--z-grain);
    opacity: 0.5;
  }
}

/* Reduced Motion (WCAG 2.3.3) */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .grain-overlay { display: none; }
}
```

---

## 4.2 — Type System

### `src/types/product.ts`

```ts
export type ProductTag = 'Best Seller' | 'New' | 'Premium' | 'SG Exclusive'

export type ProductCategory = 'runner' | 'high-top' | 'slip-on' | 'mid-top'

export interface ProductColor {
  readonly name: string
  readonly hex: string
}

export interface ProductSize {
  readonly eu: number
  readonly label: string
  readonly inStock: boolean
}

export interface Product {
  readonly id: string
  readonly slug: string
  readonly name: string
  readonly description: string
  readonly longDescription: string
  readonly price: number
  readonly category: ProductCategory
  readonly colors: readonly ProductColor[]
  readonly sizes: readonly ProductSize[]
  readonly gradient: string
  readonly svgAccentColor: string
  readonly tag: ProductTag | null
  readonly inStock: boolean
  readonly features: readonly string[]
  readonly careInstructions: readonly string[]
}
```

### `src/types/cart.ts`

```ts
export interface CartItem {
  readonly productId: string
  readonly slug: string
  readonly name: string
  readonly price: number
  readonly color: string
  readonly colorHex: string
  readonly size: string
  readonly qty: number
  readonly gradient: string
}

export type CartAction =
  | { readonly type: 'add'; readonly item: CartItem }
  | { readonly type: 'remove'; readonly productId: string; readonly color: string; readonly size: string }
  | { readonly type: 'updateQty'; readonly productId: string; readonly color: string; readonly size: string; readonly delta: number }
  | { readonly type: 'clear' }
```

### `src/types/ui.ts`

```ts
export type ToastType = 'success' | 'error' | 'info'

export interface Toast {
  readonly id: string
  readonly message: string
  readonly type: ToastType
}
```

---

## 4.1 — Utilities & Data

### `src/lib/utils.ts`

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### `src/lib/format.ts`

```ts
const sgdFormatter = new Intl.NumberFormat('en-SG', {
  style: 'currency',
  currency: 'SGD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

export function formatPrice(cents: number): string {
  return sgdFormatter.format(cents)
}
```

### `src/lib/products.ts`

```ts
import type { Product } from '@/types/product'

export const products: readonly Product[] = [
  {
    id: '1',
    slug: 'merino-runner',
    name: 'The Merino Runner',
    description: 'Classic low-top in natural oat',
    longDescription: 'Our signature sneaker. The Merino Runner combines a low-top silhouette with our Wool-Air™ knit upper, creating a sneaker that breathes with you through every step of your day. From morning commute to evening stroll.',
    price: 18900,
    category: 'runner',
    colors: [
      { name: 'Natural Oat', hex: '#E0D4C2' },
      { name: 'Foggy Gray', hex: '#C5C0B8' },
      { name: 'Charcoal', hex: '#3D3835' },
    ],
    sizes: [
      { eu: 36, label: 'EU 36', inStock: true },
      { eu: 37, label: 'EU 37', inStock: true },
      { eu: 38, label: 'EU 38', inStock: true },
      { eu: 39, label: 'EU 39', inStock: true },
      { eu: 40, label: 'EU 40', inStock: true },
      { eu: 41, label: 'EU 41', inStock: true },
      { eu: 42, label: 'EU 42', inStock: false },
      { eu: 43, label: 'EU 43', inStock: true },
      { eu: 44, label: 'EU 44', inStock: true },
      { eu: 45, label: 'EU 45', inStock: true },
      { eu: 46, label: 'EU 46', inStock: true },
    ],
    gradient: 'linear-gradient(145deg, #EDE5D8 0%, #D4C4B0 50%, #C5C0B8 100%)',
    svgAccentColor: '#3D3835',
    tag: 'Best Seller',
    inStock: true,
    features: ['Wool-Air™ knit upper', 'Recycled foam insole', 'Natural rubber outsole', 'Machine washable'],
    careInstructions: ['Remove insole before washing', 'Machine wash cold, gentle cycle', 'Air dry overnight', 'Do not tumble dry'],
  },
  {
    id: '2',
    slug: 'urban-knit',
    name: 'The Urban Knit',
    description: 'Mid-top in foggy gray',
    longDescription: 'Elevated street style meets wool innovation. The Urban Knit sits higher on the ankle with a structured silhouette that holds its shape from boardroom to bar.',
    price: 21900,
    category: 'mid-top',
    colors: [
      { name: 'Foggy Gray', hex: '#D8D4CE' },
      { name: 'Warm Stone', hex: '#B5AFA9' },
      { name: 'Dark Wool', hex: '#6B6460' },
    ],
    sizes: [
      { eu: 36, label: 'EU 36', inStock: true },
      { eu: 37, label: 'EU 37', inStock: true },
      { eu: 38, label: 'EU 38', inStock: true },
      { eu: 39, label: 'EU 39', inStock: false },
      { eu: 40, label: 'EU 40', inStock: true },
      { eu: 41, label: 'EU 41', inStock: true },
      { eu: 42, label: 'EU 42', inStock: true },
      { eu: 43, label: 'EU 43', inStock: true },
      { eu: 44, label: 'EU 44', inStock: true },
      { eu: 45, label: 'EU 45', inStock: false },
      { eu: 46, label: 'EU 46', inStock: true },
    ],
    gradient: 'linear-gradient(145deg, #D8D4CE 0%, #A8A29E 50%, #8C8580 100%)',
    svgAccentColor: '#3D3835',
    tag: 'New',
    inStock: true,
    features: ['Mid-top ankle support', 'Wool-Air™ knit upper', 'Padded collar', 'Grip-flex outsole'],
    careInstructions: ['Spot clean with damp cloth', 'Machine wash cold if needed', 'Air dry only', 'Reshape while damp'],
  },
  {
    id: '3',
    slug: 'the-breeze',
    name: 'The Breeze',
    description: 'Slip-on in warm white',
    longDescription: 'Effortless. The Breeze slips on and disappears — in the best way. Its minimalist construction and elastic gore make it the ultimate grab-and-go sneaker for the relentlessly casual.',
    price: 16900,
    category: 'slip-on',
    colors: [
      { name: 'Warm White', hex: '#FDFBF8' },
      { name: 'Soft Oat', hex: '#F5F0E8' },
      { name: 'Sand', hex: '#D4C4B0' },
    ],
    sizes: [
      { eu: 36, label: 'EU 36', inStock: true },
      { eu: 37, label: 'EU 37', inStock: true },
      { eu: 38, label: 'EU 38', inStock: true },
      { eu: 39, label: 'EU 39', inStock: true },
      { eu: 40, label: 'EU 40', inStock: true },
      { eu: 41, label: 'EU 41', inStock: true },
      { eu: 42, label: 'EU 42', inStock: true },
      { eu: 43, label: 'EU 43', inStock: true },
      { eu: 44, label: 'EU 44', inStock: true },
      { eu: 45, label: 'EU 45', inStock: true },
      { eu: 46, label: 'EU 46', inStock: true },
    ],
    gradient: 'linear-gradient(145deg, #FDFBF8 0%, #F5F0E8 50%, #EDE5D8 100%)',
    svgAccentColor: '#8C8580',
    tag: null,
    inStock: true,
    features: ['Slip-on elastic gore', 'Ultralight merino knit', 'Flexible outsole', 'No-tie design'],
    careInstructions: ['Machine wash cold', 'Gentle cycle only', 'Air dry overnight', 'Do not bleach'],
  },
  {
    id: '4',
    slug: 'the-wanderer',
    name: 'The Wanderer',
    description: 'High-top in charcoal wool',
    longDescription: 'For those who walk further. The Wanderer is our premium high-top, built with double-layered merino and a reinforced heel counter. Adventure-ready, city-approved.',
    price: 23900,
    category: 'high-top',
    colors: [
      { name: 'Charcoal', hex: '#524C48' },
      { name: 'Deep Wool', hex: '#3D3835' },
      { name: 'Storm Gray', hex: '#6B6460' },
    ],
    sizes: [
      { eu: 38, label: 'EU 38', inStock: true },
      { eu: 39, label: 'EU 39', inStock: true },
      { eu: 40, label: 'EU 40', inStock: true },
      { eu: 41, label: 'EU 41', inStock: true },
      { eu: 42, label: 'EU 42', inStock: true },
      { eu: 43, label: 'EU 43', inStock: true },
      { eu: 44, label: 'EU 44', inStock: true },
      { eu: 45, label: 'EU 45', inStock: true },
      { eu: 46, label: 'EU 46', inStock: true },
    ],
    gradient: 'linear-gradient(145deg, #6B6460 0%, #524C48 50%, #3D3835 100%)',
    svgAccentColor: '#F7F4F0',
    tag: 'Premium',
    inStock: true,
    features: ['Double-layered merino', 'Reinforced heel counter', 'High-traction outsole', 'Premium leather trim'],
    careInstructions: ['Spot clean recommended', 'Use wool-safe detergent', 'Air dry only', 'Condition leather trim monthly'],
  },
  {
    id: '5',
    slug: 'the-daily',
    name: 'The Daily',
    description: 'Minimalist in cream',
    longDescription: 'The everyday essential, distilled to its purest form. The Daily is our most stripped-back sneaker — clean lines, no excess, just merino comfort and quiet style.',
    price: 17900,
    category: 'runner',
    colors: [
      { name: 'Cream', hex: '#F5F0E8' },
      { name: 'Light Oat', hex: '#EDE5D8' },
      { name: 'Honey', hex: '#C5B49A' },
    ],
    sizes: [
      { eu: 36, label: 'EU 36', inStock: true },
      { eu: 37, label: 'EU 37', inStock: true },
      { eu: 38, label: 'EU 38', inStock: true },
      { eu: 39, label: 'EU 39', inStock: true },
      { eu: 40, label: 'EU 40', inStock: true },
      { eu: 41, label: 'EU 41', inStock: true },
      { eu: 42, label: 'EU 42', inStock: true },
      { eu: 43, label: 'EU 43', inStock: true },
      { eu: 44, label: 'EU 44', inStock: true },
      { eu: 45, label: 'EU 45', inStock: true },
      { eu: 46, label: 'EU 46', inStock: false },
    ],
    gradient: 'linear-gradient(145deg, #F5F0E8 0%, #EDE5D8 50%, #E0D4C2 100%)',
    svgAccentColor: '#6B6460',
    tag: null,
    inStock: true,
    features: ['Minimalist construction', 'Single-layer merino', 'Lightweight EVA midsole', 'Flat-knit design'],
    careInstructions: ['Machine wash cold', 'Gentle cycle', 'Air dry flat', 'Do not iron'],
  },
  {
    id: '6',
    slug: 'the-tropical',
    name: 'The Tropical',
    description: 'Breathable mesh-wool in sand',
    longDescription: 'Engineered specifically for equatorial climates. The Tropical features our proprietary mesh-wool blend that maximises airflow while maintaining wool\'s natural moisture management.',
    price: 19900,
    category: 'runner',
    colors: [
      { name: 'Sand', hex: '#E0D4C2' },
      { name: 'Desert', hex: '#C5B49A' },
      { name: 'Driftwood', hex: '#8C8580' },
    ],
    sizes: [
      { eu: 36, label: 'EU 36', inStock: true },
      { eu: 37, label: 'EU 37', inStock: true },
      { eu: 38, label: 'EU 38', inStock: true },
      { eu: 39, label: 'EU 39', inStock: true },
      { eu: 40, label: 'EU 40', inStock: true },
      { eu: 41, label: 'EU 41', inStock: true },
      { eu: 42, label: 'EU 42', inStock: true },
      { eu: 43, label: 'EU 43', inStock: true },
      { eu: 44, label: 'EU 44', inStock: false },
      { eu: 45, label: 'EU 45', inStock: true },
      { eu: 46, label: 'EU 46', inStock: true },
    ],
    gradient: 'linear-gradient(145deg, #E0D4C2 0%, #C5B49A 50%, #B5A288 100%)',
    svgAccentColor: '#3D3835',
    tag: 'SG Exclusive',
    inStock: true,
    features: ['Mesh-wool hybrid upper', 'Enhanced ventilation zones', 'Cool-touch insole', 'Quick-dry construction'],
    careInstructions: ['Machine wash cold', 'Fast spin cycle ok', 'Air dry in shade', 'Dries in 4-6 hours'],
  },
] as const satisfies readonly Product[]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: string): readonly Product[] {
  if (category === 'all') return products
  return products.filter((p) => p.category === category)
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name'

export function sortProducts(items: readonly Product[], sortBy: SortOption): readonly Product[] {
  const sorted = [...items]
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'featured':
    default:
      return sorted
  }
}
```

---

## 4.3 — State Management (Zustand Stores)

### `src/stores/cart.ts`

```ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@/types/cart'

interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string, color: string, size: string) => void
  updateQty: (productId: string, color: string, size: string, delta: number) => void
  clearCart: () => void
}

function itemKey(productId: string, color: string, size: string): string {
  return `${productId}-${color}-${size}`
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const key = itemKey(item.productId, item.color, item.size)
          const existingIndex = state.items.findIndex(
            (i) => itemKey(i.productId, i.color, i.size) === key
          )

          if (existingIndex >= 0) {
            const updated = [...state.items]
            updated[existingIndex] = {
              ...updated[existingIndex],
              qty: updated[existingIndex].qty + item.qty,
            }
            return { items: updated }
          }

          return { items: [...state.items, item] }
        }),

      removeItem: (productId, color, size) =>
        set((state) => ({
          items: state.items.filter(
            (i) => itemKey(i.productId, i.color, i.size) !== itemKey(productId, color, size)
          ),
        })),

      updateQty: (productId, color, size, delta) =>
        set((state) => {
          const key = itemKey(productId, color, size)
          return {
            items: state.items
              .map((i) =>
                itemKey(i.productId, i.color, i.size) === key
                  ? { ...i, qty: i.qty + delta }
                  : i
              )
              .filter((i) => i.qty > 0),
          }
        }),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'mama-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
)

// Selectors
export const selectCartSubtotal = (state: CartState): number =>
  state.items.reduce((sum, item) => sum + item.price * item.qty, 0)

export const selectCartCount = (state: CartState): number =>
  state.items.reduce((sum, item) => sum + item.qty, 0)

export const selectCartIsEmpty = (state: CartState): boolean =>
  state.items.length === 0
```

### `src/stores/ui.ts`

```ts
import { create } from 'zustand'
import type { Toast } from '@/types/ui'

interface UIState {
  isCartOpen: boolean
  isMobileNavOpen: boolean
  isSizeGuideOpen: boolean
  toasts: Toast[]
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  openMobileNav: () => void
  closeMobileNav: () => void
  openSizeGuide: () => void
  closeSizeGuide: () => void
  addToast: (message: string, type: Toast['type']) => void
  removeToast: (id: string) => void
}

export const useUIStore = create<UIState>()((set) => ({
  isCartOpen: false,
  isMobileNavOpen: false,
  isSizeGuideOpen: false,
  toasts: [],

  openCart: () => set({ isCartOpen: true, isMobileNavOpen: false }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((s) => ({ isCartOpen: !s.isCartOpen })),

  openMobileNav: () => set({ isMobileNavOpen: true, isCartOpen: false }),
  closeMobileNav: () => set({ isMobileNavOpen: false }),

  openSizeGuide: () => set({ isSizeGuideOpen: true }),
  closeSizeGuide: () => set({ isSizeGuideOpen: false }),

  addToast: (message, type) =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          message,
          type,
        },
      ],
    })),

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}))
```

---

## 4.5 — Custom Hooks

### `src/hooks/useThrottledScroll.ts`

```ts
import { useEffect, useRef } from 'react'

export function useThrottledScroll(callback: (scrollY: number) => void, delay = 100) {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  const rafId = useRef<number | null>(null)
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastScrollY = useRef<number>(0)

  useEffect(() => {
    const handleScroll = () => {
      lastScrollY.current = window.scrollY
      if (rafId.current !== null) return

      rafId.current = requestAnimationFrame(() => {
        rafId.current = null
        if (timeoutId.current) return
        timeoutId.current = setTimeout(() => {
          timeoutId.current = null
          callbackRef.current(lastScrollY.current)
        }, delay)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId.current) cancelAnimationFrame(rafId.current)
      if (timeoutId.current) clearTimeout(timeoutId.current)
    }
  }, [delay])
}
```

### `src/hooks/useFocusTrap.ts`

```ts
import { useEffect } from 'react'

export function useFocusTrap(
  isActive: boolean,
  containerRef: React.RefObject<HTMLElement | null>,
  triggerRef?: React.RefObject<HTMLElement | null>
) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const savedTrigger = triggerRef?.current ?? (document.activeElement as HTMLElement)
    const container = containerRef.current

    const getFocusable = (): HTMLElement[] => {
      const candidates = container.querySelectorAll<HTMLElement>(
        'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      )
      return Array.from(candidates).filter(
        (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
      )
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !container) return
      const focusable = getFocusable()
      if (focusable.length === 0) {
        e.preventDefault()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement as HTMLElement
      if (e.shiftKey) {
        if (active === first || !focusable.includes(active)) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (active === last || !focusable.includes(active)) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    const first = getFocusable()[0]
    if (first) first.focus()
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      savedTrigger?.focus()
    }
  }, [isActive, containerRef, triggerRef])
}
```

### `src/hooks/useScrollReveal.ts`

```ts
import { useEffect, useRef, useState } from 'react'

export function useScrollReveal(threshold = 0.1): {
  ref: React.RefObject<HTMLDivElement | null>
  isVisible: boolean
} {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}
```

### `src/hooks/useHydration.ts`

```ts
import { useState, useEffect } from 'react'
import { useCartStore } from '@/stores/cart'

export function useHydration(): boolean {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const unsubFinishHydration = useCartStore.persist.onFinishHydration(() => {
      setHydrated(true)
    })

    if (useCartStore.persist.hasHydrated()) {
      setHydrated(true)
    }

    return unsubFinishHydration
  }, [])

  return hydrated
}
```

---

## 4.5 — UI Primitives (shadcn-style)

### `src/components/ui/button.tsx`

```tsx
import { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
  isLoading?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-wool-900 text-warm-white hover:bg-wool-700 active:bg-wool-900',
  secondary:
    'bg-transparent text-wool-900 border-1.5 border-fog-200 hover:border-wool-500 hover:bg-oat-50',
  ghost:
    'bg-white/15 text-warm-white border-1.5 border-white/25 backdrop-blur-sm hover:bg-white/25 hover:border-white/40',
  destructive:
    'bg-red-600 text-white hover:bg-red-700',
  outline:
    'bg-transparent text-wool-500 border-1.5 border-fog-200 hover:border-oat-400 hover:text-wool-900',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-[0.7rem]',
  md: 'px-8 py-3.5 text-[0.8rem]',
  lg: 'px-10 py-4 text-[0.85rem]',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      asChild = false,
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full',
          'font-accent font-medium tracking-widest uppercase',
          'transition-all duration-300 ease-out',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
          variantStyles[variant],
          sizeStyles[size],
          isLoading && 'opacity-70 cursor-wait',
          className
        )}
        disabled={disabled || isLoading}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)

Button.displayName = 'Button'

export { Button, type ButtonProps, type ButtonVariant, type ButtonSize }
```

### `src/components/ui/badge.tsx`

```tsx
import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'exclusive'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'absolute top-4 left-4 z-[2] px-2.5 py-1 rounded-full',
        'font-accent text-[0.6rem] font-semibold tracking-widest uppercase',
        variant === 'default' && 'bg-warm-white text-wool-900',
        variant === 'exclusive' && 'bg-wool-900 text-warm-white',
        className
      )}
    >
      {children}
    </span>
  )
}
```

### `src/components/ui/input.tsx`

```tsx
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block font-accent text-[0.7rem] tracking-widest uppercase text-wool-500 mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-5 py-3.5 rounded-full',
            'bg-white/10 border-1.5 border-fog-200',
            'text-wool-900 font-body text-[0.9rem]',
            'placeholder:text-wool-300',
            'transition-colors duration-300',
            'focus:border-oat-400 focus:outline-none',
            error && 'border-red-400 focus:border-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-red-500 text-xs font-accent">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
```

---

## 4.5 — Shared Components

### `src/components/shared/SkipLink.tsx`

```tsx
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-warm-white focus:text-wool-900 focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg focus:outline-none"
    >
      Skip to main content
    </a>
  )
}
```

### `src/components/shared/ErrorBoundary.tsx`

```tsx
import React from 'react'

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="p-8 text-center">
            <h2 className="font-display text-xl mb-2">Something went wrong</h2>
            <p className="text-wool-500 text-sm">
              Please refresh the page or try again later.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-4 px-6 py-2 bg-wool-900 text-warm-white rounded-full font-accent text-xs tracking-widest uppercase"
            >
              Try Again
            </button>
          </div>
        )
      )
    }
    return this.props.children
  }
}
```

### `src/components/shared/GrainOverlay.tsx`

```tsx
export function GrainOverlay() {
  return <div className="grain-overlay" aria-hidden="true" />
}
```

### `src/components/shared/ScrollReveal.tsx`

```tsx
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { cn } from '@/lib/utils'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function ScrollReveal({ children, delay = 0, className }: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-500 ease-out',
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
```

### `src/components/shared/SneakerSVG.tsx`

```tsx
import { cn } from '@/lib/utils'

interface SneakerSVGProps {
  accentColor?: string
  className?: string
  variant?: 'low' | 'mid' | 'high' | 'slip-on'
}

export function SneakerSVG({
  accentColor = '#3D3835',
  className,
  variant = 'low',
}: SneakerSVGProps) {
  const ankleHeight: Record<string, number> = {
    low: 0,
    mid: 20,
    high: 40,
    'slip-on': -5,
  }
  const offset = ankleHeight[variant] ?? 0

  return (
    <svg
      viewBox={`0 0 320 ${180 + offset}`}
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-full h-auto', className)}
      aria-hidden="true"
      role="presentation"
    >
      {/* Sole */}
      <path
        d={`M45 ${140 + offset} L290 ${140 + offset}`}
        stroke={accentColor}
        strokeWidth="2"
        fill="none"
      />
      {/* Sole shape */}
      <path
        d={`M45 ${140 + offset} C45 ${145 + offset} 47 ${150 + offset} 52 ${152 + offset} L280 ${152 + offset} C286 ${152 + offset} 290 ${148 + offset} 290 ${140 + offset}`}
        stroke={accentColor}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Upper */}
      <path
        d={`M45 ${140 + offset} C45 ${105 + offset} 40 ${92 + offset} 65 ${80 + offset} L120 ${66 + offset} C145 ${60 + offset} 175 ${58 + offset} 200 ${64 + offset} L245 ${78 + offset} C268 ${85 + offset} 280 ${100 + offset} 285 ${116 + offset} L290 ${140 + offset}`}
        stroke={accentColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Tongue / collar variation */}
      {variant !== 'slip-on' && (
        <path
          d={`M200 ${64 + offset} C212 ${46 + offset} 240 ${40 + offset} 258 ${52 + offset}`}
          stroke={accentColor}
          strokeWidth="1.2"
          fill="none"
        />
      )}
      {/* Lace eyelets */}
      <circle cx="145" cy={62 + offset} r="2.5" fill={accentColor} opacity="0.2" />
      <circle cx="170" cy={60 + offset} r="2.5" fill={accentColor} opacity="0.2" />
      <circle cx="195" cy={61 + offset} r="2.5" fill={accentColor} opacity="0.2" />
      {/* Stitching detail */}
      <path
        d={`M65 ${80 + offset} C60 ${68 + offset} 62 ${56 + offset} 75 ${48 + offset}`}
        stroke={accentColor}
        strokeWidth="0.8"
        opacity="0.4"
        fill="none"
      />
    </svg>
  )
}
```

### `src/components/shared/Toast.tsx`

```tsx
import { useEffect } from 'react'
import { useUIStore } from '@/stores/ui'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const AUTO_DISMISS_MS = 4000

export function ToastContainer() {
  const toasts = useUIStore((s) => s.toasts)

  return (
    <div
      className="fixed bottom-6 right-6 z-[var(--z-toast)] flex flex-col gap-3"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} id={toast.id} message={toast.message} type={toast.type} />
      ))}
    </div>
  )
}

function ToastItem({
  id,
  message,
  type,
}: {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}) {
  const removeToast = useUIStore((s) => s.removeToast)

  useEffect(() => {
    const timer = setTimeout(() => removeToast(id), AUTO_DISMISS_MS)
    return () => clearTimeout(timer)
  }, [id, removeToast])

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg',
        'font-accent text-sm tracking-wide',
        'animate-fade-in-up',
        type === 'success' && 'bg-wool-900 text-warm-white',
        type === 'error' && 'bg-red-600 text-white',
        type === 'info' && 'bg-oat-200 text-wool-900'
      )}
      role="alert"
    >
      <span className="flex-1">{message}</span>
      <button
        onClick={() => removeToast(id)}
        className="p-1 hover:opacity-70 transition-opacity"
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </div>
  )
}
```

---

## 4.5 — Layout Components

### `src/components/layout/AnnouncementBar.tsx`

```tsx
export function AnnouncementBar() {
  return (
    <div
      className="bg-oat-200 text-center py-2.5 px-6 font-accent text-[0.68rem] tracking-widest uppercase text-wool-700"
      role="banner"
    >
      <span>Free shipping across Singapore</span>
      <span className="text-oat-400 mx-2">·</span>
      <span>30-Day Comfort Guarantee</span>
      <span className="text-oat-400 mx-2">·</span>
      <span>SGD Currency</span>
    </div>
  )
}
```

### `src/components/layout/Navbar.tsx`

```tsx
import { Link } from '@tanstack/react-router'
import { ShoppingBag, Menu } from 'lucide-react'
import { useCartStore, selectCartCount } from '@/stores/cart'
import { useUIStore } from '@/stores/ui'
import { useThrottledScroll } from '@/hooks/useThrottledScroll'
import { cn } from '@/lib/utils'

export function Navbar() {
  const cartCount = useCartStore(selectCartCount)
  const openCart = useUIStore((s) => s.openCart)
  const openMobileNav = useUIStore((s) => s.openMobileNav)
  const isScrolled = useScrolledState()

  return (
    <header
      className={cn(
        'sticky top-0 z-[var(--z-sticky)] transition-all duration-300',
        'backdrop-blur-xl backdrop-saturate-[1.2]',
        isScrolled
          ? 'bg-warm-white/95 border-b border-oat-200'
          : 'bg-warm-white/85 border-b border-transparent'
      )}
    >
      <div className="container-custom flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link to="/" className="font-display text-[1.6rem] font-medium tracking-[0.15em] text-wool-900">
          MĀMĀ
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Shop</Link>
          <Link to="/about" className="nav-link">About</Link>
          <a href="#features" className="nav-link">Why Wool</a>
          <a href="#sg-story" className="nav-link">Singapore</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-oat-100 transition-colors"
            aria-label={`Shopping cart, ${cartCount} items`}
          >
            <ShoppingBag size={20} strokeWidth={1.5} className="text-wool-900" />
            <span
              className={cn(
                'absolute top-0.5 right-0.5 w-[18px] h-[18px] rounded-full',
                'bg-wool-900 text-warm-white font-accent text-[0.55rem] font-semibold',
                'flex items-center justify-center',
                'transition-all duration-300',
                cartCount > 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              )}
              aria-hidden="true"
            >
              {cartCount}
            </span>
          </button>

          <button
            onClick={openMobileNav}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-oat-100 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} strokeWidth={1.5} className="text-wool-900" />
          </button>
        </div>
      </div>
    </header>
  )
}

function useScrolledState(): boolean {
  const [scrolled, setScrolled] = useState(false)

  useThrottledScroll((scrollY) => {
    setScrolled(scrollY > 20)
  }, 100)

  return scrolled
}

// Need to import useState
import { useState } from 'react'

// Nav link styles
const navLinkClass = cn(
  'font-accent text-[0.72rem] tracking-widest uppercase text-wool-500',
  'relative py-1 transition-colors duration-300 hover:text-wool-900',
  'after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px',
  'after:bg-wool-900 after:transition-width after:duration-300',
  'hover:after:w-full'
)
```

Wait, I have an issue - I defined `navLinkClass` but used `nav-link` as a className string in the JSX. Let me fix the Navbar. The Tailwind `after:` pseudo-element approach is cleaner than CSS classes. Let me rewrite it properly.

### `src/components/layout/Navbar.tsx` (Corrected)

```tsx
import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ShoppingBag, Menu } from 'lucide-react'
import { useCartStore, selectCartCount } from '@/stores/cart'
import { useUIStore } from '@/stores/ui'
import { useThrottledScroll } from '@/hooks/useThrottledScroll'
import { cn } from '@/lib/utils'

export function Navbar() {
  const cartCount = useCartStore(selectCartCount)
  const openCart = useUIStore((s) => s.openCart)
  const openMobileNav = useUIStore((s) => s.openMobileNav)
  const isScrolled = useScrolledState()

  return (
    <header
      className={cn(
        'sticky top-0 z-[var(--z-sticky)] transition-all duration-300',
        'backdrop-blur-xl backdrop-saturate-[1.2]',
        isScrolled
          ? 'bg-warm-white/95 border-b border-oat-200'
          : 'bg-warm-white/85 border-b border-transparent'
      )}
    >
      <div className="container-custom flex items-center justify-between h-[72px]">
        <Link
          to="/"
          className="font-display text-[1.6rem] font-medium tracking-[0.15em] text-wool-900"
        >
          MĀMĀ
        </Link>

        <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Shop</NavLink>
          <NavLink to="/about">About</NavLink>
          <AnchorNavLink href="#features">Why Wool</AnchorNavLink>
          <AnchorNavLink href="#sg-story">Singapore</AnchorNavLink>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-oat-100 transition-colors"
            aria-label={`Shopping cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}
          >
            <ShoppingBag size={20} strokeWidth={1.5} className="text-wool-900" />
            <span
              className={cn(
                'absolute top-0.5 right-0.5 w-[18px] h-[18px] rounded-full',
                'bg-wool-900 text-warm-white font-accent text-[0.55rem] font-semibold',
                'flex items-center justify-center',
                'transition-all duration-300',
                cartCount > 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              )}
            >
              {cartCount}
            </span>
          </button>

          <button
            onClick={openMobileNav}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-oat-100 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} strokeWidth={1.5} className="text-wool-900" />
          </button>
        </div>
      </div>
    </header>
  )
}

function useScrolledState(): boolean {
  const [scrolled, setScrolled] = useState(false)
  useThrottledScroll((scrollY) => {
    setScrolled(scrollY > 20)
  }, 100)
  return scrolled
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="font-accent text-[0.72rem] tracking-widest uppercase text-wool-500 hover:text-wool-900 transition-colors duration-300 py-1"
    >
      {children}
    </Link>
  )
}

function AnchorNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="font-accent text-[0.72rem] tracking-widest uppercase text-wool-500 hover:text-wool-900 transition-colors duration-300 py-1"
    >
      {children}
    </a>
  )
}
```

### `src/components/layout/Footer.tsx`

```tsx
import { Link } from '@tanstack/react-router'
import { Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-wool-900 text-wool-100 py-20 px-6 md:px-8" role="contentinfo">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-16">
          <div>
            <Link to="/" className="font-display text-[1.6rem] font-medium tracking-[0.15em] text-warm-white inline-block mb-4">
              MĀMĀ
            </Link>
            <p className="text-[0.85rem] text-wool-300 leading-relaxed max-w-[280px]">
              Wool sneakers, born in Singapore. Natural comfort meets urban function, one step at a time.
            </p>
          </div>

          <FooterColumn title="Shop" links={[
            { label: 'All Sneakers', to: '/products' },
            { label: 'Men', to: '/products' },
            { label: 'Women', to: '/products' },
            { label: 'New Arrivals', to: '/products' },
          ]} />

          <FooterColumn title="Help" links={[
            { label: 'Sizing Guide', to: '#' },
            { label: 'Shipping & Returns', to: '#' },
            { label: 'Care Instructions', to: '#' },
            { label: 'FAQ', to: '#' },
            { label: 'Contact Us', to: '#' },
          ]} />

          <FooterColumn title="Company" links={[
            { label: 'Our Story', to: '/about' },
            { label: 'Sustainability', to: '#' },
            { label: 'Wool Science', to: '#' },
            { label: 'Careers', to: '#' },
            { label: 'Press', to: '#' },
          ]} />
        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <span className="text-[0.75rem] text-wool-300">
            © 2025 MĀMĀ. Designed in Singapore. All rights reserved.
          </span>
          <div className="flex gap-3">
            <SocialLink href="#" icon={<Instagram size={16} />} label="Instagram" />
            <SocialLink href="#" icon={<Linkedin size={16} />} label="LinkedIn" />
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: readonly { label: string; to: string }[] }) {
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
                className="text-[0.85rem] text-wool-300 hover:text-warm-white transition-colors duration-300 py-0.5"
              >
                {link.label}
              </Link>
            ) : (
              <a
                href={link.to}
                className="text-[0.85rem] text-wool-300 hover:text-warm-white transition-colors duration-300 py-0.5"
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

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      rel="noopener noreferrer"
      target="_blank"
      className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-wool-300 hover:border-white/30 hover:bg-white/5 hover:text-warm-white transition-all duration-300"
    >
      {icon}
    </a>
  )
}
```

### `src/components/shared/MobileNavPanel.tsx`

```tsx
import { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { X } from 'lucide-react'
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
        'fixed inset-0 z-[var(--z-panel)] transition-all duration-300',
        isOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
      )}
      role="dialog"
      aria-label="Mobile navigation"
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div
        className={cn(
          'absolute inset-0 bg-wool-900/30 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={close}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={cn(
          'absolute top-0 right-0 w-[min(320px,85vw)] h-full bg-warm-white p-6',
          'transition-transform duration-500 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        inert={!isOpen}
      >
        <button
          onClick={close}
          className="ml-auto w-10 h-10 flex items-center justify-center rounded-full hover:bg-oat-100 transition-colors mb-8"
          aria-label="Close menu"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
          <MobileNavLink to="/" onClick={close}>Home</MobileNavLink>
          <MobileNavLink to="/products" onClick={close}>Shop</MobileNavLink>
          <MobileNavLink to="/about" onClick={close}>About</MobileNavLink>
          <MobileAnchorLink href="#features" onClick={close}>Why Wool</MobileAnchorLink>
          <MobileAnchorLink href="#sg-story" onClick={close}>Singapore</MobileAnchorLink>
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
```

### `src/components/cart/CartSlidePanel.tsx`

```tsx
import { useRef } from 'react'
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react'
import { useCartStore, selectCartSubtotal, selectCartIsEmpty, selectCartCount } from '@/stores/cart'
import { useUIStore } from '@/stores/ui'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { formatPrice } from '@/lib/format'
import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'

export function CartSlidePanel() {
  const isOpen = useUIStore((s) => s.isCartOpen)
  const close = useUIStore((s) => s.closeCart)
  const panelRef = useRef<HTMLDivElement>(null)

  useFocusTrap(isOpen, panelRef)

  return (
    <div
      className={cn(
        'fixed inset-0 z-[var(--z-panel)] transition-all duration-300',
        isOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
      )}
      role="dialog"
      aria-label="Shopping cart"
      aria-hidden={!isOpen}
    >
      <div
        className={cn(
          'absolute inset-0 bg-wool-900/35 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={close}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        className={cn(
          'absolute top-0 right-0 w-[min(420px,90vw)] h-full bg-warm-white',
          'flex flex-col transition-transform duration-500 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        inert={!isOpen}
      >
        <CartPanelContent close={close} />
      </div>
    </div>
  )
}

function CartPanelContent({ close }: { close: () => void }) {
  const items = useCartStore((s) => s.items)
  const isEmpty = useCartStore(selectCartIsEmpty)
  const subtotal = useCartStore(selectCartSubtotal)
  const count = useCartStore(selectCartCount)
  const updateQty = useCartStore((s) => s.updateQty)
  const removeItem = useCartStore((s) => s.removeItem)

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-oat-200">
        <h3 className="font-display text-[1.1rem]">Your Cart</h3>
        <button
          onClick={close}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-oat-100 transition-colors"
          aria-label="Close cart"
        >
          <X size={18} strokeWidth={1.5} />
        </button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-wool-300">
            <ShoppingBag size={48} strokeWidth={1} className="text-oat-300 mb-4" />
            <p className="text-[0.9rem] mb-4">Your cart is empty</p>
            <button onClick={close} className="font-accent text-xs tracking-widest uppercase text-wool-500 border-1.5 border-fog-200 rounded-full px-5 py-2.5 hover:border-wool-500 hover:text-wool-900 transition-all duration-300">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-0">
            {items.map((item) => (
              <div key={`${item.productId}-${item.color}-${item.size}`} className="flex gap-4 py-4 border-b border-oat-100">
                <div
                  className="w-[72px] h-[72px] rounded-md flex-shrink-0"
                  style={{ background: item.gradient }}
                />
                <div className="flex-1 flex flex-col justify-center">
                  <div className="font-display text-[0.95rem]">{item.name}</div>
                  <div className="text-[0.75rem] text-wool-300 mb-1.5">
                    {item.color} · {item.size}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-fog-200 rounded-md overflow-hidden">
                      <button
                        onClick={() => updateQty(item.productId, item.color, item.size, -1)}
                        className="w-7 h-7 flex items-center justify-center text-wool-500 hover:bg-oat-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center font-accent text-[0.75rem] font-medium border-x border-fog-200 leading-7">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.productId, item.color, item.size, 1)}
                        className="w-7 h-7 flex items-center justify-center text-wool-500 hover:bg-oat-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="font-accent text-[0.85rem] font-medium">
                      {formatPrice(item.price * item.qty)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.productId, item.color, item.size)}
                  className="self-start p-1 text-wool-300 hover:text-red-500 transition-colors"
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 size={14} strokeWidth={1.5} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {!isEmpty && (
        <div className="px-6 py-5 border-t border-oat-200 bg-cream">
          <div className="flex justify-between mb-1.5 text-[0.9rem]">
            <span className="text-wool-500">Subtotal</span>
            <span className="font-accent font-semibold">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between mb-4 text-[0.8rem]">
            <span className="text-wool-300">Shipping</span>
            <span className="text-oat-500 font-accent font-medium">Free</span>
          </div>
          <div className="flex gap-3">
            <Link
              to="/cart"
              onClick={close}
              className="flex-1 font-accent text-[0.7rem] tracking-widest uppercase font-medium text-wool-900 border-1.5 border-fog-200 rounded-full py-3 text-center hover:border-wool-500 transition-all duration-300"
            >
              View Cart
            </Link>
            <Link
              to="/checkout"
              onClick={close}
              className="flex-1 bg-wool-900 text-warm-white font-accent text-[0.7rem] tracking-widest uppercase font-medium rounded-full py-3 text-center hover:bg-wool-700 transition-colors duration-300"
            >
              Checkout
            </Link>
          </div>
          <p className="text-[0.7rem] text-wool-300 mt-2 text-center">
            {count} {count === 1 ? 'item' : 'items'} in cart
          </p>
        </div>
      )}
    </>
  )
}
```

---

## 4.6 — Section Components

### `src/components/sections/HeroSection.tsx`

```tsx
import { Link } from '@tanstack/react-router'
import { SneakerSVG } from '@/components/shared/SneakerSVG'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section
      className="relative min-h-[calc(100vh-72px-40px)] flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(170deg, #F7F4F0 0%, #F5F0E8 30%, #EDE5D8 60%, #E8E5E0 100%)',
      }}
      aria-labelledby="hero-heading"
    >
      {/* Decorative radial gradient */}
      <div
        className="absolute -top-[20%] -right-[10%] w-[60%] h-[120%] opacity-60 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, #E0D4C2 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-[2] max-w-[640px] py-16 md:py-0">
        <p className="text-eyebrow mb-4">Singapore-Born Wool Sneakers</p>
        <h1 id="hero-heading" className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.15] tracking-tight mb-6">
          Wool, <em className="italic text-oat-500">Reimagined</em>
          <br />
          for the City
        </h1>
        <p className="text-[1.1rem] leading-relaxed text-wool-500 max-w-[480px] mb-8">
          Where natural merino meets modern stride. Engineered for tropical warmth,
          crafted for urban style. The sneaker your feet have been waiting for.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/products">
            <Button size="lg">Shop Collection</Button>
          </Link>
          <Link to="/about">
            <Button variant="secondary" size="lg">Our Story</Button>
          </Link>
        </div>
      </div>

      {/* Decorative sneaker */}
      <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[50%] max-w-[600px] opacity-[0.12] pointer-events-none hidden md:block">
        <SneakerSVG variant="low" />
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 hover:opacity-70 transition-opacity" aria-hidden="true">
        <span className="font-accent text-[0.6rem] tracking-[0.15em] uppercase text-wool-300">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-wool-300 to-transparent animate-scroll-pulse" />
      </div>
    </section>
  )
}
```

### `src/components/sections/BrandStorySection.tsx`

```tsx
import { Link } from '@tanstack/react-router'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/button'

export function BrandStorySection() {
  return (
    <section id="about" className="py-24 md:py-32 lg:py-40 bg-cream" aria-labelledby="brand-heading">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Visual */}
          <ScrollReveal>
            <div
              className="relative aspect-[4/5] rounded-[20px] overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #EDE5D8 0%, #E0D4C2 40%, #D8D4CE 100%)',
              }}
            >
              <svg
                viewBox="0 0 400 500"
                className="absolute inset-0 w-full h-full opacity-[0.08]"
                aria-hidden="true"
              >
                <defs>
                  <pattern id="wool-fiber" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M0 10 Q5 5 10 10 Q15 15 20 10" stroke="#3D3835" strokeWidth="0.5" fill="none" />
                    <path d="M0 20 Q5 15 10 20 Q15 25 20 20" stroke="#3D3835" strokeWidth="0.3" fill="none" opacity="0.5" />
                  </pattern>
                </defs>
                <rect width="400" height="500" fill="url(#wool-fiber)" />
              </svg>
              <span className="absolute bottom-8 left-6 font-accent text-[0.6rem] tracking-[0.15em] uppercase text-wool-500 opacity-60">
                Merino Wool Fibre · 18.5μm
              </span>
            </div>
          </ScrollReveal>

          {/* Text */}
          <ScrollReveal delay={200}>
            <div>
              <p className="text-eyebrow mb-3">Our Philosophy</p>
              <h2 id="brand-heading" className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-tight mb-6">
                Born from the belief that comfort should never compromise style
              </h2>
              <div className="space-y-4 text-wool-500 leading-relaxed">
                <p>
                  <strong className="text-wool-900 font-medium">MĀMĀ</strong> was born in Singapore — a city where
                  tropical heat meets urban ambition. We asked a simple question: why should you choose between the
                  breathability of wool and the functionality of a modern sneaker?
                </p>
                <p>
                  Our merino wool is sourced from certified farms in New Zealand, then engineered into knit uppers
                  that breathe, wick, and adapt to your environment. Each pair is designed in Singapore and tested
                  in the humidity we know best.
                </p>
                <p>
                  The result: a sneaker that <strong className="text-wool-900 font-medium">feels like a cloud</strong> and{' '}
                  <strong className="text-wool-900 font-medium">looks like it belongs</strong> — on the MRT, at a
                  meeting, or wandering through Tiong Bahru on a Sunday morning.
                </p>
              </div>
              <div className="mt-4">
                <Link to="/about">
                  <Button variant="secondary" size="sm">Read Our Full Story</Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
```

### `src/components/sections/ProductGrid.tsx`

```tsx
import { Link } from '@tanstack/react-router'
import { products } from '@/lib/products'
import { formatPrice } from '@/lib/format'
import { useCartStore } from '@/stores/cart'
import { useUIStore } from '@/stores/ui'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { SneakerSVG } from '@/components/shared/SneakerSVG'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export function ProductGrid() {
  return (
    <section id="products" className="py-24 md:py-32 lg:py-40 bg-warm-white" aria-labelledby="products-heading">
      <div className="container-custom">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-eyebrow mb-3">The Collection</p>
            <h2 id="products-heading" className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-tight mb-4">
              Every Step, Naturally Crafted
            </h2>
            <p className="text-wool-500 max-w-[480px] mx-auto">
              Six silhouettes. One philosophy. Merino wool sneakers designed for the way you actually live.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ScrollReveal key={product.id} delay={index * 100}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

import type { Product } from '@/types/product'

function ProductCard({ product }: { product: Product }) {
  const [activeColorIndex, setActiveColorIndex] = useState(0)
  const [isAdding, setIsAdding] = useState(false)
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useUIStore((s) => s.openCart)
  const addToast = useUIStore((s) => s.addToast)

  const activeColor = product.colors[activeColorIndex]

  async function handleAddToCart() {
    setIsAdding(true)

    // Simulate brief network delay for UX
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

  return (
    <div className="group relative rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(61,56,53,0.10)]">
      {/* Image area */}
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
            variant={getVariantFromCategory(product.category)}
            className="w-[65%] opacity-70 group-hover:opacity-90 group-hover:scale-103 group-hover:-rotate-1 transition-all duration-500 ease-out"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="p-6 bg-cream">
        <Link to="/products/$slug" params={{ slug: product.slug }}>
          <h3 className="font-display text-[1.2rem] mb-0.5">{product.name}</h3>
        </Link>
        <p className="text-[0.85rem] text-wool-300 mb-3">{product.description}</p>

        <div className="flex items-center justify-between mb-3">
          <span className="font-accent text-[0.95rem] font-medium">
            {formatPrice(product.price)}
          </span>
          <div className="flex gap-1.5">
            {product.colors.map((color, i) => (
              <button
                key={color.hex}
                onClick={() => setActiveColorIndex(i)}
                className={cn(
                  'w-3.5 h-3.5 rounded-full border-1.5 transition-transform duration-150',
                  i === activeColorIndex
                    ? 'border-wool-900 shadow-[0_0_0_2px_var(--color-warm-white),0_0_0_3.5px_var(--color-wool-900)] scale-110'
                    : 'border-oat-200 hover:scale-120'
                )}
                style={{ backgroundColor: color.hex }}
                aria-label={`Color: ${color.name}`}
                aria-pressed={i === activeColorIndex}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={cn(
            'w-full py-3 rounded-md font-accent text-[0.7rem] tracking-widest uppercase font-medium',
            'transition-all duration-300',
            isAdding
              ? 'bg-oat-400 text-wool-900'
              : 'bg-wool-900 text-warm-white hover:bg-wool-700 hover:-translate-y-px'
          )}
        >
          {isAdding ? 'Adding...' : 'Quick Add'}
        </button>
      </div>
    </div>
  )
}

function getVariantFromCategory(category: string): 'low' | 'mid' | 'high' | 'slip-on' {
  switch (category) {
    case 'mid-top': return 'mid'
    case 'high-top': return 'high'
    case 'slip-on': return 'slip-on'
    default: return 'low'
  }
}
```

### `src/components/sections/FeaturesSection.tsx`

```tsx
import { Sun, Droplets, Shield } from 'lucide-react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

const features = [
  {
    icon: Sun,
    title: 'Naturally Cooling',
    description: 'Merino fibres breathe at a microscopic level, wicking moisture 30% faster than synthetic mesh. Your feet stay dry even at 32°C.',
  },
  {
    icon: Droplets,
    title: 'Machine Washable',
    description: 'Toss them in on a gentle cycle, air dry overnight. Our proprietary knit construction maintains shape wash after wash.',
  },
  {
    icon: Shield,
    title: 'Odour Resistant',
    description: 'Natural lanolin and the fibre\'s complex structure inhibit bacterial growth. Go sock-free — we won\'t tell.',
  },
] as const

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 md:py-32 lg:py-40 bg-oat-50" aria-labelledby="features-heading">
      <div className="container-custom">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-eyebrow mb-3">Why Wool</p>
            <h2 id="features-heading" className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-tight">
              Natural Wool Meets Urban Function
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 100}>
              <article className="p-10 bg-cream rounded-xl border border-oat-200 transition-all duration-300 hover:border-oat-300 hover:shadow-[0_4px_16px_rgba(61,56,53,0.06)]">
                <div className="w-14 h-14 rounded-xl bg-oat-100 flex items-center justify-center mb-6 group-hover:bg-oat-200 transition-colors">
                  <feature.icon size={24} strokeWidth={1.5} className="text-wool-500" />
                </div>
                <h3 className="font-display text-[1.15rem] mb-3">{feature.title}</h3>
                <p className="text-[0.9rem] text-wool-500 leading-relaxed">{feature.description}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### `src/components/sections/SingaporeStorySection.tsx`

```tsx
import { useEffect, useRef, useState } from 'react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

export function SingaporeStorySection() {
  return (
    <section id="sg-story" className="py-24 md:py-32 lg:py-40 bg-wool-900 text-warm-white relative overflow-hidden" aria-labelledby="sg-heading">
      {/* Decorative radial */}
      <div
        className="absolute -top-[30%] -right-[20%] w-[60%] h-[160%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(212,196,176,0.08) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-[2]">
        <div className="grid grid-cols-1 md:grid-cols-[5fr_4fr] gap-8 md:gap-12">
          <ScrollReveal>
            <div>
              <p className="text-eyebrow !text-oat-400 mb-3">The Singapore Proof</p>
              <h2 id="sg-heading" className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-tight text-warm-white mb-6">
                Engineered for <em className="italic text-oat-300">32°C</em>
                <br />
                and 85% Humidity
              </h2>
              <div className="space-y-4 text-wool-100 leading-relaxed">
                <p>
                  Most wool brands are designed for Scandinavian winters. We designed ours for the MRT
                  at 8:47 AM, the walk from Tanjong Pagar to Chinatown, and every hawker centre queue
                  in between.
                </p>
                <p>
                  Our Wool-Air™ knit structure creates micro-ventilation channels that allow heat to
                  escape while maintaining the soft, structured silhouette that makes our sneakers look
                  as good at a client dinner as they do on a weekend stroll.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-10">
                {[
                  { value: '18.5', label: 'Micron Fibre' },
                  { value: '30%', label: 'Faster Wicking' },
                  { value: '2.3M', label: 'Steps Tested' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                    <div className="font-display text-[2rem] font-light text-oat-300 mb-1">{stat.value}</div>
                    <div className="font-accent text-[0.6rem] tracking-[0.12em] uppercase text-wool-300">{stat.label}</div>
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
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const bars = [
    { label: 'Avg. Temperature', value: '32°C', width: '85%' },
    { label: 'Relative Humidity', value: '85%', width: '92%' },
    { label: 'Wool Moisture Wicking', value: '97%', width: '97%' },
  ]

  return (
    <div ref={ref} className="bg-white/[0.04] border border-white/[0.08] rounded-[20px] p-8 w-full max-w-[360px]">
      <h3 className="font-display text-[1.1rem] text-warm-white mb-6">Singapore Climate Profile</h3>

      {bars.map((bar) => (
        <div key={bar.label} className="mb-5 last:mb-6">
          <div className="flex justify-between text-[0.8rem] mb-1.5">
            <span className="text-wool-100">{bar.label}</span>
            <span className="font-accent font-semibold text-oat-300">{bar.value}</span>
          </div>
          <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-oat-300 to-oat-500 transition-all duration-[1500ms] ease-out"
              style={{ width: isVisible ? bar.width : '0%' }}
            />
          </div>
        </div>
      ))}

      <p className="text-[0.78rem] text-wool-300 leading-relaxed pt-5 border-t border-white/[0.06]">
        Our merino wool fibre can absorb up to 35% of its weight in moisture before feeling wet
        — keeping your feet comfortable even in tropical conditions.
      </p>
    </div>
  )
}
```

### `src/components/sections/TestimonialsSection.tsx`

```tsx
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Star } from 'lucide-react'

const testimonials = [
  {
    quote: 'I was sceptical about wool sneakers in Singapore. After one week, I donated all my other shoes. These are genuinely the most comfortable things I\'ve ever worn.',
    name: 'Jamie Tan',
    role: 'Product Designer · Tiong Bahru',
    initials: 'J',
    avatarBg: 'bg-oat-300',
  },
  {
    quote: 'I wear The Merino Runner to client meetings and then walk 10K steps after work. No break-in period, no blisters, no odour. It\'s almost unfair.',
    name: 'Rishi Kapoor',
    role: 'Consultant · Marina Bay',
    initials: 'R',
    avatarBg: 'bg-fog-300',
  },
  {
    quote: 'The Tropical is my go-to for hawker centre hopping. Breathable, easy to clean after a chili mishap, and they still look sharp.',
    name: 'Lim Wei Ling',
    role: 'Architect · Telok Ayer',
    initials: 'L',
    avatarBg: 'bg-oat-400',
  },
] as const

export function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 lg:py-40 bg-cream" aria-labelledby="testimonials-heading">
      <div className="container-custom">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-eyebrow mb-3">What Singapore Says</p>
            <h2 id="testimonials-heading" className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-tight">
              Trusted by 12,000+ Pairs of Feet
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <ScrollReveal key={t.name} delay={index * 100}>
              <article className="p-8 bg-warm-white rounded-xl border border-oat-200">
                <div className="flex gap-0.5 mb-4" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="fill-oat-400 text-oat-400" />
                  ))}
                </div>
                <blockquote className="font-display text-[1.05rem] italic leading-relaxed text-wool-500 mb-6">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-display text-[0.85rem] font-medium text-warm-white ${t.avatarBg}`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <strong className="block font-semibold text-[0.85rem]">{t.name}</strong>
                    <span className="text-wool-300 text-[0.75rem]">{t.role}</span>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### `src/components/sections/NewsletterSection.tsx`

```tsx
import { useActionState } from 'react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface FormState {
  readonly message: string
  readonly type: 'idle' | 'success' | 'error'
}

export function NewsletterSection() {
  const [state, formAction, isPending] = useActionState(
    async (_prev: FormState, formData: FormData): Promise<FormState> => {
      const email = formData.get('email') as string
      if (!email?.includes('@')) {
        return { message: 'Please enter a valid email address.', type: 'error' }
      }
      // Simulate API call
      await new Promise((r) => setTimeout(r, 1000))
      return { message: 'Welcome to the flock! Check your inbox for a surprise.', type: 'success' }
    },
    { message: '', type: 'idle' }
  )

  return (
    <section id="journal" className="py-24 md:py-32 lg:py-40 text-center relative overflow-hidden" style={{ background: 'linear-gradient(170deg, #E0D4C2 0%, #D4C4B0 50%, #D8D4CE 100%)' }} aria-labelledby="cta-heading">
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(61,56,53,0.01) 5px, rgba(61,56,53,0.01) 10px)`,
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-[2]">
        <ScrollReveal>
          <p className="text-eyebrow mb-3">Stay in the Loop</p>
          <h2 id="cta-heading" className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-tight mb-4">
            Step Into Comfort
          </h2>
          <p className="text-wool-500 max-w-[420px] mx-auto mb-8">
            Be the first to know about new drops, Singapore-exclusive colourways, and the science behind our wool.
          </p>

          <form action={formAction} className="flex flex-col sm:flex-row gap-3 max-w-[440px] mx-auto">
            <label htmlFor="cta-email" className="sr-only">Email address</label>
            <Input
              id="cta-email"
              name="email"
              type="email"
              placeholder="your@email.com"
              required
              autoComplete="email"
              className="flex-1 !bg-white/10 !border-white/20 !text-wool-900 !placeholder-wool-300 focus:!border-oat-400"
              disabled={isPending}
            />
            <Button type="submit" size="sm" isLoading={isPending}>
              Subscribe
            </Button>
          </form>

          {state.type !== 'idle' && (
            <p
              className={`mt-4 text-sm font-accent ${
                state.type === 'error' ? 'text-red-600' : 'text-wool-900'
              }`}
              role="status"
              aria-live="polite"
            >
              {state.message}
            </p>
          )}
        </ScrollReveal>
      </div>
    </section>
  )
}
```

---

## 4.4 — Routes

### `src/routes/__root.tsx`

```tsx
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { CartSlidePanel } from '@/components/cart/CartSlidePanel'
import { MobileNavPanel } from '@/components/shared/MobileNavPanel'
import { GrainOverlay } from '@/components/shared/GrainOverlay'
import { ToastContainer } from '@/components/shared/Toast'
import { SkipLink } from '@/components/shared/SkipLink'

export const Route = createRootRoute({ component: RootComponent })

function RootComponent() {
  return (
    <>
      <SkipLink />
      <AnnouncementBar />
      <Navbar />
      <main id="main-content" className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <CartSlidePanel />
      <MobileNavPanel />
      <GrainOverlay />
      <ToastContainer />
    </>
  )
}
```

### `src/routes/index.tsx`

```tsx
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
```

### `src/routes/about.tsx`

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="py-24 md:py-32">
      <div className="container-custom max-w-[720px]">
        <ScrollReveal>
          <p className="text-eyebrow mb-3">Our Story</p>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.15] tracking-tight mb-8">
            Wool, born from<br />
            <em className="italic text-oat-500">necessity</em>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="space-y-6 text-wool-500 leading-relaxed text-[1.05rem]">
            <p>
              In 2022, our founder was walking through Orchard Road in July. The sneakers were
              synthetic. The feet were suffocating. The question was obvious: <strong className="text-wool-900 font-medium">why isn't anyone making
              wool sneakers for tropical cities?</strong>
            </p>
            <p>
              The answer was more complex than expected. Merino wool had been optimised for cold
              climates for decades. Every supplier, every knitting technique, every test was designed
              for Scandinavia, not Singapore.
            </p>
            <p>
              So we started from scratch. Two years of R&D, 47 prototype iterations, and a partnership
              with New Zealand's finest merino farms later, MĀMĀ was born — the world's first wool
              sneaker brand designed specifically for tropical urban living.
            </p>
            <p>
              Our Wool-Air™ knit technology creates microscopic ventilation channels within the merino
              fibre structure, allowing heat to escape while maintaining the natural moisture-wicking
              properties that make wool extraordinary. The result: a sneaker that keeps you cooler in
              32°C than any synthetic mesh ever could.
            </p>
            <p>
              We believe in radical transparency. Our wool is ZQ-certified, ensuring the highest
              standards of animal welfare and environmental sustainability. Every pair comes with a
              traceable fibre code that lets you see exactly which farm your wool came from.
            </p>
            <p>
              <strong className="text-wool-900 font-medium">MĀMĀ</strong> is more than a sneaker brand.
              It's a belief that the best materials in the world haven't been fully explored yet — and
              that tropical cities deserve better footwear.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="mt-10 flex gap-4">
            <Link to="/products">
              <Button size="lg">Shop Collection</Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
```

### `src/routes/products.index.tsx`

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { products, sortProducts, type SortOption } from '@/lib/products'
import { formatPrice } from '@/lib/format'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { SneakerSVG } from '@/components/shared/SneakerSVG'
import { Badge } from '@/components/ui/badge'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/products')({
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
            <p className="text-eyebrow mb-3">The Collection</p>
            <h1 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-tight mb-4">
              All Sneakers
            </h1>
            <p className="text-wool-500 max-w-[480px] mx-auto">
              Merino wool sneakers designed for the way you actually live.
            </p>
          </div>
        </ScrollReveal>

        {/* Sort */}
        <div className="flex justify-end mb-8">
          <label htmlFor="sort-select" className="sr-only">Sort by</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="font-accent text-xs tracking-widest uppercase text-wool-500 bg-oat-50 border border-oat-200 rounded-full px-4 py-2 outline-none focus:border-oat-400"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((product, index) => (
            <ScrollReveal key={product.id} delay={index * 80}>
              <Link
                to="/products/$slug"
                params={{ slug: product.slug }}
                className="group block relative rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(61,56,53,0.10)]"
              >
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
                    variant={product.category === 'mid-top' ? 'mid' : product.category === 'high-top' ? 'high' : product.category === 'slip-on' ? 'slip-on' : 'low'}
                    className="w-[65%] opacity-70 group-hover:opacity-90 group-hover:scale-103 transition-all duration-500"
                  />
                </div>
                <div className="p-6 bg-cream">
                  <h3 className="font-display text-[1.2rem] mb-0.5">{product.name}</h3>
                  <p className="text-[0.85rem] text-wool-300 mb-2">{product.description}</p>
                  <span className="font-accent text-[0.95rem] font-medium">{formatPrice(product.price)}</span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  )
}
```

### `src/routes/products.$slug.tsx`

```tsx
import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { ChevronRight, Minus, Plus, Ruler } from 'lucide-react'
import { getProductBySlug, products } from '@/lib/products'
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
    if (!product) {
      throw new Error('Product not found')
    }
    return { product }
  },
})

function ProductDetailPage() {
  const { product } = Route.useLoaderData()
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(
    product.sizes.findIndex((s) => s.inStock)
  )
  const [isAdding, setIsAdding] = useState(false)

  const addItem = useCartStore((s) => s.addItem)
  const openCart = useUIStore((s) => s.openCart)
  const addToast = useUIStore((s) => s.addToast)
  const openSizeGuide = useUIStore((s) => s.openSizeGuide)

  const selectedColor = product.colors[selectedColorIndex]
  const selectedSize = product.sizes[selectedSizeIndex]

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
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[0.75rem] font-accent tracking-wider uppercase text-wool-300 mb-10" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-wool-900 transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/products" className="hover:text-wool-900 transition-colors">Shop</Link>
          <ChevronRight size={12} />
          <span className="text-wool-500">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Product Image */}
          <div
            className="aspect-square rounded-[20px] flex items-center justify-center"
            style={{ background: product.gradient }}
          >
            <SneakerSVG
              accentColor={product.svgAccentColor}
              variant={product.category === 'mid-top' ? 'mid' : product.category === 'high-top' ? 'high' : product.category === 'slip-on' ? 'slip-on' : 'low'}
              className="w-[60%] opacity-80"
            />
          </div>

          {/* Product Info */}
          <div>
            {product.tag && (
              <span className="inline-block font-accent text-[0.6rem] tracking-widest uppercase font-semibold bg-oat-100 text-wool-700 px-3 py-1 rounded-full mb-4">
                {product.tag}
              </span>
            )}
            <h1 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-tight mb-2">
              {product.name}
            </h1>
            <p className="text-wool-500 mb-6">{product.description}</p>
            <p className="font-accent text-[1.5rem] font-medium mb-8">{formatPrice(product.price)}</p>

            {/* Color Selector */}
            <div className="mb-8">
              <p className="font-accent text-[0.7rem] tracking-widest uppercase text-wool-500 mb-3">
                Color: <span className="text-wool-900 font-medium">{selectedColor.name}</span>
              </p>
              <div className="flex gap-3">
                {product.colors.map((color, i) => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColorIndex(i)}
                    className={cn(
                      'w-10 h-10 rounded-full border-2 transition-all duration-200',
                      i === selectedColorIndex
                        ? 'border-wool-900 shadow-[0_0_0_2px_var(--color-warm-white),0_0_0_4px_var(--color-wool-900)]'
                        : 'border-oat-200 hover:border-wool-500'
                    )}
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Color: ${color.name}`}
                    aria-pressed={i === selectedColorIndex}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="font-accent text-[0.7rem] tracking-widest uppercase text-wool-500">
                  Size: <span className="text-wool-900 font-medium">{selectedSize?.label ?? 'Select'}</span>
                </p>
                <button
                  onClick={openSizeGuide}
                  className="flex items-center gap-1.5 font-accent text-[0.65rem] tracking-widest uppercase text-wool-300 hover:text-wool-500 transition-colors"
                >
                  <Ruler size={14} strokeWidth={1.5} />
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {product.sizes.map((size, i) => (
                  <button
                    key={size.eu}
                    onClick={() => size.inStock && setSelectedSizeIndex(i)}
                    disabled={!size.inStock}
                    className={cn(
                      'py-2.5 rounded-md font-accent text-[0.7rem] tracking-wider font-medium border transition-all duration-200',
                      i === selectedSizeIndex && size.inStock
                        ? 'border-wool-900 bg-wool-900 text-warm-white'
                        : size.inStock
                          ? 'border-oat-200 text-wool-500 hover:border-wool-500'
                          : 'border-oat-100 text-wool-300 line-through cursor-not-allowed opacity-40'
                    )}
                    aria-label={`EU size ${size.eu}${!size.inStock ? ' (out of stock)' : ''}`}
                    aria-pressed={i === selectedSizeIndex}
                  >
                    {size.eu}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              size="lg"
              className="w-full !rounded-lg"
              onClick={handleAddToCart}
              isLoading={isAdding}
              disabled={!selectedSize?.inStock}
            >
              {selectedSize?.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>

            {/* Features */}
            <div className="mt-10 pt-8 border-t border-oat-200">
              <h3 className="font-accent text-[0.7rem] tracking-widest uppercase text-wool-500 mb-4">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-[0.9rem] text-wool-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-oat-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Care */}
            <div className="mt-8 pt-8 border-t border-oat-200">
              <h3 className="font-accent text-[0.7rem] tracking-widest uppercase text-wool-500 mb-4">Care Instructions</h3>
              <ul className="space-y-2">
                {product.careInstructions.map((instruction) => (
                  <li key={instruction} className="flex items-center gap-3 text-[0.9rem] text-wool-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-fog-300 flex-shrink-0" />
                    {instruction}
                  </li>
                ))}
              </ul>
            </div>

            {/* Long Description */}
            <div className="mt-8 pt-8 border-t border-oat-200">
              <p className="text-wool-500 leading-relaxed">{product.longDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### `src/routes/cart.tsx`

```tsx
import { createFileRoute, Link } from '@tanstack/react-router'
import { ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react'
import { useCartStore, selectCartSubtotal, selectCartIsEmpty } from '@/stores/cart'
import { formatPrice } from '@/lib/format'

export const Route = createFileRoute('/cart')({
  component: CartPage,
})

function CartPage() {
  const items = useCartStore((s) => s.items)
  const isEmpty = useCartStore(selectCartIsEmpty)
  const subtotal = useCartStore(selectCartSubtotal)
  const updateQty = useCartStore((s) => s.updateQty)
  const removeItem = useCartStore((s) => s.removeItem)
  const clearCart = useCartStore((s) => s.clearCart)

  return (
    <div className="py-16 md:py-24">
      <div className="container-custom max-w-[900px]">
        <h1 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-tight mb-10">
          Your Cart
        </h1>

        {isEmpty ? (
          <div className="text-center py-20">
            <ShoppingBag size={64} strokeWidth={1} className="text-oat-300 mx-auto mb-6" />
            <p className="text-wool-500 text-lg mb-6">Your cart is empty</p>
            <Link
              to="/products"
              className="inline-block bg-wool-900 text-warm-white font-accent text-xs tracking-widest uppercase font-medium rounded-full px-8 py-3.5 hover:bg-wool-700 transition-colors"
            >
              Browse Collection
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-0">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.color}-${item.size}`}
                  className="flex gap-5 py-6 border-b border-oat-200"
                >
                  <div
                    className="w-[100px] h-[100px] rounded-lg flex-shrink-0"
                    style={{ background: item.gradient }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <Link
                        to="/products/$slug"
                        params={{ slug: item.slug }}
                        className="font-display text-[1.1rem] hover:text-wool-500 transition-colors"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.productId, item.color, item.size)}
                        className="p-1 text-wool-300 hover:text-red-500 transition-colors"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={16} strokeWidth={1.5} />
                      </button>
                    </div>
                    <p className="text-[0.8rem] text-wool-300 mb-3">
                      {item.color} · {item.size}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-oat-200 rounded-md overflow-hidden">
                        <button
                          onClick={() => updateQty(item.productId, item.color, item.size, -1)}
                          className="w-8 h-8 flex items-center justify-center text-wool-500 hover:bg-oat-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center font-accent text-sm font-medium border-x border-oat-200 leading-8">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.productId, item.color, item.size, 1)}
                          className="w-8 h-8 flex items-center justify-center text-wool-500 hover:bg-oat-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="font-accent text-[1rem] font-medium">
                        {formatPrice(item.price * item.qty)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-8 bg-cream rounded-xl p-8">
              <div className="flex justify-between mb-2">
                <span className="text-wool-500">Subtotal</span>
                <span className="font-accent font-semibold text-lg">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between mb-6">
                <span className="text-wool-300 text-sm">Shipping</span>
                <span className="text-oat-500 font-accent font-medium text-sm">Free</span>
              </div>
              <div className="flex gap-4">
                <Link
                  to="/checkout"
                  className="flex-1 bg-wool-900 text-warm-white font-accent text-xs tracking-widest uppercase font-medium rounded-full py-4 text-center hover:bg-wool-700 transition-colors"
                >
                  Checkout
                </Link>
                <button
                  onClick={clearCart}
                  className="font-accent text-xs tracking-wid
