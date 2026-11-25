# GitHub Publish Checklist

## Pre-Push Verification

- [x] `npm run lint` — ESLint 9 (`eslint .` via `eslint.config.mjs`) passes with 0 errors
- [x] `npx tsc --noEmit` — Strict TypeScript passes with 0 errors
- [x] `npm test` — `node --test tests/*.test.mjs` passes (13 tests across 6 suites)
- [x] `npm audit` — **0 vulnerabilities** (`postcss` overridden to `^8.5.23`)
- [ ] `npm run build` — Static export (`next build && next-sitemap`) generates `./out` including `/`, `/work`, `/projects`, `/skills`, `404`, `robots.txt`, and sitemaps
- [x] Static export configured (`output: 'export'` and `images.unoptimized: true` in `next.config.js`)

## Repository Setup

- [x] Remote `origin` → `https://github.com/Jivanshu-Mittal/portfolio.git`
- [x] Branch `main` tracking `origin/main`
- [x] `.gitignore` excludes `node_modules`, `.next/`, `out/`, `build`, `dist`, `.env*`, `.vercel`, `*.tsbuildinfo`, `next-env.d.ts`, IDE files

## Tracked Files & Structure

### Core Configuration
- [x] `package.json` — Next.js `15.5.29`, React `^19.0.0`, Tailwind CSS `^3.4.14`, TypeScript `^5.6.3`, ESLint `^9.0.0`, `next-sitemap` `^4.2.3`, `postcss` `^8.5.23` override
- [x] `next.config.js` — `reactStrictMode: true`, `output: 'export'`, `images.unoptimized: true`, scoped `remotePatterns`, hosting header notes
- [x] `tsconfig.json` — Strict TypeScript (`strict: true`, `noEmit: true`), `@/*` path alias
- [x] `tailwind.config.ts` — Custom ink/paper/brand theme, animations, fluid typography scales
- [x] `postcss.config.js` — `tailwindcss` and `autoprefixer`

### Code Quality, Testing & CI
- [x] `eslint.config.mjs` — ESLint 9 flat config using `@eslint/eslintrc` `FlatCompat` extending `next/core-web-vitals`
- [x] `tests/security-and-assets.test.mjs` — Verifies `public/` assets (`data.ts`, `manifest.webmanifest`), tightened CSP & security headers (`vercel.json`, `netlify.toml`, `public/_headers`), and `src/` hygiene
- [x] `tests/site-config.test.mjs` — Verifies dynamic `siteUrl` resolution (`NEXT_PUBLIC_SITE_URL`, `VERCEL_PROJECT_PRODUCTION_URL`, `VERCEL_URL`, fallback) and static `next-sitemap.config.js` options
- [x] `.github/workflows/ci.yml` — `build` job on `ubuntu-latest` (Node 20): `npm ci` → `npm run lint` → `npx tsc --noEmit` → `npm test` → `npm run build`

### Platform Security & Deployment Configuration
- [x] `vercel.json` — Static export config (`buildCommand`, `outputDirectory: "out"`, `framework: null`) and hardened CSP, HSTS, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`
- [x] `netlify.toml` — Netlify build (`command = "npm run build"`, `publish = "out"`) and matching security headers
- [x] `public/_headers` — Cloudflare Pages / Netlify `_headers` file with matching hardened CSP and security headers

### SEO, Sitemaps & URL Resolution
- [x] `next-sitemap.config.js` — Dynamic `siteUrl` resolution (`NEXT_PUBLIC_SITE_URL` → `VERCEL_PROJECT_PRODUCTION_URL` → `VERCEL_URL` → `https://jivanshu.dev`); generates `robots.txt`, `sitemap.xml`, and `sitemap-0.xml` directly into `out/` on build (not tracked in `public/`)
- [x] `src/lib/data.ts` — Dynamic `SITE_URL` resolution matching `next-sitemap.config.js` for canonical metadata, Open Graph, and JSON-LD

### Assets (`public/`)
- [x] `public/images/del2-cover.svg`, `public/images/taskflow-cover.svg`, `public/images/apigateway-cover.svg` — Project cover illustrations
- [x] `public/og-image.png` — Open Graph image (`1200×630`)
- [x] `public/favicon.ico`, `public/apple-touch-icon.png`, `public/icon-192.png`, `public/icon-512.png` — Favicon & app icons
- [x] `public/manifest.webmanifest` — PWA manifest
- [x] `public/resume.pdf` — Downloadable resume

### Source Code (`src/`)
- [x] `src/app/layout.tsx` — Root layout, metadata (`metadataBase`), `Inter` & `JetBrains_Mono` (`next/font/google`), skip link, `<JsonLd />`
- [x] `src/app/page.tsx` — Home page composing all sections
- [x] `src/app/not-found.tsx` — Custom 404 page (`noindex, follow`)
- [x] `src/app/work/page.tsx` — `/work` route (Selected Work & Case Studies)
- [x] `src/app/projects/page.tsx` — `/projects` route (Complete Project Archive)
- [x] `src/app/skills/page.tsx` — `/skills` route (Skills & Tech Ecosystem)
- [x] `src/components/Sections/` — `Hero`, `Who`, `What`, `Philosophy`, `Ecosystem`, `Work`, `Experience`, `Process`, `Now`, `Why`, `ContactCTA`
- [x] `src/components/Navigation/` — `DesktopNav`, `MobileNav`, `SectionNav`
- [x] `src/components/Button.tsx`, `src/components/JsonLd.tsx`, `src/components/Footer.tsx`
- [x] `src/lib/data.ts`, `src/lib/utils.ts` — Content data (`SITE_URL`, `siteConfig`, section datasets) and utilities
- [x] `src/styles/globals.css` — Tailwind layers, custom properties, animations, glassmorphism

## Post-Push Verification

- [ ] GitHub Actions CI (`build` job) runs and passes (`npm run lint` → `npx tsc --noEmit` → `npm test` → `npm run build`)
- [ ] Repository is accessible at `https://github.com/Jivanshu-Mittal/portfolio`
- [ ] `README.md` and `DEPLOY_README.md` render cleanly on GitHub
- [ ] No sensitive data or `.env*` files committed
- [ ] Branch protection rules configured (**Settings → Branches → Add rule for `main`**):
  - [ ] Require a pull request before merging
  - [ ] Require 1 approval
  - [ ] Dismiss stale PR approvals
  - [ ] Require status check to pass: `build`
  - [ ] Require linear history
  - [ ] Include administrators
- [ ] GitHub Security features enabled (**Settings → Security & analysis**):
  - [ ] Dependency graph
  - [ ] Dependabot alerts
  - [ ] Dependabot security updates
  - [ ] Secret scanning
  - [ ] Push protection
