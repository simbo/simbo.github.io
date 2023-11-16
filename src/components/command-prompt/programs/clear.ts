import { TypedText } from '../../typed-text/typed-text';
import { ProgramFunction } from '../command-prompt.types';

const clear: ProgramFunction = async (prompt, parameters) => {
  prompt.outputsElement.innerHTML = '';
  if (parameters.a || parameters.all || parameters._.includes('all')) {
    (document.querySelector('typed-text') as TypedText).remove();
  }
};

export default clear;
