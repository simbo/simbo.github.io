import { expect, it, vi } from 'vitest';

import { createPrompt, runModule } from '../../../../tests/command-module.js';

import module from './maximize.js';

it('reports changed and unchanged layouts', async () => {
  const prompt = createPrompt();
  await runModule(module, prompt);
  await runModule(module, prompt);
  expect(prompt.outputText.mock.calls).toEqual([['terminal view maximized'], ['terminal view is already maximized']]);
});
it('propagates narrow viewport errors', async () => {
  vi.mocked(globalThis.matchMedia).mockReturnValue({ matches: true } as MediaQueryList);
  await expect(runModule(module, createPrompt())).rejects.toThrow('small viewports');
});
