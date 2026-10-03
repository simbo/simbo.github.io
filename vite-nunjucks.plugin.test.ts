// @vitest-environment node
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import type { HmrContext, IndexHtmlTransformContext } from 'vite';
import { expect, it, vi } from 'vitest';

import nunjucksPlugin from './vite-nunjucks.plugin.js';

function handler(plugin: ReturnType<typeof nunjucksPlugin>) {
  const hook = plugin.transformIndexHtml;
  if (!hook || typeof hook === 'function') throw new Error('Expected an ordered HTML hook');
  return hook.handler.bind({} as never);
}
const context = { filename: '/site/index.html', path: '/index.html' } as IndexHtmlTransformContext;

it('renders escaped globals with page-specific overrides', async () => {
  const plugin = nunjucksPlugin({ locals: { title: 'global', text: '<b>', 'index.html': { title: 'page' } } });
  expect(await handler(plugin)('{{ title }} {{ text }}', context)).toBe('page &lt;b&gt;');
  expect(plugin.enforce).toBe('pre');
});
it('supports default options and rejects missing variables', async () => {
  expect(await handler(nunjucksPlugin())('plain', context)).toBe('plain');
  await expect(handler(nunjucksPlugin())('{{ missing }}', context)).rejects.toThrow();
});
it('loads templates and reloads only tracked source paths', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'simbo-nunjucks-'));
  try {
    const file = join(directory, 'partial.html');
    await writeFile(file, '<b>{{ name }}</b>');
    const plugin = nunjucksPlugin({ locals: { name: 'Simon' } });
    expect(
      await handler(plugin)('{% include "partial.html" %}', { ...context, filename: join(directory, 'index.html') }),
    ).toBe('<b>Simon</b>');
    const send = vi.fn();
    const hotUpdate = plugin.handleHotUpdate;
    if (typeof hotUpdate !== 'function') throw new Error('Expected an update hook');
    expect(
      hotUpdate.call({} as never, { file: '/unrelated', server: { ws: { send } } } as unknown as HmrContext),
    ).toBeUndefined();
    expect(send).not.toHaveBeenCalled();
    expect(hotUpdate.call({} as never, { file, server: { ws: { send } } } as unknown as HmrContext)).toEqual([]);
    expect(send).toHaveBeenCalledWith({ type: 'full-reload' });
    await expect(
      handler(plugin)('{% include "missing.html" %}', { ...context, filename: join(directory, 'index.html') }),
    ).rejects.toThrow();
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
