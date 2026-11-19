'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { nowData } from '@/lib/data';
import { Button, ArrowIcon } from '@/components/Button';

export function Now() {
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setIstTime(new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Kolkata',
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="now" className="section-wrapper" aria-labelledby="now-heading">
      <div className="container-x">
        <div className="lg:grid lg:grid-cols-12 gap-12 items-start">
          <aside className="lg:col-span-4">
            <p className="eyebrow">
              <span>09</span> Current Focus
            </p>
          </aside>

          <div className="lg:col-span-8 mt-8 lg:mt-0">
            <h2 id="now-heading" className="display-h2 max-w-5xl [text-wrap:balance] mb-6">
              Currently focused on <span className="text-brand-400">ASP.NET Core</span> and cloud-native architectures.
            </h2>

            <dl className="grid grid-cols-3 gap-6 mb-12" role="list">
              {nowData.stats.map((stat, i) => (
                <div key={stat.label} className="flex flex-col" role="listitem">
                  <dt className="mono-sm text-mist mb-1">{stat.label}</dt>
                  <dd className="body-lg text-paper font-mono">
                    {stat.label === 'Location' ? (
                      <>
                        {stat.value}
                        <span className="ml-2 text-brand-400 font-mono text-sm whitespace-nowrap">{istTime} IST</span>
                      </>
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