// @vitest-environment node
import type { ConfigEnv, UserConfig } from 'vite';
import { expect, it, vi } from 'vitest';

import config from './vite.config.js';

function resolveConfig(command: ConfigEnv['command']): UserConfig {
  if (typeof config !== 'function') throw new Error('Expected a config factory');
  return config({ command, mode: 'test' });
}

it.each(['build', 'serve'] as const)('provides site globals and plugins for %s', command => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2026-10-03T10:00:00Z'));
  const result = resolveConfig(command);
  expect(result.mode).toBe(command === 'build' ? 'production' : 'development');
  expect(result.define?.SITE_IS_PROD).toBe(JSON.stringify(command === 'build'));
  expect(result.define?.SITE_IS_DEV).toBe(JSON.stringify(command === 'serve'));
  expect(result.define?.SITE_LAST_BUILD).toBe(JSON.stringify('Sat, 03 Oct 2026 10:00:00 GMT'));
  expect(result.define?.SITE_URL).toBe(JSON.stringify('https://simbo.de/'));
  expect(result.plugins).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ name: 'nunjucks' }),
      expect.objectContaining({ name: 'html-minifier' }),
    ]),
  );
  expect(result.root).toBe('src');
  expect(result.publicDir).toBe('public');
  expect(result.build?.outDir).toBe('../dist');
  expect(result.build?.emptyOutDir).toBe(true);
  expect(result.build?.sourcemap).toBe(true);
});
