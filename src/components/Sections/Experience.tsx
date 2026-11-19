'use client';

import { cn } from '@/lib/utils';
import { experienceData } from '@/lib/data';

export function Experience() {
  return (
    <section id="experience" className="section-wrapper" aria-labelledby="experience-heading">
      <div className="container-x">
        <p className="eyebrow">
          <span>07</span> Experience
        </p>
        <h2 id="experience-heading" className="display-h2 max-w-5xl [text-wrap:balance] mb-16">
          Where I've Been
        </h2>

        <ol className="space-y-12" role="list">
          {experienceData.map((exp, i) => (
            <li
              key={exp.id}
              className={cn(
                'relative pl-8 md:pl-12 border-l border-white/10',
                'animate-stagger-in opacity-0'
              )}
              style={{ animationDelay: `${i * 60}ms` }}
              role="listitem"
            >
              <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-brand-500 border-2 border-ink" aria-hidden="true" />
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
              <div className="flex flex-wrap gap-2 mt-4" role="list">
                {exp.technologies.map((tech, ti) => (
                  <span
                    key={ti}
                    className="mono-sm px-2 py-1 rounded bg-white/5 border border-white/10"
                    role="listitem"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 text-center">
          <a href="#experience" className="uv-link">
            Read the Full Timeline
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}