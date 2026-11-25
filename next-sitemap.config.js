const resolveSiteUrl = () => {
  const publicUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (publicUrl) return publicUrl.replace(/\/+$/, '');

  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim();
  if (vercelHost) {
    const normalized = /^https?:\/\//i.test(vercelHost)
      ? vercelHost
      : `https://${vercelHost}`;
    return normalized.replace(/\/+$/, '');
  }

  return 'https://jivanshu.dev';
};

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: resolveSiteUrl(),
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  outDir: './out',
  exclude: ['/server-sitemap.xml', '/404', '/_not-found'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api/', '/_next/', '/static/'] },
    ],
  },
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
