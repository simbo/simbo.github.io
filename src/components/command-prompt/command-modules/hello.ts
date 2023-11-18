import { CommandModule } from '../command-prompt.types';

const HELLO = ['Hello', 'Hallo', 'Servus', 'Salut', 'Ciao', 'Hej', 'Hola', 'Cześć', 'Olá'];

let RUN_COUNT = 0;

const helloModule: CommandModule = {
  manpage: 'says "hello" in different languages',

  async handler(prompt) {
    const index = RUN_COUNT++ === 0 ? 0 : Math.round(Math.random() * (HELLO.length - 1));
    prompt.outputText(`${HELLO[index]}!`);
  }
};

export default helloModule;
