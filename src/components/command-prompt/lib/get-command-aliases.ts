import { COMMAND_ALIASES } from '../commands';

export function getCommandAliases(command: string): string[] {
  command = COMMAND_ALIASES[command] || command;
  return Object.entries(COMMAND_ALIASES).reduce((aliases, [alias, _command]) => {
    if (command === _command) aliases.push(alias);
    return aliases;
  }, [] as string[]);
}
