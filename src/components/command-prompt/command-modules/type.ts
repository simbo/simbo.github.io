import type { TypedText } from '../../typed-text/typed-text.js';
import type { CommandModule } from '../command-prompt.types.js';
import { renderSection } from '../lib/render-output.js';

const typeModule: CommandModule = {
  manpage: {
    description: 'controls and monitors the typed-text component',
    examples: ['type [ACTION]'],
    append: [
      renderSection('possible actions', '<br>  start, stop, restart, reset, status'),
      renderSection('default action', '<br>  status')
    ].join('<br>')
  },

  handler(prompt, { inputs }) {
    const typedText = globalThis.document.querySelector('typed-text') as TypedText;
    switch ((inputs[0] || '').toLowerCase()) {
      case 'start': {
        if (typedText.isTyping) {
          throw new Error('typing is already in progress');
        }
        if (typedText.typingDone) {
          throw new Error('nothing more to type');
        }
        typedText.startTyping();
        prompt.outputText('typing started');
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
      case 'status':
      case '': {
        if (typedText.isTyping) {
          prompt.outputText('typing is in progress');
        } else {
          prompt.outputText('typing has stopped');
        }
        break;
      }
      default: {
        throw new Error('unknown input for type');
      }
    }
  }
};

export default typeModule;
