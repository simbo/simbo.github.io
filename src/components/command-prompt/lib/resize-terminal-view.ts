export function resizeTerminalView(target: 'max' | 'min'): boolean {
  if (window.matchMedia('(max-width: 550px)').matches) {
    throw new Error('sorry, the terminal view can not be resized on small viewports');
  }
  if (target === 'max') {
    if (document.documentElement.classList.contains('terminal-maximized')) {
      return false;
    }
    document.documentElement.classList.add('terminal-maximized');
    return true;
  } else {
    if (!document.documentElement.classList.contains('terminal-maximized')) {
      return false;
    }
    document.documentElement.classList.remove('terminal-maximized');
    return true;
  }
}
