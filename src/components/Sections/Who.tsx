'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { whoData } from '@/lib/data';

export function Who() {
  const words = whoData.headline.split(' ');
  const paragraphs = whoData.description
    .split('\n\n')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const headingRef = useRef<HTMLHeadingElement>(null);
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

    const node = headingRef.current;
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
    <section id="who" className="section-wrapper" aria-labelledby="who-heading">
      <div className="container-x">
        <p className="eyebrow">
          <span>02</span> Who I Am
        </p>

        <h2 ref={headingRef} id="who-heading" className="display-h2 max-w-5xl [text-wrap:balance] mb-16">
          {words.map((word, i) => (
            <span
              key={i}
              className={cn(
                'inline-block word will-change-transform will-change-filter will-change-opacity gpu-layer',
                prefersReducedMotion
                  ? 'opacity-100'
                  : isVisible
                    ? 'animate-blur-in opacity-0'
                    : 'opacity-0'
              )}
              style={isVisible && !prefersReducedMotion ? { animationDelay: `${i * 100}ms` } : undefined}
            >
              {word}{i < words.length - 1 ? '\u00A0' : ''}
            </span>
          ))}
        </h2>

        <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {whoData.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <dt className="mono-sm text-mist mb-2">{stat.label}</dt>
              <dd className="display-h2 text-paper font-mono tracking-tight" aria-live="polite">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 max-w-3xl space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="body-lg text-mist leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}