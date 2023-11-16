import { CommandHandler } from '../command-prompt.types';

const knownCommands = [
  'clear',
  'color-theme',
  'colors',
  'commands',
  'echo',
  'foo',
  'hello',
  'help',
  'maximize',
  'minimize',
  'test',
  'version'
]
  .sort()
  .join(' ');

const commands: CommandHandler = async prompt => {
  prompt.outputText(`available commands:<br/>${knownCommands}`);
};

export default commands;
