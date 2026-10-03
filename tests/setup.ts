import { afterEach, beforeEach, vi } from 'vitest';

beforeEach(() => {
  if (!('document' in globalThis)) return;
  globalThis.document.body.replaceChildren();
  delete globalThis.document.documentElement.dataset.colorTheme;
  globalThis.document.documentElement.className = '';
  globalThis.localStorage.clear();
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((media: string) => ({
      media,
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
  // jsdom does not implement the browser's HTML serialization method.
  Object.defineProperty(Element.prototype, 'getHTML', {
    configurable: true,
    value(this: Element) {
      return this.innerHTML;
    },
  });
  Element.prototype.scrollIntoView = vi.fn();
});

afterEach(() => {
  vi.useRealTimers();
});
