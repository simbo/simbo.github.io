import { expect, it } from 'vitest';

import { createPrompt, runModule } from '../../../../tests/command-module.js';

import module from './commands.js';

it('lists public commands, sorted with aliases', async () => {
  const prompt = createPrompt();
  await runModule(module, prompt);
  const output = prompt.outputText.mock.calls[0][0] as string;
  expect(output).toContain('<span class="yellow">clear</span> <span class="dim">cls</span>');
  expect(output.indexOf('clear')).toBeLessThan(output.indexOf('version'));
  expect(output).not.toContain('foo');
});
