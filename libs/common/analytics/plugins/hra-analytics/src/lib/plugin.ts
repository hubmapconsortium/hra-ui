import { assertInInjectionContext, inject, Injector } from '@angular/core';
import { CoreEventType } from '@hra-ui/common/analytics/events';
import { AnalyticsInstance, type AnalyticsPlugin } from 'analytics';
import { EventWriterService } from './event-writer.service';
import { getSessionId } from './util/session-id';

/** Plugin options */
export interface HraAnalyticsPluginOptions {
  /** Session identifier */
  sessionId?: string;
  /** Injector if not running inside an injection context */
  injector?: Injector;
}

/** Plugin configuration */
interface PluginConfig {
  /** Resolved session id */
  sessionId: string;
}

/**
 * Interface for data passed by the 'analytics' library to plugin callbacks.
 * Only declares the fields that are used by the hra plugin.
 */
interface EventData {
  /** Plugin configuration */
  config: PluginConfig;
  /** Reference to the owning analytics instance */
  instance: AnalyticsInstance;
  /** Payload data */
  payload: {
    /** Event type */
    event?: string;
    /** User data */
    properties: object;
  };
}

export function hraAnalyticsPlugin(options: HraAnalyticsPluginOptions = {}): AnalyticsPlugin {
  if (!options.injector) {
    assertInInjectionContext(hraAnalyticsPlugin);
  }

  const { sessionId = getSessionId(), injector = inject(Injector) } = options;
  const writer = injector.get(EventWriterService);

  return {
    name: 'hra-analytics',
    config: {
      sessionId,
    } satisfies PluginConfig,
    loaded: () => true,
    page({ config, instance, payload }: EventData) {
      writer.write(CoreEventType.PageView, payload.properties, {
        app: instance.getState('context.app'),
        version: instance.getState('context.version'),
        sessionId: config.sessionId,
      });
    },
    track({ config, payload }: EventData) {
      const { event = 'unknown', properties } = payload;
      writer.write(event, properties, { sessionId: config.sessionId });
    },
  };
}
