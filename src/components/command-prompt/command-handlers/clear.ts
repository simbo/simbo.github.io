import { TypedText } from '../../typed-text/typed-text';
import { CommandHandler } from '../command-prompt.types';

const clear: CommandHandler = async (prompt, { options, inputs }) => {
  prompt.clearOutput();
  if (options.a || options.all || inputs.includes('all')) {
    (document.querySelector('typed-text') as TypedText).resetTyping();
  }
};

export default clear;
