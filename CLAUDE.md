---
IMPORTANT: This file is read fresh for every conversation. Keep it brief, practical, and actionable.
---

# MĀMĀ Wool Sneakers E-Commerce

**Project**: Singapore-born wool sneakers. React 19 SPA — Stripeless checkout, product grid, cart, and Singapore-local storytelling.  
**Stack**: React 19 + TypeScript 6 + Vite 8 + Tailwind CSS v4 + TanStack Router 1.169 + Zustand 5 + Vitest 4

---

## Core Identity & Purpose

MĀMĀ is a boutique e-commerce front-end. It sells six wool sneaker SKUs to tropical urban audiences. The palette, typography, and micro-animations are intentionally anti-generic (no purple gradients, no safe Inter/Roboto pairings). The site lands on a quiet-luxury aesthetic: low-saturation warm whites, oat tones, foggy-gray gradients, and a subtle grain texture overlay.

---

## Foundational Principles

### 1. The Meticulous Approach (Six-Phase Workflow)

Every task must move through these phases. Never skip steps.

1. **ANALYZE** — Deep, multi-dimensional requirement mining. No surface-level assumptions.
2. **PLAN** — Detailed roadmap with tasks, dependencies, success criteria. Present for explicit user approval.
3. **VALIDATE** — Obtain explicit user approval before writing code.
4. **IMPLEMENT** — Modular, tested, documented builds. Test each component before integration.
5. **VERIFY** — Run `tsc --noEmit`, `vitest run`, `npm run build` before delivery.
6. **DELIVER** — Complete handoff with usage instructions and next steps.

### 2. Anti-Generic Design

- **No predictable gr**ids**: Layouts are content-driven, not card-grid defaults.
- **Typography-first hierarchy**: Cormorant Garamond (display), DM Sans (body), Space Grotesk (accent labels).
- **Color discipline**: Only the wool-palette CSS custom properties defined in `src/globals.css` — no arbitrary hex literals in components.
- **Whitespace as structure**: Generous section padding (120-160 px), not equal padding everywhere.

### 3. Library-First CSS

- Tailwind CSS v4 via `@theme inline` in `globals.css` — no `tailwind.config.js`.
- No arbitrary values (e.g., `bg-[#FAF8F5]`). Extend the `@theme` block instead.
- All custom colors and tokens live in `globals.css`.
- Negative values: use `-bottom-24` (never `bottom--24`).

---

## Implementation Standards

### React 19

- **StrictMode** is active.
- `useActionState` is required for all async forms (checkout, newsletter).
- `useOptimistic` for immediate UI feedback on slow operations (add to cart).
- `forwardRef` must be used for all reusable form primitives.
- Every async button has `disabled={isPending}` and a loading spinner.
- No `propTypes`, no `defaultProps` — TypeScript strict replaces these.

### TypeScript 6 (strict)

```
"strict": true
"noUnusedLocals": true
"noUnusedParameters": true
"erasableSyntaxOnly": true
"verbatimModuleSyntax": true
```

- **Never `any`**. Use `unknown` or explicit types.
- **No `enum`/`namespace`** — union types only.
- **`import type`** for type-only imports. Runtime `import` only brings components.
- Interface for object shapes; `type` for unions and intersections.
- Function components typed explicitly.

### Tailwind CSS v4

- Configuration lives in `src/globals.css` via `@theme inline`.
- Custom design tokens: colors, fonts, spacing, z-index, keyframes.
- No `tailwind.config.js`. No arbitrary bracket values.
- Mobile-first responsive (`sm:`, `md:`, `lg:`).
- Custom utilities in `@layer utilities` inside `globals.css`.

### State Management (Zustand 5)

```
useCartStore (persist) — items, addItem, removeItem, updateQty, clearCart
useUIStore (no persist) — isCartOpen, isMobileNavOpen, toasts, modals
```

