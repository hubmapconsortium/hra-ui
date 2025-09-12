import { assertInInjectionContext, inject } from '@angular/core';
import { CoreEvents } from '@hra-ui/common/analytics/events';
import { AnalyticsInstance, type AnalyticsPlugin } from 'analytics';
import { TelemetryService } from './telemetry/telemetry.service';

/** Plugin configuration */
export interface HraAnalyticsPluginConfig {
  /** Session identifier */
  sessionId: string;
}

/**
 * Interface for data passed by the 'analytics' library to plugin callbacks.
 * Only declares the fields that are used by the hra plugin.
 */
interface EventData {
  /** Plugin configuration */
  config: HraAnalyticsPluginConfig;
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
 * @param config Plugin configuration
 * @returns An analytics plugin
 */
export function hraAnalyticsPlugin(config: HraAnalyticsPluginConfig): AnalyticsPlugin {
  assertInInjectionContext(hraAnalyticsPlugin);
  const telemetry = inject(TelemetryService);

  return {
    name: 'hra-analytics',
    config: config,
    page({ config: config_, instance, payload }: EventData) {
      telemetry.send({
        sessionId: config_.sessionId,
        app: instance.getState('context.app'),
        version: instance.getState('context.version'),
        event: CoreEvents.PageView.type,
        e: payload.properties,
      });
    },
    track({ config: config_, payload: { event, properties } }: EventData) {
      telemetry.send({
        sessionId: config_.sessionId,
        event,
        e: properties,
      });
    },
  };
}
