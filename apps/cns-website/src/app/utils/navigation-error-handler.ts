import { HttpErrorResponse } from '@angular/common/http';
import { assertInInjectionContext, inject } from '@angular/core';
import { NavigationError, RedirectCommand, Router } from '@angular/router';
import { AnalyticsService } from '@hra-ui/common/analytics';
import { CoreEvents } from '@hra-ui/common/analytics/events';

/**
 * Selects the appropriate redirect path based on the navigation error
 *
 * @param event Navigation error event
 * @returns Either the 404 or 500 error page path
 */
function selectRedirectPath(event: NavigationError): string {
  const { error } = event;
  if (error instanceof HttpErrorResponse && error.status === 404) {
    return '/404';
  }

  return '/500';
}

/**
 * Handles navigation errors by logging and redirecting to appropriate error pages
 *
 * @param event Navigation error event
 * @returns Redirect command to the appropriate error page
 */
export function handleNavigationError(event: NavigationError): RedirectCommand | undefined {
  assertInInjectionContext(handleNavigationError);

  if (event.error instanceof Event && event.error.type === 'abort') {
    return;
  }

  // Returning a redirect command stops router error propagation so we log the error here instead
  const analytics = inject(AnalyticsService);
  analytics.logEvent(CoreEvents.Error, {
    message: 'NavigationError',
    context: { url: event.url },
    reason: event.error,
  });

  const router = inject(Router);
  const path = selectRedirectPath(event);
  return new RedirectCommand(router.parseUrl(path), { skipLocationChange: true, replaceUrl: false });
}
