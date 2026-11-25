'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { experienceData } from '@/lib/data';

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const reducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      setPrefersReducedMotion(true);
      setIsVisible(true);
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const node = listRef.current;
    if (!node) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            setIsVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="experience" className="section-wrapper" aria-labelledby="experience-heading">
      <div className="container-x">
        <p className="eyebrow">
          <span>07</span> Experience
        </p>
        <h2 id="experience-heading" className="display-h2 max-w-5xl [text-wrap:balance] mb-16">
          Where I've Been
        </h2>

        <ol ref={listRef} className="space-y-12">
          {experienceData.map((exp, i) => (
            <li
              key={exp.id}
              className={cn(
                'relative pl-8 md:pl-12 border-l border-white/10',
                prefersReducedMotion
                  ? 'opacity-100'
                  : isVisible
                    ? 'animate-stagger-in opacity-0'
                    : 'opacity-0'
              )}
              style={isVisible && !prefersReducedMotion ? { animationDelay: `${i * 60}ms` } : undefined}
            >
              <div className="absolute -left-[6.5px] top-2 w-3 h-3 rounded-full bg-brand-500 border-2 border-ink" aria-hidden="true" />
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <p className="mono-sm text-brand-400 font-mono mb-1">{exp.period}</p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-[clamp(1.125rem,2.5vw,1.75rem)] font-semibold text-paper leading-snug tracking-tight">{exp.role}</h3>
                    {exp.current && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-mist border border-white/10">
                        <span className="relative size-1.5 rounded-full bg-brand-500 animate-pulse-dot" aria-hidden="true" />
                        Now
                      </span>
                    )}
                  </div>
                  <p className="mono-sm text-mist mt-1">{exp.company} · {exp.location}</p>
                </div>
              </div>
              <div className="max-w-none">
                <p className="body-base text-mist whitespace-pre-line leading-relaxed">{exp.description}</p>
              </div>
              <ul className="flex flex-wrap gap-2 mt-4">
                {exp.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="mono-sm px-2 py-1 rounded bg-white/5 border border-white/10"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <div className="mt-16 text-center">
          <Link href="/projects" className="uv-link">
            View Project &amp; Freelance Archive
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}