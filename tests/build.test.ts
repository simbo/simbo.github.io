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
