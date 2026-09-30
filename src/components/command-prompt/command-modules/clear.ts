import type { TypedText } from '../../typed-text/typed-text.js';
import type { CommandModule } from '../command-prompt.types.js';

const clearModule: CommandModule = {
  manpage: {
    description: 'empties the terminal view, otionally including the typed-text container',
    examples: ['clear', 'clear -a', 'clear --all', 'clear all']
  },
  handler(prompt, { options, inputs }) {
    prompt.clearOutput();
    if (options.a || options.all || inputs.includes('all')) {
      (globalThis.document.querySelector('typed-text') as TypedText).resetTyping();
    }
  }
};

export default clearModule;
