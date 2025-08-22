import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';

/**
 * Inject the global document, i.e. the main rendering context
 *
 * @returns The document object
 */
export function injectDocument(): Document {
  return inject(DOCUMENT);
}
