export type EventHandler = (event: Event, unsubscribe: () => void) => void;

export interface EventSubscription {
  unsubscribe(): void;
}

export interface EventSubscriptionOptions {
  skip: number;
  once: boolean;
  tagName?: string;
}

const DEFAULT_EVENT_SUBSCRIPTION_OPTIONS: EventSubscriptionOptions = {
  skip: 0,
  once: false
};

export function eventSubscribe(
  element: Element,
  type: string,
  handler: EventHandler,
  options: Partial<EventSubscriptionOptions> = {}
): EventSubscription {
  const { skip, once, tagName } = { ...DEFAULT_EVENT_SUBSCRIPTION_OPTIONS, ...options } as EventSubscriptionOptions;
  const unsubscribe = () => element.removeEventListener(type, onEvent);
  let eventCount = 0;
  const onEvent = (event: Event) => {
    if (!tagName || tagName.toLowerCase() === (event.target as HTMLElement | undefined)?.tagName?.toLowerCase()) {
      if (eventCount >= skip) {
        if (once) unsubscribe();
        handler(event, unsubscribe);
      }
      eventCount++;
    }
  };
  element.addEventListener(type, onEvent);
  return { unsubscribe };
}
