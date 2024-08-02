/// <reference types="jest" />
import type { ScrollTimelineFunc } from '@hra-ui/design-system/scrolling';

/** Globals used by scrolling */
interface ScrollingGlobals {
  /** Scroll timeline constructor */
  ScrollTimeline?: ScrollTimelineFunc;
}

/**
 * Setup the testing environment for scrolling to work.
 * Adds global mocks for functions used by scrolling if they don't exist.
 */
export function setupScrollTesting(): void {
  const globals = globalThis as ScrollingGlobals;
  if (typeof globals.ScrollTimeline !== 'function') {
    globals.ScrollTimeline = jest.fn();
  }

  if (typeof HTMLElement.prototype.animate !== 'function') {
    HTMLElement.prototype.animate = jest.fn(
      () =>
        ({
          cancel: jest.fn(),
        }) as unknown as Animation,
    );
  }
}
