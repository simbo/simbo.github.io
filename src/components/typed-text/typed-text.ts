interface Step {
  pauseDuration: number;
  output: string;
  stopAfterwards?: boolean;
}

export const STOPPED_TYPING_EVENT_NAME = 'stopped-typing';

const DEFAULT_TYPE_DELAY = 23;

const RX_CODE_SPAN = /<span\s+code="(\d+|stop)"[^>]*><\/span>/gi;
const RX_CODE = /^\^(\d+|stop)/i;
const RX_BREAK = /^<br\s*\/?>/i;

export class TypedText extends HTMLElement {
  // queue of text/html strings to set as innerHtml
  private steps: Step[] = [];

  // next output queue index
  private nextStep = 0;

  // base pause duration between each typed character
  private typeDelay!: number;

  // timeout reference for pause timeout
  private typeTimeout = 0;

  public constructor() {
    super();
  }

  public connectedCallback(): void {
    this.typeDelay = Number.parseInt(this.getAttribute('type-delay') || '0', 10) || DEFAULT_TYPE_DELAY;
    const content = this.innerHTML;
    this.innerHTML = '';
    this.queueContent(content);
    this.startTyping();
  }

  public startTyping(): void {
    this.type();
  }

  public queueContent(content: string): void {
    content = content
      .split(/[\n\r]+/g)
      .map(line => line.trim())
      .join('')
      .replaceAll(RX_CODE_SPAN, (_match, code) => `^${code}`);

    let output = this.steps.at(-1)?.output || '';
    let pauseDuration = 0;
    let stopAfterwards = false;

    const shiftContent = (start: number): void => {
      content = content.slice(start);
    };

    const shiftToOutput = (length: number): void => {
      output += content.slice(0, length);
      shiftContent(length);
    };

    const addStep = () => {
      const step: Step = { pauseDuration, output };
      if (stopAfterwards) {
        step.stopAfterwards = stopAfterwards;
      }
      this.steps.push(step);
      pauseDuration = 0;
      stopAfterwards = false;
    };

    while (content.length > 0) {
      const nextChar = content.charAt(0);
      let codeMatch: RegExpMatchArray | null = null;
      let delimiterPosition: number;
      if (nextChar === '^' && (codeMatch = content.match(RX_CODE))) {
        if (codeMatch[0].toLowerCase() === '^stop') {
          stopAfterwards = true;
        } else {
          pauseDuration += Number.parseInt(codeMatch[0].slice(1), 10);
        }
        shiftContent(codeMatch[0].length);
      } else if (nextChar === '<') {
        let breakMatch: RegExpMatchArray | null = null;
        if ((breakMatch = content.match(RX_BREAK))) {
          shiftToOutput(breakMatch[0].length);
          addStep();
        } else if ((delimiterPosition = content.indexOf('>')) >= 0) {
          shiftToOutput(delimiterPosition + 1);
        }
      } else if (nextChar === '&' && (delimiterPosition = content.indexOf(';')) >= 0) {
        shiftToOutput(delimiterPosition + 1);
      } else {
        shiftToOutput(1);
        addStep();
      }
    }
  }

  private type(): void {
    const step = this.steps[this.nextStep];
    this.setTimeout(() => {
      this.innerHTML = step.output;
      this.nextStep++;
      if (!step.stopAfterwards && this.nextStep < this.steps.length) {
        this.setTimeout(() => this.type(), this.humanizedDelay);
      } else {
        this.clearTimeout();
        this.dispatchEvent(new CustomEvent(STOPPED_TYPING_EVENT_NAME));
      }
    }, step.pauseDuration);
  }

  private get humanizedDelay(): number {
    return (Math.random() * this.typeDelay - Math.random() * this.typeDelay) / 2 + this.typeDelay;
  }

  private setTimeout(callback: () => void, duration = 0): void {
    this.typeTimeout = window.setTimeout(callback, duration);
  }

  private clearTimeout(): void {
    if (this.typeTimeout) {
      window.clearTimeout(this.typeTimeout);
    }
  }
}
