import { expect, it } from 'vitest';

import { createPrompt, runModule } from '../../../../tests/command-module.js';

import module from './version.js';

it('outputs the configured site version', async () => {
  const prompt = createPrompt();
  await runModule(module, prompt);
  expect(prompt.outputText).toHaveBeenCalledExactlyOnceWith(`v${SITE_VERSION}`);
});
