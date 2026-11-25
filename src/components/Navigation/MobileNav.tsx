'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { navItems, siteConfig } from '@/lib/data';
import { HamburgerIcon } from '@/components/Button';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!mounted) {
    return (
      <button
        type="button"
        ref={toggleRef}
        className="lg:hidden fixed bottom-6 right-6 z-[60] h-12 w-12 rounded-full glass-panel flex items-center justify-center"
        aria-label="Open menu"
        aria-expanded="false"
        aria-controls="mobile-menu"
      >
        <HamburgerIcon isOpen={false} />
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        ref={toggleRef}
        className="lg:hidden fixed bottom-6 right-6 z-[60] h-12 w-12 rounded-full glass-panel flex items-center justify-center"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        <HamburgerIcon isOpen={isOpen} />
        <span className="sr-only">{isOpen ? 'Close' : 'Menu'}</span>
      </button>

      <div
        id="mobile-menu"
        ref={panelRef}
        className={cn(
          'fixed top-0 left-0 w-full h-[100dvh] z-[60] lg:hidden',
          'flex justify-end',
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        inert={isOpen ? undefined : true}
      >
        <div
          className={cn(
            'relative w-full max-w-[420px] h-full',
            'bg-[rgba(18,18,20,0.62)] backdrop-blur-[12px]',
            'flex flex-col',
            isOpen ? 'translate-x-0' : 'translate-x-full',
            'transition-transform duration-500 ease-out-expo'
          )}
          style={{ '--sm-accent': '#FF7B52' } as React.CSSProperties}
        >
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[#1a1a1d]" aria-hidden="true" />
            <div className="absolute inset-0 bg-[#26262a]" aria-hidden="true" />
          </div>

          <nav className="overflow-y-auto flex-1 flex flex-col px-8 pt-12 pb-24" aria-label="Mobile navigation">
            <div className="my-auto">
              <ul className="space-y-6" role="menubar">
                {navItems.map((item, index) => (
                  <li key={item.href} role="none">
                    <Link
                      href={item.href}
                      role="menuitem"
                      className={cn(
                        'flex items-center gap-4',
                        'text-mobile-menu font-mono font-medium',
                        'text-mist hover:text-brand-400 transition-colors duration-300',
                        'stagger-origin will-change-transform',
                        isOpen ? 'animate-stagger-in opacity-0' : 'opacity-0'
                      )}
                      style={{
                        animationDelay: `${index * 80}ms`,
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-brand-400 font-mono text-lg">{item.number}</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-16 flex items-center gap-6">
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mist hover:text-brand-400 transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="size-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.305-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mist hover:text-brand-400 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="size-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-mist hover:text-brand-400 transition-colors"
                  aria-label="Email"
                >
                  <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}