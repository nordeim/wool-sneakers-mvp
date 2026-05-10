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

## Anti-Patterns & Pitfalls (v0.1.3)

### 1. Component Interface Naming

**❌ DON'T** use generic interface names:
```typescript
interface Props { children: React.ReactNode }
interface State { hasError: boolean }
```

**✅ DO** use descriptive names:
```typescript
interface ErrorBoundaryProps { children: React.ReactNode }
interface ErrorBoundaryState { hasError: boolean }
```

### 2. Component Props — No Generic Names

**❌ DON'T** use `Props`, `State`, `ContextType` as the sole name. Always prefix with the component name (`CartProps`, `NavbarState`).

### 3. Zod v4 Error Access

**❌ DON'T** use Zod v3 API on v4:
```typescript
result.error.errors[0].message  // ❌ errors property doesn't exist on v4 ZodError
```

**✅ DO** use `issues[]`:
```typescript
// Zod v4 safe API
result.error.issues[0].message  // ✅ Always use issues[]
```

### 4. Tailwind Font-Family Inline in className

**❌ DON'T** inline font-family names with double-quotes in className strings:
```tsx
// ❌ Breaks JSX parser — nested double quotes inside double-quoted string
className="font-["Cormorant_Garamond",serif]"
```

**✅ DO** define CSS custom properties in `@theme inline`:
```css
/* globals.css */
@theme inline {
  /* Define font tokens */
  /* Use arbitrary values via prose fields */
}
```

Then use layer utility classes:
```tsx
// ✅ Clean, no quote-state nesting
className="font-display"
```

With a Tailwind `@layer utilities` block:
```css
@layer utilities {
  .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
  .font-body { font-family: 'DM Sans', 'Helvetica Neue', sans-serif; }
  .font-accent { font-family: 'Space Grotesk', 'Helvetica Neue', sans-serif; }
}
```

### 5. Service Layer Always Typed

**❌ DON'T** export raw data + functions without interface:
```typescript
export const products = [...]                     // ❌ No contract
export const getProduct = (slug) => {...}        // ❌ Untyped input/output
```

**✅ DO** export typed interface + implementation:
```typescript
export interface ProductService { ... }
const productService: ProductService = { ... }
export { productService }
```

### 6. Barrel Exports for Module Boundaries

**❌ DON'T** force consumers to import from deep paths:
```typescript
import { Button } from '../../../components/ui/button'  // ❌ Brittle, coupling
```

**✅ DO** use barrel (`index.ts`) exports:
```typescript
// src/components/index.ts
export { Button } from './ui/button'
// Consumer import is cleaner but still needs explicit paths
import { Button } from '@/components/ui/button'  // ✅ Path alias, not deep relative
```

### 7. Redirect with Validation before Action

**❌ DON'T** implement form validation manually inside `useActionState`:
```typescript
// ❌ Inline manual checks in action
const email = formData.get('email') as string
if (!email.includes('@')) return { error: '...' }
```

**✅ DO** use Zod schema with `safeParse()`:
```typescript
const result = newsletterSchema.safeParse(Object.fromEntries(formData))
if (!result.success) {
  return { message: result.error.issues[0].message, type: 'error' }
}
```

### 8. Props Naming Conventions

**❌ DON'T** use `is-` prefix for boolean props in TypeScript (that is in HTML/CSS but not in component prop names):
```tsx
// ❌ Redundant
interface LoadingProps { isLoading: boolean }
```

**✅ DO** use semantic naming:
```tsx
// ✅ Clearer
interface ProgressProps { pending: boolean }
```

When using component wrappers (e.g. `forwardRef`), naming them consistently is more important. For boolean toggling, prefer `isLoading` over `loading` for disambiguation from string props.

---

## Lessons Learned (v0.1.3 Post-Mortem)

### Lesson 1: Inlining Font Strings in className === Parser Pain

Tailwind CSS v4 allows inline font-family expressions via `font-[]` syntax. When those inline strings contain double quotes (e.g. `font-["Cormorant_Garamond",serif]`), they break the JSX parser because the JSX attribute itself is bounded by double quotes — producing invalid nested quotes.

**Resolution**: Move all font references to CSS `@layer utilities` with custom class names (`.font-display`, `.font-body`, `.font-accent`). Use `sed` to batch-replace inline font styles across the codebase with utility classes.

### Lesson 2: Zod v4 Breaking Change: `errors` → `issues`

When extracting validation messages from a failed parse, Zod v4 changed the property from `error.errors[]` (v3) to `error.issues[]` (v4). This caused `TS2339 Cannot read properties` errors.

**Resolution**: Replace all `result.error.errors[0]` → `result.error.issues[0]`.

### Lesson 3: useActionState Requires Two Generics

`useActionState` in React 19 is a generic that accepts either:
- `(state, formData) => Promise<State>` (two-argument form)
- `(state) => State | Promise<State>` (one-argument form)

When using the two-argument form with `FormData`, you **must** type both generics:
```typescript
useActionState<State, FormData>(...)   // ✅
useActionState<State>(...)               // ❌ missing second generic
```

### Lesson 4: Product Service Interface Decouples Concerns

Initially, product data was exported as a raw array + helper functions. Creating a `ProductService` interface decouples the data layer from consumers. Swapping from in-memory to an HTTP API requires changing only the implementation, not the consumers.

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
