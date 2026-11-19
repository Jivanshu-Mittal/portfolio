# Jivanshu Mittal — Portfolio

A high-performance, accessible portfolio website built with Next.js 14, Tailwind CSS, and React Aria. Features fluid typography, CSS-driven animations, glassmorphism, and a comprehensive design system.

## Tech Stack

- **Framework**: Next.js 14+ (App Router) with Turbopack
- **Styling**: Tailwind CSS + CSS Custom Properties
- **Fonts**: Geist Variable (Sans & Mono) — self-hosted via next/font
- **UI Primitives**: React Aria (Pressable, VisuallyHidden, Focus, Interactions, Utils)
- **Animation**: Pure CSS (will-change, transform, custom keyframes)
- **TypeScript**: Strict mode

## Design System

### Colors
- **ink** (`#0b0b0c`) — Primary background (near-black)
- **paper** (`#f3f0ea`) — Primary text (warm off-white)
- **mist** / **mist-2** — Muted grays for secondary text
- **brand-500** (`#ff5b2e`) / **brand-400** (`#FF7B52`) — Vibrant orange accent
- **glass** — `rgba(18,18,20,0.62)` with backdrop-blur

### Typography Scale (Fluid, clamp-based)
- `display-h1`: `clamp(4rem, 12vw, 10rem)` — Hero name
- `display-h2`: `clamp(3rem, 8vw, 6rem)` — Section titles
- `display-h3`: `clamp(2rem, 5vw, 3.5rem)` — Sub-headers
- `eyebrow`: `0.75rem` — Section numbers
- `body-xl`: `clamp(1.5rem, 3.4vw, 3rem)` — Hero subtitle
- `marquee`: `clamp(1.6rem, 5.2vw, 4.25rem)` — Work carousel

### Animations (CSS-only)
- Blur-in text reveal
- Gradient sweep on hero subtitle
- Pulse dots & ping rings
- Staggered mobile menu entrance
- Hover reveals (translate-y)
- Number transitions
- Sidebar tooltips
- Expandable details
- Marquee (duplicated tracks)
- Process connector line
- Button press (React Aria + transform3d)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout with metadata, fonts, JSON-LD
│   └── page.tsx        # Home page composing all sections
├── components/
│   ├── Button.tsx      # React Aria Pressable button system (3 variants)
│   ├── Navigation/
│   │   ├── DesktopNav.tsx    # Fixed glass pill with animated indicator
│   │   ├── MobileNav.tsx     # Full-screen staggered menu (100dvh)
│   │   └── SectionNav.tsx    # Fixed right sidebar with 12 dots
│   ├── Sections/
│   │   ├── Hero.tsx          # Hero with badges, animated headline, tech marquee
│   │   ├── Who.tsx           # Animated headline + stats grid
│   │   ├── What.tsx          # Sticky sidebar + 3 capability panels
│   │   ├── Philosophy.tsx    # 4 principles in 12-col grid
│   │   ├── Ecosystem.tsx     # Dual marquee + 10 category cards
│   │   ├── Work.tsx          # Carousel + project cards
│   │   ├── Experience.tsx    # Timeline with staggered entrance
│   │   ├── Process.tsx       # 5 steps with connector line
│   │   ├── Now.tsx           # Current focus with live IST clock
│   │   ├── Why.tsx           # 4 reasons in definition list
│   │   └── ContactCTA.tsx    # 3 buttons + radial glow
│   ├── Footer.tsx      # 3-col grid + massive brand mark + back-to-top
│   └── JsonLd.tsx      # Structured data (Person, WebSite, ProfilePage)
├── lib/
│   ├── data.ts         # All content data (typed, centralized)
│   └── utils.ts        # cn() helper, date formatting, IST time
└── styles/
    └── globals.css     # Tailwind + custom properties + animations
```

## Accessibility

- Skip link to main content
- Semantic HTML5 (main, section, nav, aside, footer, article, dl/dt/dd, ol/li)
- ARIA labels on all navigation, buttons, sections
- Live regions for active states (`aria-current`)
- Focus management with custom outlines
- `inert` on mobile menu when closed
- `sr-only` for screen-reader-only text
- `aria-hidden` on decorative duplicates
- `prefers-reduced-motion` respected via Tailwind
- Full keyboard navigation

## Performance

- Preloaded variable fonts (WOFF2)
- Async script loading (non-blocking)
- Turbopack for fast dev/build
- `will-change` on animated elements
- `transform: translate3d(0,0,0)` for GPU layer promotion
- `pointer-events-none` on decorative backgrounds
- Code splitting by default (Next.js App Router)

## SEO & Structured Data

- Optimized meta tags (title, description, canonical)
- Open Graph + Twitter Card (1200×630)
- JSON-LD: WebSite, ProfilePage, Person with 30+ knowsAbout skills
- PWA manifest with icons
- Theme color + dark color scheme

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

Optimized for Vercel:

```bash
vercel deploy
```

Or any Node.js hosting (Docker, Render, Railway, etc.).

## License

MIT — Feel free to use as a reference for your own portfolio.