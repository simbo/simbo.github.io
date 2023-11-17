import { TypedText } from '../../typed-text/typed-text';
import { CommandHandler } from '../command-prompt.types';

const type: CommandHandler = async (prompt, { inputs }) => {
  const typedText = document.querySelector('typed-text') as TypedText;
  switch ((inputs[0] || '').toLowerCase()) {
    case 'start':
    case 'continue': {
      if (typedText.isTyping) {
        throw new Error('typing is already in progress');
      } else if (typedText.typingDone) {
        throw new Error('nothing more to type');
      }
      typedText.startTyping();
      prompt.outputText('typing continued');
      break;
    }
    case 'restart': {
      typedText.restartTyping();
      prompt.outputText('typing restarted');
      break;
    }
    case 'stop': {
      if (!typedText.isTyping) {
        throw new Error('typing is already stopped');
      }
      typedText.stopTyping();
      prompt.outputText('typing stopped');
      break;
    }
    case 'reset': {
      typedText.resetTyping();
      prompt.outputText('typing resetted');
      break;
    }
    default: {
      if (typedText.isTyping) {
        prompt.outputText('typing is in progress');
      } else {
        prompt.outputText('typing has stopped');
      }
    }
  }
};

export default type;
