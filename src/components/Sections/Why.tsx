'use client';

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

        <dl className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {whyData.map((item) => (
            <div
              key={item.number}
              className="relative pt-6 border-t border-white/10"
            >
              <dt className="flex items-start gap-4 mb-2">
                <span
                  aria-hidden="true"
                  className="flex items-center justify-center size-8 rounded-full bg-brand-500/20 text-brand-400 font-mono text-sm font-bold flex-shrink-0 mt-0.5"
                >
                  {item.number}
                </span>
                <span className="text-[clamp(1.125rem,2.5vw,1.75rem)] font-semibold text-paper leading-snug tracking-tight">
                  {item.title}
                </span>
              </dt>
              <dd className="body-base text-mist leading-relaxed pl-12">
                {item.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}