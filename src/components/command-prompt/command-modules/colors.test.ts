import { expect, it } from 'vitest';

import { createPrompt, runModule } from '../../../../tests/command-module.js';

import module from './colors.js';

it('renders every supported color with a matching sample', async () => {
  const prompt = createPrompt();
  await runModule(module, prompt);
  const output = prompt.outputText.mock.calls[0][0] as string;
  for (const color of ['black', 'blue', 'green', 'red', 'magenta', 'yellow', 'orange', 'white', 'dim']) {
    expect(output).toContain(`class="bg-${color}"`);
    expect(output).toContain(`class="${color}">${color}</span>`);
  }
});
