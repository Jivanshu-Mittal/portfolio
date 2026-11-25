import { afterEach, beforeEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const SITEMAP_CONFIG_PATH = require.resolve('../next-sitemap.config.js');
const ENV_KEYS = [
  'NEXT_PUBLIC_SITE_URL',
  'VERCEL_PROJECT_PRODUCTION_URL',
  'VERCEL_URL',
  'SITE_URL',
];

function loadSitemapConfig() {
  delete require.cache[SITEMAP_CONFIG_PATH];
  return require(SITEMAP_CONFIG_PATH);
}

describe('next-sitemap.config.js', () => {
  let savedEnv;

  beforeEach(() => {
    savedEnv = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));
    for (const key of ENV_KEYS) {
      delete process.env[key];
    }
  });

  afterEach(() => {
    for (const key of ENV_KEYS) {
      if (savedEnv[key] === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = savedEnv[key];
      }
    }
    delete require.cache[SITEMAP_CONFIG_PATH];
  });

  describe('siteUrl resolution', () => {
    it('uses NEXT_PUBLIC_SITE_URL, strips trailing slashes, and takes precedence over Vercel vars', () => {
      process.env.NEXT_PUBLIC_SITE_URL = '  https://example.com///  ';
      process.env.VERCEL_PROJECT_PRODUCTION_URL = 'portfolio.example.com';
      process.env.VERCEL_URL = 'preview-123.vercel.app';

      const config = loadSitemapConfig();
      assert.equal(config.siteUrl, 'https://example.com');
    });

    it('uses VERCEL_PROJECT_PRODUCTION_URL without scheme and takes precedence over VERCEL_URL', () => {
      process.env.VERCEL_PROJECT_PRODUCTION_URL = 'portfolio.example.com';
      process.env.VERCEL_URL = 'preview-123.vercel.app';

      const config = loadSitemapConfig();
      assert.equal(config.siteUrl, 'https://portfolio.example.com');
    });

    it('uses VERCEL_URL without scheme when higher-priority env vars are unset', () => {
      process.env.VERCEL_URL = 'preview-123.vercel.app';

      const config = loadSitemapConfig();
      assert.equal(config.siteUrl, 'https://preview-123.vercel.app');
    });

    it('falls back to https://jivanshu.dev when all site URL env vars are unset', () => {
      const config = loadSitemapConfig();
      assert.equal(config.siteUrl, 'https://jivanshu.dev');
    });
  });

  describe('static configuration options', () => {
    it('sets outDir, generateRobotsTxt, and generateIndexSitemap', () => {
      const config = loadSitemapConfig();
      assert.equal(config.outDir, './out');
      assert.equal(config.generateRobotsTxt, true);
      assert.equal(config.generateIndexSitemap, true);
    });

    it('excludes /404 and /_not-found from sitemap generation', () => {
      const config = loadSitemapConfig();
      assert.ok(Array.isArray(config.exclude));
      assert.ok(config.exclude.includes('/404'));
      assert.ok(config.exclude.includes('/_not-found'));
    });
  });
});
