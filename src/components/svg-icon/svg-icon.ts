const SVG_ICON_CACHE = new Map<string, string>();

export const ICON_NAME_ATTRIBUTE = 'icon-name';
export class SvgIcon extends HTMLElement {
  public static observedAttributes = [ICON_NAME_ATTRIBUTE];

  public constructor() {
    super();
  }

  public attributeChangedCallback(attribute: string, _oldValue: string, value: string): void {
    if (attribute === ICON_NAME_ATTRIBUTE) {
      this.setIcon(value);
    }
  }

  private setIcon(iconName: string): void {
    if (typeof iconName !== 'string' || iconName.length === 0) {
      return;
    }
    this.getIcon(iconName)
      .then(svg => {
        // eslint-disable-next-line unicorn/no-unsafe-dom-html -- SVG markup comes from local icon modules maintained in this repository.
        this.innerHTML = svg;
      })
      .catch((error: unknown) => {
        console.error(error);
      });
  }

  private async getIcon(iconName: string): Promise<string> {
    if (!SVG_ICON_CACHE.has(iconName)) {
      const { default: importedIcon } = (await import(`./svg-icons/${iconName}.ts`)) as { default: string };
      SVG_ICON_CACHE.set(iconName, importedIcon);
    }
    const icon = SVG_ICON_CACHE.get(iconName) as string;
    return icon;
  }
}
