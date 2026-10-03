import { expect, it, vi } from 'vitest';

import { CommandPrompt } from './command-prompt.js';

globalThis.customElements.define('command-prompt', CommandPrompt);

function create() {
  const prompt = globalThis.document.createElement('command-prompt') as CommandPrompt;
  globalThis.document.body.append(prompt);
  const input = prompt.querySelector('input') as HTMLInputElement;
  return { prompt, input };
}

async function submit(prompt: CommandPrompt, input: HTMLInputElement, value: string) {
  input.value = value;
  input.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter', cancelable: true }));
  await vi.waitFor(() => {
    expect(prompt.commandIsInProgress).toBe(false);
  });
}
it('creates unique input IDs with associated labels', () => {
  const first = create();
  const second = create();
  expect(first.input.id).not.toBe(second.input.id);
  expect(first.prompt.querySelector('label')?.htmlFor).toBe(first.input.id);
});
it('renders trusted output, displays errors as text, and clears output', () => {
  const { prompt } = create();
  prompt.outputText('<b>hello</b>');
  expect(prompt.querySelector('b')?.textContent).toBe('hello');
  prompt.outputError(new Error('<img src=x>'));
  prompt.outputError('plain');
  expect(prompt.querySelector('.is-error')?.textContent).toBe('<img src=x>');
  expect(prompt.querySelector('img')).toBeNull();
  prompt.clearOutput();
  expect(prompt.querySelector('.outputs')?.childElementCount).toBe(0);
});
it('runs commands with quoted parameters, aliases, and escaped output', async () => {
  const { prompt, input } = create();
  await submit(prompt, input, '  print "<b>hello</b>" world  ');
  expect(prompt.querySelector('.is-command')?.textContent).toBe('print "<b>hello</b>" world');
  expect(prompt.querySelector('.is-text')?.textContent).toBe('<b>hello</b> world');
  expect(prompt.querySelector('b')).toBeNull();
  expect(input.value).toBe('');
  await submit(prompt, input, 'foo');
  expect(prompt.querySelector('.is-text:last-child')?.textContent).toBe('bar');
});
it('reports command failures and releases the progress state', async () => {
  const { prompt, input } = create();
  await submit(prompt, input, '<script>');
  expect(prompt.querySelector('.is-error')?.textContent).toContain('invalid command');
  expect(prompt.querySelector('script')).toBeNull();
  await submit(prompt, input, 'missing');
  expect(prompt.querySelector('.is-error:last-child')?.textContent).toBe('unknown command: missing');
});
it('ignores empty input, unrelated keys, and submission while busy', async () => {
  const { prompt, input } = create();
  await submit(prompt, input, '  ');
  expect(prompt.querySelector('.outputs')?.childElementCount).toBe(0);
  input.value = 'echo';
  input.dispatchEvent(new KeyboardEvent('keypress', { key: 'x' }));
  expect(input.value).toBe('echo');
  prompt.classList.add('command-in-progress');
  input.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
  expect(input.value).toBe('echo');
  expect(prompt.querySelector('.outputs')?.childElementCount).toBe(0);
});
it('navigates command history using arrow keys and respects boundaries', async () => {
  const { prompt, input } = create();
  await submit(prompt, input, 'foo');
  await submit(prompt, input, 'test');
  const key = (value: string) => {
    input.dispatchEvent(new KeyboardEvent('keydown', { key: value, cancelable: true }));
  };
  key('ArrowUp');
  expect(input.value).toBe('test');
  key('ArrowUp');
  expect(input.value).toBe('foo');
  key('ArrowUp');
  expect(input.value).toBe('foo');
  key('ArrowDown');
  expect(input.value).toBe('test');
  key('ArrowDown');
  expect(input.value).toBe('');
  key('ArrowDown');
  key('Escape');
  expect(input.value).toBe('');
});
