import { expect, it } from 'vitest';

import { COMMAND_ALIASES, getCommandModule, PUBLIC_COMMANDS } from './commands.js';

it.each(PUBLIC_COMMANDS)('loads public command %s and caches its module', async command => {
  const module = await getCommandModule(command);
  expect(module.handler).toBeDefined();
  expect(module.manpage).toBeDefined();
  expect(await getCommandModule(command.toUpperCase())).toBe(module);
});
it.each(Object.entries(COMMAND_ALIASES))('resolves %s to %s', async (alias, command) => {
  expect(await getCommandModule(alias)).toBe(await getCommandModule(command));
});
it.each(['', '../echo', 'a b', '1echo', '<script>'])('rejects invalid command %s', async command => {
  await expect(getCommandModule(command)).rejects.toThrow('invalid command:');
});
it('reports unknown commands and returns built-ins', async () => {
  await expect(getCommandModule('missing')).rejects.toThrow('unknown command: missing');
  expect((await getCommandModule('foo')).handler).toBe('bar');
  expect((await getCommandModule('test')).handler).toBe('test passed.');
});
