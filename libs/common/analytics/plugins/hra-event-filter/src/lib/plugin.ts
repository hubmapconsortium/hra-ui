import { CoreEvents, EventCategory, EventType } from '@hra-ui/common/analytics/events';
import { AnalyticsPlugin } from 'analytics';

/** Plugin options */
export interface HraEventFilterPluginOptions {
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
 * @param options Plugin options
 * @returns An analytics plugin
 */
export function hraEventFilterPlugin(options: HraEventFilterPluginOptions): AnalyticsPlugin {
  const { isEventEnabled } = options;
  const abortIfDisabled = (type: EventType, category: EventCategory | undefined, abort: AbortFn) => {
    if (!isEventEnabled(type, category)) {
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
