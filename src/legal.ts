import './legal.scss';

import { ColorTheme } from './lib/color-theme.js';
import { eventSubscribe } from './lib/event-subscribe.js';

ColorTheme.initialize();

// Keep the current section when switching to the other language.
for (const link of globalThis.document.querySelectorAll<HTMLAnchorElement>('a[data-keep-hash]')) {
  eventSubscribe(link, 'click', () => {
    link.hash = globalThis.location.hash;
  });
}

const svgIconModule = await import('./components/svg-icon/svg-icon.js');
globalThis.customElements.define('svg-icon', svgIconModule.SvgIcon);

const colorThemeToggleModule = await import('./components/color-theme-toggle/color-theme-toggle.js');
globalThis.customElements.define('color-theme-toggle', colorThemeToggleModule.ColorThemeToggle);
