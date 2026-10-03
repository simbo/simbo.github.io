import { expect, it, vi } from 'vitest';

import { ColorTheme } from '../../lib/color-theme.js';

import { ColorThemeToggle } from './color-theme-toggle.js';

globalThis.customElements.define('color-theme-toggle', ColorThemeToggle);

it('offers an accessible toggle and follows theme mutations', async () => {
  ColorTheme.theme = 'light';
  const element = globalThis.document.createElement('color-theme-toggle');
  globalThis.document.body.append(element);
  const button = element.querySelector('button') as HTMLButtonElement;
  const icon = element.querySelector('svg-icon');
  expect(button.title).toBe('Toggle Color Theme');
  expect(icon?.getAttribute('icon-name')).toBe('moon');
  button.click();
  expect(ColorTheme.theme).toBe('dark');
  await vi.waitFor(() => {
    expect(icon?.getAttribute('icon-name')).toBe('sun');
  });
  ColorTheme.theme = 'light';
  await vi.waitFor(() => {
    expect(icon?.getAttribute('icon-name')).toBe('moon');
  });
});
it('does not assign an icon for an unsupported theme', () => {
  globalThis.document.documentElement.dataset.colorTheme = 'unknown';
  const element = globalThis.document.createElement('color-theme-toggle');
  globalThis.document.body.append(element);
  expect(element.querySelector('svg-icon')?.hasAttribute('icon-name')).toBe(false);
});
