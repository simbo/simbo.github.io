import { expect, it, vi } from 'vitest';

import { resizeTerminalView } from './resize-terminal-view.js';

it('maximizes and restores only when the layout changes', () => {
  expect(resizeTerminalView('min')).toBe(false);
  expect(resizeTerminalView('max')).toBe(true);
  expect(globalThis.document.documentElement.classList.contains('terminal-maximized')).toBe(true);
  expect(resizeTerminalView('max')).toBe(false);
  expect(resizeTerminalView('min')).toBe(true);
  expect(globalThis.document.documentElement.classList.contains('terminal-maximized')).toBe(false);
});
it.each(['max', 'min'] as const)('rejects %s on narrow screens', target => {
  vi.mocked(globalThis.matchMedia).mockReturnValue({ matches: true } as MediaQueryList);
  expect(() => resizeTerminalView(target)).toThrow('small viewports');
});
