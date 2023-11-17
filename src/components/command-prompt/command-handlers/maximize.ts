import { CommandHandler } from '../command-prompt.types';

const maximize: CommandHandler = async prompt => {
  if (window.matchMedia('(max-width: 550px)').matches) {
    throw new Error('sorry, the terminal view can not be resized on small viewports');
  }
  if (document.documentElement.classList.contains('terminal-maximized')) {
    prompt.outputText('terminal view is already maximized');
  } else {
    document.documentElement.classList.add('terminal-maximized');
    prompt.outputText('terminal view maximized');
  }
};

export default maximize;
