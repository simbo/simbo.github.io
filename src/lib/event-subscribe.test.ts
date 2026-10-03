import { expect, it, vi } from 'vitest';

import { eventSubscribe } from './event-subscribe.js';

it('passes the event and lets handlers unsubscribe', () => {
  const element = globalThis.document.createElement('div');
  const handler = vi.fn((_event, unsubscribe: () => void) => {
    unsubscribe();
  });
  eventSubscribe(element, 'click', handler);
  const event = new Event('click');
  element.dispatchEvent(event);
  element.dispatchEvent(event);
  expect(handler).toHaveBeenCalledExactlyOnceWith(event, expect.any(Function));
});
it('filters direct targets and counts only matching events toward skip', () => {
  const element = globalThis.document.createElement('div');
  const button = globalThis.document.createElement('button');
  const span = globalThis.document.createElement('span');
  button.append(span);
  element.append(button);
  const handler = vi.fn();
  eventSubscribe(element, 'click', handler, { tagName: 'BUTTON', skip: 1, once: true });
  span.click();
  button.click();
  expect(handler).not.toHaveBeenCalled();
  button.click();
  button.click();
  expect(handler).toHaveBeenCalledTimes(1);
});
it('removes a once listener before a reentrant dispatch', () => {
  const element = globalThis.document.createElement('div');
  const handler = vi.fn(() => {
    element.dispatchEvent(new Event('click'));
  });
  eventSubscribe(element, 'click', handler, { once: true });
  element.click();
  expect(handler).toHaveBeenCalledTimes(1);
});
it('supports explicit cancellation', () => {
  const element = globalThis.document.createElement('div');
  const handler = vi.fn();
  const subscription = eventSubscribe(element, 'click', handler);
  subscription.unsubscribe();
  subscription.unsubscribe();
  element.click();
  expect(handler).not.toHaveBeenCalled();
});
