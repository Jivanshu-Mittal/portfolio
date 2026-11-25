import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig, workData } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Selected Work & Case Studies | Jivanshu Mittal',
  description:
    'In-depth engineering case studies covering backend architecture, concurrency control, query optimization, and full-stack delivery by Jivanshu Mittal.',
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

function ExternalLinkIcon({ className = 'w-4 h-4' }: { className?: string }) {
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
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function GitHubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.305-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function WorkPage() {
  const projects = workData.projects;

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
            <span className="font-mono text-brand-400" aria-current="page">
              Case Studies
            </span>
            <Link href="/projects" className="uv-link font-mono text-sm">
              Project Archive
            </Link>
            <Link href="/skills" className="uv-link font-mono text-sm">
              Skills &amp; Ecosystem
            </Link>
          </nav>
        </div>
      </header>

      <main id="main" className="relative isolate overflow-hidden py-16 md:py-24">
        <div className="pointer-events-none -z-10 absolute inset-0">
          <div className="absolute top-0 right-0 w-[60%] h-[50%] bg-radial-glow-tr" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-[55%] h-[60%] bg-radial-glow-bl" aria-hidden="true" />
        </div>

        <div className="container-x">
          <div className="max-w-4xl pb-14 border-b border-white/10">
            <p className="eyebrow">
              <span>01</span> Engineering Case Studies
            </p>
            <h1 className="display-h2 text-paper [text-wrap:balance]">
              Selected Work &amp; Architecture Deep Dives
            </h1>
            <p className="body-lg text-secondary mt-6 max-w-2xl">
              Detailed breakdowns of production-oriented systems I&apos;ve built — covering API design,
              concurrency handling, database indexing, testing, and full-stack delivery.
            </p>

            <nav aria-label="Jump to project case study" className="mt-8">
              <ul className="flex flex-wrap gap-3">
                {projects.map((project, index) => (
                  <li key={project.id}>
                    <a
                      href={`#${project.id}`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-mono text-paper hover:border-brand-400/60 hover:bg-white/10 transition-colors"
                    >
                      <span className="text-brand-400">{String(index + 1).padStart(2, '0')}</span>
                      <span>{project.title.split('—')[0].trim()}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-14 space-y-16 md:space-y-20">
            {projects.map((project, index) => {
              const paragraphs = project.description.split('\n\n').filter(Boolean);
              const projectNumber = String(index + 1).padStart(2, '0');

              return (
                <article
                  key={project.id}
                  id={project.id}
                  aria-labelledby={`project-title-${project.id}`}
                  className="scroll-mt-24 rounded-3xl border border-white/10 bg-ink-2/70 p-6 sm:p-8 md:p-12"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-lg font-bold text-brand-400">
                        {projectNumber}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-secondary">
                        {project.period}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-mist">{project.role}</p>
                  </div>

                  <h2
                    id={`project-title-${project.id}`}
                    className="display-h3 text-paper [text-wrap:balance] mb-4"
                  >
                    {project.title}
                  </h2>

                  <p className="body-lg text-secondary max-w-3xl mb-8">{project.shortDesc}</p>

                  <div className="mb-10 overflow-hidden rounded-2xl border border-white/10 bg-ink">
                    <Image
                      src={project.coverImage}
                      alt={`${project.title} visual overview`}
                      width={1200}
                      height={630}
                      className="w-full h-auto object-cover"
                    />
                  </div>

                  <div className="grid gap-10 lg:grid-cols-12">
                    <div className="lg:col-span-7 space-y-8">
                      <section aria-label="Project overview">
                        <h3 className="font-mono text-xs uppercase tracking-wider text-brand-400 mb-3">
                          Overview &amp; Problem Solved
                        </h3>
                        <div className="space-y-4">
                          {paragraphs.map((paragraph, pIdx) => (
                            <p key={pIdx} className="body-base text-paper/90 leading-relaxed">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </section>

                      <section aria-label="Engineering contributions">
                        <h3 className="font-mono text-xs uppercase tracking-wider text-brand-400 mb-4">
                          My Contributions
                        </h3>
                        <ul className="space-y-3">
                          {project.contributions.map((item, cIdx) => (
                            <li key={cIdx} className="flex items-start gap-3 body-base text-secondary">
                              <span
                                className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-400"
                                aria-hidden="true"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    </div>

                    <div className="lg:col-span-5 space-y-8">
                      <section
                        aria-label="Key highlights"
                        className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                      >
                        <h3 className="font-mono text-xs uppercase tracking-wider text-brand-400 mb-4">
                          Key Highlights &amp; Impact
                        </h3>
                        <ul className="space-y-3">
                          {project.highlights.map((highlight, hIdx) => (
                            <li
                              key={hIdx}
                              className="flex items-start gap-3 text-sm leading-relaxed text-paper/90"
                            >
                              <span
                                className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-400"
                                aria-hidden="true"
                              />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </section>

                      <section aria-label="Technologies used">
                        <h3 className="font-mono text-xs uppercase tracking-wider text-brand-400 mb-3">
                          Tech Stack
                        </h3>
                        <ul className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <li
                              key={tag}
                              className="mono-sm rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-paper"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </section>

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-brand-solid px-5 py-3 text-sm font-semibold text-ink hover:bg-brand-500 transition-colors"
                          >
                            <GitHubIcon className="w-4 h-4" />
                            View Source
                            <ExternalLinkIcon className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {project.links.demo && (
                          <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-medium text-paper hover:bg-white/10 transition-colors"
                          >
                            Live Demo
                            <ExternalLinkIcon className="w-4 h-4" />
                          </a>
                        )}

                        {!project.links.github && (
                          <>
                            <a
                              href={siteConfig.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-medium text-paper hover:bg-white/10 transition-colors"
                            >
                              <GitHubIcon className="w-4 h-4" />
                              GitHub Profile
                              <ExternalLinkIcon className="w-3.5 h-3.5" />
                            </a>
                            <Link
                              href="/projects"
                              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-medium text-paper hover:bg-white/10 transition-colors"
                            >
                              Project Archive
                              <ArrowRightIcon className="w-4 h-4" />
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <section
            aria-label="Continue exploring"
            className="mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-3xl border border-white/10 bg-ink-2/70 p-8"
          >
            <div>
              <h2 className="text-2xl font-semibold text-paper">
                Want to explore more deliverables or get in touch?
              </h2>
              <p className="body-base text-secondary mt-2">
                Browse the complete project archive including freelance work, or reach out directly.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full bg-brand-solid px-5 py-3 text-sm font-semibold text-ink hover:bg-brand-500 transition-colors"
              >
                Browse Project Archive
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-medium text-paper hover:bg-white/10 transition-colors"
              >
                Contact Me
              </a>
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
            <Link href="/projects" className="uv-link text-sm">
              Projects
            </Link>
            <Link href="/skills" className="uv-link text-sm">
              Skills
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
