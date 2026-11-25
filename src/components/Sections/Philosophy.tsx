'use client';

import { cn } from '@/lib/utils';
import { philosophyData } from '@/lib/data';

export function Philosophy() {
  return (
    <section id="philosophy" className="section-wrapper" aria-labelledby="philosophy-heading">
      <div className="container-x">
        <p className="eyebrow">
          <span>04</span> Philosophy
        </p>
        <h2 id="philosophy-heading" className="display-h2 max-w-5xl [text-wrap:balance] mb-16">
          Principles I Build By
        </h2>

        <ol className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-8">
          {philosophyData.map((principle, i) => (
            <li
              key={principle.number}
              className={cn(
                'group p-6 rounded-2xl border border-white/10',
                'hover:bg-white/[0.025] transition-colors duration-200',
                'md:col-span-6 lg:col-span-3'
              )}
            >
              <div className="flex items-start gap-4">
                <span className={cn(
                  'text-brand-400 font-mono text-3xl font-bold flex-shrink-0',
                  'group-hover:text-brand-400 transition-colors'
                )}>
                  {principle.number}
                </span>
                <div className="min-w-0">
                  <h3 className="text-[clamp(1.25rem,3vw,2rem)] font-semibold text-paper leading-snug mb-2 tracking-tight">{principle.title}</h3>
                  <p className="body-base text-mist leading-relaxed">{principle.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}