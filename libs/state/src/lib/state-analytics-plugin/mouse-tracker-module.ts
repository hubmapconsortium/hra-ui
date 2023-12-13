import { DOCUMENT } from '@angular/common';
import { Inject, NgModule } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { fromEvent, Subscription } from 'rxjs';
import { map, throttleTime } from 'rxjs/operators';

/**
 * Tracks mouse movement and returns position
 */
export function trackMousePosition(el: HTMLElement, ga: GoogleAnalyticsService): Subscription {
  const formatData = (event: MouseEvent) => {
    const { clientWidth, clientHeight } = el;
    const { clientX, clientY } = event;
    const points = [clientX, clientY, clientWidth, clientHeight];
    return points.join('_');
  };

  const events = fromEvent<MouseEvent>(el, 'mousemove').pipe(throttleTime(1000), map(formatData));

  return events.subscribe((data) => {
    return ga.event('webpage', 'mousemove', data);
  });
}

/**
 * Tracks mouse click and returns target class name
 */
export function trackMouseClicks(el: HTMLElement, ga: GoogleAnalyticsService): Subscription {
  const formatData = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    return target.className;
  };

  const events = fromEvent<MouseEvent>(el, 'click').pipe(map(formatData));

  return events.subscribe((data) => {
    return ga.event('webpage', 'click', data);
  });
}

@NgModule()
export class MouseTrackerModule {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    @Inject(DOCUMENT) document: any,
    ga: GoogleAnalyticsService
  ) {
    if (document) {
      trackMousePosition((document as Document).body, ga);
      trackMouseClicks((document as Document).body, ga);
    }
  }
}
