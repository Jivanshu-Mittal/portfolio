'use client';

import { cn } from '@/lib/utils';
import { contactData } from '@/lib/data';
import { Button, ArrowIcon, MailIcon, DownloadIcon } from '@/components/Button';

export function ContactCTA() {
  return (
    <section id="contact-cta" className="section-wrapper relative" aria-labelledby="contact-heading">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[50%] bg-contact-glow pointer-events-none -z-10" aria-hidden="true" />

      <div className="container-x text-center">
        <p className="eyebrow justify-center">
          <span>11</span> Contact
        </p>
        <h2 id="contact-heading" className="display-h2 max-w-5xl [text-wrap:balance] mb-6 mx-auto">
          {contactData.headline}
        </h2>
        <p className="body-lg text-mist max-w-xl mx-auto mb-12">
          {contactData.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {contactData.buttons.map((btn, i) => (
            <Button
              key={i}
              variant={btn.variant as 'primary' | 'secondary' | 'tertiary'}
              icon={btn.variant === 'primary' ? <ArrowIcon /> : btn.variant === 'secondary' ? <MailIcon /> : <DownloadIcon />}
              asChild
            >
              <a href={btn.href} download={btn.download} target={btn.href.startsWith('http') ? '_blank' : undefined} rel={btn.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                {btn.label}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}