import { expect, it, vi } from 'vitest';

import { createPrompt, runModule } from '../../../../tests/command-module.js';

import module from './clear.js';

it.each<Record<string, boolean>>([{ a: true }, { all: true }, {}])(
  'clears output and optionally resets typing: %j',
  async options => {
    const typedText = globalThis.document.createElement('typed-text');
    const resetTyping = vi.fn();
    Object.assign(typedText, { resetTyping });
    globalThis.document.body.append(typedText);
    const prompt = createPrompt();
    await runModule(module, prompt, { inputs: [], options });
    expect(prompt.clearOutput).toHaveBeenCalledTimes(1);
    expect(resetTyping).toHaveBeenCalledTimes(Object.keys(options).length > 0 ? 1 : 0);
  },
);
it('accepts all as a positional input', async () => {
  const typedText = globalThis.document.createElement('typed-text');
  const resetTyping = vi.fn();
  Object.assign(typedText, { resetTyping });
  globalThis.document.body.append(typedText);
  await runModule(module, createPrompt(), { inputs: ['all'], options: {} });
  expect(resetTyping).toHaveBeenCalledOnce();
});
