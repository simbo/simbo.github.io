import { vi } from 'vitest';

import type { CommandPrompt } from '../src/components/command-prompt/command-prompt.js';
import type { CommandModule } from '../src/components/command-prompt/command-prompt.types.js';
import type { ParsedParameters } from '../src/components/command-prompt/lib/parse-parameters.js';

export function createPrompt() {
  return { outputText: vi.fn(), clearOutput: vi.fn() };
}

export async function runModule(
  module: CommandModule,
  prompt: ReturnType<typeof createPrompt>,
  parameters: ParsedParameters = { inputs: [], options: {} },
) {
  if (typeof module.handler === 'string') {
    prompt.outputText(module.handler);
    return;
  }
  return module.handler(prompt as unknown as CommandPrompt, parameters);
}
