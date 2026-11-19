'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { siteConfig, navItems } from '@/lib/data';
import { ExternalLinkIcon, GitHubIcon, LinkedInIcon, ChevronUpIcon } from '@/components/Button';

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-28 md:py-40" role="contentinfo">
      <div className="container-x">
        <div className="md:grid md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-5">
            <a href="mailto:{siteConfig.email}" className="block mb-4">
              <address className="not-italic text-[clamp(1.125rem,2.5vw,1.75rem)] font-medium text-paper hover:text-brand-400 transition-colors [text-wrap:balance]">
                {siteConfig.email}
              </address>
            </a>
            <p className="body-lg text-mist max-w-xl">
              {siteConfig.description}
            </p>
          </div>

          <nav className="md:col-span-3" aria-label="Footer navigation">
            <h3 className="font-semibold text-paper mb-4">Navigate</h3>
            <ul className="space-y-3" role="list">
              {navItems.slice(1, 10).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="uv-link body-base">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h3 className="font-semibold text-paper mb-4">Elsewhere</h3>
            <ul className="space-y-3" role="list">
              <li>
                <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="uv-link body-base flex items-center gap-2">
                  <GitHubIcon className="size-5" aria-hidden="true" />
                  GitHub
                  <ExternalLinkIcon className="size-4" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="uv-link body-base flex items-center gap-2">
                  <LinkedInIcon className="size-5" aria-hidden="true" />
                  LinkedIn
                  <ExternalLinkIcon className="size-4" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href={siteConfig.resumeUrl} download className="uv-link body-base flex items-center gap-2">
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Resume (PDF)
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.phone}`} className="uv-link body-base flex items-center gap-2">
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  {siteConfig.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-16 border-t border-white/10">
          <div className="text-center mb-12">
            <h2 className="text-footer-brand font-body uppercase select-none whitespace-nowrap leading-[0.86] tracking-[-0.055em]">
              JIVANSHU<br className="hidden md:block" />MITTAL
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-mist body-base">
            <p>© 2026 Jivanshu Mittal. Designed and built by me.</p>
            <p>Built with Next.js, Tailwind CSS, React Aria & custom animations.</p>
            <button
              className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
            >
              <ChevronUpIcon className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}