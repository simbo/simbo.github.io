export function handleEventOnce(element: HTMLElement, type: string, handler: (event: Event) => void): void {
  const onEvent = (event: Event) => {
    element.removeEventListener(type, onEvent);
    handler(event);
  };
  element.addEventListener(type, onEvent);
}
