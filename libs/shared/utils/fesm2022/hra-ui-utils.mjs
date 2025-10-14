import { LocationStrategy } from '@angular/common';
import { SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * Sets parameters with non-nullish values on a URLSearchParams
 * @param dest Object to set parameters on
 * @param params New parameters
 */
function setQueryParams(dest, params) {
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
function createInternalUrl(injector, commands, extras, isResourceUrl) {
    const router = injector.get(Router, null);
    const locationStrategy = injector.get(LocationStrategy, null);
    const sanitizer = injector.get(DomSanitizer);
    const route = extras.relativeTo ?? injector.get(ActivatedRoute, null);
    const securityContext = isResourceUrl ? SecurityContext.RESOURCE_URL : SecurityContext.URL;
    if (!router || !locationStrategy) {
        return undefined;
    }
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
function createExternalUrl(url, extras) {
    const { fragment, preserveFragment, queryParams, queryParamsHandling } = extras;
    const result = new URL(url);
    if (fragment !== undefined || preserveFragment === false) {
        result.hash = fragment ?? '';
    }
    if (queryParamsHandling === '') {
        result.search = '';
        setQueryParams(result.searchParams, queryParams);
    }
    else if (queryParamsHandling !== 'preserve') {
        setQueryParams(result.searchParams, queryParams);
    }
    return result.toString();
}

/**
 * Generated bundle index. Do not edit.
 */

export { createExternalUrl, createInternalUrl };
//# sourceMappingURL=hra-ui-utils.mjs.map
