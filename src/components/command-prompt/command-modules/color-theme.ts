import { ColorTheme } from '../../../lib/color-theme.js';
import type { CommandModule } from '../command-prompt.types.js';

const themeModule: CommandModule = {
  manpage: {
    description: 'displays the current color theme or switches the color theme',
    examples: ['color-theme', 'color-theme toggle', 'color-theme [light|dark]'],
  },

  handler(prompt, { inputs }) {
    const colorTheme = inputs.at(-1)?.toLocaleLowerCase();
    if (colorTheme === 'toggle') {
      ColorTheme.toggle();
    } else {
      ColorTheme.theme = colorTheme as string;
    }
    prompt.outputText(`current color theme: ${ColorTheme.theme}`);
  },
};

export default themeModule;
