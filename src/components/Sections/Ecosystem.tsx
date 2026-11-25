'use client';

import Link from 'next/link';
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ecosystemData.categories.map((cat) => (
            <article
              key={cat.number}
              className="group min-w-0 p-4 sm:p-6 rounded-2xl border border-white/10 hover:bg-white/[0.025] transition-colors duration-200"
            >
              <div className="flex items-start gap-3 sm:gap-4 mb-4">
                <span className="text-brand-400 font-mono text-2xl font-bold flex-shrink-0">
                  {cat.number}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className={cn('min-w-0 break-words text-[clamp(1.25rem,3vw,2rem)] font-semibold leading-snug tracking-tight', 'group-hover:text-brand-400 transition-colors')}>
                      {cat.title}
                    </h3>
                    <span className="max-w-full break-words text-xs font-medium px-2 py-0.5 rounded-full bg-white/5 text-mist border border-white/10">
                      {cat.badge}
                    </span>
                  </div>
                  <p className="body-base text-mist mb-4 break-words">{cat.description}</p>
                  <ul className="flex flex-wrap gap-2 mb-4">
                    {cat.tags.map((tag, i) => (
                      <li
                        key={i}
                        className="mono-sm max-w-full break-words px-2 py-1 rounded bg-white/5 border border-white/10"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={cat.link}
                    className="uv-link text-sm font-mono"
                  >
                    Explore
                    <ExternalLinkIcon className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}