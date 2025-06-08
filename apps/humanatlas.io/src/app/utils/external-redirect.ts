import { CanActivateFn, Route } from '@angular/router';
import { NotFoundPageComponent } from '@hra-ui/design-system/error-pages/not-found-page';

/**
 * Create a route that redirects to an external url
 *
 * @param url External url
 * @returns A route configured to redirect
 */
export function createExternalRedirectRoute(url: string): Route {
  const redirect: CanActivateFn = async () => {
    window.location.assign(url);
    return true;
  };

  return {
    // TODO Replace with redirect page component
    component: NotFoundPageComponent,
    canActivate: [redirect],
  };
}
