export enum ColorThemeValue {
  Light = 'light',
  Dark = 'dark'
}

const DEFAULT_COLOR_THEME_VALUE = ColorThemeValue.Light;
const COLOR_THEME_STORAGE_KEY = 'color-theme';

function userPrefersColorScheme(scheme: 'light' | 'dark'): boolean {
  return window.matchMedia(`(prefers-color-scheme: ${scheme})`).matches;
}

function setTheme(theme?: string): void {
  const themeValues = Object.values(ColorThemeValue);
  if (!themeValues.includes(theme as ColorThemeValue)) {
    return;
  }
  document.documentElement.dataset.colorTheme = theme;
  window.localStorage.setItem(COLOR_THEME_STORAGE_KEY, theme as string);
}

export const ColorTheme = {
  initialize(): void {
    const storedTheme = window.localStorage.getItem(COLOR_THEME_STORAGE_KEY);
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
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', ({ matches }) => setTheme(matches ? ColorThemeValue.Dark : ColorThemeValue.Light));
  },

  toggle(): void {
    setTheme(
      document.documentElement.dataset.colorTheme === ColorThemeValue.Dark
        ? ColorThemeValue.Light
        : ColorThemeValue.Dark
    );
  },

  get theme(): string {
    return (document.documentElement.dataset.colorTheme as ColorThemeValue) || DEFAULT_COLOR_THEME_VALUE;
  },

  set theme(theme: string) {
    setTheme(theme);
  }
};
