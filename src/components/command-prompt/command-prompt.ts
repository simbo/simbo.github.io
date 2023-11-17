import { parseParameters } from '../../lib/parse-parameters';

import { getCommandHandler } from './command-handlers';
import { CommandHistory } from './command-history';
import { CommandOutput } from './command-prompt.types';

let ID_COUNTER = 0;

export class CommandPrompt extends HTMLElement {
  private readonly promptElement = document.createElement('div');
  private readonly labelElement = document.createElement('label');
  private readonly inputElement = document.createElement('input');
  public readonly outputsElement = document.createElement('div');
  private readonly history = new CommandHistory();
  private readonly inputId = `prompt-input${++ID_COUNTER}`;

  public constructor() {
    super();
  }

  public connectedCallback(): void {
    this.promptElement.classList.add('prompt');
    this.labelElement.classList.add('prompt-label');
    this.labelElement.setAttribute('for', this.inputId);

    this.inputElement.classList.add('prompt-input');
    this.inputElement.id = this.inputId;
    this.inputElement.type = 'text';
    this.inputElement.addEventListener('keypress', event => this.onPromptKeyPress(event));
    this.inputElement.addEventListener('keydown', event => this.onPromptKeyDown(event));

    this.append(this.outputsElement);
    this.promptElement.append(this.labelElement);
    this.promptElement.append(this.inputElement);
    this.append(this.promptElement);
  }

  public outputText(content: string) {
    this.addOutput({ type: 'text', content });
  }

  private addOutput({ type, content }: CommandOutput): void {
    const outputElement = document.createElement('div');
    outputElement.classList.add('output', `is-${type}`);
    if (type === 'text') outputElement.innerHTML = content;
    else outputElement.textContent = content;
    this.outputsElement.append(outputElement);
    this.inputElement.scrollIntoView();
  }

  private onPromptKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      const command = this.inputElement.value;
      this.inputElement.value = '';
      this.parseInput(command);
    }
  }

  private onPromptKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      let command: string | undefined;
      if (event.key === 'ArrowUp') {
        command = this.history.backward();
      } else if (event.key === 'ArrowDown') {
        command = this.history.forward();
      }
      if (typeof command === 'string') {
        event.preventDefault();
        this.inputElement.value = command;
      }
    }
  }

  private parseInput(input: string): void {
    input = input.trim();
    let commandLength = input.search(/\s|$/);
    commandLength = commandLength > 0 ? commandLength : input.length;
    const command = input.slice(0, commandLength);
    if (command.length === 0) return;
    const parameters = input.slice(commandLength).trim();
    this.runCommand(command, parameters).catch(error =>
      this.addOutput({ type: 'error', content: `${error.message || error}` })
    );
  }

  private async runCommand(command: string, parametersString: string): Promise<void> {
    const parameters = parseParameters(parametersString);
    const input = `${command}${parametersString.length > 0 ? ` ${parametersString}` : ''}`;
    this.addOutput({
      type: 'command',
      content: input
    });
    this.history.add(input);
    const handler = await getCommandHandler(command);
    if (typeof handler === 'string') return this.outputText(handler);
    return handler(this, parameters);
  }
}
