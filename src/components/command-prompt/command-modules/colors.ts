import { CommandModule } from '../command-prompt.types';

const colorsModule: CommandModule = {
  manpage: 'displays examples for text colors',

  handler: [
    '<span class="bg-black"> </span> <span class="black">black</span>',
    '<span class="bg-blue"> </span> <span class="blue">blue</span>',
    '<span class="bg-green"> </span> <span class="green">green</span>',
    '<span class="bg-red"> </span> <span class="red">red</span>',
    '<span class="bg-magenta"> </span> <span class="magenta">magenta</span>',
    '<span class="bg-yellow"> </span> <span class="yellow">yellow</span>',
    '<span class="bg-orange"> </span> <span class="orange">orange</span>',
    '<span class="bg-white"> </span> <span class="white">white</span>',
    '<span class="bg-dim"> </span> <span class="dim">dim</span>'
  ].join('<br>')
};

export default colorsModule;
