# Autodev Design System — Shadcn-quality UI

**Mandatory.** Every generated site must follow this document. Treat it as the source of truth for visual design, typography, spacing, components, and interaction polish. The bar is: *looks like a real shadcn/ui + Vercel product*, not a student landing page.

---

## 1. Stack for UI

- **Next.js 15 App Router** + TypeScript
- **Tailwind CSS v3** (required)
- **Inter** via `next/font/google`
- **lucide-react** for icons
- **clsx** + **tailwind-merge** → `cn()` in `lib/utils.ts`
- Hand-roll shadcn patterns in `components/ui/*` — **only use modules that ship in the Autodev template**

### Allowed `components/ui` imports (hard limit)

`button`, `card`, `input`, `label`, `badge`, `separator`, `textarea`, `select`, `checkbox`

**Forbidden:** `dropdown-menu`, `dialog`, `sheet`, `tabs`, `popover`, `avatar`, `switch`, or any other shadcn module not listed above. If you need a menu, use `Select` or buttons.

---

## 2. Typography (Inter only)

```tsx
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
// <html className={inter.variable}> + body className="font-sans antialiased"
```

| Role | Classes | Notes |
|------|---------|--------|
| Page title / hero | `text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight` | Tight tracking, not bold-black shouting |
| Section h2 | `text-2xl sm:text-3xl font-semibold tracking-tight` | |
| Section h3 | `text-lg font-medium` | |
| Body | `text-base text-muted-foreground leading-relaxed` | Muted for secondary copy |
| Small / meta | `text-sm text-muted-foreground` | |
| Tiny labels | `text-xs font-medium uppercase tracking-wider text-muted-foreground` | Sparingly |

Line length for prose: `max-w-2xl` or `max-w-prose`. Never full-bleed paragraphs.

---

## 3. Color tokens (shadcn-style CSS variables)

Define in `app/globals.css` under `:root` (and `.dark` if dark). Map brand accent into `--primary` — neutrals stay zinc-like.

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 3.9%;
  --primary: /* from brand accent as HSL channels */ ;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --accent: 240 4.8% 95.9%;
  --accent-foreground: 240 5.9% 10%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: /* match primary */;
  --radius: 0.5rem;
}
```

Tailwind `tailwind.config.ts` must extend colors to `hsl(var(--background))` etc. (classic shadcn mapping).

**Theme choice:** Prefer a clean **light** product UI (white/zinc) unless the idea’s visual direction is explicitly dark. If dark: near-black background `240 10% 3.9%`, elevated cards slightly lighter, borders at ~12–15% lightness — never pure `#000` slabs with neon glow.

**Accent:** One primary accent from the brand palette. Do not rainbow the UI. Success/warning only where functional.

---

## 4. Spacing, layout, rhythm

- Base unit: **4px**. Prefer `gap-4`, `gap-6`, `p-6`, `p-8`, `py-16` / `py-24` for sections.
- Page shell: `min-h-screen`, content `mx-auto max-w-5xl` or `max-w-6xl` with `px-4 sm:px-6 lg:px-8`.
- Sections: clear vertical rhythm `space-y-16` / `py-20`. One purpose per section.
- Grid: `grid gap-6 md:grid-cols-2 lg:grid-cols-3` for feature rows — even gaps, aligned tops.
- Avoid cramped clusters and huge empty voids. Aim for **editorial product density**: airy but intentional.

---

## 5. Surfaces & elevation (shadcn feel)

