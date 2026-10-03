import { describe, expect, it } from 'vitest';

import { parseParameters } from './parse-parameters.js';

describe('parseParameters', () => {
  it.each([
    ['', { inputs: [], options: {} }],
    ['  one  two ', { inputs: ['one', 'two'], options: {} }],
    [`"hello world" 'second input'`, { inputs: ['hello world', 'second input'], options: {} }],
    [
      '-aB --ALL --some-name --some_name',
      { inputs: [], options: { a: true, b: true, all: true, 'some-name': true, some_name: true } },
    ],
    [
      '-N="Jane Doe" --Name=first --name=last --empty=""',
      { inputs: [], options: { n: 'Jane Doe', name: 'last', empty: '' } },
    ],
    ['input -1 --! - --', { inputs: ['input', '-'], options: {} }],
    ['--flag value', { inputs: ['value'], options: { flag: true } }],
  ])('parses %s', (input, expected) => {
    expect(parseParameters(input)).toEqual(expected);
  });
});
