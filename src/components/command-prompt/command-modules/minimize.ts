import type { CommandModule } from '../command-prompt.types.js';
import { resizeTerminalView } from '../lib/resize-terminal-view.js';

const minimizeModule: CommandModule = {
  manpage: 'minimizes the terminal view',

  handler(prompt) {
    prompt.outputText(resizeTerminalView('min') ? 'terminal view minimized' : 'terminal view is already minimized');
  },
};

export default minimizeModule;
