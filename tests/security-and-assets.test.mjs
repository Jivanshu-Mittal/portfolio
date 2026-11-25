import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const SRC_DIR = path.join(ROOT_DIR, 'src');

/**
 * Extracts string literal values for specific property names from TypeScript/JS source.
 * Handles single-quoted, double-quoted, and plain backtick literals.
 */
function extractPropertyStringLiterals(source, propertyNames) {
  const escapedNames = propertyNames.map((name) =>
    name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
  );
  const pattern = new RegExp(
    `\\b(${escapedNames.join('|')})\\s*:\\s*(['"\`])([^'"\`\\r\\n]+)\\2`,
    'g',
  );

  const results = [];
  let match;
  while ((match = pattern.exec(source)) !== null) {
    results.push({
      property: match[1],
      value: match[3].trim(),
    });
  }
  return results;
}

/**
 * Resolves a site-root-relative path (e.g. "/images/foo.svg") to a path inside public/.
 */
function resolvePublicAssetPath(assetPath) {
  const cleanPath = assetPath.split(/[?#]/)[0];
  const relative = cleanPath.replace(/^\/+/, '');
  return path.join(PUBLIC_DIR, relative);
}

/**
 * Parses headers from vercel.json into a lowercase-keyed map.
 */
function parseVercelHeaders(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = JSON.parse(raw);
  assert.ok(Array.isArray(parsed.headers), 'vercel.json must define a headers array');

  const globalRule =
    parsed.headers.find((entry) => entry.source === '/(.*)' || entry.source === '/*') ??
    parsed.headers[0];
  assert.ok(globalRule && Array.isArray(globalRule.headers), 'vercel.json must define global headers');

  const headers = new Map();
  for (const item of globalRule.headers) {
    if (item?.key && typeof item.value === 'string') {
      headers.set(item.key.toLowerCase(), item.value.trim());
    }
  }
  return headers;
}

/**
 * Parses [headers.values] entries from netlify.toml into a lowercase-keyed map.
 */
function parseNetlifyHeaders(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const lines = raw.split(/\r?\n/);
  const headers = new Map();
  let inHeadersValues = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    if (trimmed.startsWith('[')) {
      inHeadersValues = trimmed === '[headers.values]';
      continue;
    }

    if (!inHeadersValues) continue;

    const match = trimmed.match(/^([A-Za-z0-9-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/);
    if (match) {
      const value = (match[2] ?? match[3] ?? '').trim();
      headers.set(match[1].toLowerCase(), value);
    }
  }

  return headers;
}

/**
 * Parses global /* headers from Cloudflare/Netlify public/_headers into a lowercase-keyed map.
 */
function parsePublicHeadersFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const lines = raw.split(/\r?\n/);
  const headers = new Map();
  let inGlobalBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    if (!/^\s/.test(line)) {
      inGlobalBlock = trimmed === '/*';
      continue;
    }

    if (!inGlobalBlock) continue;

    const colonIndex = trimmed.indexOf(':');
    if (colonIndex > 0) {
      const key = trimmed.slice(0, colonIndex).trim().toLowerCase();
      const value = trimmed.slice(colonIndex + 1).trim();
      headers.set(key, value);
    }
  }

  return headers;
}

/**
 * Normalizes a CSP header string into a list of normalized directives.
 */
function parseCspDirectives(cspValue) {
  return cspValue
    .split(';')
    .map((directive) => directive.trim().replace(/\s+/g, ' '))
    .filter(Boolean);
}

/**
 * Recursively collects source files matching allowed extensions under a directory.
 */
function collectSourceFiles(dir, extensions) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectSourceFiles(fullPath, extensions));
    } else if (entry.isFile() && extensions.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
}

/**
 * Finds `<dl ...>` opening tags in JSX/TSX source that include `role="list"`.
 * Respects quoted strings and `{...}` attribute expressions when locating the tag end.
 */
