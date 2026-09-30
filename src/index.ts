import './index.scss';

import { STARTED_TYPING_EVENT_TYPE, STOPPER_TYPED_EVENT_TYPE } from './components/typed-text/typed-text-events.js';
import type { TypedText } from './components/typed-text/typed-text.js';
import { ColorTheme } from './lib/color-theme.js';
import { eventSubscribe } from './lib/event-subscribe.js';

ColorTheme.initialize();

const INITIAL_CONTENT_CLASS = 'has-initial-content';
const ADDITIONAL_CONTENT_CLASS = 'has-additional-content';

const typedText = globalThis.document.querySelector('typed-text') as TypedText;
const typedContent = typedText.getHTML();
typedText.replaceChildren();

eventSubscribe(
  typedText,
  STARTED_TYPING_EVENT_TYPE,
  () => {
    import('./components/command-prompt/command-prompt.js')
      .then(commandPromptModule => {
        globalThis.customElements.define('command-prompt', commandPromptModule.CommandPrompt);
      })
      .catch((error: unknown) => {
        console.error('Failed to load the command prompt component:', error);
      });
  },
  { once: true }
);

eventSubscribe(
  typedText,
  STARTED_TYPING_EVENT_TYPE,
  (_event, unsubscribe) => {
    if (!typedText.textContent.includes('~ simbo')) {
      return;
    }

    typedText.classList.add(ADDITIONAL_CONTENT_CLASS);
    typedText.classList.remove(INITIAL_CONTENT_CLASS);
    unsubscribe();
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

const typedTextModule = await import('./components/typed-text/typed-text.js');
globalThis.customElements.define('typed-text', typedTextModule.TypedText);
typedText.queueContent(typedContent);
typedText.startTyping();

const svgIconModule = await import('./components/svg-icon/svg-icon.js');
globalThis.customElements.define('svg-icon', svgIconModule.SvgIcon);

const colorThemeToggleModule = await import('./components/color-theme-toggle/color-theme-toggle.js');
globalThis.customElements.define('color-theme-toggle', colorThemeToggleModule.ColorThemeToggle);
