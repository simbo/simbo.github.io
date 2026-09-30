import type { CommandModule } from '../command-prompt.types.js';
import { sanitizeText } from '../lib/sanitize-text.js';

const echoModule: CommandModule = {
  manpage: 'outputs inputs',

  handler(prompt, parameters) {
    const partials = parameters.inputs;
    prompt.outputText(partials.map(partial => sanitizeText(partial)).join(' '));
  }
};

export default echoModule;
