export type EventHandler = (event: Event, unsubscribe: () => void) => void;

export interface EventSubscription {
  unsubscribe: () => void;
}

export interface EventSubscriptionOptions {
  /**
   * Number of matching events to ignore before invoking the handler; defaults to zero.
   */
  skip: number;

  /**
   * Remove the listener after the first handled event; defaults to false.
   */
  once: boolean;

  /**
   * Optional case-insensitive tag name filter for the event's direct target.
   */
  tagName?: string;
}

const DEFAULT_EVENT_SUBSCRIPTION_OPTIONS: EventSubscriptionOptions = {
  skip: 0,
  once: false,
};

/**
 * Subscribes to DOM events with optional target filtering, skipping, and one-time handling.
 * Only events whose direct target matches the tag filter count toward the skip limit.
 * A one-time subscription is removed before invoking the handler.
 *
 * @param element - Element on which to register the event listener.
 * @param type - DOM event name or custom event type to listen for.
 * @param handler - Callback receiving the event and a function to cancel the subscription.
 * @param options - Optional skip count, one-time behavior, and direct-target tag filter.
 * @returns A subscription whose unsubscribe function can remove the listener at any time.
 */
export function eventSubscribe(
  element: Element,
  type: string,
  handler: EventHandler,
  options: Partial<EventSubscriptionOptions> = {},
): EventSubscription {
  const { skip, once, tagName } = { ...DEFAULT_EVENT_SUBSCRIPTION_OPTIONS, ...options };
  const unsubscribe = (): void => {
    element.removeEventListener(type, onEvent);
  };
  let eventCount = 0;

  /**
   * Applies the subscription's filter and skip count before invoking its handler.
   *
   * @param event - DOM event received by the registered listener.
   */
  function onEvent(event: Event): void {
    if (tagName && tagName.toLowerCase() !== (event.target as HTMLElement | undefined)?.tagName.toLowerCase()) {
      return;
    }

    if (eventCount >= skip) {
      if (once) unsubscribe();
      handler(event, unsubscribe);
    }
    eventCount++;
  }
  element.addEventListener(type, onEvent);
  return { unsubscribe };
}
