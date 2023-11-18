import { CommandModule } from '../command-prompt.types';
import { resizeTerminalView } from '../lib/resize-terminal-view';

const minimizeModule: CommandModule = {
  manpage: 'minimizes the terminal view',

  async handler(prompt) {
    prompt.outputText(resizeTerminalView('min') ? 'terminal view minimized' : 'terminal view is already minimized');
  }
};

export default minimizeModule;
