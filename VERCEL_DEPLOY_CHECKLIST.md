# Vercel Deployment Checklist

## Pre-Deploy Requirements

- [x] GitHub repo created and pushed: `https://github.com/Jivanshu-Mittal/portfolio`
- [x] GitHub Actions CI passes (`npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` in `.github/workflows/ci.yml`)
- [x] `npm run build` passes locally with static export (`out/` directory)
- [x] All routes work: `/`, `/work`, `/projects`, `/skills`, and `/404` (from `src/app/not-found.tsx` / static export)
- [x] Security headers configured in `vercel.json`
- [x] `next-sitemap` generates `robots.txt` + `sitemap.xml` in `out/`

## Vercel Project Setup

### 1. Create Vercel Project
- [x] Go to [vercel.com/new](https://vercel.com/new)
- [x] Import `Jivanshu-Mittal/portfolio` from GitHub
- [x] Configure:
  - **Framework Preset**: Next.js (auto-detected) → **Set to `null` in `vercel.json`** (`"framework": null`)
  - **Build Command**: `npm run build`
  - **Output Directory**: `out` (critical for static export)
  - **Install Command**: `npm ci`
  - **Root Directory**: `./` (default)

### 2. Environment Variables (Settings → Environment Variables)
| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SITE_URL` | `https://portfolio-seven-gilt-esbf7h8dlx.vercel.app` | Production, Preview |

**✅ Update to Vercel URL** (run: `npx vercel env add NEXT_PUBLIC_SITE_URL production`)

### 3. Security Headers (CRITICAL - Configured in `vercel.json`)
Since `output: 'export'` ignores `next.config.js` `headers()`, security headers are configured in `vercel.json` for `/(.*)`:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data:; connect-src 'self'; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

**✅ Configured via `vercel.json` - all headers active on production**

### 4. Custom Domain (Settings → Domains)
- [x] **N/A — Using free Vercel subdomain** (budget: ₹0)
- [x] Production URL: `https://portfolio-seven-gilt-esbf7h8dlx.vercel.app`
- [x] No DNS configuration needed
- [x] SSL, CDN, global edge network included free
- [x] Update `NEXT_PUBLIC_SITE_URL` to Vercel URL in env vars
- [x] Submit Vercel URL sitemap to Google Search Console

### 5. Build & Deploy Settings
- [x] **Build Command**: `npm run build` (runs `next build && next-sitemap`)
- [x] **Output Directory**: `out`
- [x] **Install Command**: `npm ci`
- [x] **Node.js Version**: `20` (matches `.github/workflows/ci.yml`)

## Post-Deploy Verification

### Automated Checks
- [x] Vercel build logs show static export completing with 0 errors across all routes (`/`, `/work`, `/projects`, `/skills`, `/404`)
- [x] `robots.txt` accessible at `https://portfolio-seven-gilt-esbf7h8dlx.vercel.app/robots.txt`
- [x] `sitemap.xml` accessible at `https://portfolio-seven-gilt-esbf7h8dlx.vercel.app/sitemap.xml`
- [x] Preview deployment works for PRs

### Manual Testing (Production URL)
- [x] Home page loads: `https://portfolio-seven-gilt-esbf7h8dlx.vercel.app`
- [x] Sub-routes load: `/work`, `/projects`, `/skills`
- [x] All home sections render: Hero, Who, What, Philosophy, Ecosystem, Work, Experience, Process, Now, Why, Contact
- [x] Navigation works: Desktop nav, Mobile nav, Section nav (sidebar)
- [x] Mobile menu opens/closes (100dvh, staggered animation)
- [x] Dark mode correct (ink background, paper text)
- [x] Reduced motion respected (`prefers-reduced-motion: reduce`)
- [x] Keyboard navigation: Tab through all interactive elements
- [x] Focus indicators visible on all interactive elements
- [x] Skip link works: Tab once → "Skip to main content" → Enter
- [x] 404 page works: `https://portfolio-seven-gilt-esbf7h8dlx.vercel.app/invalid-route`
- [x] Contact buttons work: mailto:, tel:, download resume
- [x] External links open in new tab: GitHub, LinkedIn, Twitter
- [x] Project cards link to correct GitHub/demo URLs
- [x] Project cover images load (SVG placeholders)

### Performance & SEO
- [ ] Lighthouse (Desktop): Performance **63** (target ≥ 90), Accessibility **89** (target ≥ 95), Best Practices **100**, SEO **100**
- [ ] Lighthouse (Mobile): *not yet run*
- [ ] Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1
- [x] CSP headers present: `curl -I https://portfolio-seven-gilt-esbf7h8dlx.vercel.app | grep -i content-security-policy`
- [x] Security headers present: `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`
- [x] JSON-LD present on production (`WebSite`, `ProfilePage`, `Person`)
- [x] PWA manifest valid: `https://portfolio-seven-gilt-esbf7h8dlx.vercel.app/manifest.webmanifest`

> **Performance & font notes**: Static export + Vercel Edge CDN provides edge caching. Fonts (`Inter` and `JetBrains Mono`) are self-hosted via `next/font/google` in `src/app/layout.tsx` with `display: 'swap'` and `preload: true` (no external Google Fonts requests at runtime).

### Search Console & Analytics
- [ ] Submit sitemap to Google Search Console: `https://portfolio-seven-gilt-esbf7h8dlx.vercel.app/sitemap.xml`
- [ ] Verify URL prefix in Google Search Console (not domain — no DNS access)
- [ ] Set up Vercel Analytics (Settings → Analytics → Enable — free, privacy-friendly)
- [ ] Check for crawl errors after 24-48 hours

## Optional Enhancements (Post-Launch)
- [ ] Sentry / LogRocket for error tracking
- [ ] Umami / Plausible for self-hosted analytics
- [ ] Husky + lint-staged for pre-commit hooks
- [ ] Conventional commits for automated changelogs
- [ ] Dependabot PRs for auto-updating dependencies
- [ ] Replace SVG cover images with actual project screenshots
- [x] Verified project external URLs in src/lib/data.ts (removed dead 404/401 placeholder links in favor of in-app case studies)
