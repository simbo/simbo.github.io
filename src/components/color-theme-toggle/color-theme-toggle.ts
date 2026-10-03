import { ColorTheme, ColorThemeValue } from '../../lib/color-theme.js';
import { ICON_NAME_ATTRIBUTE, type SvgIcon } from '../svg-icon/svg-icon.js';

export class ColorThemeToggle extends HTMLElement {
  private svgIcon!: SvgIcon;

  public connectedCallback(): void {
    const button = globalThis.document.createElement('button');
    button.setAttribute('title', 'Toggle Color Theme');
    button.addEventListener('click', (event: Event) => {
      event.preventDefault();
      ColorTheme.toggle();
    });

    this.svgIcon = globalThis.document.createElement('svg-icon') as SvgIcon;
    this.svgIcon.classList.add('as-block');

    this.setIconNameByColorTheme();

    const observer = new MutationObserver(() => {
      this.setIconNameByColorTheme();
    });
    observer.observe(globalThis.document.documentElement, {
      attributeFilter: ['data-color-theme'],
    });

    this.append(button);
    button.append(this.svgIcon);
  }

  private setIconNameByColorTheme(): void {
    const iconName = {
      [ColorThemeValue.Light]: 'moon',
      [ColorThemeValue.Dark]: 'sun',
    }[globalThis.document.documentElement.dataset.colorTheme as string];
    if (iconName) {
      this.svgIcon.setAttribute(ICON_NAME_ATTRIBUTE, iconName);
    }
  }
}