Rules:
- Use selectors in JSX: `const count = useCartStore(s => s.count)`
- Never `useCartStore.getState()` in render path.
- `useCartStore` persists only `items`. UI state (modals, toasts) is ephemeral.
- Store-to-store calls inside actions are allowed (e.g., addItem then openCart).

### Routing (TanStack Router 1.169)

- File-based routing in `src/routes/`.
- Must run `npx tsr generate` after every route change.
- Route params via `Route.useLoaderData()`.

```tsx
// Product detail — loader + typed params
export const Route = createFileRoute('/products/$slug')({
  component: ProductDetailPage,
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug)
    if (!product) throw new Error('Product not found')
    return { product }
  },
})
```

### Icon Policy

- **Lucide-React** only. Tree-shakeable, named imports.
- No raw SVG inline unless required (e.g., `SneakerSVG.tsx`).
- Decorative SVGs: `aria-hidden="true"` or `role="presentation"`.

---

## Development Workflow

### Environment Setup

```bash
npm install --legacy-peer-deps
npx tsr generate             # Generate TanStack route tree
cp .env.example .env        # If env vars are needed
```

### Build Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite dev server (port 5173) |
| `npm run build` | `tsc --noEmit` + Vite production build |
| `npm run preview` | Preview production build |
| `npm test` | Vitest in watch mode |
| `npx vitest run` | Run tests once (CI) |
| `npx tsc --noEmit` | TypeScript strict check |
| `npm run route:generate` | `npx tsr generate` shorthand |

**Quality Gate (run in order):**
```bash
npx tsc --noEmit   # MUST pass first
npx vitest run      # MUST pass second
npm run build       # MUST pass third
```

---

## Testing Strategy

### Unit Tests (Vitest + jsdom + Testing Library React)

- **TDD**: Red → Green → Refactor. Write failing test first.
- **Factory pattern**: `getMockItem(overrides)` for test data.
- Tests at `src/test/*.test.ts`.
- Store mutations wrapped in `act()`.
- `requestAnimationFrame` mocked in `src/test/setup.ts`.

### Coverage

| File | Concern | Tests |
|------|---------|-------|
| `cart.store.test.ts` | add, increment, remove, subtotal, count, empty, updateQty, clear | 9 |
| `ui.store.test.ts` | toggle, mutual exclusion, toast CRUD | 4 |
| `utils.test.ts` | `cn()`, `formatPrice()` | 4 |

### Component Tests (planned / add as needed)

- `ProductCard`: render, click add-to-cart, toast triggers
- `Navbar`: scroll state, cart badge count
- `CartSlidePanel`: open/close, qty +/-, remove, focus trap, empty state
- `NewsletterSection`: `useActionState` form, validation, success message

---

## Code Quality Standards

### ESLint + TypeScript (strict)

- All `noUnusedLocals` and `noUnusedParameters` respected.
- No `any`. Use `unknown` + type narrowing.
- `verbatimModuleSyntax` enforced — `import type` for type-only imports.

### Tailwind v4 CSS Discipline

- All colors via `@theme inline` tokens — no raw hex in class names except design-token reference (e.g., `bg-[#3D3835]` only when referring to the specific wool-900 token).
- No `!important` in utilities. Use Tailwind's layer overrides (`space-y-0` → `space-y-4` is automatic).
- `prefers-reduced-motion` respected in `globals.css`.

### Accessibility (WCAG 2.1 AA)

- `<SkipLink>` present on every page (WCAG 2.4.1).
- All modals/panels use `useFocusTrap` (keyboard trap).
- Buttons have visible `:focus-visible` states (2 px outline, outline-offset 2 px).
- Decorative SVGs have `aria-hidden="true"` or `role="presentation"`.
- Interactive elements have `aria-label` when no visible text.
- Form inputs have associated `<label htmlFor>` or `aria-label`.
- Tables use `<th>` with `scope`.

---

## Git & Version Control

- **Short-lived branches** — merge within 1–3 days.
- **Conventional Commits** for readability.
- **Pre-merge gate**: `tsc --noEmit` → `vitest run` → `npm run build` must pass.

