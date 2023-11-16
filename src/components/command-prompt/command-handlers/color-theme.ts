import { ColorTheme } from '../../../lib/color-theme';
import { CommandHandler } from '../command-prompt.types';

const theme: CommandHandler = async (prompt, { inputs }) => {
  const colorTheme = inputs.at(-1)?.toLocaleLowerCase();
  if (colorTheme === 'toggle') {
    ColorTheme.toggle();
  } else {
    ColorTheme.theme = colorTheme as string;
  }
  prompt.outputText(`current color theme: ${ColorTheme.theme}`);
};

export default theme;
