import type { CommandModule } from '../command-prompt.types.js';
import { resizeTerminalView } from '../lib/resize-terminal-view.js';

const maximizeModule: CommandModule = {
  manpage: 'maximizes the terminal view',

  handler(prompt) {
    prompt.outputText(resizeTerminalView('max') ? 'terminal view maximized' : 'terminal view is already maximized');
  },
};

export default maximizeModule;
