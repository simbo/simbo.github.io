import './command-prompt.scss';

import type { CommandOutput } from './command-prompt.types.js';
import { getCommandModule } from './commands.js';
import { CommandHistory } from './lib/command-history.js';
import { parseParameters } from './lib/parse-parameters.js';

const COMMAND_IN_PROGRESS_CLASSNAME = 'command-in-progress';

let ID_COUNTER = 0;

export class CommandPrompt extends HTMLElement {
  private readonly outputsElement = globalThis.document.createElement('div');
  private readonly promptElement = globalThis.document.createElement('div');
  private readonly labelElement = globalThis.document.createElement('label');
  private readonly inputElement = globalThis.document.createElement('input');
  private readonly history = new CommandHistory();
  private readonly inputId = `prompt-input${++ID_COUNTER}`;

  public constructor() {
    super();
  }

  public get commandIsInProgress(): boolean {
    return this.classList.contains(COMMAND_IN_PROGRESS_CLASSNAME);
  }

  public connectedCallback(): void {
    this.outputsElement.classList.add('outputs');
    this.promptElement.classList.add('prompt');
    this.labelElement.classList.add('prompt-label');
    this.labelElement.setAttribute('for', this.inputId);

    this.inputElement.classList.add('prompt-input');
    this.inputElement.id = this.inputId;
    this.inputElement.type = 'text';
    this.inputElement.addEventListener('keypress', event => {
      this.onPromptKeyPress(event);
    });
    this.inputElement.addEventListener('keydown', event => {
      this.onPromptKeyDown(event);
    });

    this.append(this.outputsElement);
    this.promptElement.append(this.labelElement);
    this.promptElement.append(this.inputElement);
    this.append(this.promptElement);
  }

  public outputText(content: string): void {
    this.addOutput({ type: 'text', content });
  }

  public outputError(error: unknown): void {
    this.addOutput({ type: 'error', content: String((error as Error).message || error) });
  }

  public clearOutput(): void {
    this.outputsElement.replaceChildren();
  }

  private addOutput({ type, content }: CommandOutput): void {
    const outputElement = globalThis.document.createElement('div');
    outputElement.classList.add('output', `is-${type}`);
    // eslint-disable-next-line unicorn/no-unsafe-dom-html -- Command output intentionally renders HTML; command handlers must escape user input.
    if (type === 'text') outputElement.innerHTML = content;
    else if (type === 'command') {
      const command = globalThis.document.createElement('span');
      command.classList.add('command-input');
      command.textContent = content;
      outputElement.append(command);
    } else outputElement.textContent = content;
    this.outputsElement.append(outputElement);
    this.inputElement.scrollIntoView();
  }

  private onPromptKeyPress(event: KeyboardEvent): void {
    if (event.key !== 'Enter') {
      return;
    }

    event.preventDefault();
    if (this.commandIsInProgress) return;
    const command = this.inputElement.value;
    this.inputElement.value = '';
    this.parseInput(command);
  }

  private onPromptKeyDown(event: KeyboardEvent): void {
    if (!(event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
      return;
    }

    const command = event.key === 'ArrowUp' ? this.history.backward() : this.history.forward();
    if (typeof command !== 'string') {
      return;
    }

    event.preventDefault();
    this.inputElement.value = command;
  }

  private parseInput(input: string): void {
    input = input.trim();
    let commandLength = input.search(/\s|$/);
    commandLength = commandLength > 0 ? commandLength : input.length;
    const command = input.slice(0, commandLength);
    if (command.length === 0) return;
    const parameters = input.slice(commandLength).trim();
    this.onCommandStart(input);
    this.runCommand(command, parameters)
      .catch((error: unknown) => {
        this.outputError(error);
      })
      .finally(() => {
        this.onCommandEnd();
      });
  }

  private async runCommand(command: string, parametersString: string): Promise<void> {
    const { handler } = await getCommandModule(command);
    if (typeof handler === 'string') {
      this.outputText(handler);
      return;
    }
    const parameters = parseParameters(parametersString);
    return handler(this, parameters);
  }

  private onCommandStart(input: string): void {
    this.addOutput({ type: 'command', content: input });
    this.history.add(input);
    this.classList.add(COMMAND_IN_PROGRESS_CLASSNAME);
  }

  private onCommandEnd(): void {
    this.classList.remove(COMMAND_IN_PROGRESS_CLASSNAME);
  }
}
