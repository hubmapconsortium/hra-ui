import { assertInInjectionContext, inject } from '@angular/core';
import { EventType, Router } from '@angular/router';
import { CoreEvents } from '@hra-ui/common/analytics/events';
import { AnalyticsService } from '../analytics/analytics.service';

/**
 * Setup a router event listener that logs page views and errors to analytics
 */
export function setupRouterEventListener(): void {
  assertInInjectionContext(setupRouterEventListener);
  const analytics = inject(AnalyticsService);
  const router = inject(Router);

  router.events.subscribe((event) => {
    switch (event.type) {
      case EventType.NavigationEnd:
        analytics.logPageView();
        break;

      case EventType.NavigationError:
        analytics.logEvent(CoreEvents.Error, {
          message: 'NavigationError',
          context: { url: event.url },
          reason: event.error,
        });
        break;
    }
  });
}
