// @vitest-environment node
import { build } from 'vite';
import { expect, it } from 'vitest';

it('builds the site without shipping adjacent tests or the test runner', async () => {
  const result = await build({ logLevel: 'silent', build: { write: false } });
  if (!('output' in result)) throw new Error('Expected a single site build');
  expect(result.output.some(file => file.fileName === 'index.html')).toBe(true);
  for (const file of result.output) {
    expect(file.fileName).not.toContain('.test');
    if (file.type !== 'chunk') continue;
    expect(file.code).not.toContain('vitest');
    expect(file.code).not.toContain('tests/command-module');
  }
});
