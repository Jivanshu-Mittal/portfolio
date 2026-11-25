import type { Metadata } from 'next';
import Link from 'next/link';
import { ecosystemData, siteConfig } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Skills & Tech Ecosystem | Jivanshu Mittal',
  description:
    'Categorized technical ecosystem of Jivanshu Mittal: frontend frameworks, backend APIs, databases, testing, DevOps, security, state management, and performance.',
};

function BackArrowIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function ArrowRightIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export default function SkillsPage() {
  const categories = ecosystemData.categories;

  return (
    <div className="min-h-screen bg-ink text-paper">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur-xl">
        <div className="container-x flex flex-wrap items-center justify-between gap-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-paper hover:bg-white/10 transition-colors"
          >
            <BackArrowIcon className="w-4 h-4 text-brand-400" />
            Back to Home
          </Link>

          <nav aria-label="Subpage navigation" className="flex flex-wrap items-center gap-4 text-sm">
            <Link href="/work" className="uv-link font-mono text-sm">
              Case Studies
            </Link>
            <Link href="/projects" className="uv-link font-mono text-sm">
              Project Archive
            </Link>
            <span className="font-mono text-brand-400" aria-current="page">
              Skills &amp; Ecosystem
            </span>
          </nav>
        </div>
      </header>

      <main id="main" className="relative isolate overflow-hidden py-16 md:py-24">
        <div className="pointer-events-none -z-10 absolute inset-0">
          <div className="absolute top-0 right-0 w-[60%] h-[50%] bg-radial-glow-tr" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-[55%] h-[60%] bg-radial-glow-bl" aria-hidden="true" />
        </div>

        <div className="container-x">
          <div className="max-w-4xl pb-12 border-b border-white/10">
            <p className="eyebrow">
              <span>05</span> Tech Ecosystem
            </p>
            <h1 className="display-h2 text-paper [text-wrap:balance]">
              Skills, Frameworks &amp; Engineering Tooling
            </h1>
            <p className="body-lg text-secondary mt-6 max-w-2xl">
              A structured map of the technologies I use across backend engineering, frontend
              interfaces, database modeling, testing, and deployment workflows.
            </p>
          </div>

          <nav
            aria-label="Skill categories"
            className="mt-10 rounded-2xl border border-white/10 bg-ink-2/70 p-4 sm:p-6"
          >
            <p className="font-mono text-xs uppercase tracking-wider text-brand-400 mb-4">
              Jump to Category
            </p>
            <ul className="flex flex-wrap gap-2.5">
              {categories.map((cat) => {
                const anchorId = cat.link.split('#')[1] ?? '';

                return (
                  <li key={cat.number}>
                    <a
                      href={`#${anchorId}`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-mono text-paper hover:border-brand-400/60 hover:bg-white/10 transition-colors"
                    >
                      <span className="text-brand-400">{cat.number}</span>
                      <span>{cat.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {categories.map((cat) => {
              const anchorId = cat.link.split('#')[1] ?? '';
              const isPrimaryRole = cat.badge === 'Current Role';

              return (
                <section
                  key={cat.number}
                  id={anchorId}
                  aria-labelledby={`skill-heading-${anchorId}`}
                  className="scroll-mt-24 flex flex-col justify-between rounded-3xl border border-white/10 bg-ink-2/70 p-6 sm:p-8 hover:bg-white/[0.03] transition-colors"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <span className="font-mono text-2xl font-bold text-brand-400">
                        {cat.number}
                      </span>
                      <span
                        className={
                          isPrimaryRole
                            ? 'rounded-full border border-brand-400/40 bg-brand-400/15 px-3 py-1 text-xs font-mono text-brand-400'
                            : 'rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-mono text-secondary'
                        }
                      >
                        {cat.badge}
                      </span>
                    </div>

                    <h2
                      id={`skill-heading-${anchorId}`}
                      className="text-2xl font-semibold text-paper tracking-tight mb-3"
                    >
                      {cat.title}
                    </h2>

                    <p className="body-base text-secondary mb-6">{cat.description}</p>
                  </div>

                  <div>
                    <h3 className="sr-only">Tools and technologies in {cat.title}</h3>
                    <ul className="flex flex-wrap gap-2">
                      {cat.tags.map((tag) => (
                        <li
                          key={tag}
                          className="mono-sm rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-paper"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              );
            })}
          </div>

          <section
            aria-label="Core stack summary"
            className="mt-14 rounded-3xl border border-white/10 bg-ink-2/70 p-6 sm:p-8"
          >
            <h2 className="text-xl font-semibold text-paper mb-6">
              Daily Stack Snapshot
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-brand-400 mb-3">
                  Frontend
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {ecosystemData.marquee.frontend.map((item) => (
                    <li
                      key={item}
                      className="mono-sm rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-paper"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-brand-400 mb-3">
                  Backend &amp; Infrastructure
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {ecosystemData.marquee.backend.map((item) => (
                    <li
                      key={item}
                      className="mono-sm rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-paper"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section
            aria-label="See skills in action"
            className="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-3xl border border-white/10 bg-ink-2/70 p-8"
          >
            <div>
              <h2 className="text-2xl font-semibold text-paper">
                See these technologies in production
              </h2>
              <p className="body-base text-secondary mt-2">
                Explore real-world case studies and architectural trade-offs across shipped projects.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-full bg-brand-solid px-5 py-3 text-sm font-semibold text-ink hover:bg-brand-500 transition-colors"
              >
                Explore Case Studies
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-medium text-paper hover:bg-white/10 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-white/10 py-10">
        <div className="container-x flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-mist">
          <p>© 2026 {siteConfig.name}. Built with Next.js &amp; Tailwind CSS.</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="uv-link text-sm">
              Home
            </Link>
            <Link href="/work" className="uv-link text-sm">
              Case Studies
            </Link>
            <Link href="/projects" className="uv-link text-sm">
              Projects
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
