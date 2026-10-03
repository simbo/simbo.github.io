import { beforeEach, expect, it, vi } from 'vitest';

import { STARTED_TYPING_EVENT_TYPE, STOPPED_TYPING_EVENT_TYPE, STOPPER_TYPED_EVENT_TYPE } from './typed-text-events.js';
import { TypedText } from './typed-text.js';

globalThis.customElements.define('typed-text', TypedText);

function create(content: string) {
  const element = globalThis.document.createElement('typed-text') as TypedText;
  element.setAttribute('type-delay', '10');
  globalThis.document.body.append(element);
  element.queueContent(content);
  return element;
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.spyOn(Math, 'random').mockReturnValue(0.5);
});

it('types content in steps, with markup, entities, and line breaks', () => {
  const element = create('A<b>B</b>&amp;C<br/>D');
  const started = vi.fn();
  const stopped = vi.fn();
  element.addEventListener(STARTED_TYPING_EVENT_TYPE, started);
  element.addEventListener(STOPPED_TYPING_EVENT_TYPE, stopped);
  element.startTyping();
  expect(element.isTyping).toBe(true);
  expect(element.classList.contains('has-cursor')).toBe(true);
  vi.advanceTimersByTime(0);
  expect(element.textContent).toBe('A');
  vi.runAllTimers();
  expect(element.innerHTML).toBe('A<b>B</b>&amp;C<br>D');
  expect(element.typingDone).toBe(true);
  expect(element.isTyping).toBe(false);
  expect(element.classList.contains('has-cursor')).toBe(false);
  expect(started).toHaveBeenCalledOnce();
  expect(stopped).toHaveBeenCalledOnce();
});
it('honors pauses and stop markers, then resumes remaining content', () => {
  const element = create('A^100<span code="stop"></span>B C');
  const stopper = vi.fn();
  element.addEventListener(STOPPER_TYPED_EVENT_TYPE, stopper);
  element.startTyping();
  vi.advanceTimersByTime(109);
  expect(element.textContent).toBe('A');
  vi.advanceTimersByTime(1);
  expect(element.textContent).toBe('AB');
  expect(element.isTyping).toBe(false);
  expect(element.typingDone).toBe(false);
  expect(stopper).toHaveBeenCalledOnce();
  element.startTyping();
  vi.runAllTimers();
  expect(element.textContent).toBe('AB C');
});
it('stops pending timers and supports reset and restart', () => {
  const element = create('abc');
  element.startTyping();
  element.stopTyping();
  vi.runAllTimers();
  expect(element.textContent).toBe('');
  element.startTyping();
  vi.advanceTimersByTime(0);
  expect(element.textContent).toBe('a');
  element.resetTyping();
  expect(element.textContent).toBe('');
  expect(element.typingDone).toBe(false);
  element.restartTyping();
  vi.runAllTimers();
  expect(element.textContent).toBe('abc');
});
it('appends queued content, strips source indentation, and preserves unknown codes', () => {
  const element = create('\n A\r\n B ');
  element.queueContent('C');
  element.startTyping();
  vi.runAllTimers();
  expect(element.textContent).toBe('ABC');
  const invalid = create('A^unknown');
  invalid.startTyping();
  vi.runAllTimers();
  expect(invalid.textContent).toBe('A');
});
it('uses the default delay when the attribute is missing', () => {
  const element = globalThis.document.createElement('typed-text') as TypedText;
  globalThis.document.body.append(element);
  element.queueContent('ab');
  element.startTyping();
  vi.advanceTimersByTime(22);
  expect(element.textContent).toBe('a');
  vi.advanceTimersByTime(2);
  expect(element.textContent).toBe('ab');
});
