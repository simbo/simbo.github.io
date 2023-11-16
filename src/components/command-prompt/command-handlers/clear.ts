import { TypedText } from '../../typed-text/typed-text';
import { CommandHandler } from '../command-prompt.types';

const clear: CommandHandler = async (prompt, { options, inputs }) => {
  prompt.outputsElement.innerHTML = '';
  if (options.a || options.all || inputs.includes('all')) {
    (document.querySelector('typed-text') as TypedText).remove();
  }
};

export default clear;
