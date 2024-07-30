import type { ScrollTimelineFunc } from '@hra-ui/design-system/scrolling';
import { mock } from 'jest-mock-extended';

interface ScrollingGlobals {
  ScrollTimeline?: ScrollTimelineFunc;
}

export function setupScrollTesting(): void {
  const globals = globalThis as ScrollingGlobals;
  if (typeof globals.ScrollTimeline !== 'function') {
    globals.ScrollTimeline = jest.fn();
  }

  if (typeof HTMLElement.prototype.animate !== 'function') {
    HTMLElement.prototype.animate = jest.fn(() => mock());
  }
}
