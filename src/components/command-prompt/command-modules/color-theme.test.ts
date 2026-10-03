import { expect, it } from 'vitest';

import { createPrompt, runModule } from '../../../../tests/command-module.js';

import module from './color-theme.js';

it.each([
  ['', 'light'],
  ['DARK', 'dark'],
  ['light', 'light'],
  ['toggle', 'dark'],
  ['invalid', 'light'],
])('handles %s', async (input, expected) => {
  const prompt = createPrompt();
  await runModule(module, prompt, { inputs: input ? [input] : [], options: {} });
  expect(prompt.outputText).toHaveBeenCalledWith(`current color theme: ${expected}`);
  expect(globalThis.document.documentElement.dataset.colorTheme ?? 'light').toBe(expected);
});
