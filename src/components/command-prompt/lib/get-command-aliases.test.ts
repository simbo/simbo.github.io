import { expect, it } from 'vitest';

import { getCommandAliases } from './get-command-aliases.js';

it.each([
  ['hello', ['hey', 'hi']],
  ['hi', ['hey', 'hi']],
  ['clear', ['cls']],
  ['unknown', []],
])('resolves aliases for %s', (command, aliases) => {
  expect(getCommandAliases(command)).toEqual(aliases);
});
