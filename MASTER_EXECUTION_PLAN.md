Let me synthesize this into a detailed execution plan with a ToDo list.  
  
The key documents are:  
1. static_landing_page_mockup.md - The design reference with a single-file HTML mockup for MĀMĀ wool sneakers e-commerce  
2. plan.md - The production application plan with phases, architecture, and 65 tasks  
3. implement.md - The actual implementation code (was cut off but I got the full enhancement.md which is the improved version)  
4. enhancement.md - The corrected, production-ready implementation with fixes applied  
  
The primary skill is react19-ts6-vite8-tailwindv4-mvp and secondary is frontend-ui-engineering.  
  
The plan.md already has a very detailed breakdown. I need to:  
1. Present the analysis of what we have  
2. Extract the ToDo list organized by phases  
3. Add the specific skill guidance from both skills  
4. Make sure the plan covers all the requirements  
  
Let me create a comprehensive execution plan.  

Now that I have reviewed all four source documents alongside both the primary (react19-ts6-vite8-tailwindv4-mvp) and secondary (frontend-ui-engineering) skills, here is the complete, production-ready execution plan for the MĀMĀ Wool   
Sneakers Singapore e-commerce site.  
  
────────────────────────────────────────────────────────────────────────────────  
  
PHASE 1: ANALYZE — Deep Requirement Mining  
  
### Skill Alignment  
  
