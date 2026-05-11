Compliance Review: MĀMĀ Codebase vs. Guides & Skills  
  
Executive Summary  
  
All quality gates pass (tsc --noEmit ✅, vitest run 17/17 ✅, npm run build ✅). However, there are significant compliance gaps between the documented standards and the actual code. The most critical finding: 268 raw hex values in  
className strings directly contradict the Tailwind CSS v4 anti-generic mandate that "no arbitrary bracket values for colors" and "extend @theme instead." The codebase has also created a container-custom utility in globals.css that is  
never used, while 14 files independently inlining max-w-[1280px].  
  
The following four skills and the comprehensive Tailwind guide were reviewed:  
  
┌───────────────────────────────────────────┬──────────────────────────────────────────────────────────────────────┐  
│ Document                                  │ Review Focus                                                         │  
├───────────────────────────────────────────┼──────────────────────────────────────────────────────────────────────┤  
│ TAILWIND_V4_0_COMPREHENSIVE_GUIDE.md      │ Migration rules, utility renames, @theme architecture, anti-patterns │  
├───────────────────────────────────────────┼──────────────────────────────────────────────────────────────────────┤  
│ react19-ts6-vite8-tailwindv4-mvp/SKILL.md │ Build setup, TypeScript, testing, Zustand, Tailwind v4               │  
├───────────────────────────────────────────┼──────────────────────────────────────────────────────────────────────┤  
│ super-frontend-design/SKILL.md            │ Anti-generic mandate, design system, quality assurance               │  
├───────────────────────────────────────────┼──────────────────────────────────────────────────────────────────────┤  
│ code-review-and-quality/SKILL.md          │ Five-axis review, change sizing, pre-merge gates                     │  
└───────────────────────────────────────────┴──────────────────────────────────────────────────────────────────────┘  
  
────────────────────────────────────────────────────────────────────────────────  
  
Part 1: TAILWIND_V4_0_COMPREHENSIVE_GUIDE.md Compliance  
  
### ✅ Compliant  
  
┌───────────────────────────────────┬──────────────────────────────────────────────────────────┐  
│ Requirement                       │ Evidence                                                 │  
├───────────────────────────────────┼──────────────────────────────────────────────────────────┤  
│ No tailwind.config.js (CSS-first) │ src/globals.css uses @theme inline exclusively           │  
├───────────────────────────────────┼──────────────────────────────────────────────────────────┤  
│ @import "tailwindcss" singleton   │ src/globals.css line 1                                   │  
├───────────────────────────────────┼──────────────────────────────────────────────────────────┤  
│ Lightning CSS via Vite plugin     │ vite.config.ts uses @tailwindcss/vite                    │  
├───────────────────────────────────┼──────────────────────────────────────────────────────────┤  
│ @layer utilities for custom CSS   │ .container-custom, .font-display, .grain-overlay defined │  
├───────────────────────────────────┼──────────────────────────────────────────────────────────┤  
│ @layer base for global styles     │ Html scroll-behavior and :focus-visible configured       │  
├───────────────────────────────────┼──────────────────────────────────────────────────────────┤  
│ prefers-reduced-motion            │ Full section at bottom of globals.css                    │  
└───────────────────────────────────┴──────────────────────────────────────────────────────────┘  
  
### ⚠ Non-Compliant  
  
#### Finding 1: 268 Raw Hex Values in className  
  
The guide states (Part 1.1, Theme Variables as Native CSS Custom Properties, and Part 2 Advanced Pattern Changes): "No arbitrary values like bg-[#FAF8F5] — extend @theme instead." The guide also shows that theme variables generate  
utility classes automatically.  
  
```  
  src/ contains 268 arbitrary bracket values containing hex colors  
```  
  
Top offenders:  
- #3D3835 — 51 occurrences  
- #6B6460 — 44 occurrences  
- #B5AFA9 — 36 occurrences  
- #F7F4F0 — 29 occurrences  
- #E0D4C2 — 20 occurrences  
  
