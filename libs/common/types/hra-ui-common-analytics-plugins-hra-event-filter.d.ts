import { EventType, EventCategory } from '@hra-ui/common/analytics/events';
import { AnalyticsPlugin } from 'analytics';

/** Plugin configuration */
interface HraEventFilterPluginConfig {
    /** Callback to check whether an event is enabled */
    isEventEnabled: (type: EventType, category?: EventCategory) => boolean;
}
/**
 * An `analytics` plugin that filters events based on an `isEventEnabled` callback
 *
 * @param config Plugin configuration
 * @returns An analytics plugin
 */
declare function hraEventFilterPlugin(config: HraEventFilterPluginConfig): AnalyticsPlugin;

export { hraEventFilterPlugin };
export type { HraEventFilterPluginConfig };
