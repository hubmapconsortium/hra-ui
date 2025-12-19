import { createInjectionToken } from 'ngxtension/create-injection-token';
import { injectDocument } from './document';

/** Get the global window */
function getWindow(): typeof window {
  return injectDocument().defaultView ?? window;
}

/** window */
const WINDOW = createInjectionToken(getWindow);

/** Inject the window object */
export const injectWindow = WINDOW[0];
/** Provide a new window object. Only intended for testing purposes. */
export const provideWindow = WINDOW[1];
