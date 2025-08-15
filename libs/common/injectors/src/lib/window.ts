import { injectDocument } from './document';

/**
 * Inject the global window
 *
 * @returns The window object
 */
export function injectWindow(): typeof window {
  return injectDocument().defaultView ?? window;
}
