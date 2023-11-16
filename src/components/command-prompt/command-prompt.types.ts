import { ParsedArgs as ParsedParameters } from 'minimist';

import { CommandPrompt } from './command-prompt';

export interface Output {
  type: 'command' | 'text' | 'error';
  content: string;
}

export type ProgramFunction = (commandPrompt: CommandPrompt, parameters: ParsedParameters) => Promise<void>;

export type Program = ProgramFunction | string;
