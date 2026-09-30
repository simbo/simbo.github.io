/**
 * Switches the terminal between its normal and maximized layouts.
 * Resizing is unavailable at viewport widths of 550 pixels or less.
 *
 * @param target - `max` to maximize the terminal or `min` to restore its normal layout.
 * @returns True if the layout changed, or false if the requested layout was already active.
 * @throws {Error} When the viewport is too narrow to support resizing.
 */
export function resizeTerminalView(target: 'max' | 'min'): boolean {
  if (globalThis.matchMedia('(max-width: 550px)').matches) {
    throw new Error('sorry, the terminal view can not be resized on small viewports');
  }
  if (target === 'max') {
    if (globalThis.document.documentElement.classList.contains('terminal-maximized')) {
      return false;
    }
    globalThis.document.documentElement.classList.add('terminal-maximized');
    return true;
  }
  if (!globalThis.document.documentElement.classList.contains('terminal-maximized')) {
    return false;
  }
  globalThis.document.documentElement.classList.remove('terminal-maximized');
  return true;
}
