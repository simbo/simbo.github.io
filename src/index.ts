import './index.scss';
import './components';

import { STOPPED_TYPING_EVENT_NAME, TypedText } from './components/typed-text/typed-text';
import { ColorTheme } from './lib/color-theme';

ColorTheme.initialize();

const INITIAL_CONTENT_CLASS = 'has-initial-content';
const ADDITIONAL_CONTENT_CLASS = 'has-additional-content';

const typedText = document.querySelector('typed-text') as TypedText;

typedText.after(document.createElement('command-prompt'));

const onStopTyping = () => {
  typedText.removeEventListener(STOPPED_TYPING_EVENT_NAME, onStopTyping);
  typedText.classList.add(INITIAL_CONTENT_CLASS);
};

const onClickContinue = (event: Event) => {
  if ((event.target as HTMLElement).tagName === 'BUTTON') {
    event.preventDefault();
    if (typedText.classList.contains(INITIAL_CONTENT_CLASS)) {
      typedText.classList.add(ADDITIONAL_CONTENT_CLASS);
      typedText.classList.remove(INITIAL_CONTENT_CLASS);
      typedText.startTyping();
    }
  }
};

typedText.addEventListener(STOPPED_TYPING_EVENT_NAME, onStopTyping);
typedText.addEventListener('click', onClickContinue);
