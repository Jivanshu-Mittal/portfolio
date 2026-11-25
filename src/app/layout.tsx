import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL, siteConfig } from '@/lib/data';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Jivanshu Mittal | Full-Stack Developer (Backend Focus)',
  description: 'Building scalable backends and performant frontends. Specialized in Node.js, TypeScript, MongoDB, and Next.js.',
  keywords: ['Full-Stack Developer', 'Backend Engineer', 'Node.js', 'TypeScript', 'Next.js', 'MongoDB', 'React'],
  authors: [{ name: 'Jivanshu Mittal' }],
  creator: 'Jivanshu Mittal',
  publisher: 'Jivanshu Mittal',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Jivanshu Mittal',
    title: 'Jivanshu Mittal | Full-Stack Developer (Backend Focus)',
    description: 'Building scalable backends and performant frontends. Specialized in Node.js, TypeScript, MongoDB, and Next.js.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Jivanshu Mittal - Full-Stack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jivanshu Mittal | Full-Stack Developer',
    description: 'Building scalable backends and performant frontends.',
    images: ['/og-image.png'],
    creator: '@jivanshu',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#0b0b0c',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://linkedin.com" />
      </head>
      <body className="bg-ink text-paper font-body antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-ink focus:text-brand-400">
          Skip to main content
        </a>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}