import { assertInInjectionContext, inject, Injector } from '@angular/core';
import { type AnalyticsPlugin } from 'analytics';
import { getSessionId } from './util/session-id';
import { EventWriterService } from './event-writer.service';

export interface HraAnalyticsOptions {
  sessionId?: string;
  injector?: Injector;
}

interface EventData {
  config: {
    sessionId: string;
    writer: Pick<EventWriterService, 'write'>;
  };
  payload: {
    event: string;
    properties: object;
  };
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
    page({ config, payload }: EventData) {
      config.writer.write('pageView', payload.properties, { sessionId: config.sessionId });
    },
    track({ config, payload }: EventData) {
      config.writer.write(payload.event, payload.properties, { sessionId: config.sessionId });
    },
  };
}
