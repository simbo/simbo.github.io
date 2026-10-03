import { expect, it, vi } from 'vitest';

import { createPrompt, runModule } from '../../../../tests/command-module.js';

import module from './hello.js';

it('greets in English first and uses random greetings afterwards', async () => {
  const prompt = createPrompt();
  vi.spyOn(Math, 'random').mockReturnValue(1);
  await runModule(module, prompt);
  await runModule(module, prompt);
  expect(prompt.outputText.mock.calls).toEqual([['Hello!'], ['Olá!']]);
});
