# Portfolio Deployment Guide

## ✅ COMPLETED — Code & Configuration

All code changes from `deploy.txt` are implemented:

| Task | File/Location | Status |
|------|---------------|--------|
| Build fix — `output: 'export'` | `next.config.js:4` | ✅ Done |
| Restricted image domains | `next.config.js:6-19` | ✅ github.com, avatars.githubusercontent.com, raw.githubusercontent.com |
| CSP + security headers | `next.config.js:22-49` | ✅ Added (note: requires Vercel config for static export) |
| Public assets | `/public/` | ✅ All 7 files present |
| ESLint config | `.eslintrc.json` | ✅ Extends `next/core-web-vitals` |
| Exact versions pinned | `package.json` | ✅ No `^`/`~` |
| CI workflow | `.github/workflows/ci.yml` | ✅ Build, lint, typecheck |
| Git repository | Root | ✅ Initialized, committed (`b69c42b`) |
| TypeScript strict | `tsconfig.json` | ✅ Passes `npx tsc --noEmit` |
| Accessibility | Components | ✅ React Aria, skip links, reduced motion |
| 404 page | `src/app/not-found/page.tsx` | ✅ |
| JSON-LD / PWA / SEO | `layout.tsx`, `manifest.webmanifest` | ✅ |

---

## ⚠️ LOCAL VERIFICATION NEEDED

**Issue:** Windows npm cache corrupted (`ENOTEMPTY` errors on `node_modules` operations).

**Fix locally:**
```bash
cd d:\claude\portfolio
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm run build      # Should pass
npm run lint       # Should pass on src files
npm audit fix      # Will show remaining vulns (accept or --force)
```

**Expected results after clean install:**
- `npm run build` → exit code 0 ✅
- `npm run lint` → passes on source files ✅
- `npx tsc --noEmit` → passes ✅
- `npm audit` → 6 vulns (1 moderate, 4 high, 1 critical) — rooted in `next@14.2.0`/`postcss`/`glob`/`minimatch`
  - Fix requires `--force` → upgrades `eslint-config-next` to 16.x (breaking, needs Next.js 15)
  - **Recommendation**: Accept current versions, document, plan Next.js 15 upgrade separately

---

## 📋 REMAINING MANUAL STEPS (GitHub UI / Vercel Dashboard)

### 1. Push to GitHub
```bash
git remote add origin https://github.com/jivanshu/portfolio.git
git branch -M main
git push -u origin main
```

### 2. GitHub Branch Protection (Settings → Branches → Add rule for `main`)
- [ ] Require a pull request before merging
- [ ] Require approvals (1)
- [ ] Dismiss stale PR approvals when new commits are pushed
- [ ] Require status checks to pass before merging
  - [ ] `build` (GitHub Actions)
  - [ ] `lint` (GitHub Actions)
  - [ ] `typecheck` (GitHub Actions)
- [ ] Require linear history
- [ ] Include administrators

### 3. GitHub Security Features (Settings → Security & analysis)
- [ ] Dependency graph
- [ ] Dependabot alerts
- [ ] Dependabot security updates
- [ ] Secret scanning
- [ ] Push protection

### 4. Vercel Deployment
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import `jivanshu/portfolio` from GitHub
3. Configure:
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `npm run build`
   - **Output Directory**: `out` (static export)
   - **Install Command**: `npm ci`
4. **Environment Variables** (Settings → Environment Variables):
   | Name | Value | Environment |
   |------|-------|-------------|
   | `NEXT_PUBLIC_SITE_URL` | `https://jivanshu.dev` | Production, Preview |
   | `NEXT_PUBLIC_GA_ID` | (optional) | Production |
5. **Custom Domain** (Settings → Domains):
   - Add `jivanshu.dev` and `www.jivanshu.dev`
   - DNS at registrar:
     - A record: `@` → `76.76.21.21`
     - CNAME: `www` → `cname.vercel-dns.com`
   - Enable "Redirect www to non-www"
6. **Security Headers** (Vercel Dashboard → Security Headers) — add CSP since `output: 'export'` ignores `next.config.js` headers:
   ```
   Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https:; connect-src 'self' https://vitals.vercel-insights.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self';
   X-Frame-Options: DENY
   X-Content-Type-Options: nosniff
   Referrer-Policy: strict-origin-when-cross-origin
   Permissions-Policy: camera=(), microphone=(), geolocation=()
   ```

---

## 🔍 POST-DEPLOY VERIFICATION

### Automated
- [ ] GitHub Actions CI passes on `main`
- [ ] Vercel build succeeds

### Manual (visit `https://jivanshu.dev`)
- [ ] Home page loads
- [ ] All sections render: Hero, Who, What, Philosophy, Ecosystem, Work, Experience, Process, Now, Why, Contact
- [ ] Navigation works: Desktop, Mobile, Section nav
- [ ] Mobile menu opens/closes (100dvh, staggered animation)
- [ ] Dark mode correct (ink background, paper text)
- [ ] Reduced motion respected
- [ ] Keyboard navigation: Tab through all interactive elements
- [ ] Focus indicators visible
- [ ] Skip link works (Tab → "Skip to main content" → Enter)
- [ ] 404 page works: `/invalid-route`
- [ ] Contact buttons work: mailto:, tel:, download resume
- [ ] External links open in new tab
- [ ] Project cards link correctly
- [ ] JSON-LD validates: [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] PWA manifest valid: DevTools → Application → Manifest

### Performance & SEO
- [ ] Lighthouse Desktop: Perf ≥ 90, A11y ≥ 95, BP ≥ 90, SEO ≥ 90
- [ ] Lighthouse Mobile: Perf ≥ 85, A11y ≥ 95, BP ≥ 90, SEO ≥ 90
- [ ] Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] CSP headers present
- [ ] Security headers present
- [ ] Sitemap accessible (if using `next-sitemap`)
- [ ] robots.txt accessible

### Search Console & Analytics
- [ ] Submit sitemap to Google Search Console
- [ ] Verify domain ownership
- [ ] Set up Vercel Analytics or Umami/Plausible
- [ ] Check for crawl errors after 24-48 hours

---

## 📦 OPTIONAL POST-LAUNCH ENHANCEMENTS

| Enhancement | Effort |
|-------------|--------|
| Sentry / LogRocket | Low |
| Vercel Analytics | Low |
| Umami / Plausible | Medium |
| Husky + lint-staged | Low |
| Conventional commits | Low |
| Dependabot PRs | Low |
| next-sitemap | Low |
| next/image for project covers | Medium |

---

## 📞 SUPPORT

If issues arise:
- **Build errors**: Check Vercel build logs, run `npm run build` locally first
- **404 on refresh**: Ensure `output: 'export'` for static hosting, or check Vercel rewrites
- **Images not loading**: Check `next.config.js` `remotePatterns` includes your image domains
- **Styles broken**: Check Tailwind content paths in `tailwind.config.ts`
- **Fonts not loading**: Verify `next/font` config in `layout.tsx`

---

*Generated: 2026-11-21*
*Project: Jivanshu Mittal Portfolio*
*Stack: Next.js 14, TypeScript, Tailwind CSS, React Aria*
*Status: All code/config complete — remaining: local npm verify, GitHub push/UI, Vercel deploy*