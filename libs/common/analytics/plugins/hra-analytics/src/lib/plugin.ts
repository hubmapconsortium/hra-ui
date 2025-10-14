import { assertInInjectionContext, inject } from '@angular/core';
import { CoreEvents, EventPayload } from '@hra-ui/common/analytics/events';
import { AnalyticsInstance, PageData, type AnalyticsPlugin } from 'analytics';
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
    properties: PageData | EventPayload<object>;
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
      telemetry.send(buildEventData(instance, config_, CoreEvents.PageView.type, payload.properties));
    },
    track({ config: config_, instance, payload: { event, properties } }: EventData) {
      telemetry.send(buildEventData(instance, config_, event, properties));
    },
  };
}

/**
 * Builds the data to send to analytics.
 * Adds common fields like app, version, etc. and normalizes event payloads.
 *
 * @param instance Analytics instance
 * @param config Plugin config
 * @param event Event name
 * @param props Event properties
 * @returns Data to send to analytics
 */
function buildEventData(
  instance: AnalyticsInstance,
  config: HraAnalyticsPluginConfig,
  event: string,
  props: PageData | EventPayload<object>,
): object {
  const { trigger, triggerData } = props;
  let path: string | undefined = undefined;
  if (event !== CoreEvents.PageView.type) {
    path = props.path;
    props = { ...props };
    delete props.path;
    delete props.trigger;
    delete props.triggerData;
  }

  return {
    sv: 0,
    sessionId: config.sessionId,
    app: instance.getState('context.app'),
    version: instance.getState('context.version'),
    event,
    path,
    trigger,
    triggerData,
    e: props,
  };
}
