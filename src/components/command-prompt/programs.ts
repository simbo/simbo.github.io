import { Program } from './command-prompt.types';

const programCache = new Map<string, Program>();

const programAliases: { [alias: string]: string } = {
  hi: 'hello',
  hey: 'hello'
};

const builtinPrograms: { [command: string]: Program } = {
  foo: 'bar'
};

const REGEXP_COMMAND = /^[a-z][\da-z]*(-[a-z][\da-z]*)*$/i;

export async function getProgram(command: string): Promise<Program> {
  if (!REGEXP_COMMAND.test(command)) {
    throw new Error(`invalid command: ${command}`);
  }
  let programName = command.toLowerCase();
  programName = programAliases[programName] || programName;
  if (builtinPrograms[programName]) {
    return builtinPrograms[programName];
  }
  if (!programCache.has(programName)) {
    let program: Program;
    try {
      // eslint-disable-next-line unicorn/no-await-expression-member
      program = (await import(`./programs/${programName}.ts`)).default;
    } catch {
      throw new Error(`unknown command: ${command}`);
    }
    programCache.set(programName, program);
  }
  return programCache.get(programName) as Program;
}
