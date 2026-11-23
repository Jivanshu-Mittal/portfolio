/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://jivanshu.dev',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  outDir: './out',
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api/', '/_next/', '/static/'] },
    ],
    additionalSitemaps: [
      'https://jivanshu.dev/sitemap.xml',
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