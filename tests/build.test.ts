// @vitest-environment node
import { build } from 'vite';
import { expect, it } from 'vitest';

import { links, packageJson } from '../vite-content.js';

it('builds the site without shipping adjacent tests or the test runner', async () => {
  const result = await build({ logLevel: 'silent', build: { write: false } });
  if (!('output' in result)) throw new Error('Expected a single site build');
  expect(result.output.some(file => file.fileName === 'index.html')).toBe(true);
  const html = result.output.find(file => file.type === 'asset' && file.fileName === 'index.html');
  if (html?.type !== 'asset') throw new Error('Expected rendered site HTML');
  const source = html.source.toString();
  expect(source).not.toMatch(/\{[{%#]/);
  expect(source).toContain('<title>Simbo&#39;s Website</title>');
  expect(source).toContain('Simon Lepel');
  expect(source).toContain(`v${packageJson.version ?? 'N/A'}`);
  expect(source).toContain('content="https://simbo.de/"');
  expect(source).toContain('content="https://simbo.de/screenshot.png"');
  expect(source).toContain('https://trk.srvkist.net/trk.js');
  expect(source).toMatch(/<script async[^>]* src="https:\/\/trk\.srvkist\.net\/trk\.js"/);
  expect(source).not.toContain('recorder.js');
  expect(source).not.toContain('http-equiv');
  expect(source).not.toContain('visibility: hidden');
  expect(source).not.toContain('onload');
  expect(source).toContain('<main class="main is-loading">');
  expect(source).toContain('<noscript>');
  expect(source).toContain('href="/imprint/en/"');
  expect(source).toContain('href="/privacy/en/"');
  expect(source).not.toContain('<!--');
  for (const link of links) {
    expect(source).toContain(`href="${link.href.replaceAll('&', '&amp;')}"`);
  }
  const assetUrls = [...source.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)/g)];
  expect(assetUrls.length).toBeGreaterThan(0);
  for (const [, url] of assetUrls) {
    expect(result.output.some(file => `/${file.fileName}` === url)).toBe(true);
  }
  for (const file of result.output) {
    expect(file.fileName).not.toContain('.test');
    if (file.type !== 'chunk') continue;
    expect(file.code).not.toContain('vitest');
    expect(file.code).not.toContain('tests/command-module');
  }
});

it('builds the imprint and privacy pages in German and English with matching sections', async () => {
  const result = await build({ logLevel: 'silent', build: { write: false } });
  if (!('output' in result)) throw new Error('Expected a single site build');
  const pages = [
    { file: 'imprint/index.html', lang: 'de', alternate: '/imprint/en/', title: 'Impressum', robots: 'noindex' },
    { file: 'imprint/en/index.html', lang: 'en', alternate: '/imprint/', title: 'Legal Notice', robots: 'noindex' },
    {
      file: 'privacy/index.html',
      lang: 'de',
      alternate: '/privacy/en/',
      title: 'Datenschutzhinweise',
      robots: 'index',
    },
    { file: 'privacy/en/index.html', lang: 'en', alternate: '/privacy/', title: 'Privacy Notice', robots: 'index' },
  ];
  const sources = new Map<string, string>();
  for (const page of pages) {
    const html = result.output.find(file => file.type === 'asset' && file.fileName === page.file);
    if (html?.type !== 'asset') throw new Error(`Expected rendered ${page.file}`);
    const source = html.source.toString();
    sources.set(page.file, source);
    expect(source).not.toMatch(/\{[{%#]/);
    expect(source).toContain(`<html lang="${page.lang}">`);
    expect(source).toContain(`<title>Simbo&#39;s ${page.title}</title>`);
    expect(source).toContain(`<meta property="og:title" content="Simbo&#39;s ${page.title}">`);
    expect(source).toContain(`<meta name="robots" content="${page.robots}, follow">`);
    expect(source).toContain(`<h1>${page.title}</h1>`);
    expect(source).toContain(`content="https://simbo.de/${page.file.replace('index.html', '')}"`);
    expect(source).toContain(`href="${page.alternate}" hreflang="${page.lang === 'de' ? 'en' : 'de'}"`);
    expect(source).toContain('hreflang="x-default"');
    expect(source).toContain('Breitestraße 28');
    expect(source).toContain('73550 Waldstetten');
    expect(source).toContain('mailto:simbo@simbo.de');
    expect(source).toContain('https://trk.srvkist.net/trk.js');
    expect(source).not.toContain('recorder.js');
    expect(source).not.toContain('SRVKIST');
  }
  const sectionIds = (source: string): string[] => [...source.matchAll(/<h2 id="([^"]+)"/g)].map(([, id]) => id);
  for (const name of ['imprint', 'privacy']) {
    expect(sectionIds(sources.get(`${name}/index.html`) ?? '')).toEqual(
      sectionIds(sources.get(`${name}/en/index.html`) ?? ''),
    );
  }
  expect(sectionIds(sources.get('privacy/index.html') ?? '')).toEqual([
    'controller',
    'github-pages',
    'own-server',
    'analytics',
    'email',
    'rights',
  ]);
});
