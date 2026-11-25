'use client';

import { useState, useEffect, type KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';
import { navItems } from '@/lib/data';
import { ChevronUpIcon, ChevronDownIcon } from '@/components/Button';

export function SectionNav() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      if (window.innerHeight + y >= document.documentElement.scrollHeight - 20) {
        setActiveIndex(navItems.length - 1);
        return;
      }

      const sections = navItems
        .map((item, index) => {
          const el = document.querySelector(item.href);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return {
            index,
            top: rect.top + y,
            bottom: rect.bottom + y,
          };
        })
        .filter((s): s is { index: number; top: number; bottom: number } => s !== null);

      const currentSection = sections.find((s) => y + 100 >= s.top && y + 100 < s.bottom);
      if (currentSection) {
        setActiveIndex(currentSection.index);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === 'ArrowUp' && index > 0) {
      e.preventDefault();
      document.querySelector<HTMLButtonElement>(`[data-section-nav="${index - 1}"]`)?.focus();
    } else if (e.key === 'ArrowDown' && index < navItems.length - 1) {
      e.preventDefault();
      document.querySelector<HTMLButtonElement>(`[data-section-nav="${index + 1}"]`)?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      document.querySelector<HTMLButtonElement>('[data-section-nav="0"]')?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      document.querySelector<HTMLButtonElement>(`[data-section-nav="${navItems.length - 1}"]`)?.focus();
    }
  };

  if (!mounted) return null;

  const isFirstActive = activeIndex === 0;
  const isLastActive = activeIndex === navItems.length - 1;

  return (
    <nav
      className="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-[90] hidden md:flex"
      aria-label="Section navigation"
    >
      <div className="glass-pill p-1.5 flex flex-col items-center gap-1">
        <button
          type="button"
          data-section-nav="-1"
          onClick={() => scrollToSection(navItems[0].href)}
          disabled={isFirstActive}
          className={cn(
            'p-1.5 rounded-full transition-all duration-200',
            isFirstActive
              ? 'text-mist opacity-50 cursor-not-allowed'
              : 'text-mist hover:bg-brand-500 hover:text-ink'
          )}
          aria-label="Go to top"
        >
          <ChevronUpIcon className="size-4" />
        </button>

        <ol className="flex flex-col items-center gap-1">
          {navItems.map((item, index) => {
            const isActive = index === activeIndex;
            const isTooltipVisible = hoveredIndex === index;

            return (
              <li
                key={item.href}
                className="relative flex size-4 items-center justify-center"
              >
                <button
                  type="button"
                  data-section-nav={index}
                  onClick={() => scrollToSection(item.href)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex((prev) => (prev === index ? null : prev))}
                  onFocus={() => setHoveredIndex(index)}
                  onBlur={() => setHoveredIndex((prev) => (prev === index ? null : prev))}
                  className={cn(
                    'relative rounded-full transition-all duration-300 ease-out-expo shrink-0',
                    isActive
                      ? 'size-3 bg-brand-500 shadow-ping-ring ring-2 ring-brand-500/40'
                      : 'size-2 bg-white/40 hover:size-2.5 hover:bg-white'
                  )}
                  aria-label={`Go to ${item.label}`}
                  aria-current={isActive ? 'location' : undefined}
                >
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-full bg-brand-500/60 animate-ping pointer-events-none"
                      aria-hidden="true"
                    />
                  )}
                  <span className="sr-only">
                    {item.number} - {item.label}
                  </span>
                </button>

                <div
                  className={cn(
                    'absolute right-full mr-3 top-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap transition-all duration-200 ease-out-expo',
                    isTooltipVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
                  )}
                  aria-hidden="true"
                >
                  <span className="glass-pill inline-block px-3 py-1.5 text-sm font-medium text-paper">
                    {item.label}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>

        <button
          type="button"
          data-section-nav={navItems.length}
          onClick={() => scrollToSection(navItems[navItems.length - 1].href)}
          disabled={isLastActive}
          className={cn(
            'p-1.5 rounded-full transition-all duration-200',
            isLastActive
              ? 'text-mist opacity-50 cursor-not-allowed'
              : 'text-mist hover:bg-brand-500 hover:text-ink'
          )}
          aria-label="Go to bottom"
        >
          <ChevronDownIcon className="size-4" />
        </button>
      </div>
    </nav>
  );
}