import { isPlatformBrowser } from '@angular/common';
import { assertInInjectionContext, inject, PLATFORM_ID } from '@angular/core';
import { CoreEvents } from '@hra-ui/common/analytics/events';

/**
 * An `analytics` plugin that filters events based on an `isEventEnabled` callback
 *
 * @param config Plugin configuration
 * @returns An analytics plugin
 */
function hraEventFilterPlugin(config) {
    assertInInjectionContext(hraEventFilterPlugin);
    const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    const { isEventEnabled } = config;
    const abortIfDisabled = (type, category, abort) => {
        if (!isBrowser || !isEventEnabled(type, category)) {
            return abort(`Event '${type}' is disabled`);
        }
        return undefined;
    };
    return {
        name: 'hra-event-filter',
        config: {},
        pageStart({ abort }) {
            const { type, category } = CoreEvents.PageView;
            return abortIfDisabled(type, category, abort);
        },
        identifyStart({ abort }) {
            return abort('Identify disabled');
        },
        trackStart({ abort, payload }) {
            const { event: type, options: { category }, } = payload;
            return abortIfDisabled(type, category, abort);
        },
    };
}

/**
 * Generated bundle index. Do not edit.
 */

export { hraEventFilterPlugin };
//# sourceMappingURL=hra-ui-common-analytics-plugins-hra-event-filter.mjs.map
