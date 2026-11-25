'use client';

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type FocusEvent,
  type KeyboardEvent,
} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { workData } from '@/lib/data';
import {
  Button,
  ArrowIcon,
  ExternalLinkIcon,
  GitHubIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@/components/Button';

export function Work() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const projects = workData.projects;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion || projects.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion, projects.length]);

  const goToPrev = useCallback(() => {
    if (projects.length === 0) return;
    setActiveSlide((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  const goToNext = useCallback(() => {
    if (projects.length === 0) return;
    setActiveSlide((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const goToSlide = useCallback(
    (index: number) => {
      if (projects.length === 0) return;
      setActiveSlide(Math.max(0, Math.min(index, projects.length - 1)));
    },
    [projects.length]
  );

  const handleBlurCapture = (e: FocusEvent<HTMLDivElement>) => {
    const nextTarget = e.relatedTarget;
    if (!(nextTarget instanceof Node) || !carouselRef.current?.contains(nextTarget)) {
      setIsPaused(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToNext();
    }
  };

  return (
    <section id="work" className="section-wrapper" aria-labelledby="work-heading">
      <div className="container-x">
        <p className="eyebrow">
          <span>06</span> Selected Work
        </p>
        <h2 id="work-heading" className="display-h2 max-w-5xl [text-wrap:balance] mb-16">
          Projects I've Built
        </h2>

        {projects.length > 0 && (
          <div
            ref={carouselRef}
            className="relative mb-16"
            role="region"
            aria-label="Project carousel"
            aria-roledescription="carousel"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={handleBlurCapture}
            onKeyDown={handleKeyDown}
          >
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-700 ease-out-expo"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {projects.map((project, index) => {
                  const isActive = activeSlide === index;
                  const slideNumber = String(index + 1).padStart(2, '0');

                  return (
                    <div
                      key={project.id}
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`Slide ${index + 1} of ${projects.length}: ${project.title}`}
                      inert={!isActive}
                      className="group relative w-full shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-ink-2/60 p-6 sm:p-8 md:p-12 min-h-[340px] flex items-center"
                    >
                      <div
                        className={cn(
                          'absolute inset-0 bg-brand-500/10 translate-y-full',
                          'transition-transform duration-500 ease-out-expo',
                          'group-hover:translate-y-0'
                        )}
                        aria-hidden="true"
                      />

                      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                        <div className="md:col-span-7 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className="text-brand-400 font-mono text-lg">{slideNumber}</span>
                            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/5 text-secondary border border-white/10">
                              {project.period}
                            </span>
                          </div>
                          <h3 className="text-[clamp(1.25rem,3vw,2rem)] font-semibold text-paper leading-snug tracking-tight mb-4">
                            {project.title}
                          </h3>
                          <p className="body-base text-secondary mb-6 max-w-xl">
                            {project.shortDesc}
                          </p>
                          <ul className="flex flex-wrap gap-2 mb-6">
                            {project.tags.slice(0, 6).map((tag) => (
                              <li
                                key={tag}
                                className="mono-sm px-2.5 py-1 rounded bg-white/5 border border-white/10"
                              >
                                {tag}
                              </li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap gap-3">
                            <Button variant="primary" icon={<ArrowIcon />} asChild>
                              <Link href={project.links.caseStudy}>Case Study</Link>
                            </Button>
                            {project.links.github && (
                              <Button variant="secondary" icon={<GitHubIcon />} asChild>
                                <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                                  Code
                                </a>
                              </Button>
                            )}
                            {project.links.demo && (
                              <Button variant="secondary" icon={<ExternalLinkIcon />} asChild>
                                <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                                  Demo
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>

                        <div className="hidden md:block md:col-span-5 relative aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-ink/50">
                          <Image
                            src={project.coverImage}
                            alt={project.title}
                            width={1200}
                            height={630}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {projects.length > 1 && (
              <div className="mt-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-1" role="group" aria-label="Slide pagination">
                  {projects.map((project, index) => {
                    const isCurrent = activeSlide === index;
                    return (
                      <button
                        key={project.id}
                        type="button"
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}: ${project.title}`}
                        aria-current={isCurrent ? 'true' : undefined}
                        className="group/dot flex min-h-[44px] min-w-[32px] items-center justify-center rounded-lg px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                      >
                        <span
                          className={cn(
                            'block h-2 rounded-full transition-all duration-300',
                            isCurrent
                              ? 'w-8 bg-brand-400'
                              : 'w-2 bg-white/30 group-hover/dot:bg-white/60'
                          )}
                          aria-hidden="true"
                        />
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className="font-mono text-xs text-secondary tabular-nums"
                    aria-live={isPaused ? 'polite' : 'off'}
                  >
                    {String(activeSlide + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={goToPrev}
                      aria-label="Previous project"
                      className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/15 bg-ink-2/90 text-paper transition-colors hover:border-brand-400/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                    >
                      <ChevronLeftIcon className="size-5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={goToNext}
                      aria-label="Next project"
                      className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/15 bg-ink-2/90 text-paper transition-colors hover:border-brand-400/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                    >
                      <ChevronRightIcon className="size-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <article
              key={project.id}
              className="p-6 rounded-2xl border border-white/10 hover:bg-white/[0.025] transition-colors duration-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-brand-400 font-mono text-lg">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="text-[clamp(1.125rem,2.5vw,1.75rem)] font-semibold text-paper leading-snug tracking-tight mb-2">
                {project.title}
              </h3>
              <p className="body-base text-secondary">{project.shortDesc}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <Button variant="primary" icon={<ArrowIcon />} asChild>
            <Link href="/work">Explore All Works</Link>
          </Button>
          <Button variant="secondary" icon={<ExternalLinkIcon />} asChild>
            <Link href="/projects">Browse Project Archive</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}