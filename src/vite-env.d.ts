/// <reference types="vite/client" />

import { Subscriptions } from './lib/message-bus';

declare const SITE_VERSION: string;
declare const SITE_LAST_BUILD: string;
declare const SITE_IS_PROD: boolean;
declare const SITE_IS_DEV: boolean;

declare global {
  interface Window {
    simbo?: {
      messageBusSubscriptions?: Subscriptions;
    };
  }
}
