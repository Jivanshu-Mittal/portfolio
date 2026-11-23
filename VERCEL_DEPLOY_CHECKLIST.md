# Vercel Deployment Checklist

## Pre-Deploy Requirements

- [x] GitHub repo created and pushed: `https://github.com/Jivanshu-Mittal/portfolio`
- [x] GitHub Actions CI passes (lint, typecheck, build)
- [x] `npm run build` passes locally with static export (`out/` directory)
- [x] All routes work: `/` + `/404`
- [x] Security headers configured in `vercel.json`
- [x] `next-sitemap` generates `robots.txt` + `sitemap.xml` in `out/`

## Vercel Project Setup

### 1. Create Vercel Project
- [ ] Go to [vercel.com/new](https://vercel.com/new)
- [ ] Import `Jivanshu-Mittal/portfolio` from GitHub
- [ ] Configure:
  - **Framework Preset**: Next.js (auto-detected)
  - **Build Command**: `npm run build` (default)
  - **Output Directory**: `out` (critical for static export)
  - **Install Command**: `npm ci` (default)
  - **Root Directory**: `./` (default)

### 2. Environment Variables (Settings → Environment Variables)
| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SITE_URL` | `https://jivanshu.dev` | Production, Preview |
| `NEXT_PUBLIC_GA_ID` | *(optional)* | Production |

### 3. Security Headers (CRITICAL - Settings → Security Headers)
Since `output: 'export'` ignores `next.config.js` headers, **must configure in Vercel Dashboard**:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https:; connect-src 'self' https://api.github.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### 4. Custom Domain (Settings → Domains)
- [ ] Add `jivanshu.dev`
- [ ] Add `www.jivanshu.dev`
- [ ] Configure DNS at registrar:
  - **A record**: `@` → `76.76.21.21`
  - **CNAME**: `www` → `cname.vercel-dns.com`
- [ ] Enable "Redirect www to non-www" (or vice versa)

### 5. Build & Deploy Settings
- [ ] **Build Command**: `npm run build` (runs `next build && next-sitemap`)
- [ ] **Output Directory**: `out`
- [ ] **Install Command**: `npm ci`
- [ ] **Node.js Version**: 20.x (matches CI)

## Post-Deploy Verification

### Automated Checks
- [ ] Vercel build logs show: "Exporting (2/2)" with 0 errors
- [ ] `robots.txt` accessible at `https://jivanshu.dev/robots.txt`
- [ ] `sitemap.xml` accessible at `https://jivanshu.dev/sitemap.xml`
- [ ] Preview deployment works for PRs

### Manual Testing (Production URL)
- [ ] Home page loads: `https://jivanshu.dev`
- [ ] All sections render: Hero, Who, What, Philosophy, Ecosystem, Work, Experience, Process, Now, Why, Contact
- [ ] Navigation works: Desktop nav, Mobile nav, Section nav (sidebar)
- [ ] Mobile menu opens/closes (100dvh, staggered animation)
- [ ] Dark mode correct (ink background, paper text)
- [ ] Reduced motion respected (`prefers-reduced-motion: reduce`)
- [ ] Keyboard navigation: Tab through all interactive elements
- [ ] Focus indicators visible on all interactive elements
- [ ] Skip link works: Tab once → "Skip to main content" → Enter
- [ ] 404 page works: `https://jivanshu.dev/invalid-route`
- [ ] Contact buttons work: mailto:, tel:, download resume
- [ ] External links open in new tab: GitHub, LinkedIn, Twitter
- [ ] Project cards link to correct GitHub/demo URLs
- [ ] Project cover images load (SVG placeholders)

### Performance & SEO
- [ ] Lighthouse (Desktop): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90, SEO ≥ 90
- [ ] Lighthouse (Mobile): Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 90, SEO ≥ 90
- [ ] Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] CSP headers present: `curl -I https://jivanshu.dev | grep -i content-security-policy`
- [ ] Security headers present: X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- [ ] JSON-LD validates: [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] PWA manifest valid: DevTools → Application → Manifest

### Search Console & Analytics
- [ ] Submit sitemap to Google Search Console: `https://jivanshu.dev/sitemap.xml`
- [ ] Verify domain ownership in Google Search Console
- [ ] Set up Vercel Analytics (privacy-friendly) or Umami/Plausible
- [ ] Check for crawl errors after 24-48 hours

## Optional Enhancements (Post-Launch)
- [ ] Sentry / LogRocket for error tracking
- [ ] Umami / Plausible for self-hosted analytics
- [ ] Husky + lint-staged for pre-commit hooks
- [ ] Conventional commits for automated changelogs
- [ ] Dependabot PRs for auto-updating dependencies
- [ ] Replace SVG cover images with actual project screenshots
- [ ] Verify demo URLs in `src/lib/data.ts` are live