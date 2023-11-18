import { CommandModule } from '../command-prompt.types';
import { PUBLIC_COMMANDS } from '../commands';
import { getCommandAliases } from '../lib/get-command-aliases';

const commands = PUBLIC_COMMANDS.sort()
  .map(command => {
    const aliases = getCommandAliases(command);
    return (
      `  <span class="yellow">${command}</span>` +
      (aliases.length > 0 ? ` ${aliases.map(alias => `<span class="dim">${alias}</span>`).join(' ')}` : '')
    );
  })
  .join('<br>');

const commandsModule: CommandModule = {
  manpage: 'displays an overview of public commands and their aliases',

  async handler(prompt) {
    prompt.outputText(`known commands and their aliases:<br>${commands}`);
  }
};

export default commandsModule;
