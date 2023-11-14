export enum ColorThemeValue {
  Light = 'light',
  Dark = 'dark'
}

const DEFAULT_COLOR_THEME_VALUE = ColorThemeValue.Light;

function userPrefersColorScheme(scheme: 'light' | 'dark'): boolean {
  return window.matchMedia(`(prefers-color-scheme: ${scheme})`).matches;
}

function initialize(): ColorThemeValue {
  let theme: string | undefined;
  if (userPrefersColorScheme(ColorThemeValue.Dark)) {
    theme = ColorThemeValue.Dark;
  } else if (userPrefersColorScheme(ColorThemeValue.Light)) {
    theme = ColorThemeValue.Light;
  }
  return setTheme(theme);
}

function setTheme(theme?: string): ColorThemeValue {
  const themeValues = Object.values(ColorThemeValue);
  if (typeof theme !== 'string' || !themeValues.includes(theme as ColorThemeValue)) {
    theme = DEFAULT_COLOR_THEME_VALUE;
  }
  document.documentElement.dataset.colorTheme = theme;
  return theme as ColorThemeValue;
}

function toggle(): ColorThemeValue {
  return setTheme(
    document.documentElement.dataset.colorTheme === ColorThemeValue.Dark ? ColorThemeValue.Light : ColorThemeValue.Dark
  );
}

window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', ({ matches }) => setTheme(matches ? ColorThemeValue.Dark : ColorThemeValue.Light));

export const ColorTheme = {
  initialize,
  toggle,
  get theme(): ColorThemeValue {
    return (document.documentElement.dataset.colorTheme as ColorThemeValue) || DEFAULT_COLOR_THEME_VALUE;
  },
  set theme(theme: ColorThemeValue) {
    setTheme(theme);
  }
};