- Default surface: `bg-background`
- Cards / panels: `rounded-lg border bg-card text-card-foreground shadow-sm`
- Hover on interactive cards: `transition-colors hover:bg-accent/50` or subtle `hover:shadow-md`
- Inputs: `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
- Dividers: `border-t` / `Separator` as `h-px w-full bg-border`
- **No** heavy multi-layer drop shadows, **no** glow blurs, **no** glassmorphism soup unless the brand doc demands it

Radius: use `--radius` → `rounded-md` controls, `rounded-lg` cards, `rounded-full` only for avatars/pills used as tags (sparingly).

---

## 6. Components to hand-roll (`components/ui/`)

Build these as thin, typed wrappers matching shadcn APIs/visuals:

### Button
Variants: `default` | `secondary` | `outline` | `ghost` | `destructive`  
Sizes: `default` (h-10 px-4), `sm` (h-9), `lg` (h-11), `icon` (h-10 w-10)  
Primary CTA: solid primary. Secondary actions: outline/ghost. Never more than **one** solid primary per view cluster.

### Input / Textarea / Label
Match shadcn sizing. Labels: `text-sm font-medium`. Helper text: `text-sm text-muted-foreground`. Errors: `text-sm text-destructive`.

### Card
`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` — border + shadow-sm composition.

### Badge
`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold` — muted/secondary/outline variants.

### Separator, Skeleton (optional)

Put product-specific pieces in `components/` (Header, Footer, Hero, FeatureGrid, ToolPanel) composed from `ui/*`.

---

## 7. Navigation & chrome

- Sticky or static top bar: `border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60`
- Height ~56–64px. Logo (mark + wordmark) left, links center/right, one CTA button right.
- Logo: use `/logo.svg` at `h-7 w-7` + product name `font-semibold tracking-tight`
- Mobile: simple stack or hamburger with clean sheet — no janky mega-menus
- Footer: muted, compact — product blurb, links, “Built by Autodev” small — `border-t py-10 text-sm text-muted-foreground`

---

## 8. Hero (product pages)

Hero budget:
1. Brand / product name (dominant)
2. One headline
3. One supporting sentence (`text-muted-foreground`)
4. One CTA group (primary + optional ghost/outline)
5. Optional: product preview panel (mock UI / tool chrome) — **not** a collage of stock photos

Rules:
- Full-bleed soft background (subtle gradient **within** brand neutrals, or muted grid/dot pattern at 3–5% opacity) — not purple mesh
- **No** floating badge stickers on the hero image
- **No** card grid inside the first viewport hero
- CTA buttons use real shadcn Button styles

---

## 9. Motion & interaction

Ship **2–3** intentional motions max:
1. Button / link `transition-colors` / `transition-opacity`
2. Cards `transition-shadow` on hover
3. Optional: fade-in on first paint via short CSS `@keyframes` (150–300ms, ease-out) — no bounce, no parallax circus

Focus states: always visible ring (`focus-visible:ring-2`). Respect `prefers-reduced-motion`.

---

## 10. Forms & tools (interactive products)

- Group fields with `space-y-4` / `space-y-6`
- Primary action right-aligned or full-width on mobile
- Disabled: `opacity-50 pointer-events-none`
- Loading: button shows disabled + subtle “…” or Spinner (lucide `Loader2` with `animate-spin`)
- Empty states: calm illustration-free copy + one CTA
- Results panels: monospace only for code/math output (`font-mono text-sm`), otherwise Inter

---

## 11. Quality checklist (before finishing)

- [ ] Inter applied site-wide via `next/font`
- [ ] Tokens in CSS variables; Tailwind mapped
- [ ] `components/ui/button.tsx` (+ input/card as needed)
- [ ] `lib/utils.ts` with `cn()`
- [ ] Consistent `max-w-*` + horizontal padding
- [ ] Primary accent used for CTAs/links only
- [ ] Light borders, soft shadows, no neon/glow spam
- [ ] Mobile: readable type, tap targets ≥40px, no horizontal scroll
- [ ] Accessible contrast on text/muted-foreground
- [ ] Real copy — zero “lorem ipsum” / “Your amazing product”
- [ ] Looks intentional at first scroll — not a wall of random utilities

---

## 12. Anti-patterns (reject these)

- Purple/indigo gradient hero on white
- 5 competing CTAs
- Huge rounded-3xl cards with colorful shadows
- Intermixed display fonts (Playfair + Inter + Space Grotesk…)
- Centered everything with no hierarchy
- Stock photo grids as the product
- Custom CSS that fights Tailwind instead of tokens
- Installing paid UI kits

---

## 13. File expectations

```
app/globals.css          # tokens + base layer
app/layout.tsx           # Inter, metadata, shell
app/page.tsx             # composition only — keep lean
components/ui/*          # button, input, card, badge, …
components/*             # product sections
lib/utils.ts             # cn()
tailwind.config.ts       # shadcn color mapping + radius
postcss.config.mjs
```

When in doubt: open a mental picture of **shadcn/ui docs** or **Vercel dashboard** density/clarity — match that craft.
