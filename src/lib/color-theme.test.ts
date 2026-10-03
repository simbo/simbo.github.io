import { describe, expect, it, vi } from 'vitest';

import { ColorTheme } from './color-theme.js';

describe('ColorTheme', () => {
  it('defaults to light and toggles both ways while persisting', () => {
    expect(ColorTheme.theme).toBe('light');
    ColorTheme.toggle();
    expect(ColorTheme.theme).toBe('dark');
    expect(globalThis.localStorage.getItem('color-theme')).toBe('dark');
    ColorTheme.toggle();
    expect(ColorTheme.theme).toBe('light');
  });
  it('ignores unsupported values', () => {
    ColorTheme.theme = 'dark';
    ColorTheme.theme = 'invalid';
    expect(ColorTheme.theme).toBe('dark');
  });
  it.each(['light', 'dark'])('uses saved %s before the system preference', theme => {
    globalThis.localStorage.setItem('color-theme', theme);
    ColorTheme.initialize();
    expect(ColorTheme.theme).toBe(theme);
  });
  it.each(['light', 'dark', 'none'])('initializes with system preference %s', theme => {
    vi.mocked(globalThis.matchMedia).mockImplementation(
      media => ({ matches: media.includes(theme), addEventListener: vi.fn() }) as unknown as MediaQueryList,
    );
    ColorTheme.initialize();
    expect(ColorTheme.theme).toBe(theme === 'dark' ? 'dark' : 'light');
  });
  it('follows system preference changes', () => {
    const listener = vi.fn();
    vi.mocked(globalThis.matchMedia).mockReturnValue({
      matches: false,
      addEventListener: listener,
    } as unknown as MediaQueryList);
    ColorTheme.initialize();
    const change = listener.mock.calls[0][1] as (event: { matches: boolean }) => void;
    change({ matches: true });
    expect(ColorTheme.theme).toBe('dark');
    change({ matches: false });
    expect(ColorTheme.theme).toBe('light');
  });
});
