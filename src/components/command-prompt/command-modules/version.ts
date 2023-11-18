import { CommandModule } from '../command-prompt.types';

const versionModule: CommandModule = {
  manpage: 'displays project version',
  handler: `v${SITE_VERSION}`
};

export default versionModule;
