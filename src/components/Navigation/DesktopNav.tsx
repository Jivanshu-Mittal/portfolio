'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { navItems } from '@/lib/data';

const renderedItems = navItems.slice(1);

export function DesktopNav() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);
  const indicatorRef = useRef<HTMLLIElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsVisible(y > 100);

      const sections = renderedItems
        .map((item, idx) => {
          const el = document.querySelector(item.href);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return {
            index: idx,
            top: rect.top + y,
            bottom: rect.bottom + y,
          };
        })
        .filter((s): s is { index: number; top: number; bottom: number } => s !== null);

      if (sections.length === 0) {
        setActiveIndex(-1);
        return;
      }

      const heroEl = document.querySelector(navItems[0].href);
      const heroBottom = heroEl ? heroEl.getBoundingClientRect().bottom + y : 0;
      const firstSection = sections[0];

      if ((heroEl && y + 100 < heroBottom) || y + 100 < firstSection.top) {
        setActiveIndex(-1);
        return;
      }

      if (window.innerHeight + y >= document.documentElement.scrollHeight - 20) {
        setActiveIndex(sections[sections.length - 1].index);
        return;
      }

      const currentSection = sections.find(
        (s) => y + 100 >= s.top && y + 100 < s.bottom
      );
      if (currentSection) {
        setActiveIndex(currentSection.index);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateIndicator = () => {
      if (activeIndex >= 0 && indicatorRef.current && itemsRef.current[activeIndex]) {
        const item = itemsRef.current[activeIndex];
        if (item) {
          indicatorRef.current.style.transform = `translateX(${item.offsetLeft}px)`;
          indicatorRef.current.style.width = `${item.offsetWidth}px`;
        }
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator, { passive: true });
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeIndex]);

  return (
    <nav
      className={cn(
        'fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none hidden lg:flex max-w-[calc(100vw-2rem)] transition-opacity duration-300',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
      aria-label="Main navigation"
    >
      <div
        className={cn(
          'relative glass-panel rounded-full px-2.5 xl:px-3 py-1.5 flex items-center gap-1 xl:gap-1.5',
          isVisible ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        <Link
          href="#hero"
          className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          aria-label="Jivanshu Mittal - Home"
          onClick={() => setActiveIndex(-1)}
        >
          <span className="text-xs font-bold text-paper tracking-tight">JM</span>
        </Link>

        <ul className="relative flex items-center gap-0.5 xl:gap-1" role="menubar">
          <li
            ref={indicatorRef}
            className={cn(
              'absolute top-0 left-0 h-9 bg-paper rounded-full will-change-transform transition-[transform,width,opacity] duration-300 ease-out-expo pointer-events-none z-0',
              activeIndex >= 0 ? 'opacity-100' : 'opacity-0'
            )}
            role="none"
          />

          {renderedItems.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <li
                key={item.href}
                ref={(el) => {
                  itemsRef.current[index] = el;
                }}
                className="relative z-10"
                role="none"
              >
                <Link
                  href={item.href}
                  role="menuitem"
                  className={cn(
                    'relative flex h-9 items-center justify-center rounded-full px-2.5 xl:px-3.5 text-xs xl:text-sm whitespace-nowrap transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
                    isActive
                      ? 'text-ink font-semibold'
                      : 'font-medium text-mist hover:text-paper'
                  )}
                  onClick={() => setActiveIndex(index)}
                >
                  {index === 0 && (
                    <span
                      className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-500"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
