import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 — Page Not Found | Jivanshu Mittal',
  description: 'The page you are looking for could not be found. Return to Jivanshu Mittal’s portfolio or explore featured work.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="relative min-h-screen overflow-hidden bg-ink text-paper flex items-center"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 right-0 h-[50%] w-[60%] bg-radial-glow-tr" />
        <div className="absolute bottom-0 left-0 h-[60%] w-[55%] bg-radial-glow-bl" />
      </div>

      <div className="container-x relative z-10 w-full py-24">
        <div className="max-w-3xl">
          <p className="eyebrow">
            <span>404</span> Not Found
          </p>

          <h1 className="display-h1 font-bold text-paper">
            Page not found.
          </h1>

          <p className="body-lg mt-6 max-w-xl text-mist">
            The route you requested doesn&apos;t exist or may have moved. Head back to the home page or jump straight to selected projects.
          </p>

          <nav aria-label="Recovery navigation" className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-solid px-6 py-3 text-base font-semibold text-ink transition-colors duration-150 hover:bg-brand-500 active:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Back to Home
              <svg
                className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="/#work"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-transparent px-6 py-3 text-base font-semibold text-paper transition-colors duration-150 hover:bg-white/10 active:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              View Selected Work
            </Link>
          </nav>
        </div>
      </div>
    </main>
  );
}
