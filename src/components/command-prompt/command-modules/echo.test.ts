import { expect, it } from 'vitest';

import { createPrompt, runModule } from '../../../../tests/command-module.js';

import module from './echo.js';

it('escapes markup and joins positional inputs', async () => {
  const prompt = createPrompt();
  await runModule(module, prompt, { inputs: ['<b>', '&text'], options: { ignored: true } });
  expect(prompt.outputText).toHaveBeenCalledExactlyOnceWith('&lt;b&gt; &amp;text');
});
it('supports empty input', async () => {
  const prompt = createPrompt();
  await runModule(module, prompt);
  expect(prompt.outputText).toHaveBeenCalledWith('');
});
