import { LocationStrategy } from '@angular/common';
import { Injector, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router, UrlCreationOptions } from '@angular/router';
import { Any } from '@hra-ui/utils/types';

/**
 * Sets parameters with non-nullish values on a URLSearchParams
 * @param dest Object to set parameters on
 * @param params New parameters
 */
function setQueryParams(dest: URLSearchParams, params: Params | null | undefined): void {
  for (const [key, value] of Object.entries(params ?? {})) {
    if (value != null) {
      dest.set(key, `${value}`);
    }
  }
}

/**
 * Creates an url from a set of route navigation commands
 * @param injector Injector to access router and other services required for the convertion
 * @param commands Navigation commands
 * @param extras Additional url creation options
 * @param isResourceUrl Whether the url will be used as a resource url or regular url for sanitation purposes
 * @returns An url string if the creation was successful, otherwise undefined
 */
export function createInternalUrl(
  injector: Injector,
  commands: Any[],
  extras: UrlCreationOptions,
  isResourceUrl: boolean
): string | undefined {
  const router = injector.get(Router);
  const locationStrategy = injector.get(LocationStrategy);
  const sanitizer = injector.get(DomSanitizer);
  const route = extras.relativeTo ?? injector.get(ActivatedRoute, null);
  const securityContext = isResourceUrl ? SecurityContext.RESOURCE_URL : SecurityContext.URL;
  const tree = router.createUrlTree(commands, {
    ...extras,
    relativeTo: route,
  });
  const url = locationStrategy.prepareExternalUrl(router.serializeUrl(tree));
  return sanitizer.sanitize(securityContext, url) ?? undefined;
}

/**
 * Creates an url with additional creation options
 * @param url The original url
 * @param extras Additional url creation options
 * @returns A new url
 */
export function createExternalUrl(url: string, extras: UrlCreationOptions): string {
  const { fragment, preserveFragment, queryParams, queryParamsHandling } = extras;
  const result = new URL(url);
  if (fragment !== undefined || preserveFragment === false) {
    result.hash = fragment ?? '';
  }

  if (queryParamsHandling === '') {
    result.search = '';
    setQueryParams(result.searchParams, queryParams);
  } else if (queryParamsHandling !== 'preserve') {
    setQueryParams(result.searchParams, queryParams);
  }

  return result.toString();
}
