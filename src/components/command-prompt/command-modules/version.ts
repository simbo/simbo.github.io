import type { CommandModule } from '../command-prompt.types.js';

const versionModule: CommandModule = {
  manpage: 'displays project version',
  handler: `v${SITE_VERSION}`,
};

export default versionModule;
