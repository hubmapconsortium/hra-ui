import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { InjectionToken, PLATFORM_ID, Signal, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, endWith, ignoreElements, interval, map, takeWhile } from 'rxjs';

/** Basic signature of the ScrollTimeline constructor */
export type ScrollTimelineFunc = new ({ source, axis }: { source: HTMLElement; axis: 'x' | 'y' }) => AnimationTimeline;

/**
 * Interval between scroll timeline availability checks.
 * Primarily used to simplify testing.
 */
export const SCROLL_TIMELINE_QUERY_INTERVAL = new InjectionToken<Observable<number>>('SCROLL_TIMELINE_QUERY_INTERVAL', {
  providedIn: 'root',
  factory: () => interval(100),
});

/**
 * Provides ScrollTimeline as a signal.
 * If not natively implemented it will try to wait for a polyfill
 * to provide the function.
 */
export const SCROLL_TIMELINE = new InjectionToken<Signal<ScrollTimelineFunc | null>>('SCROLL_TIMELINE', {
  providedIn: 'root',
  factory: () => {
    type WindowWithScrollTimeline = { ScrollTimeline: ScrollTimelineFunc };
    const window = inject(DOCUMENT).defaultView as unknown as WindowWithScrollTimeline | null;
    if (!isPlatformBrowser(inject(PLATFORM_ID)) || !window) {
      return signal(null);
    }

    const isAvailable = () => 'ScrollTimeline' in window && typeof window.ScrollTimeline === 'function';
    if (isAvailable()) {
      return signal(window['ScrollTimeline']);
    }

    const scrollTimeline$ = inject(SCROLL_TIMELINE_QUERY_INTERVAL).pipe(
      takeWhile(() => !isAvailable()),
      ignoreElements(),
      endWith(null),
      map(() => window.ScrollTimeline),
    );

    return toSignal(scrollTimeline$, { initialValue: null });
  },
});
