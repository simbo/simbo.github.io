import { expect, it, vi } from 'vitest';

import { createPrompt, runModule } from '../../../../tests/command-module.js';

import module from './reload.js';

it('reloads the current page', async () => {
  const reload = vi.fn();
  vi.stubGlobal('location', { reload });
  await runModule(module, createPrompt());
  expect(reload).toHaveBeenCalledOnce();
});
