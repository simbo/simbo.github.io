export enum ColorThemeValue {
  Light = 'light',
  Dark = 'dark',
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
 * Checks whether a value is a supported theme name.
 *
 * @param theme - Value to check.
 * @returns Whether the value is `light` or `dark`.
 */
function isColorTheme(theme?: string | null): theme is ColorThemeValue {
  return theme === ColorThemeValue.Light || theme === ColorThemeValue.Dark;
}

/**
 * Reads the theme the user chose explicitly. Blocked storage counts as no choice.
 *
 * @returns The saved theme, or undefined if none is saved or storage is unavailable.
 */
function getStoredTheme(): ColorThemeValue | undefined {
  try {
    const storedTheme = globalThis.localStorage.getItem(COLOR_THEME_STORAGE_KEY);
    return isColorTheme(storedTheme) ? storedTheme : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Returns the theme preferred by the operating system, falling back to the default.
 *
 * @returns The system's preferred theme.
 */
function getSystemTheme(): ColorThemeValue {
  if (userPrefersColorScheme(ColorThemeValue.Dark)) return ColorThemeValue.Dark;
  return userPrefersColorScheme(ColorThemeValue.Light) ? ColorThemeValue.Light : DEFAULT_COLOR_THEME_VALUE;
}

/**
 * Applies a theme to the document without saving it.
 *
 * @param theme - Supported theme name to apply.
 */
function applyTheme(theme: ColorThemeValue): void {
  globalThis.document.documentElement.dataset.colorTheme = theme;
}

/**
 * Applies a theme the user chose explicitly and saves it in local storage.
 * Missing or unsupported theme values are ignored, and blocked storage only skips saving.
 *
 * @param theme - Theme name to apply; only `light` and `dark` are accepted.
 */
function chooseTheme(theme?: string): void {
  if (!isColorTheme(theme)) {
    return;
  }
  applyTheme(theme);
  try {
    globalThis.localStorage.setItem(COLOR_THEME_STORAGE_KEY, theme);
  } catch {
    // The choice still applies to the current page.
  }
}

export const ColorTheme = {
  /**
   * Applies the saved theme or, without a saved choice, follows the system preference
   * without saving anything.
   */
  initialize(): void {
    applyTheme(getStoredTheme() ?? getSystemTheme());
    globalThis.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => {
      if (getStoredTheme()) return;
      applyTheme(matches ? ColorThemeValue.Dark : ColorThemeValue.Light);
    });
  },

  toggle(): void {
    chooseTheme(
      globalThis.document.documentElement.dataset.colorTheme === ColorThemeValue.Dark
        ? ColorThemeValue.Light
        : ColorThemeValue.Dark,
    );
  },

  get theme(): string {
    return globalThis.document.documentElement.dataset.colorTheme ?? DEFAULT_COLOR_THEME_VALUE;
  },

  set theme(theme: string) {
    chooseTheme(theme);
  },
};
