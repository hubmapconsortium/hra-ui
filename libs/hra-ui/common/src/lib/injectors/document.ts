import { DOCUMENT, inject } from '@angular/core';
import { createInjectionToken } from 'ngxtension/create-injection-token';

/** Document injection token */
const DOCUMENT_TOKEN = createInjectionToken(() => inject(DOCUMENT));

/** Inject the global document object */
export const injectDocument = DOCUMENT_TOKEN[0];
/** Provide a different global document object. For testing only! */
export const provideDocument = DOCUMENT_TOKEN[1];
