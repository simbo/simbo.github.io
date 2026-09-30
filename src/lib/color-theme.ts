export enum ColorThemeValue {
  Light = 'light',
  Dark = 'dark'
}

const DEFAULT_COLOR_THEME_VALUE = ColorThemeValue.Light;
const COLOR_THEME_STORAGE_KEY = 'color-theme';

/**
 * Checks whether the operating system currently prefers the requested color scheme.
 *
 * @param scheme - The light or dark color scheme to query.
 * @returns Whether the corresponding prefers-color-scheme media query matches.
 */
function userPrefersColorScheme(scheme: 'light' | 'dark'): boolean {
  return globalThis.matchMedia(`(prefers-color-scheme: ${scheme})`).matches;
}

/**
 * Applies a supported theme to the document and saves it in local storage.
 * Missing or unsupported theme values are ignored.
 *
 * @param theme - Theme name to apply; only `light` and `dark` are accepted.
 */
function setTheme(theme?: string): void {
  const themeValues = Object.values(ColorThemeValue);
  if (!themeValues.includes(theme as ColorThemeValue)) {
    return;
  }
  globalThis.document.documentElement.dataset.colorTheme = theme;
  globalThis.localStorage.setItem(COLOR_THEME_STORAGE_KEY, theme as string);
}

export const ColorTheme = {
  initialize(): void {
    const storedTheme = globalThis.localStorage.getItem(COLOR_THEME_STORAGE_KEY);
    let theme: string | undefined;
    if (storedTheme) {
      theme = storedTheme;
    } else if (userPrefersColorScheme(ColorThemeValue.Dark)) {
      theme = ColorThemeValue.Dark;
    } else if (userPrefersColorScheme(ColorThemeValue.Light)) {
      theme = ColorThemeValue.Light;
    } else {
      theme = DEFAULT_COLOR_THEME_VALUE;
    }
    setTheme(theme);
    globalThis.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => {
      setTheme(matches ? ColorThemeValue.Dark : ColorThemeValue.Light);
    });
  },

  toggle(): void {
    setTheme(
      globalThis.document.documentElement.dataset.colorTheme === ColorThemeValue.Dark
        ? ColorThemeValue.Light
        : ColorThemeValue.Dark
    );
  },

  get theme(): string {
    return (
      (globalThis.document.documentElement.dataset.colorTheme as ColorThemeValue | undefined) ??
      DEFAULT_COLOR_THEME_VALUE
    );
  },

  set theme(theme: string) {
    setTheme(theme);
  }
};
