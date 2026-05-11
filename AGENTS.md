# GEMINI.md — MĀMĀ Wool Sneakers MVP

High-signal context for AI agents. Read this first, then `CLAUDE.md`.

---

## 1. Project

Singapore-born e-commerce front-end for merino wool sneakers. Quiet-luxury aesthetic — low-saturation tones, generous whitespace, subtle grain overlay.

### Stack
- React 19 (StrictMode, `useActionState`, `useOptimistic`)
- TypeScript 6 (strict, `erasableSyntaxOnly`, `verbatimModuleSyntax`, **no `any`**)
- Vite 8 (Rolldown engine)
- Tailwind CSS v4 (`@theme inline` in `globals.css`, no `tailwind.config.js`)
- TanStack Router 1.169 (file-based, `src/routes/`)
- Zustand 5 (flat stores, `persist` middleware for cart only)
- Zod 4 (runtime validation at boundaries)
- Vitest 4 + jsdom

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

### Agent Workflow

1. **Read** the file(s) you'll modify + a similar existing example + related tests before planning.
2. **Plan** with tasks, dependencies, success criteria. Get explicit user approval before code.
3. **Run** the quality gate (see §4) before every delivery.

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

### TypeScript Discipline
- Never `any`. Use `unknown` or explicit types.
- No `enum` / `namespace` — union types only.
- `import type` for type-only imports.
- Interface names: prefix with component name (`ErrorBoundaryProps`, not `Props`).

### React 19 Forms (`useActionState`)
- Must pass **both** generics: `useActionState<State, FormData>(...)`.
- Parse `FormData` via `Object.fromEntries(formData)` before Zod validation:
  ```typescript
  const data = Object.fromEntries(formData) as Record<string, string>
  const result = newsletterSchema.safeParse({ email: data.email })
  if (!result.success) return { error: result.error.issues[0].message }
  ```
- Never inline manual checks (e.g., `if (!email?.includes('@'))`); always use a Zod schema.

### Validation (Zod v4)
- Schemas live in `src/lib/schemas.ts`. Export inferred types via `z.infer<>`.
- Zod v4 breaking change: `result.error.issues[0].message` (not `.errors[]`).

### Service Layer
- Typed interfaces in `src/services/` (e.g., `ProductService`). Consumers call the interface, not raw data.
- Barrel exports in `src/components/index.ts`, `src/hooks/index.ts`, `src/lib/index.ts`.

### Tailwind v4 Gotchas
- No arbitrary bracket values for colors/fonts. Extend `@theme inline`.
- Never inline font-family in `className` (e.g., `font-["DM_Sans"]`). This breaks the JSX parser. Define `.font-display` in `@layer utilities` in `globals.css`.

---

## 4. Development Commands

| Command | Purpose |
|---------|---------|
| `npm install --legacy-peer-deps` | Install deps (required flag for Vite 8) |
| `npx tsr generate` | Regenerate route tree (after every route change) |
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build (runs `tsc` first) |
| `npm test` | Vitest watch mode |
| `npx vitest run` | Vitest once (CI) |
| `npx tsc --noEmit` | TypeScript strict check |

**Quality Gate (in order):**
```bash
npx tsc --noEmit   # 1. Must pass first
npx vitest run      # 2. Must pass second
npm run build       # 3. Must pass third
```

---

## 5. Directory Structure

```
src/
├── components/     # ui, layout, sections, cart, shared + index.ts barrel
├── hooks/          # useFocusTrap, useScrollReveal, useThrottledScroll + index.ts
├── lib/            # utils.ts, format.ts, products.ts, schemas.ts + index.ts
├── routes/         # TanStack file-based routes (run npx tsr generate)
├── services/       # Typed service contracts (e.g., ProductService)
├── stores/         # Zustand: cart.ts (persist), ui.ts (ephemeral)
├── test/           # setup.ts + *.test.ts
└── types/          # product.ts, cart.ts, ui.ts
```

---

## 6. Common Errors

| Symptom | Cause | Fix |
|---------|-------|-----|
| `TS2304: Cannot find name 'Props'` | Generic interface name reused | Rename to `ErrorBoundaryProps` |
| `TS2339: Property 'errors' does not exist on 'ZodError'` | Zod v4 API changed | Use `error.issues[0].message` |
| `routeTree.gen.ts` missing | Forgetting `npx tsr generate` | Regenerate after every route change |
| Font styles break build | Nested quotes in className | Use `@layer utilities` (`.font-display`) |
| `useActionState` type error | Missing second generic | Use `useActionState<State, FormData>` |
| Hydration mismatch w/ Zustand | SSR/CSR mismatch on persisted state | Guard with `useHydration` (if adding SSR) |

Refer to `CLAUDE.md` for full anti-patterns, code examples, and design system tokens.
