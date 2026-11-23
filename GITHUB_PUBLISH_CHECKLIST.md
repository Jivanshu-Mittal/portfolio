# GitHub Publish Checklist

## Pre-Push Verification (All Passing ✅)

- [x] `npm run build` — Build passes with 0 errors
- [x] `npx tsc --noEmit` — TypeScript passes with 0 errors
- [x] `npx next lint` — ESLint passes with 0 errors
- [x] `npm audit` — **0 vulnerabilities** (postcss overridden to 8.5.23+)
- [x] Static export works (`output: 'export'` in next.config.js)
- [x] All routes generate correctly (home + 404)

## Repository Setup

- [x] Git initialized with commit `0c3054a`
- [x] Remote `origin` → `https://github.com/Jivanshu-Mittal/portfolio.git`
- [x] Branch `main` pushed and tracking `origin/main`
- [x] `.gitignore` covers: node_modules, .next, out, build, dist, .env*, .vercel, *.tsbuildinfo, IDE files

## Files Included (23 files changed)

### Core Configuration
- [x] `package.json` — Next.js 15.5.29, React 19, ESLint 9, postcss 8.5.23 override
- [x] `next.config.js` — Static export, turbopack: false, security headers documented
- [x] `tsconfig.json` — Strict TypeScript, path aliases
- [x] `tailwind.config.ts` — Custom theme, animations, colors
- [x] `postcss.config.js` — Autoprefixer, Tailwind

### Code Quality
- [x] `eslint.config.mjs` — ESLint 9 flat config (extends next/core-web-vitals)
- [x] `.github/workflows/ci.yml` — CI: lint, typecheck, build

### Platform Configuration
- [x] `vercel.json` — Vercel headers (CSP, X-Frame-Options, etc.)
- [x] `netlify.toml` — Netlify build + headers + redirects
- [x] `public/_headers` — Netlify/Cloudflare/GitHub Pages headers format

### SEO & Meta
- [x] `next-sitemap.config.js` — Generates sitemap.xml + robots.txt to `out/`
- [x] `public/robots.txt` — Generated (allows all, disallows /api/, /_next/, /static/)
- [x] `public/sitemap.xml` — Generated (index + sitemap-0.xml)
- [x] `public/sitemap-0.xml` — Generated (homepage with lastmod, changefreq, priority)

### Assets
- [x] `public/images/del2-cover.svg` — Project 1 cover
- [x] `public/images/taskflow-cover.svg` — Project 2 cover
- [x] `public/images/apigateway-cover.svg` — Project 3 cover
- [x] `public/og-image.png` — Open Graph image (1200×630)
- [x] `public/favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`
- [x] `public/manifest.webmanifest` — PWA manifest
- [x] `public/resume.pdf` — Downloadable resume

### Source Code
- [x] `src/app/layout.tsx` — Root layout, metadata, fonts, JSON-LD
- [x] `src/app/page.tsx` — Home page with all sections
- [x] `src/app/not-found/page.tsx` — Custom 404 (deleted, using Next.js default)
- [x] `src/components/` — All sections (Hero, Who, What, Philosophy, Ecosystem, Work, Experience, Process, Now, Why, ContactCTA)
- [x] `src/components/Navigation/` — DesktopNav, MobileNav, SectionNav
- [x] `src/components/Button.tsx` — Button + all icons
- [x] `src/components/JsonLd.tsx` — Structured data
- [x] `src/components/Footer.tsx` — Footer with links
- [x] `src/lib/data.ts` — All content data (updated cover image paths)
- [x] `src/lib/utils.ts` — Utility functions (cn, formatDate, getISTTime, slugify)
- [x] `src/styles/globals.css` — Tailwind + custom CSS (animations, gradients, glassmorphism)

## Post-Push Verification

- [ ] GitHub Actions CI runs and passes (lint → typecheck → build)
- [ ] Repository is public at `https://github.com/Jivanshu-Mittal/portfolio`
- [ ] README.md renders correctly
- [ ] No sensitive data in repo (check .env* not committed)
- [ ] Branch protection rules configured (Settings → Branches → Add rule for `main`):
  - [ ] Require PR before merging
  - [ ] Require 1 approval
  - [ ] Dismiss stale approvals
  - [ ] Require status checks: build, lint, typecheck
  - [ ] Require linear history
  - [ ] Include administrators
- [ ] GitHub Security features enabled (Settings → Security & analysis):
  - [ ] Dependency graph
  - [ ] Dependabot alerts
  - [ ] Dependabot security updates
  - [ ] Secret scanning
  - [ ] Push protection