'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { heroData } from '@/lib/data';
import { Button, ArrowIcon, DownloadIcon } from '@/components/Button';

export function Hero() {
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setIstTime(new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Kolkata',
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const words = heroData.name.split(' ');

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-28 md:pt-32"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none -z-10 absolute inset-0">
        <div className="absolute top-0 right-0 w-[60%] h-[50%] bg-radial-glow-tr" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-[55%] h-[60%] bg-radial-glow-bl" aria-hidden="true" />
      </div>

      <div className="container-x flex-1 flex flex-col justify-center relative z-10">
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-mist border border-white/10">
              <span className="relative size-1.5 rounded-full bg-brand-500 animate-pulse-dot" aria-hidden="true" />
              Now: {heroData.currentRole}
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-mist border border-white/10">
              <svg className="size-3.5 text-brand-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {istTime} IST
            </span>
          </div>
        </div>

        <h1 id="hero-heading" className="display-h1 max-w-5xl [text-wrap:balance]">
          {words.map((word, i) => (
            <span
              key={i}
              className="blur-in-word"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {word}{i < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </h1>

        <p className="body-xl max-w-2xl mt-6 text-gradient">
          {heroData.subtitle}
        </p>

        <p className="body-lg max-w-2xl mt-6 text-mist">
          Building scalable backends and performant frontends. Specialized in Node.js, TypeScript, MongoDB, and Next.js.
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-10">
          <Button
            variant="primary"
            icon={<ArrowIcon />}
            asChild
          >
            <a href={heroData.cta.primary.href}>{heroData.cta.primary.label}</a>
          </Button>
          <Button
            variant="secondary"
            asChild
          >
            <a href={heroData.cta.secondary.href}>{heroData.cta.secondary.label}</a>
          </Button>
          <Button
            variant="tertiary"
            icon={<DownloadIcon />}
            asChild
          >
            <a href={heroData.cta.tertiary.href} download>{heroData.cta.tertiary.label}</a>
          </Button>
        </div>

        <div className="mt-16 border-y border-white/10 bg-ink/60 backdrop-blur-sm overflow-hidden" aria-hidden="true">
          <div className="flex animate-marquee" style={{ width: 'max-content' }}>
            {heroData.techMarquee.map((tech, i) => (
              <span key={i} className="marquee-text px-6 py-3 whitespace-nowrap flex-shrink-0">
                {tech}
              </span>
            ))}
            {heroData.techMarquee.map((tech, i) => (
              <span key={`${i}-dup`} className="marquee-text px-6 py-3 whitespace-nowrap flex-shrink-0">
                {tech}
              </span>
            ))}
            {heroData.techMarquee.map((tech, i) => (
              <span key={`${i}-dup2`} className="marquee-text px-6 py-3 whitespace-nowrap flex-shrink-0">
                {tech}
              </span>
            ))}
            {heroData.techMarquee.map((tech, i) => (
              <span key={`${i}-dup3`} className="marquee-text px-6 py-3 whitespace-nowrap flex-shrink-0">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}