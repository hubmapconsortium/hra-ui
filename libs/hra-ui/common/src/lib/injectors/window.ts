import { createInjectionToken } from 'ngxtension/create-injection-token';
import { injectDocument } from './document';

/** Window injection token */
const WINDOW_TOKEN = createInjectionToken(() => injectDocument().defaultView ?? window);

export const injectWindow = WINDOW_TOKEN[0];
/** Provide a new global window object. For testing only! */
export const provideWindow = WINDOW_TOKEN[1];
