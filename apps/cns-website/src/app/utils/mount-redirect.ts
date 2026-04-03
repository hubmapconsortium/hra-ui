import { inject } from '@angular/core';
import { Route, Router, UrlSegmentGroup, UrlTree } from '@angular/router';
import { injectAppHref, joinWithSlash } from '@hra-ui/common/url';
import { NEVER } from 'rxjs';

/**
 * Create a route that redirects mounted paths to the corresponding URL on the server.
 *
 * @param prefix Initial path segments of the mount path.
 * @returns A route that redirects mounted paths to the corresponding URL on the server.
 */
export function createMountRedirectRoute(prefix: string): Route {
  return {
    path: prefix,
    canMatch: [() => inject(Router).navigated],
    children: [
      {
        path: '**',
        redirectTo: (snapshot) => {
          const baseUrl = injectAppHref();
          const group = new UrlSegmentGroup(snapshot.url, {});
          const root = new UrlSegmentGroup([], { primary: group });
          const tree = new UrlTree(root, snapshot.queryParams, snapshot.fragment);
          const url = joinWithSlash(baseUrl(), joinWithSlash(prefix, tree.toString()));
          window.location.assign(url);
          return NEVER;
        },
      },
    ],
  };
}
