import { isPlatformBrowser } from '@angular/common';
import { assertInInjectionContext, inject, PLATFORM_ID } from '@angular/core';
import { CoreEvents, EventCategory, EventType } from '@hra-ui/common/analytics/events';
import { AnalyticsPlugin } from 'analytics';

/** Plugin configuration */
export interface HraEventFilterPluginConfig {
  /** Callback to check whether an event is enabled */
  isEventEnabled: (type: EventType, category?: EventCategory) => boolean;
}

/** Abort function */
type AbortFn = (reason: string) => unknown;

/**
 * Interface for data passed by the 'analytics' library to plugin callbacks.
 * Only declares the fields that are used by the hra plugin.
 */
interface EventData {
  /** Aborts the current event */
  abort: AbortFn;
  /** Payload data */
  payload: {
    /** Event type */
    event: EventType;
    /** Event options */
    options: {
      /** Event category */
      category?: EventCategory;
    };
  };
}

/**
 * An `analytics` plugin that filters events based on an `isEventEnabled` callback
 *
 * @param config Plugin configuration
 * @returns An analytics plugin
 */
export function hraEventFilterPlugin(config: HraEventFilterPluginConfig): AnalyticsPlugin {
  assertInInjectionContext(hraEventFilterPlugin);
  const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  const { isEventEnabled } = config;
  const abortIfDisabled = (type: EventType, category: EventCategory | undefined, abort: AbortFn) => {
    if (!isBrowser || !isEventEnabled(type, category)) {
      return abort(`Event '${type}' is disabled`);
    }
    return undefined;
  };

  return {
    name: 'hra-event-filter',
    config: {},
    pageStart({ abort }: EventData): unknown {
      const { type, category } = CoreEvents.PageView;
      return abortIfDisabled(type, category, abort);
    },
    identifyStart({ abort }: EventData): unknown {
      return abort('Identify disabled');
    },
    trackStart({ abort, payload }: EventData): unknown {
      const {
        event: type,
        options: { category },
      } = payload;
      return abortIfDisabled(type, category, abort);
    },
  };
}
