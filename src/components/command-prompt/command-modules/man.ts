import { CommandModule } from '../command-prompt.types';
import { COMMAND_ALIASES, getCommandModule } from '../commands';
import { getCommandAliases } from '../lib/get-command-aliases';
import { renderSection, renderUsageExamples } from '../lib/render-output';

const manModule: CommandModule = {
  manpage: { description: 'displays the manpage for a command', examples: ['man &lt;COMMAND&gt;'] },

  async handler(prompt, { inputs }) {
    let command = inputs[0] || 'man';
    command = COMMAND_ALIASES[command] || command;
    const module = await getCommandModule(command);

    let output = `<strong>${command}</strong>`;
    const aliases = getCommandAliases(command);
    if (aliases.length > 0) {
      output += `<br>${renderSection('aliases', ' ' + aliases.join(' '))}`;
    }
    prompt.outputText(output);

    const { manpage } = module;
    if (!manpage) {
      throw new Error(`no manpage found for ${command}`);
    }

    if (typeof manpage === 'string') {
      prompt.outputText(`${manpage}`);
      return;
    }
    const { description, examples, append } = manpage;
    prompt.outputText(`${description}`);
    renderUsageExamples(examples, text => prompt.outputText(text));
    if (append) {
      prompt.outputText(`${append}`);
    }
  }
};

export default manModule;
