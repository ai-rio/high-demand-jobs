# High-Demand Jobs — Design System

A job directory promoting 217 micro1 positions. Every "Apply" click sends users to
micro1 with the referral code `dcfa4fa4-2bf3-4187-82c9-9d3dd4db4ddb` embedded.

## Visual Thesis

Clean SaaS trustworthiness meets premium typographic refinement. Built for conversion:
high bonuses, clear salaries, and zero friction to click through.

## Color Palette

### Core

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#1E40AF` | CTAs, primary buttons, link text |
| `--color-primary-dark` | `#1E3A8A` | Button hover, active states |
| `--color-primary-light` | `#DBEAFE` | Subtle backgrounds, tag backgrounds |
| `--color-accent-emerald` | `#059669` | Salary badges, pay rate tags |
| `--color-accent-amber` | `#D97706` | Referral bonus badges ($500+) |
| `--color-accent-red` | `#DC2626` | Urgency indicators, closing soon |

### Neutrals

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg` | `#FFFFFF` | Page background |
| `--color-bg-alt` | `#F8FAFC` | Section alternation (slate-50) |
| `--color-bg-card` | `#FFFFFF` | Card backgrounds |
| `--color-text` | `#0F172A` | Body text (slate-900) |
| `--color-text-secondary` | `#475569` | Secondary text (slate-600) |
| `--color-text-muted` | `#94A3B8` | Meta, dates (slate-400) |
| `--color-border` | `#E2E8F0` | Borders, dividers (slate-200) |
| `--color-border-focus` | `#1E40AF` | Focus ring |

### Dark mode

Default is light. Dark mode is a progressive enhancement.

| Token | Light | Dark |
|-------|-------|------|
| `--color-bg` | `#FFFFFF` | `#0B1120` |
| `--color-bg-alt` | `#F8FAFC` | `#0F172A` |
| `--color-bg-card` | `#FFFFFF` | `#1E293B` |
| `--color-text` | `#0F172A` | `#F1F5F9` |
| `--color-text-secondary` | `#475569` | `#94A3B8` |
| `--color-border` | `#E2E8F0` | `#334155` |

## Typography

### Font stack

- **Headings**: Geist (sans-serif, tight tracking `-0.02em`)
- **Body**: Plus Jakarta Sans (sans-serif, warm readable)
- **Monospace/tags**: JetBrains Mono (skill badges, metadata)

### Type scale

| Level | Size | Weight | Line Height | Letter Spacing |
|-------|------|--------|-------------|----------------|
| Display | 72px | 700 | 1.0 | -0.03em |
| H1 | 48px | 700 | 1.1 | -0.02em |
| H2 | 36px | 600 | 1.15 | -0.02em |
| H3 | 24px | 600 | 1.25 | -0.01em |
| H4 | 20px | 600 | 1.3 | normal |
| Body | 16px | 400 | 1.6 | normal |
| Body-small | 14px | 400 | 1.5 | normal |
| Caption | 12px | 500 | 1.4 | +0.05em |
| Eyebrow | 11px | 600 | 1.2 | +0.08em |

### Responsive scale

Headings scale down on mobile:

| Level | Desktop | Tablet | Mobile |
|-------|---------|--------|--------|
| Display | 72px | 56px | 40px |
| H1 | 48px | 40px | 32px |
| H2 | 36px | 30px | 24px |
| H3 | 24px | 22px | 20px |

## Spacing

Base unit: `4px`. All spacing uses multiples of 4.

