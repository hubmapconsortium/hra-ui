import { assertInInjectionContext, inject, Injectable, isDevMode } from '@angular/core';
import { EventPropsMap, EventType } from '@hra-ui/common/analytics/events';
import { hraAnalyticsPlugin } from '@hra-ui/common/analytics/plugins/hra-analytics';
import { Analytics } from 'analytics';
import { injectFeaturePath } from './feature/feature.directive';

export function injectAnalyticsLogEventFn(): <T extends EventType>(type: T, props: EventPropsMap[T]) => void {
  assertInInjectionContext(injectAnalyticsLogEventFn);
  const analytics = inject(AnalyticsService);
  const path = injectFeaturePath();
  return (type, props) => analytics.logEvent(type, { path: path(), ...props });
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  readonly instance = Analytics({
    app: '', // TODO
    // version?
    debug: isDevMode(),
    plugins: [hraAnalyticsPlugin()],
  });

  logEvent<T extends EventType>(type: T, props: EventPropsMap[T]): void {
    this.instance.track(type, props).catch((reason) => {
      if (type === EventType.Error) {
        // eslint-disable-next-line no-console -- Fall back to console if analytics failed to log
        console.error('Failed to track error [reason, props]: ', reason, props);
        return;
      }

      this.logEvent(EventType.Error, {
        message: `Failed to log event '${type}'`,
        context: props,
        reason: reason,
      });
    });
  }
}
