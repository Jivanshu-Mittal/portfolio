'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { whatData } from '@/lib/data';
import { PlusIcon } from '@/components/Button';

export function What() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="what" className="section-wrapper" aria-labelledby="what-heading">
      <div className="container-x">
        <p className="eyebrow">
          <span>03</span> What I Do
        </p>
        <h2 id="what-heading" className="display-h2 max-w-5xl [text-wrap:balance] mb-16">
          {whatData.headline}
        </h2>

        <div className="lg:grid lg:grid-cols-12 gap-12">
          <aside className="lg:col-span-5 lg:sticky lg:top-32 lg:h-[calc(100svh-10rem)] space-y-8" aria-label="Capabilities">
            {whatData.capabilities.map((cap, i) => (
              <div
                key={cap.number}
                className={cn(
                  'relative',
                  i === activeIndex ? 'opacity-100' : 'lg:opacity-35',
                  'transition-opacity duration-700 ease-out-expo'
                )}
                onMouseEnter={() => setActiveIndex(i)}
                onFocus={() => setActiveIndex(i)}
              >
                <div className="flex items-baseline gap-3 mb-4">
                  <span className={cn(
                    'text-what-number font-mono font-bold tracking-tight',
                    'relative transition-transform duration-500 ease-out-expo',
                    i === activeIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  )}>
                    {cap.number}
                  </span>
                </div>
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/25" aria-hidden="true" />
                  <div className={cn(
                    'absolute left-0 top-0 w-1 bg-brand-500 transition-all duration-500 ease-out-expo',
                    i === activeIndex ? 'h-full' : 'h-5'
                  )} aria-hidden="true" />
                  <h3 className="text-[clamp(1.125rem,2.5vw,1.75rem)] font-semibold text-paper leading-snug tracking-tight mb-2">{cap.title}</h3>
                  <p className="body-base text-mist mb-4">{cap.description}</p>
                  <ul className="space-y-2 mb-6" role="list">
                    {cap.highlights.map((highlight, hi) => (
                      <li key={hi} className="flex items-center gap-2 text-mist body-base">
                        <span className="size-1.5 rounded-full bg-brand-500 flex-shrink-0" aria-hidden="true" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <details className="group">
                    <summary className="flex items-center gap-2 text-brand-400 font-mono text-sm cursor-pointer list-none">
                      Technical details
                      <PlusIcon className={cn('size-4 transition-transform duration-300', 'group-open:rotate-45')} aria-hidden="true" />
                    </summary>
                    <div className={cn(
                      'mt-4 pl-16 border-l border-white/10 text-mist body-base',
                      'transition-opacity duration-700 ease-out-expo',
                      'group-open:opacity-100 opacity-0',
                      'group-open:translate-y-0 translate-y-2'
                    )}>
                      {cap.details}
                    </div>
                  </details>
                </div>
              </div>
            ))}
          </aside>

          <div className="lg:col-span-7 space-y-8">
            {whatData.capabilities.map((cap, i) => (
              <article
                key={cap.number}
                className={cn(
                  'p-6 md:p-8 rounded-2xl border border-white/10',
                  'transition-opacity duration-700 ease-out-expo',
                  i === activeIndex ? 'opacity-100 bg-white/[0.02]' : 'lg:opacity-35'
                )}
              >
                <h3 className="text-[clamp(1.25rem,3vw,2rem)] font-semibold text-paper leading-snug tracking-tight mb-2">{cap.title}</h3>
                <p className="body-base text-mist mb-4">{cap.description}</p>
                <h4 className="font-medium text-paper mb-2">What I build</h4>
                <ul className="space-y-1.5 mb-6" role="list">
                  {cap.highlights.map((highlight, hi) => (
                    <li key={hi} className="flex items-center gap-2 text-mist body-base">
                      <span className="size-1.5 rounded-full bg-brand-500 flex-shrink-0" aria-hidden="true" />
                      {highlight}
                    </li>
                  ))}
                </ul>
                <details className="group">
                  <summary className="flex items-center gap-2 text-brand-400 font-mono text-sm cursor-pointer list-none">
                    Technical details
                    <PlusIcon className={cn('size-4 transition-transform duration-300', 'group-open:rotate-45')} aria-hidden="true" />
                  </summary>
                  <div className={cn(
                    'mt-4 pl-6 border-l border-white/10 text-mist body-base',
                    'transition-opacity duration-700 ease-out-expo',
                    'group-open:opacity-100 opacity-0',
                    'group-open:translate-y-0 translate-y-2'
                  )}>
                    {cap.details}
                  </div>
                </details>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}