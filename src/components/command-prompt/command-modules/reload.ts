import { CommandModule } from '../command-prompt.types';

const reloadModule: CommandModule = {
  manpage: 'reloads the page',
  async handler() {
    return window.location.reload();
  }
};

export default reloadModule;
