/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
    unoptimized: true,
  },
  // Note: async headers() does not work with `output: 'export'`.
  // Security headers must be configured at the hosting platform level:
  // - Netlify: netlify.toml or public/_headers
  // - Vercel: vercel.json
  // - Cloudflare Pages: public/_headers
  // - GitHub Pages: _headers in repo root (or configure via Cloudflare Workers)
  // - Apache: .htaccess
  // - Nginx: nginx.conf
};

module.exports = nextConfig;
