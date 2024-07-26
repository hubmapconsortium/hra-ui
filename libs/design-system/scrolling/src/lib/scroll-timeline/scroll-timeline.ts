import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { InjectionToken, PLATFORM_ID, Signal, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { endWith, ignoreElements, interval, map, takeWhile } from 'rxjs';

export type ScrollTimelineFunc = new ({ source, axis }: { source: HTMLElement; axis: 'x' | 'y' }) => AnimationTimeline;

export const SCROLL_TIMELINE = new InjectionToken<Signal<ScrollTimelineFunc | null>>('SCROLL_TIMELINE', {
  providedIn: 'root',
  factory: () => {
    type WindowWithScrollTimeline = { ScrollTimeline: ScrollTimelineFunc };
    const window = inject(DOCUMENT).defaultView as WindowWithScrollTimeline | null;
    if (!isPlatformBrowser(inject(PLATFORM_ID)) || !window) {
      return signal(null);
    }

    const isAvailable = () => 'ScrollTimeline' in window;
    if (isAvailable()) {
      return signal(window['ScrollTimeline']);
    }

    const scrollTimeline$ = interval(100).pipe(
      takeWhile(() => !isAvailable()),
      ignoreElements(),
      endWith(null),
      map(() => window.ScrollTimeline),
    );

    return toSignal(scrollTimeline$, { initialValue: null });
  },
});
