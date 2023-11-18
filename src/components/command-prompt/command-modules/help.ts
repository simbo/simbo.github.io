import { CommandModule } from '../command-prompt.types';

const helpModule: CommandModule = {
  manpage: 'displays a basic help text',
  handler:
    'need help?<br>' +
    'run <span class="yellow">commands</span> for a list of commands ' +
    'or <span class="yellow">man &lt;COMMAND&gt;</span> to learn more about a command.'
};

export default helpModule;