| Token | Value |
|-------|-------|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-10` | 40px |
| `--space-12` | 48px |
| `--space-16` | 64px |
| `--space-20` | 80px |
| `--space-24` | 96px |
| `--space-32` | 128px |

Section padding: `py-20` (80px) desktop, `py-12` (48px) mobile.

## Layout

- **Max-width**: `1200px` (`--content-width`)
- **Grid**: 12-column, `gap-6` (24px)
- **Cards**: 3-column on desktop, 2 on tablet, 1 on mobile
- **Side padding**: `px-6` (24px) mobile, `px-8` (32px) tablet, `px-12` (48px) desktop

## Component Architecture

### Double-Bezel Cards (anti-AI-slop)

Cards never sit flat. Every card gets a nested enclosure:

```
Outer shell:  bg-slate-50  p-1  rounded-2xl
Inner core:   bg-white  rounded-[calc(1rem-4px)]  shadow-[0_4px_20px_rgba(13,0,134,0.06)]
```

### Job Card

```
┌──────────────────────────────────┐
│  [Referral Bonus: $1000] [Remote]│  ← badges
│                                  │
│  Member of Technical Staff       │  ← title (H3)
│  (Frontier AI)                   │
│                                  │
│  $600K - $2M/yr  •  Full-time   │  ← pay + type
│                                  │
│  [ML] [RL] [Data Design] [AI]    │  ← skill tags
│                                  │
│  ┌──────────────────────────┐    │
│  │  Apply Now  →            │    │  ← primary CTA
│  └──────────────────────────┘    │
└──────────────────────────────────┘
```

### Buttons

Primary:
- `bg-primary text-white px-6 py-3 rounded-xl font-semibold`
- Hover: `bg-primary-dark shadow-lg`
- Active: `scale-[0.98]`

Secondary:
- `bg-transparent text-primary border-2 border-primary px-6 py-3 rounded-xl`
- Hover: `bg-primary-light`

Button-in-Button (trailing icon):
```
[ Apply Now  [→] ]
```
Icon is nested in its own `w-8 h-8 rounded-full bg-white/10` wrapper.

### Badges

Referral bonus:
- `bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-xs font-semibold`
- For $1000+: `bg-amber-200 text-amber-900`

Salary tag:
- `bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-xs font-semibold`

Remote badge:
- `bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full text-xs`

### Skill Tags

- `bg-slate-100 text-slate-700 px-2 py-1 rounded-md text-xs font-mono`
- Hover: `bg-slate-200`

## Motion

All transitions use custom cubic-bezier curves — no `linear` or `ease-in-out`.

```css
--ease-smooth: cubic-bezier(0.32, 0.72, 0, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

- Card hover: `transform translateY(-2px) scale(1.01)` over `200ms var(--ease-smooth)`
- Page entry: fade-up `translateY(24px) opacity(0)` → `translateY(0) opacity(1)` over `600ms`
- Stagger: each card in grid delays `50ms` more than the last
- Button press: `scale(0.98)` over `100ms`
- Filter/search: `opacity 200ms` for results

## Site Architecture

```
/                       → Hero + category grid + top bonuses
/jobs/                  → All jobs (filterable, searchable, paginated)
/jobs/[category]/       → Jobs by category (AI/ML, Language, Finance, Legal, etc.)
/jobs/[slug]/           → Individual job page with full description + Apply CTA
/api/jobs              → Cloudflare Worker: serve jobs from KV
/api/jobs?search=...   → Worker: search/filter
```

### Category taxonomy

10 categories covering all 217 jobs:

1. **AI Research & Engineering** — MTS roles, Data Scientist, ML Engineer
2. **Software Engineering** — Full-stack, Backend, Frontend, DevOps, Mobile
3. **Language & Translation** — Chinese, Mandarin, Hebrew, French, Japanese, etc.
4. **Finance & Accounting** — Financial Advisor, Accountant, FP&A, Tax
5. **Legal** — Attorney, Paralegal, Law Clerk, General Counsel
6. **Healthcare & Science** — Medical, Biology, Chemistry, Physics, Nursing
7. **Creative & Design** — UI/UX, 2D Artist, Video, Presentation Designer
8. **Game Development** — Cocos2d-x, Panda3D, Solar2D, Defold, libGDX
9. **Business & Operations** — Growth Manager, Marketing, Sales, PM, Consultant
10. **Specialized Technical** — QGIS, CNC, PCB, AutoCAD, OpenSCAD

## Data Schema

```typescript
interface Job {
  id: string
  title: string
  slug: string
  category: string
  openings: number
  type: string // "full-time" | "part-time" | "contract"
  location: string
  referralBonus: number
  salaryMin: number | null  // annual
  salaryMax: number | null
  hourlyMin: number | null
  hourlyMax: number | null
  skills: string[]
  description: string  // markdown
  affiliateUrl: string  // micro1 with referralCode
  featured: boolean  // high-bonus or high-salary picks for homepage
}
```

## Stack

- **Framework**: Astro (SSG for SEO)
- **Backend**: Cloudflare Workers (API + KV for dynamic job data)
- **Deployment**: Cloudflare Pages (Astro build) + Workers
- **Styling**: Tailwind CSS v4 with CSS variables
- **Icons**: Phosphor Icons (light weight, thin strokes — no Lucide/FontAwesome)
- **Fonts**: Geist + Plus Jakarta Sans (Google Fonts or self-hosted)

## Anti-Slop Checklist

- [ ] No Inter, Roboto, Arial, Open Sans, Helvetica
- [ ] No Lucide, FontAwesome, Material Icons — use Phosphor
- [ ] No generic 1px gray borders — use slate-200 with opacity
- [ ] No harsh `shadow-md` — use soft blue-tinted shadows
- [ ] No edge-to-edge sticky navbar — floating pill nav
- [ ] No symmetrical 3-col grid — use 2-col bento or varied spans
- [ ] No `linear` or `ease-in-out` transitions — custom cubic-bezier
- [ ] Cards use double-bezel nested architecture
- [ ] Section padding min `py-16` — generous whitespace
- [ ] Scroll entry animations present — no elements appear statically
