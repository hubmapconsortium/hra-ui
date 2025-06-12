import { DOCUMENT } from '@angular/common';
import { NgModule, inject } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Subscription, fromEvent } from 'rxjs';
import { map, throttleTime } from 'rxjs/operators';

export function trackMousePosition(el: HTMLElement, ga: GoogleAnalyticsService): Subscription {
  const formatData = (event: MouseEvent) => {
    const { clientWidth, clientHeight } = el;
    const { clientX, clientY } = event;
    const points = [clientX, clientY, clientWidth, clientHeight];
    return points.join('_');
  };

  const events = fromEvent<MouseEvent>(el, 'mousemove').pipe(throttleTime(1000), map(formatData));

  return events.subscribe((data) => ga.event('webpage', 'mousemove', data));
}

@NgModule()
export class MousePositionTrackerModule {
  constructor() {
    const document = inject(DOCUMENT);
    const ga = inject(GoogleAnalyticsService);

    if (document) {
      trackMousePosition((document as Document).body, ga);
    }
  }
}
