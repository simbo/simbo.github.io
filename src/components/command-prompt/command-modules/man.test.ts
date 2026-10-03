import { expect, it } from 'vitest';

import { createPrompt, runModule } from '../../../../tests/command-module.js';

import module from './man.js';

it('defaults to its own manual including examples', async () => {
  const prompt = createPrompt();
  await runModule(module, prompt);
  expect(prompt.outputText.mock.calls[0][0]).toBe('<strong>man</strong>');
  expect(prompt.outputText.mock.calls[2][0]).toContain('man &lt;COMMAND&gt;');
});
it('resolves aliases and renders a string manual', async () => {
  const prompt = createPrompt();
  await runModule(module, prompt, { inputs: ['print'], options: {} });
  expect(prompt.outputText.mock.calls[0][0]).toContain('<strong>echo</strong>');
  expect(prompt.outputText.mock.calls[0][0]).toContain('print');
  expect(prompt.outputText).toHaveBeenCalledWith('outputs inputs');
});
it('renders appended manual sections', async () => {
  const prompt = createPrompt();
  await runModule(module, prompt, { inputs: ['type'], options: {} });
  expect(prompt.outputText.mock.calls.at(-1)?.[0]).toContain('possible actions');
});
it('rejects missing manuals and unknown commands', async () => {
  await expect(runModule(module, createPrompt(), { inputs: ['foo'], options: {} })).rejects.toThrow('no manpage found');
  await expect(runModule(module, createPrompt(), { inputs: ['missing'], options: {} })).rejects.toThrow(
    'unknown command',
  );
});
