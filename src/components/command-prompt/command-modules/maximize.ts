import { CommandModule } from '../command-prompt.types';
import { resizeTerminalView } from '../lib/resize-terminal-view';

const maximizeModule: CommandModule = {
  manpage: 'maximizes the terminal view',

  async handler(prompt) {
    prompt.outputText(resizeTerminalView('max') ? 'terminal view maximized' : 'terminal view is already maximized');
  }
};

export default maximizeModule;
