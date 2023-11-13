export class SvgIcon extends HTMLElement {
  public constructor() {
    super();
    const iconName = this.getAttribute('name') as string;
    if (typeof iconName !== 'string' || iconName.length === 0) {
      throw new Error('svg icon name is undefined or empty');
    }
    import(`./svg-icons/${iconName}.ts`).then(({ default: svg }) => {
      this.innerHTML = svg;
    });
  }
}
