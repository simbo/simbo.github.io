import { CommandHandler } from '../command-prompt.types';

const HELLO = ['Hello', 'Hallo', 'Servus', 'Salut', 'Ciao', 'Hej', 'Hola', 'Cześć', 'Olá'];

let RUN_COUNT = 0;

const hello: CommandHandler = async prompt => {
  const index = RUN_COUNT++ === 0 ? 0 : Math.round(Math.random() * (HELLO.length - 1));
  prompt.outputText(`${HELLO[index]}!`);
};

export default hello;