---

## Error Handling & Debugging

### Error Boundary

`src/components/shared/ErrorBoundary.tsx` — class component wrapping `<RouterProvider>`.

### Store-to-Store Communication

```tsx
// CORRECT: Inside store logic (action), not React render
submitForm: async (data) => {
  set({ isLoading: true })
  await api.save(data)
  useUIStore.getState().addToast('Saved!', 'success')  // ✅ OK inside store action
  set({ isLoading: false })
}
```

### Common Errors

| Symptom | Cause | Fix |
|---------|-------|-----|
| `useActionState` overload mismatch | Generic params missing | Use `useActionState<State, FormData>` |
| `TS6133` unused var | `noUnusedLocals: true` | Remove or prefix with `_` |
| `TS2345` function form `manualChunks` | Vite 8 requires `(id: string) => string` | Use function, not object |
| `double-hyphen` class | `bottom--24` not `-bottom-24` | Single hyphen prefix |
| `routeTree.gen.ts` missing | Forgetting `npx tsr generate` | Regenerate after route changes |
| Hydration mismatch w/ Zustand persist | SSR mismatch | `useHydration` guard (if adding SSR later) |

---

## Communication & Documentation

- **README.md** — top-level project overview, quick start, architecture.
- **CLAUDE.md** — this file. Agent-level operational context.
- **AGENTS.md** — broader agent instruction set (high-level approach and anti-patterns).

---

## Project-Specific Standards

### Design System Tokens (from `globals.css`)

```css
/* Colors */
--color-warm-white: #F7F4F0
--color-cream: #FDFBF8
--color-oat-50 … oat-500: #F5F0E8 … #B5A288
--color-fog-50 … fog-400: #E8E5E0 … #8C8580
--color-wool-900: #3D3835

/* Fonts (via utility classes) */
.font-display  /* Cormorant Garamond */
.font-body     /* DM Sans */
.font-accent   /* Space Grotesk */
```

### Component Architecture

```
components/
  ui/            # Shadcn-style primitives (Button, Input, Badge)
  shared/        # Cross-cutting (SkipLink, Toast, SneakerSVG, ErrorBoundary)
  layout/        # Structural (Navbar, Footer, AnnouncementBar)
  sections/      # Home page parts (Hero, BrandStory, Products, Features, SingaporeStory, Testimonials, Newsletter)
  cart/          # CartSlidePanel (overlay)
```

- **Page components get data** (loader / URL params / stores).
- **Shared components are data-agnostic** — they receive props.
- **Container / presentation split**: fetch in route, render in section.

### Product Data Model

```ts
interface Product {
  id: string; slug: string; name: string; description: string;
  longDescription: string; price: number; category: 'runner' | 'high-top' | 'slip-on' | 'mid-top';
  colors: readonly ProductColor[]; sizes: readonly ProductSize[];
  gradient: string; svgAccentColor: string; tag: ProductTag | null;
  inStock: boolean; features: readonly string[]; careInstructions: readonly string[];
}
```
- Price is stored in **SGD cents** (integer), formatted with `new Intl.NumberFormat('en-SG')`.

### Zustand Store Selectors

```ts
// Use selector subscriptions — no getState() in render
const subtotal = useCartStore(selectCartSubtotal)     // ✅
const count = useCartStore(s => s.items.length)       // ✅
// useCartStore.getState().addItem(item)               // ❌ only inside outside render
```

### Routing

- `/` — Home landing page
- `/about` — Brand story
- `/products` — Product listing with sort
- `/products/$slug` — Product detail
- `/cart` — Full cart page
- `/checkout` — Checkout flow
- `/*` — 404 catch-all

---

## Security

- No hardcoded secrets in client bundle.
- CSP meta tag in `index.html`: `default-src 'self'`, `script-src 'self'`.
- All external links use `rel="noopener noreferrer" target="_blank"`.
- No `eval()` or `Function()` construction.
