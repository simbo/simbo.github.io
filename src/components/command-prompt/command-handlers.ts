import { CommandHandler } from './command-prompt.types';

const COMMAND_HANDLER_CACHE = new Map<string, CommandHandler>();

const COMMAND_ALIASES: { [alias: string]: string } = {
  cls: 'clear',
  hey: 'hello',
  hi: 'hello',
  max: 'maximize',
  min: 'minimize',
  theme: 'color-theme'
};

const BUILTIN_COMMAND_HANDLERS: { [command: string]: CommandHandler } = {
  foo: 'bar',
  version: `v${SITE_VERSION}`,
  test: 'test passed.',
  help: 'need help?<br/>run <span class="yellow">commands</span> for a list of commands.'
};

const RX_COMMAND = /^[a-z][\da-z]*(-[a-z][\da-z]*)*$/i;

export async function getCommandHandler(command: string): Promise<CommandHandler> {
  if (!RX_COMMAND.test(command)) {
    throw new Error(`invalid command: ${command}`);
  }
  command = command.toLowerCase();
  command = COMMAND_ALIASES[command] || command;
  if (BUILTIN_COMMAND_HANDLERS[command]) {
    return BUILTIN_COMMAND_HANDLERS[command];
  }
  if (!COMMAND_HANDLER_CACHE.has(command)) {
    let handler: CommandHandler;
    try {
      handler = (await import(`./command-handlers/${command}.ts`)).default;
    } catch {
      throw new Error(`unknown command: ${command}`);
    }
    COMMAND_HANDLER_CACHE.set(command, handler);
  }
  return COMMAND_HANDLER_CACHE.get(command) as CommandHandler;
}
