import { expect, it, vi } from 'vitest';

import { createPrompt, runModule } from '../../../../tests/command-module.js';

import module from './type.js';

function setup(isTyping = false, typingDone = false) {
  const element = globalThis.document.createElement('typed-text');
  const state = {
    isTyping,
    typingDone,
    startTyping: vi.fn(),
    stopTyping: vi.fn(),
    restartTyping: vi.fn(),
    resetTyping: vi.fn(),
  };
  Object.assign(element, state);
  globalThis.document.body.append(element);
  return state;
}
it.each([
  ['START', 'startTyping', 'typing started'],
  ['stop', 'stopTyping', 'typing stopped'],
  ['restart', 'restartTyping', 'typing restarted'],
  ['reset', 'resetTyping', 'typing resetted'],
])('handles %s', async (action, method, output) => {
  const state = setup(action === 'stop');
  const prompt = createPrompt();
  await runModule(module, prompt, { inputs: [action], options: {} });
  expect(state[method as 'startTyping']).toHaveBeenCalledOnce();
  expect(prompt.outputText).toHaveBeenCalledWith(output);
});
it.each([true, false])('reports status when typing is %s', async isTyping => {
  setup(isTyping);
  const prompt = createPrompt();
  await runModule(module, prompt);
  await runModule(module, prompt, { inputs: ['status'], options: {} });
  expect(prompt.outputText).toHaveBeenCalledWith(isTyping ? 'typing is in progress' : 'typing has stopped');
});
it.each([
  ['start', true, false, 'already in progress'],
  ['start', false, true, 'nothing more'],
  ['stop', false, false, 'already stopped'],
  ['invalid', false, false, 'unknown input'],
])('rejects invalid state for %s', async (action, typing, done, error) => {
  setup(typing, done);
  await expect(runModule(module, createPrompt(), { inputs: [action], options: {} })).rejects.toThrow(error);
});
