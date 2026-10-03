import type { CommandModule } from './command-prompt.types.js';

interface CommandImport {
  default: CommandModule;
}

const COMMAND_MODULE_LOADERS: Record<string, (() => Promise<CommandImport>) | undefined> =
  import.meta.glob<CommandImport>(['./command-modules/*.ts', '!./command-modules/*.test.ts']);

const COMMAND_MODULES_CACHE = new Map<string, CommandModule>();

/**
 * Command names shown in public listings, including the `commands` output.
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
  'version',
];

/**
 * Maps shorthand command names to their canonical command names.
 */
export const COMMAND_ALIASES: Record<string, string> = {
  cls: 'clear',
  hey: 'hello',
  hi: 'hello',
  max: 'maximize',
  min: 'minimize',
  print: 'echo',
  theme: 'color-theme',
};

/**
 * Built-in command modules that can be returned without a dynamic import.
 */
const BUILTIN_COMMAND_MODULES: Record<string, CommandModule | undefined> = {
  foo: { handler: 'bar' },
  test: { handler: 'test passed.' },
};

/**
 * Accepts alphanumeric command names with optional hyphen-separated segments.
 */
const RX_COMMAND = /^[a-z][\da-z]*(-[a-z][\da-z]*)*$/i;

/**
 * Resolves a command name or alias to its module.
 * Built-in modules are returned directly; other modules are loaded on demand and cached.
 *
 * @param command - Command name or alias; matching is case-insensitive.
 * @returns The resolved module containing the command handler and optional manual page.
 * @throws {Error} When the command name is invalid or its module cannot be loaded.
 */
export async function getCommandModule(command: string): Promise<CommandModule> {
  if (!RX_COMMAND.test(command)) {
    throw new Error(`invalid command: ${command}`);
  }
  command = command.toLowerCase();
  command = COMMAND_ALIASES[command] || command;
  if (BUILTIN_COMMAND_MODULES[command]) {
    return BUILTIN_COMMAND_MODULES[command] as CommandModule;
  }
  if (!COMMAND_MODULES_CACHE.has(command)) {
    let module: CommandModule;
    try {
      const loadModule = COMMAND_MODULE_LOADERS[`./command-modules/${command}.ts`];
      if (!loadModule) throw new Error(`unknown command: ${command}`);
      module = (await loadModule()).default;
    } catch {
      throw new Error(`unknown command: ${command}`);
    }
    COMMAND_MODULES_CACHE.set(command, module);
  }
  return COMMAND_MODULES_CACHE.get(command) as CommandModule;
}