- Primary Skill dictates: React 19 strict mode, TypeScript 6, Vite 8 (Rolldown), Tailwind CSS v4 (@theme inline), TanStack Router (file-based), Zustand v5, Vitest + jsdom, shadcn/ui primitives, Lucide icons.  
- Secondary Skill dictates: Library-first approach (don't build custom if shadcn provides it), compostional component architecture, avoid "AI aesthetic" (no generic purple gradients, oversized padding, stock card grids), content-first 
layouts, consistent spacing scale from design tokens.  
- Design Reference (static_landing_page_mockup.md) defines:  
    - Brand: MĀMĀ — Singapore-born wool sneakers  
    - Aesthetic: Quiet Luxury / Organic Minimal — warm whites, oat tones, foggy gray gradients, grain texture  
    - Typography: Cormorant Garamond (display), DM Sans (body), Space Grotesk (accent)  
    - Key Sections: Announcement bar, sticky nav, hero, brand story, product grid (6 products), features (cooling, washable, durable), Singapore story (climate stats), testimonials, newsletter CTA, footer  
    - Cart: Slide-in panel with quantity controls, remove, subtotal, checkout  
    - Mobile: hamburger menu, full responsive from 360px  
  
### Domain Model  
  
┌──────────┬──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐  
│ Entity   │ Key Fields                                                                                                                               │  
├──────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤  
│ Product  │ id, slug, name, description, longDescription, price (SGD cents), category, colors, sizes (EU), gradient, tag, features, careInstructions │  
├──────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤  
│ CartItem │ productId, name, price, color, colorHex, size, qty, gradient                                                                             │  
├──────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤  
│ Checkout │ shipping info, email, postal code                                                                                                        │  
└──────────┴──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘  
  
### Risk Assessment  
  
┌────────────────────────────────────┬─────────────┬────────────────────────────────────────────────────────┐  
│ Risk                               │ Probability │ Mitigation                                             │  
├────────────────────────────────────┼─────────────┼────────────────────────────────────────────────────────┤  
│ Tailwind v4 custom font CORS       │ Medium      │ Preconnect Google Fonts, use font-display: swap        │  
├────────────────────────────────────┼─────────────┼────────────────────────────────────────────────────────┤  
│ Zustand persist hydration mismatch │ Medium      │ useHydration guard + onFinishHydration                 │  
├────────────────────────────────────┼─────────────┼────────────────────────────────────────────────────────┤  
│ manualChunks regression (Vite 8)   │ Low         │ Use function form only per skill §5                    │  
├────────────────────────────────────┼─────────────┼────────────────────────────────────────────────────────┤  
│ crypto.randomUUID missing in jsdom │ Certain     │ Deterministic fallback with Date.now() + Math.random() │  
├────────────────────────────────────┼─────────────┼────────────────────────────────────────────────────────┤  
│ erasableSyntaxOnly rejects enum    │ Certain     │ Use union types exclusively                            │  
└────────────────────────────────────┴─────────────┴────────────────────────────────────────────────────────┘  
  
────────────────────────────────────────────────────────────────────────────────  
  
PHASE 2: PLAN — Structured Execution Roadmap  
  
### Phase 2.1: Foundation (Infrastructure)  
  
Bootstrap the full project stack following the primary skill's exact toolchain.  
  
Tasks:  
  
┌────────┬───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┬───────────┐ 
│ #      │ Task                                                                                                                                                                                                              │ Estimated │ 
├────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤ 
│ 2.1.1  │ Scaffold with npm create vite@latest using React TS template                                                                                                                                                      │ 5 min     │ 
├────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤ 
│ 2.1.2  │ Install core dependencies: react, react-dom, zustand, @tanstack/react-router, clsx, tailwind-merge, lucide-react, @radix-ui/react-dialog, @radix-ui/react-slot                                                    │ 3 min     │ 
├────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤ 
│ 2.1.3  │ Install dev dependencies: typescript, vite, @vitejs/plugin-react, tailwindcss, @tailwindcss/vite, vitest, @testing-library/react, @testing-library/jest-dom, jsdom, @types/react, @types/react-dom,               │ 5 min     │ 
│        │ @tanstack/router-plugin                                                                                                                                                                                           │           │ 
├────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤ 
│ 2.1.4  │ Configure tsconfig.json — strict: true, erasableSyntaxOnly: true, verbatimModuleSyntax: true, noUnusedLocals: true, path aliases                                                                                  │ 5 min     │ 
├────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤ 
│ 2.1.5  │ Configure tsconfig.node.json                                                                                                                                                                                      │ 2 min     │ 
├────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤ 
│ 2.1.6  │ Configure vite.config.ts — function-form manualChunks, TanStack Router plugin, Tailwind v4 plugin, alias map                                                                                                      │ 5 min     │ 
├────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤ 
│ 2.1.7  │ Configure index.html — Google Fonts preconnect, CSP, OG meta tags                                                                                                                                                 │ 5 min     │ 
├────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤ 
│ 2.1.8  │ Create src/globals.css — Tailwind v4 @theme inline with full wool color system, fonts, spacing, z-index, animations, grain overlay utility                                                                        │ 15 min    │ 
├────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤ 
│ 2.1.9  │ Create src/lib/utils.ts (cn() helper) and src/lib/format.ts (SGD formatter)                                                                                                                                       │ 3 min     │ 
├────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤ 
│ 2.1.10 │ Create src/lib/products.ts — 6 products with full data, getProductBySlug, sortProducts                                                                                                                            │ 10 min    │ 
├────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤ 
│ 2.1.11 │ Create src/test/setup.ts — jest-dom/vitest, rAF mock, IntersectionObserver mock                                                                                                                                   │ 5 min     │ 
├────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤ 
│ 2.1.12 │ Verify: npx tsc --noEmit, npm run build, npx vitest run all green                                                                                                                                                 │ 5 min     │ 
└────────┴───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┴───────────┘ 
  
### Phase 2.2: Type System  
  
┌───────┬────────────────────────────────────────────────────────────────────────────────────────┬───────────┐  
│ #     │ Task                                                                                   │ Estimated │  
├───────┼────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.2.1 │ src/types/product.ts — Product, ProductColor, ProductSize, ProductTag, ProductCategory │ 5 min     │  
├───────┼────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.2.2 │ src/types/cart.ts — CartItem                                                           │ 3 min     │  
├───────┼────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.2.3 │ src/types/ui.ts — Toast, ToastType                                                     │ 3 min     │  
├───────┼────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.2.4 │ Verify: npx tsc --noEmit                                                               │ 2 min     │  
└───────┴────────────────────────────────────────────────────────────────────────────────────────┴───────────┘  
  
### Phase 2.3: State Management (Zustand)  
  
┌───────┬────────────────────────────────────────────────────────────────────────────────────────────────────────────┬───────────┐  
│ #     │ Task                                                                                                       │ Estimated │  
├───────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.3.1 │ src/stores/cart.ts — useCartStore (persist), add/remove/update/clear, selectors for subtotal/count/isEmpty │ 10 min    │  
├───────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.3.2 │ src/stores/ui.ts — useUIStore (no persist), cart/nav/sizeGuide toggles, toast add/remove                   │ 10 min    │  
├───────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.3.3 │ src/hooks/useThrottledScroll.ts — rAF + throttle scroll hook                                               │ 10 min    │  
├───────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.3.4 │ src/hooks/useFocusTrap.ts — manual focus trap for panels/modals                                            │ 10 min    │  
├───────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.3.5 │ src/hooks/useScrollReveal.ts — IntersectionObserver wrapper                                                │ 5 min     │  
├───────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.3.6 │ src/hooks/useHydration.ts — Zustand persist hydration guard                                                │ 5 min     │  
└───────┴────────────────────────────────────────────────────────────────────────────────────────────────────────────┴───────────┘  
  
### Phase 2.4: UI Primitives (shadcn-style)  
  
┌───────┬────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┬───────────┐  
│ #     │ Task                                                                                                                           │ Estimated │  
├───────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.4.1 │ src/components/ui/button.tsx — primary/secondary/ghost/outline/destructive variants, loading spinner, size variants (sm/md/lg) │ 10 min    │  
├───────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.4.2 │ src/components/ui/badge.tsx — default/exclusive variants for product tags                                                      │ 5 min     │  
├───────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.4.3 │ src/components/ui/input.tsx — labeled input with error state                                                                   │ 5 min     │  
└───────┴────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┴───────────┘  
  
### Phase 2.5: Shared Components  
  
┌───────┬──────────────────────────────────────────────────────────────────────────────────────────────────────┬───────────┐  
│ #     │ Task                                                                                                 │ Estimated │  
├───────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.5.1 │ src/components/shared/SkipLink.tsx — WCAG 2.4.1 skip-to-content                                      │ 3 min     │  
├───────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.5.2 │ src/components/shared/ErrorBoundary.tsx — class component, fallback UI, reset button                 │ 5 min     │  
├───────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.5.3 │ src/components/shared/GrainOverlay.tsx — fixed grain texture overlay                                 │ 3 min     │  
├───────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.5.4 │ src/components/shared/ScrollReveal.tsx — wraps children with useScrollReveal                         │ 5 min     │  
├───────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.5.5 │ src/components/shared/SneakerSVG.tsx — reusable SVG sneaker (low/mid/high/slip-on variants)          │ 10 min    │  
├───────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.5.6 │ src/components/shared/Toast.tsx — ToastContainer + ToastItem, auto-dismiss, aria-live="polite"       │ 10 min    │  
├───────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.5.7 │ src/components/shared/MobileNavPanel.tsx — slide-in mobile nav, useFocusTrap, backdrop, close button │ 10 min    │  
├───────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.5.8 │ src/components/shared/SizeGuideModal.tsx — modal with sizing table (EU/UK/US/CM), useFocusTrap       │ 15 min    │  
└───────┴──────────────────────────────────────────────────────────────────────────────────────────────────────┴───────────┘  
  
### Phase 2.6: Layout Components  
  
┌───────┬───────────────────────────────────────────────────────────────────────────────────────────────────────────────────┬───────────┐  
│ #     │ Task                                                                                                              │ Estimated │  
├───────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.6.1 │ src/components/layout/AnnouncementBar.tsx                                                                         │ 3 min     │  
├───────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.6.2 │ src/components/layout/Navbar.tsx — sticky, backdrop blur, cart badge with count, mobile menu toggle, scroll state │ 15 min    │  
├───────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.6.3 │ src/components/layout/Footer.tsx — 4-column grid, link columns, social links, copyright                           │ 10 min    │  
└───────┴───────────────────────────────────────────────────────────────────────────────────────────────────────────────────┴───────────┘  
  
### Phase 2.7: Cart Components  
  
┌───────┬──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┬───────────┐  
│ #     │ Task                                                                                                                                                                         │ Estimated │  
├───────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.7.1 │ src/components/cart/CartSlidePanel.tsx — slide-in from right, backdrop blur, empty state, item list, qty +/-, remove, subtotal, shipping (free), checkout link, useFocusTrap │ 20 min    │  
└───────┴──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┴───────────┘  
  
### Phase 2.8: Section Components (Home Page)  
  
┌───────┬───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┬───────────┐  
│ #     │ Task                                                                                                                                  │ Estimated │  
├───────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.8.1 │ src/components/sections/HeroSection.tsx — gradient bg, eyebrow, headline, CTA buttons, decorative sneaker SVG, scroll hint            │ 10 min    │  
├───────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.8.2 │ src/components/sections/BrandStorySection.tsx — two-column, wool fiber visual, philosophy text                                        │ 10 min    │  
├───────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.8.3 │ src/components/sections/ProductGrid.tsx + ProductCard — 3-col grid, gradient cards, color swatches, quick add to cart, toast feedback │ 20 min    │  
├───────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.8.4 │ src/components/sections/FeaturesSection.tsx — 3 feature cards (cooling, washable, odour resistant), icons                             │ 10 min    │  
├───────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.8.5 │ src/components/sections/SingaporeStorySection.tsx — dark bg, climate stats, animated climate bars (IntersectionObserver)              │ 15 min    │  
├───────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.8.6 │ src/components/sections/TestimonialsSection.tsx — 3 testimonial cards, stars, avatars                                                 │ 10 min    │  
├───────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.8.7 │ src/components/sections/NewsletterSection.tsx — useActionState form, validation, success state, form reset                            │ 10 min    │  
└───────┴───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┴───────────┘  
  
### Phase 2.9: Routing (TanStack Router)  
  
┌────────┬───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┬───────────┐  
│ #      │ Task                                                                                                                                                                      │ Estimated │  
├────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.9.1  │ src/routes/__root.tsx — root layout with Navbar, Footer, AnnouncementBar, all overlays (cart, mobile nav, size guide, grain, toast, skip link)                            │ 10 min    │  
├────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.9.2  │ src/routes/index.tsx — Home: compose all sections                                                                                                                         │ 5 min     │  
├────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.9.3  │ src/routes/about.tsx — About page with full brand story                                                                                                                   │ 10 min    │  
├────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.9.4  │ src/routes/products.index.tsx — Product listing with sort dropdown                                                                                                        │ 15 min    │  
├────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.9.5  │ src/routes/products.$slug.tsx — Product Detail Page: image, color selector, size selector (with size guide trigger), add to cart, features, care instructions, breadcrumb │ 25 min    │  
├────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.9.6  │ src/routes/cart.tsx — Full cart page (mobile-friendly), qty controls, remove, clear, subtotal                                                                             │ 15 min    │  
├────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.9.7  │ src/routes/checkout.tsx — Multi-step checkout form (shipping → confirmation) using useActionState                                                                         │ 20 min    │  
├────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.9.8  │ src/routes/$.tsx — 404 Not Found page                                                                                                                                     │ 5 min     │  
├────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.9.9  │ src/main.tsx — entry point, StrictMode, ErrorBoundary, createRouter                                                                                                       │ 5 min     │  
├────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.9.10 │ Run npx tsr generate and verify route tree                                                                                                                                │ 3 min     │  
└────────┴───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┴───────────┘  
  
### Phase 2.10: Testing  
  
┌────────┬────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┬───────────┐  
│ #      │ Task                                                                                                                   │ Estimated │  
├────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.10.1 │ src/test/cart.store.test.ts — add, increment, separate colors, remove, subtotal, count, empty check, update qty, clear │ 15 min    │  
├────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.10.2 │ src/test/ui.store.test.ts — open/close, toast add/remove                                                               │ 10 min    │  
├────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.10.3 │ src/test/utils.test.ts — cn(), formatPrice()                                                                           │ 5 min     │  
├────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.10.4 │ Run npx vitest run — all tests pass                                                                                    │ 3 min     │  
└────────┴────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┴───────────┘  
  
### Phase 2.11: Integration, Polish & QA  
  
┌─────────┬────────────────────────────────────────────────────────────────────────────┬───────────┐  
│ #       │ Task                                                                       │ Estimated │  
├─────────┼────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.11.1  │ Wire all stores to components                                              │ 15 min    │  
├─────────┼────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.11.2  │ Scroll reveal animations via IntersectionObserver on all sections          │ 10 min    │  
├─────────┼────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.11.3  │ Grain texture overlay on __root                                            │ 5 min     │  
├─────────┼────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.11.4  │ Climate bar animations (Singapore section)                                 │ 5 min     │  
├─────────┼────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.11.5  │ Responsive testing: 360px → 1920px                                         │ 15 min    │  
├─────────┼────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.11.6  │ Accessibility audit: SkipLink, focus trap, ARIA labels, contrast ratios    │ 15 min    │  
├─────────┼────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.11.7  │ Performance: Lighthouse audit targeting ≥90 performance, ≥95 accessibility │ 10 min    │  
├─────────┼────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.11.8  │ SEO: OG tags, meta description, CSP                                        │ 5 min     │  
├─────────┼────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.11.9  │ prefers-reduced-motion compliance                                          │ 5 min     │  
├─────────┼────────────────────────────────────────────────────────────────────────────┼───────────┤  
│ 2.11.10 │ Dead code audit — remove empty types/index.ts if exists, unused CSS tokens │ 10 min    │  
└─────────┴────────────────────────────────────────────────────────────────────────────┴───────────┘  
  
────────────────────────────────────────────────────────────────────────────────  
  
ToDo List (Summary — 77 Tasks)  
  
### 🏗 Foundation (12 tasks)  
  
- npm create vite@latest scaffold  
- Install production + dev dependencies  
- Configure tsconfig.json with strict rules  
- Configure tsconfig.node.json  
- Configure vite.config.ts (function-form manualChunks)  
- Configure index.html (fonts, CSP, OG)  
- Create src/globals.css (Tailwind v4 @theme inline, wool palette)  
- Create src/lib/utils.ts (cn())  
- Create src/lib/format.ts (SGD formatter)  
- Create src/lib/products.ts (6 products)  
- Create src/test/setup.ts  
- Verify: tsc --noEmit, npm run build, vitest run  
  
### 📐 Type System (4 tasks)  
  
- src/types/product.ts  
- src/types/cart.ts  
- src/types/ui.ts  
- Verify with tsc --noEmit  
  
### 🧠 State Management (6 tasks)  
  
- src/stores/cart.ts (Zustand + persist)  
- src/stores/ui.ts (Zustand, no persist)  
- src/hooks/useThrottledScroll.ts  
- src/hooks/useFocusTrap.ts  
- src/hooks/useScrollReveal.ts  
- src/hooks/useHydration.ts  
  
### 🎨 UI Primitives (3 tasks)  
  
- src/components/ui/button.tsx  
- src/components/ui/badge.tsx  
- src/components/ui/input.tsx  
  
### 🔗 Shared Components (8 tasks)  
  
- src/components/shared/SkipLink.tsx  
- src/components/shared/ErrorBoundary.tsx  
- src/components/shared/GrainOverlay.tsx  
- src/components/shared/ScrollReveal.tsx  
- src/components/shared/SneakerSVG.tsx  
- src/components/shared/Toast.tsx  
- src/components/shared/MobileNavPanel.tsx  
- src/components/shared/SizeGuideModal.tsx  
  
### 🏛 Layout (3 tasks)  
  
- src/components/layout/AnnouncementBar.tsx  
- src/components/layout/Navbar.tsx  
- src/components/layout/Footer.tsx  
  
### 🛒 Cart (1 task)  
  
- src/components/cart/CartSlidePanel.tsx  
  
### 📄 Sections (7 tasks)  
  
- src/components/sections/HeroSection.tsx  
- src/components/sections/BrandStorySection.tsx  
- src/components/sections/ProductGrid.tsx + ProductCard  
- src/components/sections/FeaturesSection.tsx  
- src/components/sections/SingaporeStorySection.tsx  
- src/components/sections/TestimonialsSection.tsx  
- src/components/sections/NewsletterSection.tsx  
  
### 🗺 Routing (10 tasks)  
  
- src/routes/__root.tsx  
- src/routes/index.tsx  
- src/routes/about.tsx  
- src/routes/products.index.tsx  
- src/routes/products.$slug.tsx  
- src/routes/cart.tsx  
- src/routes/checkout.tsx  
- src/routes/$.tsx  
- src/main.tsx  
- Generate route tree  
  
### 🧪 Testing (4 tasks)  
  
- src/test/cart.store.test.ts  
- src/test/ui.store.test.ts  
- src/test/utils.test.ts  
- Run full test suite  
  
### ✅ QA & Polish (10 tasks)  
  
- Wire stores to all components  
- Scroll reveal on all sections  
- Grain overlay  
- Climate bar animations  
- Responsive testing (360px–1920px)  
- Accessibility audit (WCAG 2.1 AA)  
- Lighthouse performance ≥90  
- SEO meta tags  
- prefers-reduced-motion  
- Dead code audit  
  
────────────────────────────────────────────────────────────────────────────────  
  
Pre-Ship Checklist (from Primary Skill §22)  
  
After all tasks complete, verify:  
  
┌─────────────────────────────────────────────┬─────────────────────────────────┐  
│ Check                                       │ Status                          │  
├─────────────────────────────────────────────┼─────────────────────────────────┤  
│ npx tsc --noEmit                            │ Zero errors                     │  
├─────────────────────────────────────────────┼─────────────────────────────────┤  
│ npm run build                               │ Success in <1s                  │  
├─────────────────────────────────────────────┼─────────────────────────────────┤  
│ npx vitest run                              │ All tests pass                  │  
├─────────────────────────────────────────────┼─────────────────────────────────┤  
│ No any, enum, namespace                     │ Enforced by TS config           │  
├─────────────────────────────────────────────┼─────────────────────────────────┤  
│ No bottom--24 (double hyphen)               │ All negatives use single hyphen │  
├─────────────────────────────────────────────┼─────────────────────────────────┤  
│ manualChunks is function form               │ Vite 8 compliance               │  
├─────────────────────────────────────────────┼─────────────────────────────────┤  
│ inert is boolean                            │ No string values                │  
├─────────────────────────────────────────────┼─────────────────────────────────┤  
│ getState() only in store logic              │ Selectors in JSX                │  
├─────────────────────────────────────────────┼─────────────────────────────────┤  
│ Only data persisted (not UI state)          │ partialize correct              │  
├─────────────────────────────────────────────┼─────────────────────────────────┤  
│ CSP meta tag in index.html                  │ Security                        │  
├─────────────────────────────────────────────┼─────────────────────────────────┤  
│ OG/Twitter meta tags                        │ SEO                             │  
├─────────────────────────────────────────────┼─────────────────────────────────┤  
│ rel="noopener noreferrer" on external links │ Security                        │  
├─────────────────────────────────────────────┼─────────────────────────────────┤  
│ prefers-reduced-motion respected            │ Accessibility                   │  
├─────────────────────────────────────────────┼─────────────────────────────────┤  
│ SkipLink present                            │ WCAG 2.4.1                      │  
├─────────────────────────────────────────────┼─────────────────────────────────┤  
│ Focus trap on all panels                    │ Accessibility                   │  
└─────────────────────────────────────────────┴─────────────────────────────────┘  
  
────────────────────────────────────────────────────────────────────────────────  
  
Phase 3: VALIDATE — Explicit Confirmation Checkpoint  
  
Please confirm or request modifications to:  
  
┌───────────────────────┬──────────────────────────────────────────────────────────────────────────┐  
│ Item                  │ Current Plan                                                             │  
├───────────────────────┼──────────────────────────────────────────────────────────────────────────┤  
│ 1. Route scope        │ / (home), /about, /products, /products/$slug, /cart, /checkout, /* (404) │  
├───────────────────────┼──────────────────────────────────────────────────────────────────────────┤  
│ 2. Product data       │ 6 products from lib/products.ts, SVG-only for MVP                        │  
├───────────────────────┼──────────────────────────────────────────────────────────────────────────┤  
│ 3. Checkout           │ Mock checkout (form → confirmation), no real payment                     │  
├───────────────────────┼──────────────────────────────────────────────────────────────────────────┤  
│ 4. shadcn scope       │ Button, Input, Badge only (primitives)                                   │  
├───────────────────────┼──────────────────────────────────────────────────────────────────────────┤  
│ 5. Image strategy     │ SVG sneaker illustrations per design                                     │  
├───────────────────────┼──────────────────────────────────────────────────────────────────────────┤  
│ 6. Singapore features │ SGD currency, EU sizing, Singapore testimonials                          │  
├───────────────────────┼──────────────────────────────────────────────────────────────────────────┤  
│ 7. Deployment target  │ Local/Vite dev for now (configurable later)                              │  
└───────────────────────┴──────────────────────────────────────────────────────────────────────────┘  
  
