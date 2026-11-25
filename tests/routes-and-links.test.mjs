import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const APP_DIR = path.join(SRC_DIR, 'app');
const SECTIONS_DIR = path.join(SRC_DIR, 'components', 'Sections');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const DATA_FILE = path.join(SRC_DIR, 'lib', 'data.ts');
const SKILLS_PAGE_FILE = path.join(APP_DIR, 'skills', 'page.tsx');
const GITIGNORE_FILE = path.join(ROOT_DIR, '.gitignore');

/**
 * Recursively collects files matching extensions under a directory.
 */
function collectFiles(dir, extensions) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectFiles(fullPath, extensions));
    } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Extracts internal `/...` href targets from `<Link>` and `<a>` JSX elements
 * (supporting static string literals and template literals).
 */
function extractInternalJsxHrefs(source, filePath) {
  const refs = [];
  const tagRegex = /<(Link|a)(?=\s)([\s\S]*?)>/g;
  const hrefRegex =
    /\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|\{\s*(?:"([^"]*)"|'([^']*)'|`([^`]*)`)\s*\})/g;

  for (const tagMatch of source.matchAll(tagRegex)) {
    const tagName = tagMatch[1];
    const attrs = tagMatch[2];

    for (const hrefMatch of attrs.matchAll(hrefRegex)) {
      const literalValue = hrefMatch[1] ?? hrefMatch[2] ?? hrefMatch[3] ?? hrefMatch[4];
      const templateValue = hrefMatch[5];
      const rawValue = literalValue ?? templateValue;
      if (!rawValue) continue;

      // For template literals (e.g. `/work#${project.id}`), take the static prefix before `${`.
      const staticPrefix =
        templateValue !== undefined ? templateValue.split('${')[0] : rawValue;

      if (!staticPrefix.startsWith('/') || staticPrefix.startsWith('//')) {
        continue;
      }

      const rawPathname = staticPrefix.split(/[?#]/)[0];
      const pathname =
        rawPathname.length > 1 ? rawPathname.replace(/\/+$/, '') : rawPathname;

      refs.push({
        file: path.relative(ROOT_DIR, filePath).replace(/\\/g, '/'),
        tag: tagName,
        raw: rawValue,
        pathname,
      });
    }
  }

  return refs;
}

/**
 * Extracts internal `/...` route strings defined in `src/lib/data.ts`
 * (e.g. `caseStudy`, `link`, `href`, `resumeUrl`).
 */
function extractDataRouteStrings(dataSource) {
  const refs = [];
  const propRegex = /\b(caseStudy|link|href|resumeUrl)\s*:\s*['"]([^'"]+)['"]/g;

  for (const match of dataSource.matchAll(propRegex)) {
    const prop = match[1];
    const value = match[2];
    if (!value.startsWith('/') || value.startsWith('//')) continue;

    const rawPathname = value.split(/[?#]/)[0];
    const pathname =
      rawPathname.length > 1 ? rawPathname.replace(/\/+$/, '') : rawPathname;

    refs.push({
      file: 'src/lib/data.ts',
      tag: prop,
      raw: value,
      pathname,
    });
  }

  return refs;
}

/**
 * Resolves a route pathname to its expected `src/app/.../page.tsx` file path.
 */
function resolveAppPageFile(routePathname) {
  if (routePathname === '/') {
    return path.join(APP_DIR, 'page.tsx');
  }
  const segments = routePathname.replace(/^\/+/, '').split('/').filter(Boolean);
  return path.join(APP_DIR, ...segments, 'page.tsx');
}

/**
 * Runs git with given args in ROOT_DIR. Returns null if git is unavailable.
 */
function runGit(args) {
  const result = spawnSync('git', args, {
    cwd: ROOT_DIR,
    encoding: 'utf8',
    windowsHide: true,
  });

  if (result.error && result.error.code === 'ENOENT') {
    return null;
  }
  return result;
}

describe('Route and link integrity', () => {
  it('resolves every internal <Link>/<a> route and data route reference to a valid App Router page or public asset', () => {
    const srcFiles = collectFiles(SRC_DIR, ['.ts', '.tsx']);
    assert.ok(srcFiles.length > 0, 'Expected .ts/.tsx files under src/');

    const collectedRefs = [];
    for (const filePath of srcFiles) {
      const content = fs.readFileSync(filePath, 'utf8');
      collectedRefs.push(...extractInternalJsxHrefs(content, filePath));
    }

    const dataSource = fs.readFileSync(DATA_FILE, 'utf8');
    collectedRefs.push(...extractDataRouteStrings(dataSource));

    assert.ok(collectedRefs.length > 0, 'Expected at least one internal route reference');

    const verifiedPageRoutes = new Set();

    for (const ref of collectedRefs) {
      const publicAssetPath = path.join(PUBLIC_DIR, ref.pathname.slice(1));
      const looksLikeStaticAsset = path.extname(ref.pathname) !== '';

      if (looksLikeStaticAsset || (ref.pathname !== '/' && fs.existsSync(publicAssetPath))) {
        assert.ok(
          fs.existsSync(publicAssetPath) && fs.statSync(publicAssetPath).isFile(),
          `Static asset "${ref.pathname}" referenced in ${ref.file} (${ref.raw}) does not exist in public/`
        );
        continue;
      }

      const pageFile = resolveAppPageFile(ref.pathname);
      assert.ok(
        fs.existsSync(pageFile),
        `Internal route "${ref.pathname}" referenced in ${ref.file} (${ref.raw}) is missing ${path.relative(ROOT_DIR, pageFile)}`
      );
      verifiedPageRoutes.add(ref.pathname);
    }

    for (const requiredRoute of ['/', '/work', '/projects', '/skills']) {
      assert.ok(
        verifiedPageRoutes.has(requiredRoute),
        `Expected internal route "${requiredRoute}" to be referenced and verified`
      );
      assert.ok(
        fs.existsSync(resolveAppPageFile(requiredRoute)),
        `Expected App Router page for "${requiredRoute}"`
      );
    }
  });
});

describe('navItems section anchors', () => {
  it('ensures every #section anchor in navItems has a matching id attribute in src/components/Sections/*.tsx', () => {
    const dataSource = fs.readFileSync(DATA_FILE, 'utf8');
    const navMatch = dataSource.match(/export const navItems\s*=\s*\[([\s\S]*?)\];/);
    assert.ok(navMatch, 'Expected `export const navItems = [...]` in src/lib/data.ts');

    const navAnchors = [];
    for (const match of navMatch[1].matchAll(/href\s*:\s*['"](#[^'"]+)['"]/g)) {
      navAnchors.push(match[1]);
    }

    assert.equal(navAnchors.length, 11, `Expected 11 navItems entries, found ${navAnchors.length}`);
    assert.equal(new Set(navAnchors).size, navAnchors.length, 'navItems anchors must be unique');

    const sectionFiles = collectFiles(SECTIONS_DIR, ['.tsx']);
    assert.ok(sectionFiles.length > 0, 'Expected section .tsx files in src/components/Sections/');

    const sectionIds = new Set();
    for (const filePath of sectionFiles) {
      const content = fs.readFileSync(filePath, 'utf8');
      for (const idMatch of content.matchAll(/\bid\s*=\s*(?:"([^"]+)"|'([^']+)'|\{\s*['"]([^'"]+)['"]\s*\})/g)) {
        const idValue = idMatch[1] ?? idMatch[2] ?? idMatch[3];
        if (idValue) {
          sectionIds.add(idValue);
        }
      }
    }

    for (const anchor of navAnchors) {
      assert.match(anchor, /^#[a-z0-9-]+$/, `Invalid navItem anchor format: ${anchor}`);
      const targetId = anchor.slice(1);
      assert.ok(
        sectionIds.has(targetId),
        `navItems anchor "${anchor}" has no matching id="${targetId}" in src/components/Sections/*.tsx`
      );
    }
  });
});

describe('ecosystemData.categories /skills#<anchor> links', () => {
  it('validates all category anchors in data.ts and confirms skills/page.tsx renders matching section ids', () => {
    const dataSource = fs.readFileSync(DATA_FILE, 'utf8');
    const ecosystemMatch = dataSource.match(/export const ecosystemData\s*=\s*\{([\s\S]*?)\n\};/);
    assert.ok(ecosystemMatch, 'Expected `export const ecosystemData = { ... };` in src/lib/data.ts');

    const categoryLinks = [];
    for (const match of ecosystemMatch[1].matchAll(/link\s*:\s*['"]([^'"]+)['"]/g)) {
      categoryLinks.push(match[1]);
    }

    assert.equal(
      categoryLinks.length,
      10,
      `Expected 10 ecosystemData.categories entries, found ${categoryLinks.length}`
    );

    const anchors = categoryLinks.map((link) => {
      assert.ok(
        link.startsWith('/skills#'),
        `Expected category link "${link}" to start with "/skills#"`
      );
      const anchor = link.slice('/skills#'.length);
      assert.match(
        anchor,
        /^[a-z0-9-]+$/,
        `Expected URL-safe non-empty anchor slug in "${link}", got "${anchor}"`
      );
      return anchor;
    });

    assert.equal(
      new Set(anchors).size,
      anchors.length,
      'ecosystemData.categories anchor slugs must be unique'
    );

    const skillsPageSource = fs.readFileSync(SKILLS_PAGE_FILE, 'utf8');
    assert.match(
      skillsPageSource,
      /import\s*\{[^}]*\becosystemData\b[^}]*\}\s*from\s*['"]@\/lib\/data['"]/,
      'src/app/skills/page.tsx must import ecosystemData from @/lib/data'
    );
    assert.match(
      skillsPageSource,
      /ecosystemData\.categories/,
      'src/app/skills/page.tsx must read ecosystemData.categories'
    );
    assert.match(
      skillsPageSource,
      /const\s+anchorId\s*=\s*cat\.link\.split\(['"]#['"]\)\[1\]/,
      'src/app/skills/page.tsx must derive anchorId from cat.link.split("#")[1]'
    );
    assert.match(
      skillsPageSource,
      /<section[\s\S]*?\bid=\{anchorId\}/,
      'src/app/skills/page.tsx must render <section ... id={anchorId}> for each category'
    );
    assert.match(
      skillsPageSource,
      /<a[\s\S]*?\bhref=\{`#\$\{anchorId\}`\}/,
      'src/app/skills/page.tsx must render jump links <a href={`#${anchorId}`}> for each category'
    );
  });
});

describe('.gitignore and sensitive/build artifact protection', () => {
  it('declares ignore rules for .env files, .vercel, and out/ and keeps them untracked and ignored', () => {
    const gitignoreLines = fs
      .readFileSync(GITIGNORE_FILE, 'utf8')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && !line.startsWith('#'));

    assert.ok(
      gitignoreLines.some((line) => line === '.env' || line === '.env*'),
      '.gitignore must ignore .env'
    );
    assert.ok(
      gitignoreLines.some((line) => line === '.env*.local' || line === '.env*'),
      '.gitignore must ignore .env*.local'
    );
    assert.ok(
      gitignoreLines.some((line) => line === '.vercel' || line === '.vercel/'),
      '.gitignore must ignore .vercel'
    );
    assert.ok(
      gitignoreLines.some((line) => line === 'out/' || line === 'out'),
      '.gitignore must ignore out/'
    );

    const rootEntries = fs.readdirSync(ROOT_DIR);
    const sensitiveOrBuildEntries = rootEntries.filter(
      (name) => name.startsWith('.env') || name === '.vercel' || name === 'out'
    );

    const gitCheck = runGit(['rev-parse', '--is-inside-work-tree']);
    if (gitCheck && gitCheck.status === 0) {
      const tracked = runGit(['ls-files', '--', '.env*', '.vercel', 'out']);
      assert.equal(tracked.status, 0, `git ls-files failed: ${tracked.stderr}`);
      assert.equal(
        tracked.stdout.trim(),
        '',
        `Sensitive or build artifacts must not be tracked by git:\n${tracked.stdout}`
      );

      const pathsToVerifyIgnored = Array.from(
        new Set(['.env', '.env.local', '.vercel', 'out/', ...sensitiveOrBuildEntries])
      );

      for (const target of pathsToVerifyIgnored) {
        const ignoreCheck = runGit(['check-ignore', '--', target]);
        assert.equal(
          ignoreCheck.status,
          0,
          `Expected "${target}" to be ignored by .gitignore (stderr: ${ignoreCheck.stderr})`
        );
      }
    }
  });
});
