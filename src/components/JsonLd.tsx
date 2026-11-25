import { siteConfig, SITE_URL } from '@/lib/data';

export function JsonLd() {
  const websiteId = `${SITE_URL}/#website`;
  const profileId = `${SITE_URL}/#profile`;
  const personId = `${SITE_URL}/#person`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: `${SITE_URL}/`,
        name: 'Jivanshu Mittal | Full-Stack Developer',
        description: siteConfig.description,
        publisher: {
          '@id': personId,
        },
      },
      {
        '@type': 'ProfilePage',
        '@id': profileId,
        url: `${SITE_URL}/`,
        name: 'Jivanshu Mittal | Full-Stack Developer',
        isPartOf: {
          '@id': websiteId,
        },
        about: {
          '@id': personId,
        },
        mainEntity: {
          '@id': personId,
        },
      },
      {
        '@type': 'Person',
        '@id': personId,
        url: `${SITE_URL}/`,
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