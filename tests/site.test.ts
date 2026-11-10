import { expect, it, vi } from 'vitest';

it('initializes the site and connects typing, continuation, commands, and theme controls', async () => {
  vi.useFakeTimers();
  // The initial element has not been upgraded to the custom element yet.
  const element = globalThis.document.createElement('typed-text');
  element.innerHTML = 'Hello^stop<button>continue</button>~ simbo^stop!';
  const main = globalThis.document.createElement('main');
  main.className = 'main is-loading';
  main.append(element, globalThis.document.createElement('command-prompt'));
  globalThis.document.body.append(main, globalThis.document.createElement('color-theme-toggle'));
  await import('../src/index.js');
  // The terminal becomes visible as soon as the script has taken over its raw content.
  expect(main.classList.contains('is-loading')).toBe(false);
  expect(globalThis.document.documentElement.dataset.colorTheme).toBe('light');
  await vi.waitFor(() => {
    expect(globalThis.customElements.get('command-prompt')).toBeDefined();
  });
  vi.runAllTimers();
  expect(element.classList.contains('has-initial-content')).toBe(true);
  const button = element.querySelector('button') as HTMLButtonElement;
  expect(button).not.toBeNull();
  button.click();
  vi.runAllTimers();
  // A later typing start transitions the initial terminal to its additional content layout.
  element.dispatchEvent(new CustomEvent('started-typing'));
  expect(element.classList.contains('has-additional-content')).toBe(true);
  expect(element.classList.contains('has-initial-content')).toBe(false);
  const themeButton = globalThis.document.querySelector('color-theme-toggle button') as HTMLButtonElement;
  themeButton.click();
  expect(globalThis.document.documentElement.dataset.colorTheme).toBe('dark');
  const input = globalThis.document.querySelector('command-prompt input') as HTMLInputElement;
  input.value = 'echo "<unsafe>"';
  input.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
  await vi.waitFor(() => {
    expect(globalThis.document.querySelector('.is-text')?.textContent).toBe('<unsafe>');
  });
  expect(globalThis.document.querySelector('unsafe')).toBeNull();
});
