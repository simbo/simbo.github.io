import { expect, it } from 'vitest';

it('initializes the legal pages and keeps the current section when switching the language', async () => {
  const link = globalThis.document.createElement('a');
  link.href = '/privacy/en/';
  link.dataset.keepHash = '';
  link.addEventListener('click', event => {
    event.preventDefault();
  });
  globalThis.document.body.append(link, globalThis.document.createElement('color-theme-toggle'));
  globalThis.location.hash = '#analytics';
  await import('../src/legal.js');
  expect(globalThis.document.documentElement.dataset.colorTheme).toBe('light');
  link.click();
  const target = new URL(link.href);
  expect(`${target.pathname}${target.hash}`).toBe('/privacy/en/#analytics');
  const themeButton = globalThis.document.querySelector('color-theme-toggle button') as HTMLButtonElement;
  themeButton.click();
  expect(globalThis.document.documentElement.dataset.colorTheme).toBe('dark');
});
