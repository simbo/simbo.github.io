import { describe, expect, it } from 'vitest';

import { unquote } from './unquote.js';

describe('unquote', () => {
  it.each([
    ['"hello world"', 'hello world'],
    ["'hello'", 'hello'],
    ['plain', 'plain'],
    ['', ''],
    ['"mismatch', '"mismatch'],
    ['""', ''],
    [String.raw`"say \"hi\""`, 'say "hi"'],
    [String.raw`'it\'s'`, "it's"],
    [String.raw`"a\nb"`, String.raw`a\nb`],
  ])('unquotes %s', (input, expected) => {
    expect(unquote(input)).toBe(expected);
  });
});
