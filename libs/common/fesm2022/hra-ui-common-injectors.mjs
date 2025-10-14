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

/**
 * Inject the global window
 *
 * @returns The window object
 */
function injectWindow() {
    return injectDocument().defaultView ?? window;
}

/**
 * Generated bundle index. Do not edit.
 */

export { injectAppConfiguration, injectDocument, injectWindow, provideAppConfiguration };
//# sourceMappingURL=hra-ui-common-injectors.mjs.map
