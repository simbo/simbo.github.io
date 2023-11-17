import { CommandHandler } from '../command-prompt.types';

const minimize: CommandHandler = async prompt => {
  if (window.matchMedia('(max-width: 550px)').matches) {
    throw new Error('sorry, the terminal view can not be resized on small viewports');
  }
  if (document.documentElement.classList.contains('terminal-maximized')) {
    document.documentElement.classList.remove('terminal-maximized');
    prompt.outputText('terminal view minimized');
  } else {
    prompt.outputText('terminal view is already minimized');
  }
};

export default minimize;
