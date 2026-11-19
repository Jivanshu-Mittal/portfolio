'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { navItems } from '@/lib/data';
import { ChevronUpIcon, ChevronDownIcon } from '@/components/Button';

export function SectionNav() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const activeDotRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => {
        const el = document.querySelector(item.href);
        if (el) {
          const rect = el.getBoundingClientRect();
          return { id: item.href, top: rect.top + window.scrollY, bottom: rect.bottom + window.scrollY };
        }
        return null;
      }).filter(Boolean) as { id: string; top: number; bottom: number }[];

      const currentSection = sections.find(s => window.scrollY + 100 >= s.top && window.scrollY + 100 < s.bottom);
      if (currentSection) {
        const index = navItems.findIndex(item => item.href === currentSection.id);
        if (index !== -1) setActiveIndex(index);
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

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowUp' && index > 0) {
      e.preventDefault();
      const prevBtn = document.querySelector(`[data-section-nav="${index - 1}"]`) as HTMLButtonElement;
      prevBtn?.focus();
    } else if (e.key === 'ArrowDown' && index < navItems.length - 1) {
      e.preventDefault();
      const nextBtn = document.querySelector(`[data-section-nav="${index + 1}"]`) as HTMLButtonElement;
      nextBtn?.focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToSection(navItems[index].href);
    }
  };

  if (!mounted) return null;

  return (
    <aside
      className="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-[90] hidden md:flex"
      aria-label="Section navigation"
      role="navigation"
    >
      <div className="glass-pill p-1.5 flex flex-col items-center gap-1">
        <button
          data-section-nav="-1"
          onClick={() => scrollToSection(navItems[0].href)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              scrollToSection(navItems[0].href);
            }
          }}
          disabled={activeIndex === 0}
          className={cn(
            'p-1.5 rounded-full transition-all duration-200',
            'hover:bg-brand-500 hover:text-ink',
            activeIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'text-mist'
          )}
          aria-label="Go to top"
          aria-disabled={activeIndex === 0}
        >
          <ChevronUpIcon />
        </button>

        <ol className="flex flex-col gap-1" role="list">
          {navItems.map((item, index) => (
            <li key={item.href} role="listitem">
              <button
                ref={index === activeIndex ? activeDotRef : undefined}
                data-section-nav={index}
                onClick={() => scrollToSection(item.href)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onMouseEnter={() => {
                  if (tooltipRef.current) {
                    const btn = document.querySelector(`[data-section-nav="${index}"]`) as HTMLButtonElement;
                    if (btn) {
                      const rect = btn.getBoundingClientRect();
                      tooltipRef.current.style.transform = `translateX(-${rect.width + 12}px) translateY(${rect.top - rect.height / 2}px)`;
                      tooltipRef.current.textContent = item.label;
                      tooltipRef.current.classList.add('opacity-100', 'translate-x-0');
                      tooltipRef.current.classList.remove('opacity-0', 'translate-x-2');
                    }
                  }
                }}
                onMouseLeave={() => {
                  if (tooltipRef.current) {
                    tooltipRef.current.classList.add('opacity-0', 'translate-x-2');
                    tooltipRef.current.classList.remove('opacity-100', 'translate-x-0');
                  }
                }}
                className={cn(
                  'relative size-2 rounded-full transition-all duration-300 ease-out-expo',
                  'flex-shrink-0',
                  index === activeIndex
                    ? 'size-3 bg-brand-500 shadow-ping-ring ring-2 ring-brand-500/40 animate-ping'
                    : 'bg-white/40 hover:size-2.5 hover:bg-white'
                )}
                aria-label={`Go to ${item.label}`}
                aria-current={index === activeIndex ? 'true' : undefined}
              >
                <span className="sr-only">{item.number} - {item.label}</span>
              </button>
            </li>
          ))}
        </ol>

        <button
          data-section-nav={navItems.length}
          onClick={() => scrollToSection(navItems[navItems.length - 1].href)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              scrollToSection(navItems[navItems.length - 1].href);
            }
          }}
          disabled={activeIndex === navItems.length - 1}
          className={cn(
            'p-1.5 rounded-full transition-all duration-200',
            'hover:bg-brand-500 hover:text-ink',
            activeIndex === navItems.length - 1 ? 'opacity-50 cursor-not-allowed' : 'text-mist'
          )}
          aria-label="Go to bottom"
          aria-disabled={activeIndex === navItems.length - 1}
        >
          <ChevronDownIcon />
        </button>

        <div
          ref={tooltipRef}
          className="absolute right-full mr-3 top-0 translate-x-2 opacity-0 transition-all duration-200 ease-out-expo pointer-events-none whitespace-nowrap"
          aria-hidden="true"
        >
          <span className="glass-pill px-3 py-1.5 text-sm font-medium text-paper">
            Section
          </span>
        </div>
      </div>
    </aside>
  );
}