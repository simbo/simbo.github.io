import { CommandModule } from '../command-prompt.types';
import { sanitizeText } from '../lib/sanitize-text';

const echoModule: CommandModule = {
  manpage: 'outputs inputs',

  async handler(prompt, parameters) {
    const partials = parameters.inputs;
    prompt.outputText(`${partials.map(partial => sanitizeText(partial)).join(' ')}`);
  }
};

export default echoModule;
