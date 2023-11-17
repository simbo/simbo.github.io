const COMMAND_HISTORY_STORAGE_KEY = 'command-history';

export class CommandHistory {
  private readonly history: string[];
  private index = -1;

  constructor() {
    let history: string[];
    try {
      history = JSON.parse(window.localStorage.getItem(COMMAND_HISTORY_STORAGE_KEY) || '[]');
    } catch {
      history = [];
    }
    this.history = Array.isArray(history) ? history : [];
  }

  public add(command: string): void {
    this.index = -1;
    command = command.trim();
    if (this.history[0] !== command) {
      this.history.unshift(command);
      window.localStorage.setItem(COMMAND_HISTORY_STORAGE_KEY, JSON.stringify(this.history));
    }
  }

  public backward(): string | undefined {
    if (this.index + 1 < this.history.length) {
      this.index++;
      return this.history[this.index];
    }
  }

  public forward(): string | undefined {
    if (this.index - 1 >= -1) {
      this.index--;
      return this.index === -1 ? '' : this.history[this.index];
    }
  }
}
