# Jivanshu Mittal — Portfolio

A high-performance, accessible portfolio website built with Next.js 15, React 19, and Tailwind CSS. Features fluid typography, CSS-driven animations, glassmorphism, static export, and a comprehensive design system.

## Tech Stack

- **Framework**: Next.js 15 (App Router, `output: 'export'`)
- **Library**: React 19
- **Styling**: Tailwind CSS 3.4 + CSS Custom Properties
- **Fonts**: Inter & JetBrains Mono — self-hosted via `next/font/google` (`display: 'swap'`, `preload: true`)
- **Animation**: Pure CSS (`will-change`, `transform`, custom keyframes)
- **TypeScript**: Strict mode

## Design System

### Colors
- **ink** (`#0b0b0c`) / **ink-2** (`#121214`) — Primary background (near-black)
- **paper** (`#f3f0ea`) — Primary text (warm off-white)
- **mist** (`#8a8a8f`) / **mist-2** (`#5a5a5e`) / **secondary** (`#a3a3a8`) — Muted grays for secondary text
- **brand-500** (`#ff5b2e`) / **brand-400** (`#FF7B52`) / **brand-600** (`#e85028`) — Vibrant orange accent
- **glass-panel** — `rgba(18, 18, 20, 0.62)` with `backdrop-filter: blur(24px)` (`glass-pill` — `rgb(12 12 15 / 0.95)`)

### Typography Scale & Layout
- `display-h1`: `clamp(3rem, 8vw, 7.5rem)` — Hero headline (`line-height: 0.95`, `letter-spacing: -0.04em`)
- `display-h2`: `clamp(2.25rem, 5vw, 5rem)` — Section titles (`line-height: 1`, `letter-spacing: -0.025em`)
- `display-h3`: `clamp(1.75rem, 3vw, 3rem)` — Sub-headers (`line-height: 1.1`, `letter-spacing: -0.025em`)
- `eyebrow`: `0.75rem` — Section numbers & labels (`JetBrains Mono`, uppercase, `letter-spacing: 0.1em`)
- `body-xl`: `1.25rem` — Lead body text (`line-height: 1.75rem`)
- `body-lg` / `body-base` / `mono-sm`: `1.125rem` / `1rem` / `0.75rem`
- `marquee-text`: `clamp(1.125rem, 2.4vw, 1.75rem)` — Marquee track items (`JetBrains Mono`, uppercase)
- `marquee`: `clamp(1.6rem, 5.2vw, 4.25rem)` — Large marquee utility (`tailwind.config.ts`)
- `what-number`: `clamp(8rem, 17vw, 16rem)` — Capability index numeral (`tailwind.config.ts`)
- `footer-brand`: `clamp(2.25rem, 11.4vw, 13.5rem)` — Oversized footer brand wordmark (`tailwind.config.ts`)
- **Layout**: `.container-x` (`max-width: 1280px` with responsive inline padding) and `.section-wrapper` (`padding-block: 7rem`, `10rem` on `md+`)

### Animations (CSS-only)
- Blur-in text reveal (`blur-in`, `.blur-in-word`)
- Gradient sweep on hero/accent text (`gradient-sweep`, `.text-gradient`)
- Pulse dots & ping rings (`pulse-dot`, `shadow-ping-ring`)
- Staggered mobile menu entrance (`stagger-in`)
- Slide-up and hover reveals (`slide-up`, `.uv-link`)
- Sidebar tooltips & expandable `<details>` panels
- Infinite marquee tracks (`marquee`, `marquee-fast`)
- GPU-promoted layers (`.gpu-layer`, `will-change-*`)
- `prefers-reduced-motion: reduce` global override

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Lint
npm run lint

# Type-check
npx tsc --noEmit

# Run tests (node:test)
npm test

