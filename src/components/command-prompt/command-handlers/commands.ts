import { COMMAND_ALIASES } from '../command-handlers';
import { CommandHandler } from '../command-prompt.types';

const KNOWN_COMMANDS = [
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
  .map(command => {
    const commandAliases = Object.entries(COMMAND_ALIASES).reduce((aliases, [alias, commandName]) => {
      if (command === commandName) {
        aliases.push(`<span class="dim">${alias}</span>`);
      }
      return aliases;
    }, [] as string[]);
    return commandAliases.length > 0 ? `- ${command} ${commandAliases.join(' ')}` : `- ${command}`;
  })
  .join('<br/>');

const commands: CommandHandler = async prompt => {
  prompt.outputText(`known commands and their aliases:<br/>${KNOWN_COMMANDS}`);
};

export default commands;
