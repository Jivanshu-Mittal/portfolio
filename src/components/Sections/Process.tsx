'use client';

import { cn } from '@/lib/utils';
import { processData } from '@/lib/data';

export function Process() {
  return (
    <section id="process" className="section-wrapper" aria-labelledby="process-heading">
      <div className="container-x">
        <p className="eyebrow">
          <span>08</span> Process
        </p>
        <h2 id="process-heading" className="display-h2 max-w-5xl [text-wrap:balance] mb-16">
          How I Work
        </h2>

        <div className="relative">
          <div className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500 to-transparent" aria-hidden="true" />

          <ol className="relative grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-8">
            {processData.map((step, i) => (
              <li
                key={step.number}
                className={cn(
                  'relative flex flex-col items-center text-center',
                  'lg:items-start lg:text-left'
                )}
              >
                <div className={cn(
                  'relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/20',
                  'bg-ink text-paper font-mono text-lg font-bold',
                  'mb-4',
                  'transition-colors duration-300',
                  'hover:border-brand-500 hover:text-brand-400'
                )}>
                  {step.number}
                </div>
                <h3 className="text-[clamp(1.125rem,2.5vw,1.75rem)] font-semibold text-paper leading-snug tracking-tight mb-2">{step.title}</h3>
                <p className="body-base text-mist leading-relaxed">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}