# Build static export to out/ and generate sitemap/robots.txt
npm run build
```

Script definitions from `package.json`:
- `npm run lint` → `eslint .`
- `npx tsc --noEmit` → strict TypeScript check
- `npm test` → `node --test tests/*.test.mjs`
- `npm run build` → `next build && next-sitemap` (outputs static site, `sitemap.xml`, and `robots.txt` to `out/`)

## Project Structure

```
├── next.config.js            # Static export (output: 'export'), unoptimized images
├── next-sitemap.config.js    # Sitemap & robots.txt generation targeting out/
├── tailwind.config.ts        # Theme colors, typography tokens, keyframes, animations
├── vercel.json               # Vercel static output & security headers / CSP
├── netlify.toml              # Netlify build & security headers / CSP
├── public/
│   ├── _headers              # Cloudflare Pages / Netlify security headers & CSP
│   ├── manifest.webmanifest  # PWA manifest
│   └── ...                   # Icons, OG image, project SVGs, resume.pdf
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout with metadata, self-hosted fonts, JSON-LD
│   │   ├── not-found.tsx     # Custom 404 page
│   │   ├── page.tsx          # Home page composing all sections
│   │   ├── projects/
│   │   │   └── page.tsx      # Complete project archive & freelance work
│   │   ├── skills/
│   │   │   └── page.tsx      # Categorized technical ecosystem & skills
│   │   └── work/
│   │       └── page.tsx      # Selected work & case studies
│   ├── components/
│   │   ├── Button.tsx        # Accessible button & icon system
│   │   ├── Navigation/
│   │   │   ├── DesktopNav.tsx    # Fixed glass pill navigation
│   │   │   ├── MobileNav.tsx     # Full-screen staggered mobile menu
│   │   │   └── SectionNav.tsx    # Fixed right sidebar with 11 section dots
│   │   ├── Sections/
│   │   │   ├── Hero.tsx          # Hero with badges, headline, and tech marquee
│   │   │   ├── Who.tsx           # About headline, bio, and stats grid
│   │   │   ├── What.tsx          # Sticky active overview + 3 capability panels
│   │   │   ├── Philosophy.tsx    # 4 engineering principles
│   │   │   ├── Ecosystem.tsx     # Dual marquee + 10 category cards
│   │   │   ├── Work.tsx          # Featured projects & highlights
│   │   │   ├── Experience.tsx    # Education, internship & freelance timeline
│   │   │   ├── Process.tsx       # 5-step engineering workflow
│   │   │   ├── Now.tsx           # Current focus with live IST clock
│   │   │   ├── Why.tsx           # 4 reasons in definition list
│   │   │   └── ContactCTA.tsx    # Contact actions & social links
│   │   ├── Footer.tsx        # 3-col grid + oversized brand mark + back-to-top
│   │   └── JsonLd.tsx        # Structured data (Person, WebSite, ProfilePage)
│   ├── lib/
│   │   ├── data.ts           # Typed, centralized content & siteConfig
│   │   └── utils.ts          # cn() helper and getISTTime()
│   └── styles/
│       └── globals.css       # Tailwind layers, typography, glassmorphism, animations
└── tests/
    ├── site-config.test.mjs          # Sitemap URL resolution & static config tests
    └── security-and-assets.test.mjs  # Asset checks, CSP/header parity, source hygiene
```

## Accessibility

- Skip link to `#main` content
- Semantic HTML5 (`main`, `section`, `nav`, `aside`, `footer`, `article`, `dl`/`dt`/`dd`, `ol`/`li`)
- ARIA labels on navigation, buttons, and sections
- Active-state attributes (`aria-current`)
- Focus management with custom `:focus-visible` outlines
- `.inert` utility and `sr-only` for screen-reader-only text
- `aria-hidden` on decorative elements
- `prefers-reduced-motion: reduce` respected in `src/styles/globals.css`
- Keyboard navigation (including Arrow/Home/End keys in `SectionNav`)

## Performance

- Self-hosted Google Fonts (`Inter` & `JetBrains Mono`) via `next/font/google` (`display: 'swap'`, `preload: true`)
- Static export (`output: 'export'` → `out/`) for fast CDN edge delivery
- `will-change` and `transform: translate3d(0, 0, 0)` (`.gpu-layer`) on animated elements
- `pointer-events-none` on decorative layers
- Route-based code splitting (Next.js App Router)

## SEO & Structured Data

- Optimized meta tags (title, description, `metadataBase` canonical origin)
- Open Graph + Twitter Card (`1200×630`)
- JSON-LD: `WebSite`, `ProfilePage`, and `Person` with 30 `knowsAbout` skills
- Automated `sitemap.xml` and `robots.txt` via `next-sitemap`
- PWA manifest (`public/manifest.webmanifest`) with icons and dark color scheme

## Customization

Edit `src/lib/data.ts` to update:
- Personal info (name, title, contact, links)
- Navigation items
- Hero content & tech stack
- About stats & description
- Capabilities (What I Do)
- Philosophy principles
- Tech ecosystem categories
- Projects (Work)
- Experience timeline
- Process steps
- Current focus
- Why work with me
- Contact CTA

## Deployment

This project is configured for static export (`output: 'export'` in `next.config.js`), outputting the production bundle, `sitemap.xml`, and `robots.txt` to `out/`.

- **Vercel**: Uses `vercel.json` (`buildCommand: "npm run build"`, `outputDirectory: "out"`, and strict security headers/CSP).
- **Netlify**: Uses `netlify.toml` (`command = "npm run build"`, `publish = "out"`, and security headers/CSP).
- **Cloudflare Pages**: Build with `npm run build`, publish `out/`, and security headers are applied via `public/_headers`.

Set `NEXT_PUBLIC_SITE_URL` in your hosting environment (e.g., `https://yourdomain.com`) so canonical metadata, JSON-LD, and `next-sitemap` resolve to your production URL (with automatic fallbacks to `VERCEL_PROJECT_PRODUCTION_URL`, `VERCEL_URL`, or `https://jivanshu.dev`).

## License

MIT — Feel free to use as a reference for your own portfolio.
