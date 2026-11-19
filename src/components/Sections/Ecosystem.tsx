'use client';

import { cn } from '@/lib/utils';
import { ecosystemData } from '@/lib/data';
import { ExternalLinkIcon } from '@/components/Button';

export function Ecosystem() {
  return (
    <section id="ecosystem" className="section-wrapper" aria-labelledby="ecosystem-heading">
      <div className="container-x">
        <p className="eyebrow">
          <span>05</span> Ecosystem
        </p>
        <h2 id="ecosystem-heading" className="display-h2 max-w-5xl [text-wrap:balance] leading-tight mb-16">
          Technologies & Tools
        </h2>

        <div className="mb-16 overflow-hidden" aria-hidden="true">
          <div className="flex animate-marquee-fast" style={{ width: 'max-content' }}>
            {ecosystemData.marquee.frontend.map((tech, i) => (
              <span key={i} className="marquee-text px-6 py-3 whitespace-nowrap flex-shrink-0 text-brand-400">
                {tech}
              </span>
            ))}
            {ecosystemData.marquee.frontend.map((tech, i) => (
              <span key={`${i}-dup`} className="marquee-text px-6 py-3 whitespace-nowrap flex-shrink-0 text-brand-400">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex animate-marquee-fast" style={{ width: 'max-content', animationDirection: 'reverse' }}>
            {ecosystemData.marquee.backend.map((tech, i) => (
              <span key={i} className="marquee-text px-6 py-3 whitespace-nowrap flex-shrink-0 text-mist">
                {tech}
              </span>
            ))}
            {ecosystemData.marquee.backend.map((tech, i) => (
              <span key={`${i}-dup`} className="marquee-text px-6 py-3 whitespace-nowrap flex-shrink-0 text-mist">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="md:grid md:grid-cols-2 gap-6">
          {ecosystemData.categories.map((cat) => (
            <article
              key={cat.number}
              className="group p-6 rounded-2xl border border-white/10 hover:bg-white/[0.025] transition-colors duration-200"
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="text-brand-400 font-mono text-2xl font-bold flex-shrink-0">
                  {cat.number}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className={cn('text-[clamp(1.25rem,3vw,2rem)] font-semibold leading-snug tracking-tight', 'group-hover:text-brand-400 transition-colors')}>
                      {cat.title}
                    </h3>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/5 text-mist border border-white/10 flex-shrink-0">
                      {cat.badge}
                    </span>
                  </div>
                  <p className="body-base text-mist mb-4">{cat.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4" role="list">
                    {cat.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="mono-sm px-2 py-1 rounded bg-white/5 border border-white/10"
                        role="listitem"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={cat.link}
                    className="uv-link text-sm font-mono"
                  >
                    Explore
                    <ExternalLinkIcon className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}