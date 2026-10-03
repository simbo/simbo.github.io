import { describe, expect, it } from 'vitest';

import { CommandHistory } from './command-history.js';

describe('CommandHistory', () => {
  it('trims, saves, and suppresses consecutive duplicates', () => {
    const history = new CommandHistory();
    history.add(' first ');
    history.add('first');
    history.add('second');
    history.add('first');
    expect(JSON.parse(globalThis.localStorage.getItem('command-history') ?? '')).toEqual(['first', 'second', 'first']);
  });
  it('navigates within bounds and resets navigation after adding', () => {
    const history = new CommandHistory();
    expect(history.backward()).toBeUndefined();
    expect(history.forward()).toBeUndefined();
    history.add('one');
    history.add('two');
    expect(history.backward()).toBe('two');
    expect(history.backward()).toBe('one');
    expect(history.backward()).toBeUndefined();
    expect(history.forward()).toBe('two');
    expect(history.forward()).toBe('');
    expect(history.forward()).toBeUndefined();
    history.backward();
    history.add('three');
    expect(history.backward()).toBe('three');
  });
  it.each(['invalid', '{}', 'null'])('recovers from stored %s', value => {
    globalThis.localStorage.setItem('command-history', value);
    expect(new CommandHistory().backward()).toBeUndefined();
  });
  it('restores stored history', () => {
    globalThis.localStorage.setItem('command-history', '["saved"]');
    expect(new CommandHistory().backward()).toBe('saved');
  });
});
