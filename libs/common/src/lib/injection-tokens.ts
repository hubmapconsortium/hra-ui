import { DOCUMENT } from '@angular/common';
import { inject, InjectionToken } from '@angular/core';

/** Injection token for the window object (if available) */
export const WINDOW = new InjectionToken('window', {
  providedIn: 'root',
  factory: () => inject(DOCUMENT).defaultView ?? undefined,
});

/** Injection token for IntersectionObserver (if available) */
export const INTERSECTION_OBSERVER = new InjectionToken('IntersectionObserver', {
  providedIn: 'root',
  factory: () => inject(WINDOW)?.IntersectionObserver,
});
