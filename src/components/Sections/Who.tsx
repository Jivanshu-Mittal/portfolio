'use client';

import { cn } from '@/lib/utils';
import { whoData } from '@/lib/data';

export function Who() {
  const words = whoData.headline.split(' ');

  return (
    <section id="who" className="section-wrapper" aria-labelledby="who-heading">
      <div className="container-x">
        <p className="eyebrow">
          <span>02</span> Who I Am
        </p>

        <h2 id="who-heading" className="display-h2 max-w-5xl [text-wrap:balance] mb-16">
          {words.map((word, i) => (
            <span
              key={i}
              className={cn(
                'inline-block word will-change-transform will-change-filter will-change-opacity gpu-layer',
                'animate-blur-in'
              )}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {word}{i < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </h2>

        <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12" role="list">
          {whoData.stats.map((stat, i) => (
            <div key={stat.label} className="flex flex-col" role="listitem">
              <dt className="mono-sm text-mist mb-2">{stat.label}</dt>
              <dd className="display-h2 text-paper font-mono tracking-tight" aria-live="polite">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 max-w-3xl">
          <p className="body-lg text-mist leading-relaxed">
            {whoData.description}
          </p>
        </div>
      </div>
    </section>
  );
}