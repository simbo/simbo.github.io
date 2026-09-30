const COMMAND_HISTORY_STORAGE_KEY = 'command-history';

export class CommandHistory {
  private readonly history: string[];
  private index = -1;

  public constructor() {
    let history: string[];
    try {
      history = JSON.parse(globalThis.localStorage.getItem(COMMAND_HISTORY_STORAGE_KEY) ?? '[]') as string[];
    } catch {
      history = [];
    }
    this.history = Array.isArray(history) ? history : [];
  }

  public add(command: string): void {
    this.index = -1;
    command = command.trim();
    if (this.history[0] === command) {
      return;
    }

    // eslint-disable-next-line unicorn/no-array-front-mutation
    this.history.unshift(command);
    globalThis.localStorage.setItem(COMMAND_HISTORY_STORAGE_KEY, JSON.stringify(this.history));
  }

  public backward(): string | undefined {
    if (this.index + 1 < this.history.length) {
      this.index++;
      return this.history[this.index];
    }
    return undefined;
  }

  public forward(): string | undefined {
    if (this.index - 1 >= -1) {
      this.index--;
      return this.index === -1 ? '' : this.history[this.index];
    }
    return undefined;
  }
}
