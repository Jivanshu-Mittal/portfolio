'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { navItems } from '@/lib/data';

export function DesktopNav() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);

      const sections = navItems.map(item => {
        const el = document.querySelector(item.href);
        if (el) {
          const rect = el.getBoundingClientRect();
          return { id: item.href, top: rect.top + window.scrollY, bottom: rect.bottom + window.scrollY };
        }
        return null;
      }).filter(Boolean) as { id: string; top: number; bottom: number }[];

      const currentSection = sections.find(s => scrollY + 100 >= s.top && scrollY + 100 < s.bottom);
      if (currentSection) {
        const index = navItems.findIndex(item => item.href === currentSection.id);
        if (index !== -1) setActiveIndex(index);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  useEffect(() => {
    if (indicatorRef.current && itemsRef.current[activeIndex]) {
      const item = itemsRef.current[activeIndex];
      if (item) {
        indicatorRef.current.style.transform = `translateX(${item.offsetLeft}px)`;
        indicatorRef.current.style.width = `${item.offsetWidth}px`;
      }
    }
  }, [activeIndex]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-1/2 -translate-x-1/2 z-50 pointer-events-none',
        'hidden lg:flex',
        'transition-opacity duration-300',
        scrollY > 100 ? 'opacity-100' : 'opacity-0'
      )}
      aria-label="Main navigation"
      role="navigation"
    >
      <div
        className={cn(
          'relative pointer-events-auto glass-panel rounded-full px-4 py-2',
          'flex items-center gap-1'
        )}
        role="menubar"
      >
        <Link
          href="#hero"
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          aria-label="Jivanshu Mittal - Home"
          role="menuitem"
        >
          <span className="text-xs font-bold text-paper tracking-tight">JM</span>
        </Link>

        <div
          ref={indicatorRef}
          className="absolute bottom-1.5 left-0 h-8 bg-paper rounded-full will-change-transform transition-transform duration-300 ease-out-expo pointer-events-none z-0"
          aria-hidden="true"
        />

        <ul className="flex items-center gap-1 relative z-10" role="menubar">
          {navItems.slice(1).map((item, index) => (
            <li
              key={item.href}
              ref={(el) => { itemsRef.current[index] = el; }}
              role="menuitem"
            >
              <Link
                href={item.href}
                className={cn(
                  'relative flex h-10 min-w-[90px] items-center justify-center gap-1.5',
                  'rounded-full px-4 text-sm font-medium text-mist',
                  'hover:text-paper transition-colors duration-100',
                  'pill-label-hover',
                  index === activeIndex ? 'text-paper' : ''
                )}
                onClick={() => setActiveIndex(index + 1)}
              >
                {index === 0 && (
                  <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 size-1.5 rounded-full bg-brand-500" aria-hidden="true" />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}