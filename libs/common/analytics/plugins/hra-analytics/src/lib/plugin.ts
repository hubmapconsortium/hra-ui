import { assertInInjectionContext, inject, Injector } from '@angular/core';
import { type AnalyticsPlugin } from 'analytics';
import { getSessionId } from './util/session-id';
import { EventWriterService } from './event-writer.service';

export interface HraAnalyticsOptions {
  sessionId?: string;
  injector?: Injector;
}

export function hraAnalyticsPlugin(options: HraAnalyticsOptions = {}): AnalyticsPlugin {
  if (!options.injector) {
    assertInInjectionContext(hraAnalyticsPlugin);
  }

  const { sessionId = getSessionId(), injector = inject(Injector) } = options;
  const writer = injector.get(EventWriterService);

  return {
    name: 'hra-analytics',
    config: {
      sessionId,
      writer,
    },
    loaded: () => true,
    page(payload) {
      console.log('page', payload, this);
      //
    },
    track(payload) {
      console.log('track', payload, this);
      //
    },
  };
}