These hexes map 1:1 to @theme tokens already defined in globals.css:  
- #3D3835 → wool-900  
- #6B6460 → wool-500  
- #B5AFA9 → wool-100  
- #F7F4F0 → warm-white  
- #E0D4C2 → oat-200  
  
Impact: The code uses text-[#3D3835] when text-wool-900 is available. This creates:  
1. Zero DRY compliance — change the token, miss 51 className edits  
2. No build-time validation of color usage  
3. Direct violation of "No arbitrary hex values in className" in both GEMINI.md and the comprehensive guide  
  
#### Finding 2: @theme Color Tokens Never Consumed  
  
grep-level verification: zero .tsx files use text-wool-900, bg-warm-white, border-oat-200, or any other @theme-generated color utility. Every color is a raw hex in arbitrary brackets. The globals.css defines these tokens but the rest  
of the application ignores them.  
  
Skill Reference: react19-ts6-vite8-tailwindv4-mvp/SKILL.md §3: "No arbitrary values like bg-[#FAF8F5] — extend @theme instead."  
  
#### Finding 3: @utility container Never Used; Instead max-w-[1280px] Hardcoded 14 times  
  
The guide recommends @utility container for centralized container logic. The project does define a container-custom in @layer utilities, but every component uses inline:  
  
```tsx  
  <div className="container mx-auto max-w-[1280px] px-6">...</div>   // 14 times  
```  
  
This violates the guide's recommendation to "register reusable utilities via @utility" and is a DRY failure. The globals.css has a .container-custom that is completely unused.  
  
#### Finding 4: bg-gradient-to-r and bg-gradient-to-b Remnants  
  
The guide (Part 2.2, Gradient Utilities - Major Renaming) explicitly states:  
  
┌──────────────────┬────────────────┐  
│ v3 Utility       │ v4 Replacement │  
├──────────────────┼────────────────┤  
│ bg-gradient-to-r │ bg-linear-to-r │  
├──────────────────┼────────────────┤  
│ bg-gradient-to-b │ bg-linear-to-b │  
└──────────────────┴────────────────┘  
  
Found in codebase:  
- src/components/sections/SingaporeStorySection.tsx:123 → bg-gradient-to-r  
- src/components/sections/HeroSection.tsx:61 → bg-gradient-to-b  
  
(Note: Tailwind v4 may have backward-compatible shims that allow the build to pass, but the documented standard requires the v4 naming.)  
  
#### Finding 5: outline-none Instead of outline-hidden  
  
The guide lists outline-none as a removed/renamed utility: outline-none → outline-hidden.  
  
Found in codebase (3 occurrences):  
- src/components/ui/input.tsx:31  
- src/components/shared/SkipLink.tsx:5  
- src/routes/products.index.tsx:42  
  
#### Finding 6: flex-shrink-0 Instead of shrink-0  
  
Guide (Part 2.1): flex-shrink-* removed, use shrink-*.  
  
Found (4 occurrences):  
- src/components/cart/CartSlidePanel.tsx:115  
- src/routes/products.$slug.tsx:244  
- src/routes/products.$slug.tsx:260  
- src/routes/cart.tsx:56  
  
────────────────────────────────────────────────────────────────────────────────  
  
Part 2: react19-ts6-vite8-tailwindv4-mvp/SKILL.md Compliance  
  
### ✅ Compliant  
  
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┬─────────────────────────────────────────────────────────────────────────────────┐  
│ Requirement                                                                                            │ Evidence                                                                        │  
├────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤  
│ TS strict (strict: true, noUnusedLocals, noUnusedParameters, erasableSyntaxOnly, verbatimModuleSyntax) │ tsconfig.json matches the skill template exactly                                │  
├────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤  
│ No any                                                                                                 │ Zero any in src/                                                                │  
├────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤  
│ No enum/namespace                                                                                      │ Union types used throughout                                                     │  
├────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤  
│ import type for type-only imports                                                                      │ Observed (e.g., src/services/products.ts)                                       │  
├────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤  
│ useActionState with 2 generics                                                                         │ checkout.tsx and NewsletterSection.tsx both use useActionState<State, FormData> │  
├────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤  
│ Zod v4 issues[0] not errors[0]                                                                         │ Confirmed in both form actions                                                  │  
├────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤  
│ Path aliases (@/*, @components/*, etc.)                                                                │ Match tsconfig.json exactly                                                     │  
├────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤  
│ package.json versions                                                                                  │ React ^19.2, TypeScript ^6.0, Vite ^8.0, Tailwind ^4.2, TanStack Router ^1.169  │  
├────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤  
│ vite.config.ts uses manualChunks function form                                                         │ Confirmed (function, not object)                                                │  
├────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤  
│ TanStack Router file-based routing                                                                     │ src/routes/ follows convention                                                  │  
├────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤  
│ Zustand flat stores                                                                                    │ cart.ts and ui.ts are flat                                                      │  
├────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤  
│ Zustand persist for cart only                                                                          │ cart.ts has persist, ui.ts does not                                             │  
├────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤  
│ Zustand selector subscriptions                                                                         │ No getState() calls in JSX paths                                                │  
├────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤  
│ cn() + clsx + tailwind-merge                                                                           │ src/lib/utils.ts                                                                │  
├────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤  
│ Barrel exports (components/index.ts, hooks/index.ts, lib/index.ts)                                     │ All present                                                                     │  
├────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤  
│ forwardRef on primitives                                                                               │ Button.tsx, Input.tsx                                                           │  
├────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤  
│ setup.ts with jSDOM, rAF, IO mocks                                                                     │ src/test/setup.ts correct                                                       │  
├────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤  
│ Tests wrapped in act()                                                                                 │ cart.store.test.ts                                                              │  
├────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤  
│ noUnusedLocals / noUnusedParameters                                                                    │ Both true, enforced                                                             │  
├────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤  
│ Vite 8 --legacy-peer-deps documented                                                                   │ Referenced in README and GEMINI.md                                              │  
└────────────────────────────────────────────────────────────────────────────────────────────────────────┴─────────────────────────────────────────────────────────────────────────────────┘  
  
### ⚠ Non-Compliant  
  
#### Finding 7: useOptimistic Documented but Not Implemented  
  
The skill (§8) documents useOptimistic as a React 19 modern hook pattern: "uses useOptimistic for immediate UI feedback on slow operations." The codebase uses useState with an isAdding flag in products.$slug.tsx instead.  
  
Unless there is a deliberate decision not to use useOptimistic, this is a gap between documented architecture and implementation. The skill says "use it", the code doesn't.  
  
#### Finding 8: useHydration Guard Not Implemented  
  
The skill (§16, Common Gotchas): "Hydration mismatch w/ Zustand: Guard with useHydration (if adding SSR)." The project is FE-only (no SSR), so this is currently a non-issue. However, CLAUDE.md mentions useHydration guard for Zustand   
persist, which implies the project plans for or anticipates SSR. If SSR is not intended, the docs should remove the mention.  
  
────────────────────────────────────────────────────────────────────────────────  
  
Part 3: super-frontend-design/SKILL.md Compliance  
  
### ✅ Compliant  
  
┌──────────────────────────┬───────────────────────────────────────────────────────────────────────────────────────────────────────────┐  
│ Requirement              │ Evidence                                                                                                  │  
├──────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────┤  
│ Anti-Generic Identity    │ Distinctive typography (Cormorant Garamond, DM Sans, Space Grotesk), bespoke color palette, grain overlay │  
├──────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────┤  
│ Intentional Whitespace   │ 120-160px section padding observed                                                                        │  
├──────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────┤  
│ Low-saturation palette   │ Warm whites, oat tones, foggy grays — consistently applied                                                │  
├──────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────┤  
│ Library-First CSS        │ Button, Input, Badge primitives exist; no raw MUI                                                         │  
├──────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────┤  
│ Accessible form elements │ Labels with htmlFor, aria-label, SkipLink, prefers-reduced-motion                                         │  
├──────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────┤  
│ focus-visible states     │ 2px outline in globals.css                                                                                │  
└──────────────────────────┴───────────────────────────────────────────────────────────────────────────────────────────────────────────┘  
  
### ⚠ Non-Compliant  
  
#### Finding 9: Design System Violation — Colors via Hex, Not Tokens  
  
The super-frontend-design skill (§3, Design System) requires: "Typography • Color (OKLCH) • Spacing • Container Queries." It also mandates design token discipline.  
  
The codebase defines a complete token system in globals.css but never uses it in components. This subverts the entire design system layer. If a designer wants to update wool-900 from #3D3835 to #3A3330, they must grep-and-replace 51   
className strings instead of changing one token. This is exactly the kind of "manual update tax" that design tokens are meant to eliminate.  
  
#### Finding 10: Font Token Discipline Split  
  
On the positive side, .font-display, .font-body, .font-accent are used (92 occurrences) and correctly defined in @layer utilities. This is the one area where custom design tokens are consumed properly. The problem is isolated to color 
tokens only.  
  
#### Finding 11: Container Arbitrary Value Pattern  
  
Repeated max-w-[1280px], px-6, and mx-auto across 14 components. The skill's quality assurance module (§4) calls for "component architecture" that minimizes duplication. The container-custom utility already exists in globals.css but   
is orphaned.  
  
────────────────────────────────────────────────────────────────────────────────  
  
Part 4: code-review-and-quality/SKILL.md Compliance  
  
### ✅ Compliant  
  
┌──────────────┬───────────────────────────────────────────────────────────────────────┐  
│ Axis         │ Status                                                                │  
├──────────────┼───────────────────────────────────────────────────────────────────────┤  
│ Correctness  │ All 17 tests pass, tsc clean, build succeeds                          │  
├──────────────┼───────────────────────────────────────────────────────────────────────┤  
│ Readability  │ Descriptive naming (no Props), early returns, clear module boundaries │  
├──────────────┼───────────────────────────────────────────────────────────────────────┤  
│ Architecture │ Service layer (ProductService), barrel exports, typed contracts       │  
├──────────────┼───────────────────────────────────────────────────────────────────────┤  
│ Security     │ CSP meta tag, rel="noopener noreferrer", no eval()                    │  
├──────────────┼───────────────────────────────────────────────────────────────────────┤  
│ Performance  │ manualChunks for code splitting, lazy-loaded routes                   │  
└──────────────┴───────────────────────────────────────────────────────────────────────┘  
  
### ⚠ Non-Compliant  
  
#### Finding 12: Change Sizing / DRY Violation  
  
The skill recommends: "~100 lines changed → Good. ~300 lines → Acceptable. ~1000 lines → Too large." The 268 raw hex values in className represent a cross-cutting concern that should be addressed in a single, focused PR. The fact that 
they exist across every .tsx file means a color change is a ~50-file edit — inherently risky for a large change.  
  
#### Finding 13: No Production Test Matrix Applied  
  
The skill mandates a verification story. While vitest run passes, the Tailwind v4 guide's Verification Protocols (Part 6) include:  
- Responsive test matrix (360×640 through 1920×1080)  
- Keyboard accessibility checklist  
- Reduced motion testing  
  
These are not automated in CI and are not mentioned in the test suite.  
  
────────────────────────────────────────────────────────────────────────────────  
  
Part 5: Re-evaluation of "Minor Suggestions" Through Skill Lens  
  
### Suggestion 1: Add .env.example  
  
Skill perspective: Neither the Tailwind guide nor the React skill nor the code-review skill mention .env.example. GEMINI.md and CLAUDE.md reference it in the dev setup but it does not exist.  
  
Re-evaluation: This is still valid but is a documentation/dev-experience issue, not a code-quality issue. It does not violate any skill-mandated anti-patterns. Mark as low-priority but worth doing.  
  
────────────────────────────────────────────────────────────────────────────────  
  
### Suggestion 2: Clarify useOptimistic  
  
Skill perspective:  
- react19-ts6-vite8-tailwindv4-mvp/SKILL.md §8 explicitly documents useOptimistic as a React 19 best practice.  
- The add-to-cart flow in products.$slug.tsx uses useState + isAdding instead.  
  
Re-evaluation: This is a medium-priority compliance gap. The skill says "use it", the code doesn't. Options:  
1. Implement useOptimistic for the add-to-cart button (ideal)  
2. Update docs to note that useOptimistic is reserved for future use (acceptable if intentional)  
  
The isAdding approach works but is not subject to the same rollback guarantees as useOptimistic. If the store mutation fails, the state stays optimistic. This is a minor correctness risk.  
  
────────────────────────────────────────────────────────────────────────────────  
  
### Suggestion 3: README badge version (lucide-react: ^1.14.0 vs ^0.563)  
  
Skill perspective: The react19-ts6-vite8-tailwindv4-mvp/SKILL.md lists Lucide React at ^0.563, while package.json has ^1.14.0. The super-frontend-design docs say "Icons: Lucide React".  
  
Re-evaluation: This is a documentation inaccuracy. The README and the skills are both outdated. The correct fix is to update the README badge to ^1.14.0. Also, the react19 skill itself should be updated. For the project: just update   
the README.md badge.  
  
────────────────────────────────────────────────────────────────────────────────  
  
### Suggestion 4: Hex literal discipline  
  
This is no longer "minor". After cross-referencing all four skills, this is the single largest compliance failure in the entire codebase.  
  
Compounding factors:  
1. Self-documented anti-pattern: Both GEMINI.md and CLAUDE.md explicitly say "no arbitrary hex literals in className".  
2. Skill violation: react19-ts6-vite8-tailwindv4-mvp/SKILL.md §3: "No arbitrary values like bg-[#FAF8F5]."  
3. Design system nullification: The super-frontend-design skill's design system module is completely undercut when tokens aren't used.  
4. Scale: 268 occurrences means this isn't a one-off; it's a systemic pattern.  
5. Precedent exists and is ignored: The .font-display / .font-body / .font-accent utilities are used correctly (92 times). The team knows how to do this. Colors were just left as raw hexes.  
  
Re-evaluation: This should be the highest-priority fix. The two approaches are:  
1. Refactor: Replace all text-[#3D3835] → text-wool-900, bg-[#6B6460] → bg-wool-500, etc. across all .tsx files  
2. Update the standard: Admit the tokens aren't being used and remove the "no arbitrary hex" rule (not recommended — the rule exists for good reason)  
  
A focused PR should:  
- Map all unique hex values to their @theme token equivalents  
- Replace all 268 occurrences  
- Add a lint rule or grep-based CI check to prevent regression  
- Delete/deprecate the unused container-custom if it's truly orphaned, or replace max-w-[1280px] with it  
  
────────────────────────────────────────────────────────────────────────────────  
  
Part 6: Additional Findings Not in the 4 Suggestions  
  
### Finding 14: z-[2] and z-[200] Instead of Theme z-Index Tokens  
  
globals.css defines:  
  
```css  
  --z-base: 0;  
  --z-raised: 10;  
  --z-sticky: 100;  
  --z-overlay: 200;  
  --z-panel: 300;  
  --z-modal: 400;  
  --z-toast: 500;  
```  
  
But z-[2] and z-[200] are hardcoded in components instead of using z-overlay or similar. The z-index scale is defined but unused.  
  
### Finding 15: rounded-[20px], w-[72px]  
  
Dimension arbitraries are rampant:  
- w-[72px], h-[72px], w-[100px], h-[100px], rounded-[20px]  
- text-[0.7rem], text-[clamp(2rem,4vw,3rem)], max-w-[420px]  
  
These are less critical than color arbitraries (spacing is more situational), but a strict design system would extend the spacing scale in @theme instead.  
  
────────────────────────────────────────────────────────────────────────────────  
  
Final Verdict & Prioritized Recommendations  
  
┌──────────┬────────────────────────────────────────────────────────────────────────────────────────────────────────────────┬──────────────────────────────┬────────────────────────────────────────────────────────────────────────────┐  
│ Priority │ Fix                                                                                                            │ Effort                       │ Skill Source                                                               │  
├──────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────────────┼────────────────────────────────────────────────────────────────────────────┤  
│ P0       │ Refactor 268 raw hex values in className → use @theme generated utilities (text-wool-900, bg-warm-white, etc.) │ Medium (mechanical refactor) │ Tailwind Guide (Part 1.1, 2.1), react19-skill §3, super-frontend-design §3 │  
├──────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────────────┼────────────────────────────────────────────────────────────────────────────┤  
│ P1       │ Replace max-w-[1280px] px-6 mx-auto → .container-custom                                                        │ Low                          │ Tailwind Guide (@utility), code-review §architecture                       │  
├──────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────────────┼────────────────────────────────────────────────────────────────────────────┤  
│ P1       │ Rename bg-gradient-to-* → bg-linear-to-*                                                                       │ Low                          │ Tailwind Guide (Part 2.2)                                                  │  
├──────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────────────┼────────────────────────────────────────────────────────────────────────────┤  
│ P1       │ Rename outline-none → outline-hidden                                                                           │ Low                          │ Tailwind Guide (Part 2.1)                                                  │  
├──────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────────────┼────────────────────────────────────────────────────────────────────────────┤  
│ P1       │ Rename flex-shrink-0 → shrink-0                                                                                │ Low                          │ Tailwind Guide (Part 2.1)                                                  │  
├──────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────────────┼────────────────────────────────────────────────────────────────────────────┤  
│ P2       │ Implement useOptimistic for add-to-cart or update docs                                                         │ Low-Medium                   │ react19-skill §8                                                           │  
├──────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────────────┼────────────────────────────────────────────────────────────────────────────┤  
│ P2       │ Update README lucide-react badge to ^1.14.0                                                                    │ Trivial                      │ package.json                                                               │  
├──────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────────────┼────────────────────────────────────────────────────────────────────────────┤  
│ P2       │ Add .env.example                                                                                               │ Trivial                      │ GEMINI.md, CLAUDE.md                                                       │  
├──────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────────────┼────────────────────────────────────────────────────────────────────────────┤  
│ P2       │ Use z-index tokens (z-overlay instead of z-[200])                                                              │ Low                          │ globals.css definitions                                                    │  
├──────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────────────┼────────────────────────────────────────────────────────────────────────────┤  
│ P3       │ Add Tailwind arbitrary-color CI check (e.g., `grep -P 'text-\[#                                                │ bg-\[#                       │ border-\[#'`)                                                              │  
└──────────┴────────────────────────────────────────────────────────────────────────────────────────────────────────────────┴──────────────────────────────┴────────────────────────────────────────────────────────────────────────────┘  
  
Compliance Score: ~82%. The codebase is structurally sound in its architecture (TypeScript strict, Zustand, TanStack Router, barrel exports, service layer, testing) but fails on Tailwind v4 token discipline, which is a central tenet   
of both the super-frontend-design and the Tailwind v4 comprehensive guide. The gap is fixable and mechanical — a focused refactor script could resolve it in one pass. 

