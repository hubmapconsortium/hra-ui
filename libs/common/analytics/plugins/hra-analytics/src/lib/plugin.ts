import { assertInInjectionContext, inject } from '@angular/core';
import { CoreEvents } from '@hra-ui/common/analytics/events';
import { AnalyticsInstance, type AnalyticsPlugin } from 'analytics';
import { TelemetryService } from './telemetry/telemetry.service';

/** Plugin options */
export interface HraAnalyticsPluginOptions {
  /** Session identifier */
  sessionId: string;
}

/**
 * Interface for data passed by the 'analytics' library to plugin callbacks.
 * Only declares the fields that are used by the hra plugin.
 */
interface EventData {
  /** Plugin configuration */
  config: HraAnalyticsPluginOptions;
  /** Reference to the owning analytics instance */
  instance: AnalyticsInstance;
  /** Payload data */
  payload: {
    /** Event type */
    event: string;
    /** User data */
    properties: object;
  };
}

/**
 * An `analytics` plugin that logs events to a hra endpoint
 *
 * @param options Plugin options
 * @returns An analytics plugin
 */
export function hraAnalyticsPlugin(options: HraAnalyticsPluginOptions): AnalyticsPlugin {
  assertInInjectionContext(hraAnalyticsPlugin);
  const telemetry = inject(TelemetryService);

  return {
    name: 'hra-analytics',
    config: options,
    page({ config, instance, payload }: EventData) {
      telemetry.send({
        sessionId: config.sessionId,
        app: instance.getState('context.app'),
        version: instance.getState('context.version'),
        event: CoreEvents.PageView.type,
        e: payload.properties,
      });
    },
    track({ config, payload: { event, properties } }: EventData) {
      telemetry.send({
        sessionId: config.sessionId,
        event,
        e: properties,
      });
    },
  };
}