function findDlWithRoleList(source) {
  const matches = [];
  const dlStartRegex = /<dl(?=[\s>/])/g;
  let match;

  while ((match = dlStartRegex.exec(source)) !== null) {
    let i = match.index + 3;
    let inQuote = null;
    let braceDepth = 0;

    while (i < source.length) {
      const ch = source[i];
      if (inQuote) {
        if (ch === '\\') {
          i += 2;
          continue;
        }
        if (ch === inQuote) {
          inQuote = null;
        }
      } else {
        if (ch === '"' || ch === "'" || ch === '`') {
          inQuote = ch;
        } else if (ch === '{') {
          braceDepth += 1;
        } else if (ch === '}' && braceDepth > 0) {
          braceDepth -= 1;
        } else if (ch === '>' && braceDepth === 0) {
          break;
        }
      }
      i += 1;
    }

    const openingTag = source.slice(match.index, i + 1);
    if (/\brole\s*=\s*(?:['"]list['"]|\{\s*['"]list['"]\s*\})/.test(openingTag)) {
      matches.push(openingTag);
    }
  }

  return matches;
}

describe('Public assets referenced in data.ts and manifest.webmanifest', () => {
  it('all coverImage, resumeUrl, and ogImage local assets in src/lib/data.ts exist in public/', () => {
    const dataPath = path.join(SRC_DIR, 'lib', 'data.ts');
    const dataContent = fs.readFileSync(dataPath, 'utf8');

    const extracted = extractPropertyStringLiterals(dataContent, [
      'coverImage',
      'resumeUrl',
      'ogImage',
    ]);

    const foundProps = new Set(extracted.map((item) => item.property));
    assert.ok(foundProps.has('resumeUrl'), 'Expected to extract resumeUrl from src/lib/data.ts');
    assert.ok(foundProps.has('ogImage'), 'Expected to extract ogImage from src/lib/data.ts');
    assert.ok(foundProps.has('coverImage'), 'Expected to extract coverImage entries from src/lib/data.ts');

    const localAssets = extracted.filter((item) => item.value.startsWith('/'));
    assert.ok(localAssets.length > 0, 'Expected at least one local asset path starting with "/"');

    const missing = [];
    for (const asset of localAssets) {
      const targetPath = resolvePublicAssetPath(asset.value);
      if (!fs.existsSync(targetPath) || !fs.statSync(targetPath).isFile()) {
        missing.push(`${asset.property}: ${asset.value} -> ${path.relative(ROOT_DIR, targetPath)}`);
      }
    }

    assert.deepEqual(missing, [], `Missing local asset(s) in public/:\n${missing.join('\n')}`);
  });

  it('all icons[].src entries in public/manifest.webmanifest exist in public/', () => {
    const manifestPath = path.join(PUBLIC_DIR, 'manifest.webmanifest');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

    assert.ok(Array.isArray(manifest.icons) && manifest.icons.length > 0, 'manifest.webmanifest must contain icons');

    const missing = [];
    for (const icon of manifest.icons) {
      assert.equal(typeof icon.src, 'string', 'Each manifest icon must have a string src');
      if (icon.src.startsWith('/')) {
        const targetPath = resolvePublicAssetPath(icon.src);
        if (!fs.existsSync(targetPath) || !fs.statSync(targetPath).isFile()) {
          missing.push(`${icon.src} -> ${path.relative(ROOT_DIR, targetPath)}`);
        }
      }
    }

    assert.deepEqual(missing, [], `Missing manifest icon(s) in public/:\n${missing.join('\n')}`);
  });
});

describe('Security headers and tightened CSP across deployment configs', () => {
  const headerConfigs = [
    {
      name: 'vercel.json',
      filePath: path.join(ROOT_DIR, 'vercel.json'),
      parse: parseVercelHeaders,
    },
    {
      name: 'netlify.toml',
      filePath: path.join(ROOT_DIR, 'netlify.toml'),
      parse: parseNetlifyHeaders,
    },
    {
      name: 'public/_headers',
      filePath: path.join(PUBLIC_DIR, '_headers'),
      parse: parsePublicHeadersFile,
    },
  ];

  const forbiddenCspTokens = [
    "'unsafe-eval'",
    'cdn.jsdelivr.net',
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'api.github.com',
  ];

  const requiredCspDirectives = ["frame-ancestors 'none'", "object-src 'none'"];

  for (const config of headerConfigs) {
    it(`${config.name} enforces tightened CSP and required security headers`, () => {
      const headers = config.parse(config.filePath);

      const csp = headers.get('content-security-policy');
      assert.ok(csp, `${config.name}: missing Content-Security-Policy header`);

      for (const forbidden of forbiddenCspTokens) {
        assert.equal(
          csp.includes(forbidden),
          false,
          `${config.name}: Content-Security-Policy must not include ${forbidden}`,
        );
      }

      const directives = parseCspDirectives(csp);
      for (const requiredDirective of requiredCspDirectives) {
        assert.ok(
          directives.includes(requiredDirective),
          `${config.name}: Content-Security-Policy must include "${requiredDirective}"`,
        );
      }

      assert.equal(
        headers.get('x-frame-options'),
        'DENY',
        `${config.name}: X-Frame-Options must be DENY`,
      );
      assert.equal(
        headers.get('x-content-type-options'),
        'nosniff',
        `${config.name}: X-Content-Type-Options must be nosniff`,
      );

      const hsts = headers.get('strict-transport-security');
      assert.ok(
        hsts && /max-age=\d+/i.test(hsts),
        `${config.name}: Strict-Transport-Security header must be present with max-age`,
      );
    });
  }

  it('vercel.json enables cleanUrls when framework is null so static routes resolve without .html', () => {
    const raw = fs.readFileSync(path.join(ROOT_DIR, 'vercel.json'), 'utf8');
    const parsed = JSON.parse(raw);
    if (parsed.framework === null) {
      assert.equal(parsed.cleanUrls, true, 'vercel.json must set "cleanUrls": true when framework is null');
    }
  });
});

describe('Source code hygiene in src/', () => {
  const SOURCE_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx']);

  it('contains no literal "mailto:{" bug in any src/ file', () => {
    const files = collectSourceFiles(SRC_DIR, SOURCE_EXTENSIONS);
    assert.ok(files.length > 0, 'Expected source files in src/');

    const violations = [];
    for (const filePath of files) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('mailto:{')) {
        violations.push(path.relative(ROOT_DIR, filePath));
      }
    }

    assert.deepEqual(violations, [], `Found "mailto:{" bug in:\n${violations.join('\n')}`);
  });

  it('contains no role="list" on <dl> elements in any src/ file', () => {
    const files = collectSourceFiles(SRC_DIR, SOURCE_EXTENSIONS);
    assert.ok(files.length > 0, 'Expected source files in src/');

    const violations = [];
    for (const filePath of files) {
      const content = fs.readFileSync(filePath, 'utf8');
      const matches = findDlWithRoleList(content);
      if (matches.length > 0) {
        violations.push(`${path.relative(ROOT_DIR, filePath)}: ${matches.join(', ')}`);
      }
    }

    assert.deepEqual(
      violations,
      [],
      `Found invalid role="list" on <dl> element(s) in:\n${violations.join('\n')}`,
    );
  });

  it('src/lib/data.ts contains none of the confirmed dead 404/401 URLs', () => {
    const dataPath = path.join(SRC_DIR, 'lib', 'data.ts');
    const dataContent = fs.readFileSync(dataPath, 'utf8');

    const forbiddenUrls = [
      {
        label: 'del2-demo.vercel.app',
        pattern: /del2-demo\.vercel\.app(?![A-Za-z0-9.-])/i,
      },
      {
        label: 'taskflow-demo.vercel.app',
        pattern: /taskflow-demo\.vercel\.app(?![A-Za-z0-9.-])/i,
      },
      {
        label: 'github.com/Jivanshu-Mittal/del2',
        pattern: /github\.com\/Jivanshu-Mittal\/del2(?![A-Za-z0-9_-])/i,
      },
      {
        label: 'github.com/Jivanshu-Mittal/taskflow',
        pattern: /github\.com\/Jivanshu-Mittal\/taskflow(?![A-Za-z0-9_-])/i,
      },
      {
        label: 'github.com/Jivanshu-Mittal/api-gateway',
        pattern: /github\.com\/Jivanshu-Mittal\/api-gateway(?![A-Za-z0-9_-])/i,
      },
      {
        label: 'github.com/jivanshu',
        pattern: /github\.com\/jivanshu(?![A-Za-z0-9_-])/i,
      },
    ];

    const violations = [];
    for (const { label, pattern } of forbiddenUrls) {
      if (pattern.test(dataContent)) {
        violations.push(label);
      }
    }

    assert.deepEqual(
      violations,
      [],
      `Found dead URL(s) in src/lib/data.ts:\n${violations.join('\n')}`,
    );
  });
});
