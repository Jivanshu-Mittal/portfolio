import { siteConfig } from '@/lib/data';

export function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.email.replace('mailto:', 'https://')}#website`,
        url: 'https://jivanshu.dev',
        name: 'Jivanshu Mittal | Full-Stack Developer',
        description: siteConfig.description,
        publisher: {
          '@id': `${siteConfig.email.replace('mailto:', 'https://')}#person`,
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://jivanshu.dev/search?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'ProfilePage',
        '@id': 'https://jivanshu.dev#profile',
        mainEntity: {
          '@id': `${siteConfig.email.replace('mailto:', 'https://')}#person`,
        },
      },
      {
        '@type': 'Person',
        '@id': `${siteConfig.email.replace('mailto:', 'https://')}#person`,
        name: siteConfig.name,
        jobTitle: siteConfig.title,
        worksFor: {
          '@type': 'Organization',
          name: 'GLA University',
        },
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: 'GLA University',
        },
        knowsAbout: [
          'TypeScript', 'JavaScript', 'Node.js', 'Express.js', 'Next.js', 'React',
          'MongoDB', 'Mongoose', 'Redis', 'JWT', 'Docker', 'Git', 'Tailwind CSS',
          'Jest', 'Supertest', 'Zod', 'Postman', 'Vercel', 'Render',
          'REST API Design', 'Database Design', 'Authentication', 'Authorization',
          'Optimistic Locking', 'Concurrency Control', 'Caching Strategies',
          'CI/CD', 'GitHub Actions', 'Code Review', 'System Design'
        ],
        sameAs: [
          siteConfig.github,
          siteConfig.linkedin,
          siteConfig.twitter,
        ],
        email: siteConfig.email.replace('mailto:', ''),
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Mathura',
          addressRegion: 'Uttar Pradesh',
          addressCountry: 'IN',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}