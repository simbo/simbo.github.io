import { expect, it, vi } from 'vitest';

import { SvgIcon } from './svg-icon.js';

globalThis.customElements.define('svg-icon', SvgIcon);

it.each(['moon', 'sun', 'github'])('loads and caches the %s icon', async name => {
  const first = globalThis.document.createElement('svg-icon');
  globalThis.document.body.append(first);
  first.setAttribute('icon-name', name);
  await vi.waitFor(() => {
    expect(first.querySelector('svg')).not.toBeNull();
  });
  const second = globalThis.document.createElement('svg-icon');
  second.setAttribute('icon-name', name);
  await vi.waitFor(() => {
    expect(second.innerHTML).toBe(first.innerHTML);
  });
  expect(first.querySelector('svg')?.getAttribute('viewBox')).toBeTruthy();
});
it('ignores unrelated or empty attributes and reports load failures', async () => {
  const element = globalThis.document.createElement('svg-icon') as SvgIcon;
  element.attributeChangedCallback('other', '', 'sun');
  element.setAttribute('icon-name', '');
  expect(element.innerHTML).toBe('');
  const error = vi.spyOn(console, 'error').mockImplementation(() => {});
  element.setAttribute('icon-name', 'missing');
  await vi.waitFor(() => {
    expect(error).toHaveBeenCalledOnce();
  });
  expect(element.innerHTML).toBe('');
});
