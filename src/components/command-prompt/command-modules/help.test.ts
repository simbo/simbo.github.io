import { expect, it } from 'vitest';

import { createPrompt, runModule } from '../../../../tests/command-module.js';

import module from './help.js';

it('points users to command listings and manuals', async () => {
  const prompt = createPrompt();
  await runModule(module, prompt);
  expect(prompt.outputText.mock.calls[0][0]).toContain('commands');
  expect(prompt.outputText.mock.calls[0][0]).toContain('man &lt;COMMAND&gt;');
});
