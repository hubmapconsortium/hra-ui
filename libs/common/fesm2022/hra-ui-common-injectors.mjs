import { createInjectionToken } from 'ngxtension/create-injection-token';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';

/** Application configuration */
const APP_CONFIGURATION = createInjectionToken(() => ({}));
/** Inject the global application configuration */
const injectAppConfiguration = APP_CONFIGURATION[0];
/** Set the application configuration */
const provideAppConfiguration = APP_CONFIGURATION[1];

/**
 * Inject the global document, i.e. the main rendering context
 *
 * @returns The document object
 */
function injectDocument() {
    return inject(DOCUMENT);
}

/** Get the global window */
function getWindow() {
    return injectDocument().defaultView ?? window;
}
/** window */
const WINDOW = createInjectionToken(getWindow);
/** Inject the window object */
const injectWindow = WINDOW[0];
/** Provide a new window object. Only intended for testing purposes. */
const provideWindow = WINDOW[1];

/**
 * Generated bundle index. Do not edit.
 */

export { injectAppConfiguration, injectDocument, injectWindow, provideAppConfiguration, provideWindow };
//# sourceMappingURL=hra-ui-common-injectors.mjs.map
