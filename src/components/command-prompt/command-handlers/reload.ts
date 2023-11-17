import { CommandHandler } from '../command-prompt.types';

const reload: CommandHandler = async () => {
  window.location.reload();
};

export default reload;
