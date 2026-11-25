'use client';

import { useState, useEffect } from 'react';
import { nowData } from '@/lib/data';
import { getISTTime } from '@/lib/utils';
import { Button, ArrowIcon } from '@/components/Button';

function renderHeadline(headline: string) {
  const parts = headline.split(/(<span[^>]*>.*?<\/span>)/g);
  return parts.map((part, index) => {
    const match = part.match(/^<span(?:\s+class="([^"]*)")?[^>]*>(.*?)<\/span>$/);
    if (match) {
      const [, className, text] = match;
      return (
        <span key={index} className={className || 'text-brand-400'}>
          {text}
        </span>
      );
    }
    return part;
  });
}

export function Now() {
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setIstTime(getISTTime());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="now" className="section-wrapper" aria-labelledby="now-heading">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 items-start">
          <aside className="lg:col-span-4">
            <p className="eyebrow">
              <span>09</span> Current Focus
            </p>
          </aside>

          <div className="lg:col-span-8">
            <h2 id="now-heading" className="display-h2 max-w-5xl [text-wrap:balance] mb-6">
              {renderHeadline(nowData.headline)}
            </h2>

            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              {nowData.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col min-w-0">
                  <dt className="mono-sm text-mist mb-1">{stat.label}</dt>
                  <dd className="body-lg text-paper font-mono">
                    {stat.label === 'Location' ? (
                      <span className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <span>{stat.value}</span>
                        <span className="text-brand-400 font-mono text-sm whitespace-nowrap tabular-nums">
                          {istTime ? `${istTime} IST` : 'Asia/Kolkata (IST)'}
                        </span>
                      </span>
                    ) : (
                      stat.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="body-lg text-mist max-w-2xl mb-8">
              {nowData.description}
            </p>

            <Button variant="primary" icon={<ArrowIcon />} asChild>
              <a href={nowData.cta.href}>{nowData.cta.label}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}