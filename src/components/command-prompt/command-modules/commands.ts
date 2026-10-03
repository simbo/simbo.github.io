import type { CommandModule } from '../command-prompt.types.js';
import { PUBLIC_COMMANDS } from '../commands.js';
import { getCommandAliases } from '../lib/get-command-aliases.js';

const commands = PUBLIC_COMMANDS.toSorted((a, b) => a.localeCompare(b))
  .map(command => {
    const aliases = getCommandAliases(command);
    return `  <span class="yellow">${command}</span>${
      aliases.length > 0 ? ` ${aliases.map(alias => `<span class="dim">${alias}</span>`).join(' ')}` : ''
    }`;
  })
  .join('<br>');

const commandsModule: CommandModule = {
  manpage: 'displays some commands and their aliases',

  handler(prompt) {
    prompt.outputText(`some commands and their aliases:<br>${commands}`);
  },
};

export default commandsModule;
