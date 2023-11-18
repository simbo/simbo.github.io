import { CommandPrompt } from './command-prompt';
import { ParsedParameters } from './lib/parse-parameters';

export interface CommandOutput {
  type: 'command' | 'text' | 'error';
  content: string;
}

export type CommandFunction = (commandPrompt: CommandPrompt, parameters: ParsedParameters) => Promise<void>;

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
