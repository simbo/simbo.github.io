import { expect, it, vi } from 'vitest';

import { renderSection, renderUsageExamples } from './render-output.js';

it('renders sections and examples with HTML intact', () => {
  expect(renderSection('title', ' <b>body</b>')).toBe('<span class="dim">title:</span> <b>body</b>');
  expect(renderUsageExamples('echo')).toBe('<span class="dim">usage:</span><br>  <span class="yellow">echo</span>');
  expect(renderUsageExamples(['one', 'two'])).toContain('</span><br>  <span class="yellow">two</span>');
});
it('omits missing examples and supports an output callback', () => {
  for (const value of [undefined, '', []]) expect(renderUsageExamples(value)).toBeUndefined();
  const handler = vi.fn();
  renderUsageExamples('echo', handler);
  expect(handler).toHaveBeenCalledWith(renderUsageExamples('echo'));
});
