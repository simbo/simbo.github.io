import { CommandModule } from './command-prompt.types';

const COMMAND_MODULES_CACHE = new Map<string, CommandModule>();

/**
 * these commands will show up in public listings like `commands`
 */
export const PUBLIC_COMMANDS = [
  'clear',
  'color-theme',
  'colors',
  'commands',
  'echo',
  'hello',
  'help',
  'man',
  'maximize',
  'minimize',
  'reload',
  'type',
  'version'
];

/**
 * aliases for commands
 */
export const COMMAND_ALIASES: { [alias: string]: string } = {
  cls: 'clear',
  hey: 'hello',
  hi: 'hello',
  max: 'maximize',
  min: 'minimize',
  print: 'echo',
  theme: 'color-theme'
};

/**
 * builtin commands are not lazy-loaded
 */
const BUILTIN_COMMAND_MODULES: { [command: string]: CommandModule } = {
  foo: { handler: 'bar' },
  test: { handler: 'test passed.' }
};

/**
 * regexp for valid command names
 */
const RX_COMMAND = /^[a-z][\da-z]*(-[a-z][\da-z]*)*$/i;

/**
 * return a command module for a command name
 * - from builtin modules
 * - from cached modules
 * - try to load and import the module
 */
export async function getCommandModule(command: string): Promise<CommandModule> {
  if (!RX_COMMAND.test(command)) {
    throw new Error(`invalid command: ${command}`);
  }
  command = command.toLowerCase();
  command = COMMAND_ALIASES[command] || command;
  if (BUILTIN_COMMAND_MODULES[command]) {
    return BUILTIN_COMMAND_MODULES[command];
  }
  if (!COMMAND_MODULES_CACHE.has(command)) {
    let module: CommandModule;
    try {
      module = (await import(`./command-modules/${command}.ts`)).default;
    } catch {
      throw new Error(`unknown command: ${command}`);
    }
    COMMAND_MODULES_CACHE.set(command, module);
  }
  return COMMAND_MODULES_CACHE.get(command) as CommandModule;
}
