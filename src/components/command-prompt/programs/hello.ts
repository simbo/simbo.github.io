import { ProgramFunction } from '../command-prompt.types';

const HELLO = ['Hello', 'Hallo', 'Servus', 'Salut', 'Ciao', 'Hej', 'Hola', 'Cześć', 'Olá'];

let runCount = 0;

const hello: ProgramFunction = async prompt => {
  const index = runCount++ === 0 ? 0 : Math.round(Math.random() * (HELLO.length - 1));
  prompt.outputText(`${HELLO[index]}!`);
};

export default hello;
