import { sanitizeText } from '../../../lib/sanitize-text';
import { CommandHandler } from '../command-prompt.types';

const echo: CommandHandler = async (prompt, parameters) => {
  const partials = parameters.inputs;
  console.log(parameters);
  prompt.outputText(`${partials.map(partial => sanitizeText(partial)).join(' ')}`);
};

export default echo;
