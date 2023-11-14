import { ColorTheme, ColorThemeValue } from '../../lib/color-theme';
import { ICON_NAME_ATTRIBUTE, SvgIcon } from '../svg-icon/svg-icon';

export class ColorThemeToggle extends HTMLElement {
  private svgIcon!: SvgIcon;

  public connectedCallback(): void {
    const button = document.createElement('button') as HTMLButtonElement;
    button.addEventListener('click', (event: Event) => {
      event.preventDefault();
      ColorTheme.toggle();
    });

    this.svgIcon = document.createElement('svg-icon') as SvgIcon;
    this.svgIcon.classList.add('as-block');

    this.setIconNameByColorTheme();

    const observer = new MutationObserver(() => this.setIconNameByColorTheme());
    observer.observe(document.documentElement, {
      attributeFilter: ['data-color-theme']
    });

    this.append(button);
    button.append(this.svgIcon);
  }

  private setIconNameByColorTheme(): void {
    const colorTheme = document.documentElement.dataset.colorTheme as string;
    const iconName = {
      [ColorThemeValue.Light]: 'moon',
      [ColorThemeValue.Dark]: 'sun'
    }[colorTheme];
    if (iconName && iconName.length > 0) {
      this.svgIcon.setAttribute(ICON_NAME_ATTRIBUTE, iconName as string);
    }
  }
}
