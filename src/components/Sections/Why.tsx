'use client';

import { cn } from '@/lib/utils';
import { whyData } from '@/lib/data';

export function Why() {
  return (
    <section id="why" className="section-wrapper" aria-labelledby="why-heading">
      <div className="container-x">
        <p className="eyebrow">
          <span>10</span> Why Work With Me
        </p>
        <h2 id="why-heading" className="display-h2 max-w-5xl [text-wrap:balance] mb-16">
          What You Get
        </h2>

        <dl className="md:grid md:grid-cols-2 gap-8" role="list">
          {whyData.map((item) => (
            <div
              key={item.number}
              className="relative pt-6 border-t border-white/10 pl-9"
              role="listitem"
            >
              <div className="flex items-start gap-4">
                <dt className={cn(
                  'flex items-center justify-center size-8 rounded-full bg-brand-500/20 text-brand-400 font-mono text-lg font-bold flex-shrink-0'
                )}>
                  {item.number}
                </dt>
                <div>
                  <h3 className="text-[clamp(1.125rem,2.5vw,1.75rem)] font-semibold text-paper leading-snug tracking-tight mb-2">{item.title}</h3>
                  <dd className="body-base text-mist leading-relaxed">{item.description}</dd>
                </div>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}