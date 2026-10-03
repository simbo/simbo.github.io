// @vitest-environment node
import { readFile } from 'node:fs/promises';

import { expect, it, vi } from 'vitest';

import { links, packageJson } from './vite-content.js';

it('loads links and project metadata from the repository', async () => {
  expect(links).toEqual(JSON.parse(await readFile('src/content/links.json', 'utf8')));
  expect(packageJson.name).toBe('simbo.github.io');
  expect(packageJson.version).toMatch(/^\d+\.\d+\.\d+$/);
  for (const link of links) {
    expect(link.href).toBeTruthy();
    expect(link.type).toBeTruthy();
    expect(link.label).toBeTruthy();
  }
});
it('reports read and parse failures with their original cause', async () => {
  vi.resetModules();
  const error = new Error('cannot read links');
  vi.doMock('node:fs/promises', () => ({ readFile: vi.fn().mockRejectedValue(error) }));
  try {
    await expect(import('./vite-content.js')).rejects.toMatchObject({
      message: expect.stringContaining("Failed to read './src/content/links.json'") as unknown,
      cause: error,
    });
  } finally {
    vi.doUnmock('node:fs/promises');
    vi.resetModules();
  }
});
