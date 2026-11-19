'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { workData } from '@/lib/data';
import { Button, ArrowIcon, ExternalLinkIcon } from '@/components/Button';

export function Work() {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % workData.projects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const projects = workData.projects;

  return (
    <section id="work" className="section-wrapper" aria-labelledby="work-heading">
      <div className="container-x">
        <p className="eyebrow">
          <span>06</span> Selected Work
        </p>
        <h2 id="work-heading" className="display-h2 max-w-5xl [text-wrap:balance] mb-16">
          Projects I've Built
        </h2>

        <div
          ref={carouselRef}
          className="relative h-[clamp(300px,52vh,520px)] mb-16 overflow-hidden"
          role="region"
          aria-label="Project carousel"
          aria-roledescription="carousel"
        >
          <div
            className="flex h-full transition-transform duration-700 ease-out-expo"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex-1 w-full flex items-end p-8 md:p-12 relative"
              >
                <div
                  className={cn(
                    'absolute inset-0 bg-brand-500/10 translate-y-full',
                    'transition-transform duration-500 ease-out-expo',
                    'group-hover:translate-y-0'
                  )}
                  aria-hidden="true"
                />
                <div className="relative z-10 w-full max-w-4xl pr-[clamp(140px,20vw,280px)]">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-brand-400 font-mono text-lg">{project.id === 'del2' ? '01' : project.id === 'project-2' ? '02' : '03'}</span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/5 text-mist border border-white/10">
                      {project.period}
                    </span>
                  </div>
                  <h3 className="text-[clamp(1.25rem,3vw,2rem)] font-semibold text-paper leading-snug tracking-tight mb-4">{project.title}</h3>
                  <p className="body-base text-mist mb-6 max-w-xl">{project.shortDesc}</p>
                  <div className="flex flex-wrap gap-2 mb-6" role="list">
                    {project.tags.slice(0, 6).map((tag, i) => (
                      <span
                        key={i}
                        className="mono-sm px-2 py-1 rounded bg-white/5 border border-white/10"
                        role="listitem"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary" icon={<ArrowIcon />} asChild>
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer">Code</a>
                    </Button>
                    {project.links.demo && (
                      <Button variant="secondary" asChild>
                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer">Demo</a>
                      </Button>
                    )}
                  </div>
                </div>
                <div
                  className="absolute right-8 bottom-8 md:right-12 md:bottom-12 w-[clamp(120px,16vw,240px)] h-[62%] mx-[2vw] rounded-full bg-cover bg-center opacity-50"
                  style={{ backgroundImage: `url(${project.coverImage})` }}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="md:grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <article
              key={project.id}
              className="p-6 rounded-2xl border border-white/10 hover:bg-white/[0.025] transition-colors duration-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-brand-400 font-mono text-lg">{i + 1 < 10 ? `0${i + 1}` : i + 1}</span>
              </div>
              <h3 className="text-[clamp(1.125rem,2.5vw,1.75rem)] font-semibold text-paper leading-snug tracking-tight mb-2">{project.title}</h3>
              <p className="body-base text-mist">{project.shortDesc}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <Button variant="primary" icon={<ArrowIcon />} asChild>
            <a href="/work">Explore All Works</a>
          </Button>
          <Button variant="secondary" icon={<ExternalLinkIcon />} asChild>
            <a href="/projects">Browse Project Archive</a>
          </Button>
        </div>
      </div>
    </section>
  );
}