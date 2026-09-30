import type { CommandPrompt } from './command-prompt.js';
import type { ParsedParameters } from './lib/parse-parameters.js';

export interface CommandOutput {
  type: 'command' | 'text' | 'error';
  content: string;
}

export type CommandFunction = (commandPrompt: CommandPrompt, parameters: ParsedParameters) => Promise<void> | void;

export type CommandHandler = CommandFunction | string;

export interface Manpage {
  description: string;
  examples?: string[];
  append?: string;
}

export interface CommandModule {
  manpage?: Manpage | string;
  handler: CommandHandler;
}
