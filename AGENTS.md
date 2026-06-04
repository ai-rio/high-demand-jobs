# high-demand-jobs — micro1 Affiliate Job Directory

**high-demand-jobs** promotes 217 micro1 positions with Carlos's referral code
(`dcfa4fa4-2bf3-4187-82c9-9d3dd4db4ddb`). Stack: Astro (SSG) + Cloudflare Workers +
KV + Tailwind CSS v4. Deployed on Cloudflare Pages + Workers.

The site is a **traffic engine** — every "Apply" click hits micro1 with the
referral code embedded. No sub-affiliate system. No code exposure.

## READ FIRST every session

Read `DESIGN.md` (repo root) before any UI/visual decision. It defines:

- Color palette (blue primary, emerald salary tags, amber bonus badges)
- Typography (Geist headings + Plus Jakarta Sans body — NO Inter/Roboto)
- Component architecture (double-bezel cards, pill badges, button-in-button CTAs)
- Anti-AI-slop checklist (banned fonts, icons, layouts, transitions)

## Anti-sycophancy gate (every reply)

Per Anthropic Constitution: "diplomatically honest > dishonestly diplomatic."

1. Before agreeing with a redirect, restate the PRIOR framing + name what's changing + state the strongest objection.
2. Default response = skeptical principal engineer. Open with concrete concerns first.
3. Reframe "I think we should X" → internally ask "Is X right? Strongest counter?"
4. If 3+ turns pass without pushback, flag it.

## Hard Rules

### 1. All data is parsed from `high-demand-jobs.md`
That file is the source of truth. 217 jobs, each with: title, openings, type, referral bonus, salary/hourly, skills, description, affiliate URL. Never fabricate or hallucinate jobs.

### 2. Every external link uses the referral code
All `href` values pointing to micro1 must include `referralCode=dcfa4fa4-2bf3-4187-82c9-9d3dd4db4ddb`. Verify this programmatically.

### 3. SEO-first on every page
Every job page is a unique landing page. Generate proper `<title>`, `<meta description>`, `<link rel="canonical">`, OG tags, and JSON-LD structured data (JobPosting schema). Use slugs derived from job titles.

### 4. No AI-slop design patterns
- Banned fonts: Inter, Roboto, Arial, Open Sans, Helvetica
- Banned icons: Lucide, FontAwesome, Material Icons — use Phosphor (light weight)
- Banned transitions: `linear`, `ease-in-out` — use custom cubic-bezier
- No generic 1px gray borders, no harsh `shadow-md`, no edge-to-edge sticky nav
- Cards use double-bezel nested architecture (outer shell + inner core)
- Section padding minimum `py-16`

### 5. Simple parsing pipeline
Jobs are parsed once from `high-demand-jobs.md` → `src/data/jobs.json` at build.
The Worker API serves from KV for dynamic updates without rebuild.

### 6. No speculative builds
Every feature must trace to: driving affiliate clicks, improving SEO, or making 217 jobs navigable. No "nice to have" without a clear conversion hypothesis.

## Repo structure

```
high-demand-jobs/
├── AGENTS.md              ← this file
├── DESIGN.md              ← design system (colors, typography, components, anti-slop)
├── preview.html           ← visual design preview
├── high-demand-jobs.md    ← source data (217 jobs)
├── parse-jobs.ts          ← markdown → JSON parser
├── src/
│   ├── data/jobs.json     ← parsed job data (generated)
│   ├── pages/
│   │   ├── index.astro    ← homepage (hero + category grid)
│   │   ├── jobs/
│   │   │   ├── index.astro         ← all jobs (filterable, paginated)
│   │   │   ├── [category].astro    ← jobs by category
│   │   │   └── [slug].astro        ← individual job page
│   ├── components/
│   │   ├── JobCard.astro
│   │   ├── CategoryGrid.astro
│   │   ├── Badge.astro
│   │   ├── SkillTag.astro
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Base.astro
│   ├── styles/
│   │   └── global.css
│   └── lib/
│       └── categories.ts    ← category taxonomy + job grouping
├── workers/
│   └── api/
│       └── src/index.ts     ← CF Worker: /api/jobs (search/filter from KV)
├── wrangler.jsonc
├── package.json
├── astro.config.mjs
├── tsconfig.json
└── tailwind.config.mjs
```

## Category taxonomy

10 categories covering 217 jobs:

1. AI Research & Engineering — MTS, Data Scientist, ML Engineer
2. Software Engineering — Full-stack, Backend, Frontend, DevOps, Mobile
3. Language & Translation — Chinese, Mandarin, Hebrew, French, Japanese, etc.
4. Finance & Accounting — Financial Advisor, Accountant, FP&A, Tax
5. Legal — Attorney, Paralegal, Law Clerk, General Counsel
6. Healthcare & Science — Medical, Biology, Chemistry, Physics, Nursing
7. Creative & Design — UI/UX, 2D Artist, Video, Presentation Designer
8. Game Development — Cocos2d-x, Panda3D, Solar2D, Defold, libGDX
9. Business & Operations — Growth Manager, Marketing, Sales, PM, Consultant
10. Specialized Technical — QGIS, CNC, PCB, AutoCAD, OpenSCAD

## Stack

- **Astro** (SSG for SEO) — deployed on Cloudflare Pages
- **Cloudflare Workers** — API layer (search/filter from KV)
- **Cloudflare KV** — job data store (dynamic updates without rebuild)
- **Tailwind CSS v4** — styling, using DESIGN.css tokens
- **Phosphor Icons** — light weight icons (NOT Lucide/FontAwesome)
- **Geist** + **Plus Jakarta Sans** — fonts (NOT Inter/Roboto)

## Data schema

```typescript
interface Job {
  id: string
  title: string
  slug: string
  category: string
  openings: number
  type: string
  location: string
  referralBonus: number
  salaryMin: number | null
  salaryMax: number | null
  hourlyMin: number | null
  hourlyMax: number | null
  skills: string[]
  description: string
  affiliateUrl: string  // includes referralCode
  featured: boolean
}
```

## Commands

```bash
# parse jobs from markdown
bun run parse-jobs.ts

# dev
bun run dev

# build
bun run build

# preview production build
bun run preview

# deploy
bun run deploy

# wrangler (worker)
bun run wrangler
```

## Design System

Always read `DESIGN.md` before any visual/UI decision. Key rules:

- **Heading font:** Geist (NO Inter)
- **Body font:** Plus Jakarta Sans (NO Inter/Roboto)
- **Icons:** Phosphor (NO Lucide/FontAwesome)
- **Card pattern:** double-bezel (outer shell + inner core, never flat)
- **Transitions:** custom cubic-bezier only (NO linear/ease-in-out)
- **Section spacing:** minimum `py-16`
- **Primary:** `#1E40AF` — **Emerald:** `#059669` — **Amber:** `#D97706`
