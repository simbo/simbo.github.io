import { COMMAND_ALIASES } from '../commands.js';

/**
 * Lists the aliases for a command, resolving an alias input to its canonical name first.
 *
 * @param command - Canonical command name or an alias, such as `clear` or `cls`.
 * @returns All registered aliases for the command, or an empty array if none exist.
 */
export function getCommandAliases(command: string): string[] {
  command = COMMAND_ALIASES[command] || command;
  return Object.entries(COMMAND_ALIASES).reduce<string[]>((aliases, [alias, _command]) => {
    if (command === _command) aliases.push(alias);
    return aliases;
  }, []);
}
