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
- **State Management**: Zustand 5 (Flat stores)
- **Validation**: Zod 4 (Runtime schema validation at system boundaries)
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
- **Color Palette**: Use only the bespoke wool-palette tokens defined in `src/globals.css`. No arbitrary hex literals.
- **Atmosphere**: Quiet luxury—low-saturation tones, generous whitespace (120-160px section padding), and a subtle grain overlay.

---

## 3. Implementation Standards

### React & TypeScript
- **Strict Typing**: Never use `any`. Prefer `interface` for shapes and `type` for unions/intersections.
- **Naming Conventions**: Use descriptive interface names (e.g., `ErrorBoundaryProps` instead of `Props`).
- **Async Operations**: All async buttons must handle `isPending` states. `useActionState` requires two generics when using `FormData`: `useActionState<State, FormData>`.
- **Barrel Exports**: Use `index.ts` files in core directories (`components`, `hooks`, `lib`) to centralize exports and decouple deep paths.

### Validation & Services
- **Runtime Validation**: Use Zod schemas in `src/lib/schemas.ts` for all form boundaries. 
    - **Gotcha**: Zod v4 uses `error.issues[]`, not `error.errors[]`.
- **Service Layer**: Decouple data fetching/logic using typed interfaces in `src/services/`. Consuming components should interact with service contracts (e.g., `ProductService`), not raw data.

### Styling Discipline (Tailwind v4)
- **Custom Tokens**: Extend `@theme` in `src/globals.css`. 
- **Anti-Pattern**: Avoid inlining `font-family` strings with double quotes in `className` (e.g., `font-["DM_Sans"]`). This breaks the JSX/Vite parser. Use utility classes defined in the `@layer utilities` block instead.

---

## 4. Development Workflow

### Key Commands
| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build (runs `tsc` first) |
| `npm test` | Run Vitest in watch mode |
| `npx tsr generate` | Regenerate route tree (Required after route/style changes) |

### Quality Gate
1. `npx tsc --noEmit`
2. `npx vitest run`
3. `npm run build`

---

## 5. Directory Structure Overview

- `src/components/`: Barrel exported via `index.ts`. Subdirs: `ui`, `layout`, `sections`, `cart`.
- `src/services/`: Service interfaces and implementations (e.g., `products.ts`).
- `src/lib/`: Utilities, constants, and Zod `schemas.ts`.
- `src/routes/`: TanStack Router file-based routes.
- `src/stores/`: Zustand store definitions.

---

## 6. Testing Strategy
- **Unit/Integration**: Vitest + React Testing Library.
- **Coverage**: Focus on store logic (`cart.store.test.ts`, `ui.store.test.ts`) and complex utils.
- **Mocks**: Mock browser APIs (rAF, IntersectionObserver) in `src/test/setup.ts`.

---

## 7. Lessons Learned & Troubleshooting

- **Parser Conflicts**: Nested quotes in `className` (specifically for fonts) cause `npx tsr generate` and Vite build failures. Use CSS variables or utility classes.
- **State Hydration**: Always use a hydration guard for persisted Zustand stores to prevent SSR/CSR mismatches.
- **Action State**: When using `FormData`, ensure the second generic is passed: `useActionState<State, FormData>(action, initialState)`.

Refer to `CLAUDE.md` and `AGENTS.md` for more granular implementation details and anti-patterns.

