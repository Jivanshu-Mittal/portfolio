'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { whatData } from '@/lib/data';
import { PlusIcon } from '@/components/Button';

export function What() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const isProgrammaticScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intersectingIndicesRef = useRef<Set<number>>(new Set());

  const activeCap = whatData.capabilities[activeIndex] ?? whatData.capabilities[0];

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const intersecting = intersectingIndicesRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const indexAttr = entry.target.getAttribute('data-capability-index');
          if (indexAttr === null) continue;
          const idx = Number(indexAttr);
          if (Number.isNaN(idx)) continue;

          if (entry.isIntersecting) {
            intersecting.add(idx);
          } else {
            intersecting.delete(idx);
          }
        }

        if (isProgrammaticScrollRef.current || intersecting.size === 0) {
          return;
        }

        const viewportAnchor = window.innerHeight * 0.35;
        let closestIdx: number | null = null;
        let closestDistance = Infinity;

        for (const idx of intersecting) {
          const el = cardRefs.current[idx];
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          const distance = Math.abs(cardCenter - viewportAnchor);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIdx = idx;
          }
        }

        if (closestIdx !== null) {
          setActiveIndex(closestIdx);
        }
      },
      {
        rootMargin: '-20% 0px -45% 0px',
        threshold: [0, 0.25, 0.5],
      }
    );

    const nodes = cardRefs.current;
    for (const node of nodes) {
      if (node) {
        observer.observe(node);
      }
    }

    return () => {
      observer.disconnect();
      intersecting.clear();
      if (scrollTimeoutRef.current !== null) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleSelectStep = (index: number) => {
    setActiveIndex(index);

    const targetCard = cardRefs.current[index];
    if (!targetCard) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (scrollTimeoutRef.current !== null) {
      clearTimeout(scrollTimeoutRef.current);
    }

    isProgrammaticScrollRef.current = true;
    targetCard.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'center',
    });

    scrollTimeoutRef.current = setTimeout(
      () => {
        isProgrammaticScrollRef.current = false;
      },
      prefersReducedMotion ? 50 : 750
    );
  };

  if (!activeCap) {
    return null;
  }

  return (
    <section id="what" className="section-wrapper" aria-labelledby="what-heading">
      <div className="container-x">
        <p className="eyebrow">
          <span aria-hidden="true">03</span> What I Do
        </p>
        <h2 id="what-heading" className="display-h2 max-w-5xl [text-wrap:balance] mb-12 lg:mb-16">
          {whatData.headline}
        </h2>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
          <aside
            className="hidden lg:block lg:col-span-5 lg:sticky lg:top-28 lg:self-start"
            aria-label="Active capability overview"
          >
            <div className="space-y-4">
              <span
                className="block text-what-number font-mono font-bold tracking-tight text-paper leading-none select-none"
                aria-hidden="true"
              >
                {activeCap.number}
              </span>

              <div className="pl-5 border-l-2 border-brand-500">
                <p className="text-2xl font-semibold text-paper leading-snug tracking-tight mb-2">
                  {activeCap.title}
                </p>
                <p className="body-base text-mist">{activeCap.description}</p>
              </div>
            </div>

            <nav aria-label="Capability steps" className="mt-8 pt-6 border-t border-white/10">
              <ol className="space-y-2">
                {whatData.capabilities.map((cap, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <li key={cap.number}>
                      <button
                        type="button"
                        onClick={() => handleSelectStep(i)}
                        aria-current={isActive ? 'step' : undefined}
                        className={cn(
                          'w-full flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-colors duration-200',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
                          isActive
                            ? 'border-brand-500/50 bg-white/[0.05] text-paper'
                            : 'border-white/10 bg-transparent text-secondary hover:border-white/25 hover:bg-white/[0.02] hover:text-paper'
                        )}
                      >
                        <span className="flex items-center gap-3 min-w-0">
                          <span
                            className={cn(
                              'font-mono text-xs font-semibold tracking-wider flex-shrink-0',
                              isActive ? 'text-brand-400' : 'text-mist'
                            )}
                          >
                            {cap.number}
                          </span>
                          <span className="text-sm font-medium truncate">{cap.title}</span>
                        </span>
                        <span
                          className={cn(
                            'size-1.5 rounded-full flex-shrink-0 transition-colors duration-200',
                            isActive ? 'bg-brand-500' : 'bg-white/20'
                          )}
                          aria-hidden="true"
                        />
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </aside>

          <div className="lg:col-span-7 space-y-6">
            {whatData.capabilities.map((cap, i) => {
              const isActive = i === activeIndex;
              return (
                <article
                  key={cap.number}
                  id={`what-capability-${cap.number}`}
                  data-capability-index={i}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  onMouseEnter={() => setActiveIndex(i)}
                  onFocusCapture={() => setActiveIndex(i)}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    'rounded-2xl border p-6 md:p-8 transition-colors duration-300',
                    isActive
                      ? 'border-brand-500/50 bg-white/[0.03]'
                      : 'border-white/10 bg-white/[0.015] hover:border-white/25'
                  )}
                >
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          'inline-flex items-center justify-center rounded-md border px-2.5 py-1 font-mono text-xs font-semibold tracking-wider transition-colors duration-300',
                          isActive
                            ? 'border-brand-500/50 bg-brand-500/15 text-brand-400'
                            : 'border-white/15 bg-white/[0.03] text-secondary'
                        )}
                      >
                        {cap.number}
                      </span>
                      <span
                        className={cn(
                          'h-px w-8 transition-colors duration-300',
                          isActive ? 'bg-brand-500' : 'bg-white/20'
                        )}
                        aria-hidden="true"
                      />
                    </div>
                    {isActive && (
                      <span className="hidden lg:inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-brand-400">
                        <span className="size-1.5 rounded-full bg-brand-400" aria-hidden="true" />
                        Active
                      </span>
                    )}
                  </div>

                  <h3 className="text-[clamp(1.25rem,3vw,1.875rem)] font-semibold text-paper leading-snug tracking-tight mb-2">
                    {cap.title}
                  </h3>
                  <p className="body-base text-mist mb-6">{cap.description}</p>

                  <h4 className="font-mono text-xs uppercase tracking-wider text-secondary mb-3">
                    What I build
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-2.5 mb-6">
                    {cap.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-2.5 text-paper/90 body-base">
                        <span className="size-1.5 rounded-full bg-brand-500 flex-shrink-0" aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <details className="group pt-4 border-t border-white/10">
                    <summary className="inline-flex items-center gap-2 text-brand-400 hover:text-paper transition-colors duration-200 font-mono text-sm cursor-pointer list-none [&::-webkit-details-marker]:hidden rounded-md py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink">
                      <span>Technical details</span>
                      <PlusIcon
                        className="size-4 transition-transform duration-300 group-open:rotate-45"
                        aria-hidden="true"
                      />
                    </summary>
                    <div className="mt-4 pl-4 border-l border-brand-500/40 text-mist body-base">
                      {cap.details}
                    </div>
                  </details>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
