import { TypedText } from '../../typed-text/typed-text';
import { CommandModule } from '../command-prompt.types';

const clearModule: CommandModule = {
  manpage: {
    description: 'empties the terminal view, otionally including the typed-text container',
    examples: ['clear', 'clear -a', 'clear --all', 'clear all']
  },
  async handler(prompt, { options, inputs }) {
    prompt.clearOutput();
    if (options.a || options.all || inputs.includes('all')) {
      (document.querySelector('typed-text') as TypedText).resetTyping();
    }
  }
};

export default clearModule;
