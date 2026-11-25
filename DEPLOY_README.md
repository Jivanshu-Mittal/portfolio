# Portfolio Deployment Guide

## Tech Stack & Architecture

- **Framework**: Next.js `15.5.29` (App Router, `output: 'export'` static export)
- **UI Library**: React 19 (`^19.0.0`) & React DOM (`^19.0.0`)
- **Language**: TypeScript (`^5.6.3`, `strict: true` in `tsconfig.json`)
- **Styling**: Tailwind CSS (`^3.4.14`) + PostCSS (`^8.5.23` override) + CSS custom properties
- **Typography**: `Inter` (`--font-body`) & `JetBrains_Mono` (`--font-mono`) self-hosted via `next/font/google`
- **SEO & Sitemaps**: `next-sitemap` (`^4.2.3`) generating `robots.txt`, `sitemap.xml`, and `sitemap-0.xml` into `out/`
- **Linting & Testing**: ESLint 9 (`eslint .` via `eslint.config.mjs`) and Node.js native test runner (`node --test tests/*.test.mjs`)

---

## Verified Project & Configuration Status

| Area | File / Location | Details |
|------|-----------------|---------|
| Static export & images | `next.config.js` | `reactStrictMode: true`, `output: 'export'`, `images.unoptimized: true`, `remotePatterns` scoped to `github.com`, `avatars.githubusercontent.com`, `raw.githubusercontent.com` |
| App routes | `src/app/` | Home (`/`), `/work`, `/projects`, `/skills`, and custom 404 (`src/app/not-found.tsx` with `noindex, follow`) |
| Dynamic site URL | `src/lib/data.ts`, `next-sitemap.config.js` | Resolves `NEXT_PUBLIC_SITE_URL` → `VERCEL_PROJECT_PRODUCTION_URL` → `VERCEL_URL` → fallback `https://jivanshu.dev` |
| Security headers & CSP | `vercel.json`, `netlify.toml`, `public/_headers` | Hardened CSP, HSTS, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy` |
| Sitemap & robots output | `next-sitemap.config.js` | Writes `robots.txt`, `sitemap.xml`, and `sitemap-0.xml` to `./out` on `npm run build`; excludes `/server-sitemap.xml`, `/404`, `/_not-found` |
| ESLint 9 flat config | `eslint.config.mjs` | Uses `@eslint/eslintrc` `FlatCompat` extending `next/core-web-vitals`; ignores `.next/`, `out/`, `node_modules/`, `.vercel/` |
| Automated tests | `tests/*.test.mjs` | 13 tests across 6 suites verifying `public/` assets, deployment CSP/headers, `src/` hygiene, and `next-sitemap.config.js` |
| CI workflow | `.github/workflows/ci.yml` | Runs `npm ci`, `npm run lint`, `npx tsc --noEmit`, `npm test`, and `npm run build` on `push` and `pull_request` |
| Accessibility & SEO | `src/app/layout.tsx`, `src/components/` | Skip link (`#main`), semantic HTML, reduced-motion support, JSON-LD (`JsonLd`), Open Graph/Twitter meta, PWA manifest |
| Public assets | `public/` | `favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `manifest.webmanifest`, `og-image.png`, `resume.pdf`, `_headers`, `images/*.svg` |

---

## Local Verification

Run the local verification suite before pushing or deploying:

```bash
npm ci
npm run lint        # runs `eslint .` via eslint.config.mjs
npx tsc --noEmit    # strict TypeScript typecheck
npm test            # runs `node --test tests/*.test.mjs` (13 passing tests)
npm audit           # 0 vulnerabilities (with postcss ^8.5.23 override)
npm run build       # runs `next build && next-sitemap`, outputs static site to ./out
```

---

## Security Headers & Hardened CSP

Because `output: 'export'` does not support `async headers()` in `next.config.js`, identical security headers are configured across all three platform configs (`vercel.json`, `netlify.toml`, and `public/_headers`):

```text
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data:; connect-src 'self'; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

Because `Inter` and `JetBrains Mono` are self-hosted via `next/font/google`, external font origins (`fonts.googleapis.com`, `fonts.gstatic.com`) and `'unsafe-eval'` are omitted from the CSP.

---

## Deployment Setup

### 1. GitHub Repository & Branch Protection

Remote `origin` points to `https://github.com/Jivanshu-Mittal/portfolio.git` (`main` branch).

Recommended branch protection rules (**Settings → Branches → Add rule for `main`**):
- [ ] Require a pull request before merging
- [ ] Require approvals (1)
- [ ] Dismiss stale PR approvals when new commits are pushed
- [ ] Require status checks to pass before merging: `build` (GitHub Actions job in `.github/workflows/ci.yml`)
- [ ] Require linear history
- [ ] Include administrators

Recommended repository security settings (**Settings → Security & analysis**):
- [ ] Dependency graph
- [ ] Dependabot alerts
- [ ] Dependabot security updates
- [ ] Secret scanning
- [ ] Push protection

### 2. Vercel Deployment

`vercel.json` is preconfigured with:
- **Build Command**: `npm run build`
- **Output Directory**: `out`
- **Install Command**: `npm ci`
- **Framework**: `null` (static export output served directly with `vercel.json` headers)

Steps in the Vercel Dashboard:
1. Go to [vercel.com/new](https://vercel.com/new) and import `Jivanshu-Mittal/portfolio`.
2. Configure environment variables under **Settings → Environment Variables**:

   | Name | Value | Environment | Notes |
   |------|-------|-------------|-------|
   | `NEXT_PUBLIC_SITE_URL` | `https://jivanshu.dev` | Production | Overrides `VERCEL_PROJECT_PRODUCTION_URL` / `VERCEL_URL` for canonical metadata, JSON-LD, and `next-sitemap` |

   Preview deployments automatically resolve `VERCEL_URL` when `NEXT_PUBLIC_SITE_URL` is not set for Preview.
3. Configure custom domains under **Settings → Domains**:
   - Add `jivanshu.dev` and `www.jivanshu.dev`
   - DNS at registrar: `A` record `@` → `76.76.21.21`, `CNAME` `www` → `cname.vercel-dns.com`
   - Enable redirect from `www` to apex (`jivanshu.dev`)

### 3. Netlify / Cloudflare Pages (Alternative Static Hosts)

- **Netlify**: `netlify.toml` sets `command = "npm run build"`, `publish = "out"`, and all `[[headers]]` rules.
- **Cloudflare Pages**: Set build command `npm run build` and output directory `out`; `public/_headers` is copied into `out/_headers` automatically.

---

## Post-Deploy Verification

### Automated
- [ ] GitHub Actions CI (`build` job: lint, typecheck, test, build) passes on `main`
- [ ] Hosting build succeeds and publishes `out/`

### Functional & Accessibility (on live URL)
- [ ] Home page (`/`) renders all sections: Hero, Who, What, Philosophy, Ecosystem, Work, Experience, Process, Now, Why, Contact
- [ ] Dedicated routes load cleanly: `/work`, `/projects`, `/skills`
- [ ] Custom 404 (`src/app/not-found.tsx`) renders for unknown paths (e.g., `/invalid-route`) with `Back to Home` and `View Selected Work` links
- [ ] Desktop, mobile (`100dvh` menu), and section sidebar navigation work
- [ ] Keyboard navigation, focus indicators, `prefers-reduced-motion`, and skip link (`Skip to main content`) work
- [ ] Contact actions (`mailto:`, `tel:`, `/resume.pdf`) and external project links work
- [ ] JSON-LD validates in [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Web app manifest (`/manifest.webmanifest`) loads cleanly in DevTools → Application → Manifest

### Headers, Performance & SEO
- [ ] Hardened `Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy` headers are present on HTTP responses
- [ ] `/robots.txt`, `/sitemap.xml`, and `/sitemap-0.xml` are served from the `out/` build output with the expected canonical origin
- [ ] Lighthouse Desktop & Mobile meet target scores (Performance, Accessibility, Best Practices, SEO)
- [ ] Submit `/sitemap.xml` in Google Search Console and verify domain ownership

---

## Troubleshooting

- **Build errors**: Run `npm run lint`, `npx tsc --noEmit`, `npm test`, and `npm run build` locally to reproduce before pushing.
- **Missing security headers**: Confirm your host reads `vercel.json` (Vercel), `netlify.toml` (Netlify), or `out/_headers` (Cloudflare Pages / Netlify). `next.config.js` `headers()` is intentionally omitted because `output: 'export'` ignores it.
- **Wrong canonical or sitemap URL**: Set `NEXT_PUBLIC_SITE_URL` in the deployment environment; otherwise `src/lib/data.ts` and `next-sitemap.config.js` fall back through `VERCEL_PROJECT_PRODUCTION_URL`, `VERCEL_URL`, and `https://jivanshu.dev`.
- **Styles or fonts missing**: Verify `src/app/layout.tsx` (`Inter`, `JetBrains_Mono`) and `tailwind.config.ts` content globs (`./src/components/**/*`, `./src/app/**/*`).
