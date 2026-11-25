import type { Metadata } from 'next';
import Link from 'next/link';
import { experienceData, siteConfig, workData } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Project Archive | Jivanshu Mittal',
  description:
    'Complete archive of full-stack engineering projects, backend systems, and selected freelance client work by Jivanshu Mittal.',
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

function parseFreelanceDescription(description: string) {
  const lines = description
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const summaryLines: string[] = [];
  const deliverables: string[] = [];

  for (const line of lines) {
    if (line.startsWith('•')) {
      deliverables.push(line.replace(/^•\s*/, ''));
    } else if (!line.toLowerCase().startsWith('selected work')) {
      summaryLines.push(line);
    }
  }

  return {
    summary: summaryLines.join(' '),
    deliverables,
  };
}

export default function ProjectsPage() {
  const projects = workData.projects;
  const freelanceEntries = experienceData.filter((entry) => entry.id === 'freelance');

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
            <span className="font-mono text-brand-400" aria-current="page">
              Project Archive
            </span>
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
              <span>02</span> Archive
            </p>
            <h1 className="display-h2 text-paper [text-wrap:balance]">
              Project Archive &amp; Freelance Deliverables
            </h1>
            <p className="body-lg text-secondary mt-6 max-w-2xl">
              An index of featured engineering builds and client applications shipped across
              full-stack web, real-time collaboration, and backend infrastructure.
            </p>
          </div>

          <section aria-labelledby="featured-projects-heading" className="mt-14">
            <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
              <h2 id="featured-projects-heading" className="display-h3 text-paper">
                Featured Engineering Projects
              </h2>
              <Link href="/work" className="uv-link font-mono text-sm">
                Read Full Case Studies
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {projects.map((project, index) => {
                const projectNumber = String(index + 1).padStart(2, '0');
                const leadDescription = project.description.split('\n\n')[0] ?? project.shortDesc;

                return (
                  <article
                    key={project.id}
                    className="flex flex-col justify-between rounded-3xl border border-white/10 bg-ink-2/70 p-6 sm:p-8 hover:bg-white/[0.03] transition-colors"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <span className="font-mono text-lg font-bold text-brand-400">
                          {projectNumber}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-secondary">
                          {project.period}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-semibold text-paper leading-snug tracking-tight mb-2">
                        {project.title}
                      </h3>
                      <p className="font-mono text-xs text-mist mb-4">{project.role}</p>

                      <p className="body-base text-secondary mb-6">{leadDescription}</p>

                      <div className="mb-6">
                        <h4 className="font-mono text-xs uppercase tracking-wider text-brand-400 mb-3">
                          Highlights
                        </h4>
                        <ul className="space-y-2">
                          {project.highlights.slice(0, 4).map((highlight, hIdx) => (
                            <li
                              key={hIdx}
                              className="flex items-start gap-2.5 text-sm text-paper/90"
                            >
                              <span
                                className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-400"
                                aria-hidden="true"
                              />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-8">
                        <h4 className="sr-only">Technologies used</h4>
                        <ul className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <li
                              key={tag}
                              className="mono-sm rounded border border-white/10 bg-white/5 px-2.5 py-1 text-paper"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                      <Link
                        href={project.links.caseStudy}
                        className="inline-flex items-center gap-2 rounded-full bg-brand-solid px-4 py-2.5 text-xs font-semibold text-ink hover:bg-brand-500 transition-colors"
                      >
                        Case Study
                        <ArrowRightIcon className="w-3.5 h-3.5" />
                      </Link>
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-4 py-2.5 text-xs font-medium text-paper hover:bg-white/10 transition-colors"
                        >
                          <GitHubIcon className="w-3.5 h-3.5" />
                          GitHub
                        </a>
                      )}
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-4 py-2.5 text-xs font-medium text-paper hover:bg-white/10 transition-colors"
                        >
                          Demo
                          <ExternalLinkIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {freelanceEntries.length > 0 && (
            <section
              aria-labelledby="freelance-work-heading"
              className="mt-20 pt-14 border-t border-white/10"
            >
              <p className="eyebrow">
                <span>03</span> Client Deliverables
              </p>
              <h2 id="freelance-work-heading" className="display-h3 text-paper mb-8">
                Freelance Selected Work
              </h2>

              <div className="space-y-8">
                {freelanceEntries.map((entry) => {
                  const { summary, deliverables } = parseFreelanceDescription(entry.description);

                  return (
                    <article
                      key={entry.id}
                      className="rounded-3xl border border-white/10 bg-ink-2/70 p-6 sm:p-8 md:p-10"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div>
                          <h3 className="text-2xl font-semibold text-paper">
                            {entry.company} — {entry.role}
                          </h3>
                          <p className="font-mono text-xs text-mist mt-1">
                            {entry.period} · {entry.location}
                          </p>
                        </div>
                        {entry.current && (
                          <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-400/10 px-3 py-1 text-xs font-mono text-brand-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" aria-hidden="true" />
                            Active
                          </span>
                        )}
                      </div>

                      {summary && (
                        <p className="body-base text-secondary max-w-3xl mb-8">{summary}</p>
                      )}

                      {deliverables.length > 0 && (
                        <div className="mb-8">
                          <h4 className="font-mono text-xs uppercase tracking-wider text-brand-400 mb-4">
                            Shipped Client Projects
                          </h4>
                          <ul className="grid gap-4 md:grid-cols-2">
                            {deliverables.map((item, dIdx) => (
                              <li
                                key={dIdx}
                                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-sm leading-relaxed text-paper/90"
                              >
                                <span className="font-mono text-xs text-brand-400 mt-0.5">
                                  {String(dIdx + 1).padStart(2, '0')}
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div>
                        <h4 className="font-mono text-xs uppercase tracking-wider text-brand-400 mb-3">
                          Core Freelance Stack
                        </h4>
                        <ul className="flex flex-wrap gap-2">
                          {entry.technologies.map((tech) => (
                            <li
                              key={tech}
                              className="mono-sm rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-paper"
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          <section
            aria-label="Explore skills or return home"
            className="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-3xl border border-white/10 bg-ink-2/70 p-8"
          >
            <div>
              <h2 className="text-2xl font-semibold text-paper">
                Interested in the stack behind these projects?
              </h2>
              <p className="body-base text-secondary mt-2">
                Explore the full categorized breakdown of frameworks, databases, and tooling.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/skills"
                className="inline-flex items-center gap-2 rounded-full bg-brand-solid px-5 py-3 text-sm font-semibold text-ink hover:bg-brand-500 transition-colors"
              >
                Explore Skills &amp; Ecosystem
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
            <Link href="/skills" className="uv-link text-sm">
              Skills
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
