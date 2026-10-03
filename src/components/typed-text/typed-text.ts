import { STARTED_TYPING_EVENT_TYPE, STOPPED_TYPING_EVENT_TYPE, STOPPER_TYPED_EVENT_TYPE } from './typed-text-events.js';

interface Step {
  pauseDuration: number;
  output: string;
  stopAfterwards?: boolean;
}

const DEFAULT_TYPE_DELAY = 23;

const HAS_CURSOR_CLASSNAME = 'has-cursor';

const RX_CODE_SPAN = /<span\s+code="(\d+|stop)"[^>]*><\/span>/gi;
const RX_CODE = /^\^(\d+|stop)/i;
const RX_BREAK = /^<br\s*\/?>/i;

export class TypedText extends HTMLElement {
  // queue of text/html strings to set as innerHtml
  private readonly steps: Step[] = [];

  // next output queue index
  private nextStep = 0;

  // base pause duration between each typed character
  private typeDelay!: number;

  // timeout reference for pause timeout
  private typeTimeout = 0;

  public constructor() {
    super();
  }

  public get isTyping(): boolean {
    return this.typeTimeout !== 0;
  }

  public get typingDone(): boolean {
    return this.steps.length === this.nextStep;
  }

  private get humanizedDelay(): number {
    return (Math.random() * this.typeDelay - Math.random() * this.typeDelay) / 2 + this.typeDelay;
  }

  public connectedCallback(): void {
    this.typeDelay = Math.trunc(Number(this.getAttribute('type-delay'))) || DEFAULT_TYPE_DELAY;
    // const content = this.innerHTML;
    // this.innerHTML = '';
    // this.queueContent(content);
    // this.startTyping();
  }

  public startTyping(): void {
    this.classList.add(HAS_CURSOR_CLASSNAME);
    this.dispatchEvent(new CustomEvent(STARTED_TYPING_EVENT_TYPE));
    this.type();
  }

  public stopTyping(): void {
    this.clearTimeout();
    this.classList.remove(HAS_CURSOR_CLASSNAME);
    this.dispatchEvent(new CustomEvent(STOPPED_TYPING_EVENT_TYPE));
  }

  public resetTyping(): void {
    this.stopTyping();
    this.nextStep = 0;
    this.replaceChildren();
  }

  public restartTyping(): void {
    this.resetTyping();
    this.startTyping();
  }

  public queueContent(content: string): void {
    content = content
      .split(/[\n\r]+/g)
      .map(line => line.trim())
      .join('')
      .replaceAll(RX_CODE_SPAN, (_match, code: string) => `^${code}`);

    let output = this.steps.at(-1)?.output ?? '';
    let pauseDuration = 0;
    let stopAfterwards = false;

    const shiftContent = (start: number): void => {
      content = content.slice(start);
    };

    const shiftToOutput = (length: number): void => {
      output += content.slice(0, length);
      shiftContent(length);
    };

    const addStep = (): void => {
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
      let delimiterPosition: number;
      if (nextChar === '^') {
        const codeMatch: RegExpExecArray | null = RX_CODE.exec(content);
        if (!codeMatch) {
          return;
        }
        if (codeMatch[0].toLowerCase() === '^stop') {
          stopAfterwards = true;
        } else {
          pauseDuration += Number(codeMatch[0].slice(1));
        }
        shiftContent(codeMatch[0].length);
      } else if (nextChar === '<') {
        const breakMatch: RegExpMatchArray | null = RX_BREAK.exec(content);
        if (breakMatch) {
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
      // eslint-disable-next-line unicorn/no-unsafe-dom-html -- Animation steps intentionally render HTML; queueContent must receive trusted markup only.
      this.innerHTML = step.output;
      this.nextStep++;
      if (!step.stopAfterwards && this.nextStep < this.steps.length) {
        this.setTimeout(() => {
          this.type();
        }, this.humanizedDelay);
      } else {
        if (step.stopAfterwards) {
          this.dispatchEvent(new CustomEvent(STOPPER_TYPED_EVENT_TYPE));
        }
        this.stopTyping();
      }
    }, step.pauseDuration);
  }

  private setTimeout(callback: () => void, duration = 0): void {
    this.typeTimeout = globalThis.window.setTimeout(callback, duration);
  }

  private clearTimeout(): void {
    if (!this.typeTimeout) {
      return;
    }

    globalThis.clearTimeout(this.typeTimeout);
    this.typeTimeout = 0;
  }
}
