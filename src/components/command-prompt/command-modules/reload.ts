import type { CommandModule } from '../command-prompt.types.js';

const reloadModule: CommandModule = {
  manpage: 'reloads the page',
  handler() {
    globalThis.location.reload();
  },
};

export default reloadModule;
