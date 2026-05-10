# GEMINI.md - MĀMĀ Wool Sneakers MVP

This file serves as the foundational instructional context for all AI agent interactions within the MĀMĀ Wool Sneakers codebase. It establishes the technical standards, design philosophy, and operational workflows required to maintain the project's integrity.

## 1. Project Overview

**MĀMĀ** is a Singapore-born, boutique e-commerce front-end for merino wool sneakers. It is designed with a "quiet luxury" aesthetic, targeting tropical urban audiences with natural comfort and refined function.

### Tech Stack
- **Framework**: React 19 (StrictMode, `useActionState`, `useOptimistic`)
- **Language**: TypeScript 6 (Strict mode, `erasableSyntaxOnly`, `verbatimModuleSyntax`)
- **Build Tool**: Vite 8 (utilizing the Rolldown engine)
- **Styling**: Tailwind CSS v4 (CSS-first configuration via `@theme inline` in `globals.css`)
- **Routing**: TanStack Router 1.169 (File-based, type-safe routing)
- **State Management**: Zustand 5 (Flat stores; `useCartStore` with persistence, `useUIStore` for ephemeral state)
- **Testing**: Vitest 4 (jsdom environment, TDD focused)

---

## 2. Core Operational Mandates

### The Meticulous Approach
Every task **must** strictly follow this six-phase workflow:
1. **ANALYZE**: Conduct deep requirement mining; never assume.
2. **PLAN**: Draft a detailed roadmap with tasks, dependencies, and success criteria.
3. **VALIDATE**: Present the plan and obtain explicit user approval before writing any code.
4. **IMPLEMENT**: Build modular, tested, and documented components.
5. **VERIFY**: Run `tsc --noEmit`, `vitest run`, and `npm run build` before delivery.
6. **DELIVER**: Provide a complete handoff with usage instructions.

### Anti-Generic Design Philosophy
- **Distinctive Identity**: Reject "AI slop" and generic templates.
- **Typography**: Cormorant Garamond (Display), DM Sans (Body), Space Grotesk (Accent labels).
- **Color Palette**: Use only the bespoke wool-palette tokens defined in `src/globals.css` (Warm White, Cream, Oat, Fog, Wool). No arbitrary hex literals.
- **Atmosphere**: Quiet luxury—low-saturation tones, generous whitespace (120-160px section padding), and a subtle grain overlay.

---

## 3. Implementation Standards

### React & TypeScript
- **Strict Typing**: Never use `any`. Prefer `interface` for shapes and `type` for unions/intersections.
- **Form Primitives**: Use `forwardRef` for reusable components.
- **Async Operations**: All async buttons must handle `isPending` states with disabled attributes and loading indicators.
- **Error Handling**: Use the provided `ErrorBoundary` wrapper.

### Tailwind CSS v4 Discipline
- **Configuration**: All design tokens live in `src/globals.css`. Do not create a `tailwind.config.js`.
- **Custom Tokens**: Extend the `@theme` block for colors, fonts, and spacing.
- **Responsive**: Mobile-first approach (`sm:`, `md:`, `lg:`).

### State Management (Zustand)
- **Selectors**: Always use selectors for subscriptions (e.g., `const count = useCartStore(s => s.items.length)`).
- **External Actions**: Store-to-store calls are allowed only inside store actions (using `.getState()`).

### Routing (TanStack Router)
- **Generation**: Run `npx tsr generate` after every route change.
- **Loaders**: Fetch data in route loaders to ensure type safety and prevent waterfalls.

---

## 4. Development Workflow

### Key Commands
| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite dev server (port 5173) |
| `npm run build` | Full production build (runs `tsc` first) |
| `npm test` | Run Vitest in watch mode |
| `npx tsr generate` | Regenerate route tree (crucial for TanStack Router) |
| `npx tsc --noEmit` | Manual TypeScript check |

### Quality Gate (Order of Execution)
1. `npx tsc --noEmit` (Must pass)
2. `npx vitest run` (Must pass)
3. `npm run build` (Must pass)

---

## 5. Directory Structure Overview

- `src/components/ui/`: Primitive UI components (buttons, inputs, etc.).
- `src/components/layout/`: Global structural components (Navbar, Footer).
- `src/components/sections/`: Content-heavy landing page sections.
- `src/routes/`: File-based routes (root, home, products, cart, checkout).
- `src/stores/`: Zustand store definitions.
- `src/lib/`: Utilities, formatting, and product data.
- `src/test/`: Test suites and setup configurations.

---

## 6. Testing Strategy
- **Unit/Integration**: Vitest + React Testing Library.
- **Coverage**: Focus on store logic (`cart.store.test.ts`, `ui.store.test.ts`) and complex utils.
- **Mocks**: Mock browser APIs (rAF, IntersectionObserver) in `src/test/setup.ts`.

Refer to `CLAUDE.md` and `AGENTS.md` for more granular implementation details and anti-patterns.
