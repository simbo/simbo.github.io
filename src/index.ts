import './index.scss';

import { TypedText } from './components/typed-text/typed-text';
import { STARTED_TYPING_EVENT_TYPE, STOPPER_TYPED_EVENT_TYPE } from './components/typed-text/typed-text-events';
import { ColorTheme } from './lib/color-theme';
import { eventSubscribe } from './lib/event-subscribe';

ColorTheme.initialize();

const INITIAL_CONTENT_CLASS = 'has-initial-content';
const ADDITIONAL_CONTENT_CLASS = 'has-additional-content';

const typedText = document.querySelector('typed-text') as TypedText;
const typedContent = typedText.innerHTML;
typedText.innerHTML = '';

eventSubscribe(
  typedText,
  STARTED_TYPING_EVENT_TYPE,
  () => {
    import('./components/command-prompt/command-prompt').then(({ CommandPrompt }) => {
      customElements.define('command-prompt', CommandPrompt);
    });
  },
  { once: true }
);

eventSubscribe(
  typedText,
  STARTED_TYPING_EVENT_TYPE,
  (_event, unsubscribe) => {
    if (typedText.textContent?.includes('~ simbo')) {
      typedText.classList.add(ADDITIONAL_CONTENT_CLASS);
      typedText.classList.remove(INITIAL_CONTENT_CLASS);
      unsubscribe();
    }
  },
  { skip: 1 }
);

eventSubscribe(
  typedText,
  STOPPER_TYPED_EVENT_TYPE,
  () => {
    typedText.classList.add(INITIAL_CONTENT_CLASS);
  },
  { once: true }
);

eventSubscribe(
  typedText,
  'click',
  event => {
    event.preventDefault();
    if (typedText.classList.contains(INITIAL_CONTENT_CLASS)) {
      typedText.startTyping();
    }
  },
  { tagName: 'button' }
);

import('./components/typed-text/typed-text').then(({ TypedText }) => {
  customElements.define('typed-text', TypedText);
  typedText.queueContent(typedContent);
  typedText.startTyping();
});

import('./components/svg-icon/svg-icon').then(({ SvgIcon }) => {
  customElements.define('svg-icon', SvgIcon);
});

import('./components/color-theme-toggle/color-theme-toggle').then(({ ColorThemeToggle }) => {
  customElements.define('color-theme-toggle', ColorThemeToggle);
});
