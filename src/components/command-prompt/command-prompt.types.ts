import { ParsedParameters } from '../../lib/parse-parameters';

import { CommandPrompt } from './command-prompt';

export interface CommandOutput {
  type: 'command' | 'text' | 'error';
  content: string;
}

export type CommandFunction = (commandPrompt: CommandPrompt, parameters: ParsedParameters) => Promise<void>;

export type CommandHandler = CommandFunction | string;
