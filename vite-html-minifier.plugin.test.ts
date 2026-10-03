// @vitest-environment node
import { expect, it } from 'vitest';

import { htmlMinifierPlugin } from './vite-html-minifier.plugin.js';

it('minifies HTML assets while preserving other assets and chunks', async () => {
  const plugin = htmlMinifierPlugin();
  expect(plugin.apply).toBe('build');
  expect(plugin.enforce).toBe('post');
  const html = { type: 'asset', fileName: 'index.html', source: '<div>  hello  <!-- remove --> world </div>' };
  const css = { type: 'asset', fileName: 'style.css', source: '  body { color: red; } ' };
  const chunk = { type: 'chunk', fileName: 'index.js', code: '// untouched' };
  const hook = plugin.generateBundle;
  if (typeof hook !== 'function') throw new Error('Expected bundle hook');
  await hook.call({} as never, {} as never, { html, css, chunk } as never, false);
  expect(html.source).toBe('<div> hello world </div>');
  expect(css.source).toBe('  body { color: red; } ');
  expect(chunk.code).toBe('// untouched');
});
