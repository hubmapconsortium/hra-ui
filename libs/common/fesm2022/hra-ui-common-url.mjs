import * as i0 from '@angular/core';
import { isSignal, linkedSignal, signal, computed, Pipe, inject, NgModule } from '@angular/core';
import { injectAppConfiguration } from '@hra-ui/common/injectors';
import { createInjectionToken } from 'ngxtension/create-injection-token';
import { getImportMetaUrl } from '@hra-ui/common/import-meta';
import { LocationStrategy } from '@angular/common';

/**
 * Wraps a href provider function with more permissive input types
 *
 * @param provide Raw provider function
 * @returns A provider function
 */
function createHrefProvider(provide) {
    return (valueOrFactory) => provide(() => {
        const value = typeof valueOrFactory === 'function' && !isSignal(valueOrFactory) ? valueOrFactory() : valueOrFactory;
        return isSignal(value) ? linkedSignal(value) : signal(value);
    }, false);
}

/**
 * Create a new injection function that returns an url resolver.
 * The resulting injection function must be called in an injection context.
 *
 * @param injectHref Injection function for the href signal
 * @param resolve Resolver implementation
 * @returns An injection function for getting the resolver
 */
function createUrlResolverInjector(injectHref, resolve) {
    const cache = new WeakMap();
    return () => {
        const href = injectHref();
        let resolver = cache.get(href);
        if (!resolver) {
            resolver = (value) => resolve(href(), value);
            cache.set(href, resolver);
        }
        return resolver;
    };
}
/**
 * Create a function that produces resolved url signals
 *
 * @param injectResolver Injection function for the resolver
 * @returns A function to create resolved url signals
 */
function createUrlResolverFn(injectResolver) {
    return (value) => {
        const resolver = injectResolver();
        const source = typeof value === 'string' ? () => value : value;
        return computed(() => resolver(source()));
    };
}

/**
 * Get the default application href
 */
function appHref() {
    const { url = '' } = injectAppConfiguration();
    return signal(url);
}
/**
 * Resolve an url against the application href.
 * If the url starts with the application href it is removed,
 * otherwise the url is returned unchanged.
 *
 * @param href Application href
 * @param value Url to resolve
 * @returns The resolved url
 */
function resolveAppUrl(href, value) {
    if (href !== '') {
        if (!href.endsWith('/')) {
            href = href + '/';
        }
        if (value.startsWith(href)) {
            return value.slice(href.length);
        }
    }
    return value;
}
/** Application href */
const APP_HREF = createInjectionToken(appHref);
/** Inject the application href */
const injectAppHref = APP_HREF[0];
/** Provide a new application href */
const provideAppHref = createHrefProvider(APP_HREF[1]);
/** Inject an url resolver that resolve urls against the application href */
const injectAppUrlResolver = createUrlResolverInjector(injectAppHref, resolveAppUrl);
/** Create a derived signal that resolves an url against the application href */
const appUrl = createUrlResolverFn(injectAppUrlResolver);
/** Pipe that resolves urls against the application href */
class AppUrlPipe {
    /** Resolver function */
    resolver = injectAppUrlResolver();
    /**
     * Resolve an url against the application href
     *
     * @param value Url to resolve
     * @returns Resolved url
     */
    transform(value) {
        return this.resolver(value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.5", ngImport: i0, type: AppUrlPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "21.1.5", ngImport: i0, type: AppUrlPipe, isStandalone: true, name: "appUrl" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.5", ngImport: i0, type: AppUrlPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'appUrl',
                }]
        }] });

/**
 * Test whether a path is an absolute url
 *
 * @param path Path to test
 * @returns true if the path is absolute, false otherwise
 */
function isAbsolute(path) {
    try {
        new URL(path);
        return true;
    }
    catch {
        return false;
    }
}
/**
 * Joins two paths with a signle slash between them
 *
 * @param start First path
 * @param end Second path
 * @returns The concatenated path
 */
function joinWithSlash(start, end) {
    if (!start) {
        return end;
    }
    else if (!end) {
        return start;
    }
    start = start.replace(/\/+$/, '');
    end = end.replace(/^\/+/, '');
    return `${start}/${end}`;
}
/**
 * Remove the trailing slash from a path while preserving the fragment and query parameters (if present)
 *
 * @param path Url to strip
 * @returns New url
 */
function stripTrailingSlash(path) {
    const index = path.search(/#|\?|$/);
    if (path[index - 1] === '/') {
        return path.slice(0, index - 1) + path.slice(index);
    }
    return path;
}
/**
 * Remove the leading hash symbol from a fragment (if present)
 *
 * @param fragment Fragment to strip
 * @returns New fragment
 */
function stripLeadingHash(fragment) {
    if (fragment && fragment[0] === '#') {
        return fragment.slice(1);
    }
    return fragment;
}

/**
 * Get the default asset href
 */
function assetHref() {
    try {
        const url = new URL('./', getImportMetaUrl());
        if (/https?:/.test(url.protocol)) {
            return signal(url.href);
        }
    }
    catch {
        // Ignore URL errors
    }
    return signal('');
}
/**
 * Resolve an url against the asset href
 *
 * @param href Asset href
 * @param value Url to resolve
 * @returns The resolved url
 */
function resolveAssetUrl(href, value) {
    return isAbsolute(value) ? value : joinWithSlash(href, value);
}
/** Asset href */
const ASSET_HREF = createInjectionToken(assetHref);
/** Inject the asset href */
const injectAssetHref = ASSET_HREF[0];
/** Provide a new asset href */
const provideAssetHref = createHrefProvider(ASSET_HREF[1]);
/** Inject an url resolver that resolve urls against the asset href */
const injectAssetUrlResolver = createUrlResolverInjector(injectAssetHref, resolveAssetUrl);
/** Create a derived signal that resolves an url against the asset href */
const assetUrl = createUrlResolverFn(injectAssetUrlResolver);
/** Pipe that resolves urls against the asset href */
class AssetUrlPipe {
    /** Resolver function */
    resolver = injectAssetUrlResolver();
    /**
     * Resolve an url against the asset href
     *
     * @param value Url to resolve
     * @returns Resolved url
     */
    transform(value) {
        return this.resolver(value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.5", ngImport: i0, type: AssetUrlPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "21.1.5", ngImport: i0, type: AssetUrlPipe, isStandalone: true, name: "assetUrl" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.5", ngImport: i0, type: AssetUrlPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'assetUrl',
                }]
        }] });

/**
 * Wrap an URL in CSS url() function
 *
 * @param value URL string or function returning URL string
 * @returns Signal with CSS url() wrapped URL
 */
function cssUrl(value) {
    const source = typeof value === 'string' ? () => value : value;
    return computed(() => `url("${source()}")`);
}
/**
 * Pipe for wrapping an URL in CSS url() function
 */
class CssUrlPipe {
    /**
     * Transform URL to CSS url() format
     *
     * @param url URL to transform
     * @returns CSS url() wrapped URL
     */
    transform(value) {
        return `url("${value}")`;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.5", ngImport: i0, type: CssUrlPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "21.1.5", ngImport: i0, type: CssUrlPipe, isStandalone: true, name: "cssUrl" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.5", ngImport: i0, type: CssUrlPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'cssUrl',
                }]
        }] });

/**
 * Get the default page href
 */
function pageHref() {
    const loc = inject(LocationStrategy);
    return signal(loc.getBaseHref());
}
/**
 * Resolve an url against the page href
 *
 * @param href Page href
 * @param value Url to resolve
 * @returns The resolved url
 */
function resolvePageUrl(href, value) {
    return isAbsolute(value) ? value : joinWithSlash(href, value);
}
/** Page href */
const PAGE_HREF = createInjectionToken(pageHref);
/** Inject the page href */
const injectPageHref = PAGE_HREF[0];
/** Provide a new page href */
const providePageHref = createHrefProvider(PAGE_HREF[1]);
/** Inject an url resolver that resolve urls against the page href */
const injectPageUrlResolver = createUrlResolverInjector(injectPageHref, resolvePageUrl);
/** Create a derived signal that resolves an url against the page href */
const pageUrl = createUrlResolverFn(injectPageUrlResolver);
/** Pipe that resolves urls against the page href */
class PageUrlPipe {
    /** Resolver function */
    resolver = injectPageUrlResolver();
    /**
     * Resolve an url against the page href
     *
     * @param value Url to resolve
     * @returns Resolved url
     */
    transform(value) {
        return this.resolver(value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.5", ngImport: i0, type: PageUrlPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "21.1.5", ngImport: i0, type: PageUrlPipe, isStandalone: true, name: "pageUrl" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.5", ngImport: i0, type: PageUrlPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'pageUrl',
                }]
        }] });

class UrlModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.5", ngImport: i0, type: UrlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "21.1.5", ngImport: i0, type: UrlModule, imports: [AppUrlPipe, AssetUrlPipe, PageUrlPipe, CssUrlPipe], exports: [AppUrlPipe, AssetUrlPipe, PageUrlPipe, CssUrlPipe] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "21.1.5", ngImport: i0, type: UrlModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.5", ngImport: i0, type: UrlModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [AppUrlPipe, AssetUrlPipe, PageUrlPipe, CssUrlPipe],
                    exports: [AppUrlPipe, AssetUrlPipe, PageUrlPipe, CssUrlPipe],
                }]
        }] });

/**
 * Test whether a set could possibly be a subset of another set purely based on their sizes.
 *
 * @param size1 Size of the first set
 * @param size2 Size of the second set
 * @param exact Whether the sizes should match exactly
 * @returns true if the `size1` is less or equal to `size2`, false otherwise
 */
function checkSubsetSize(size1, size2, exact) {
    return exact ? size1 === size2 : size1 <= size2;
}
/**
 * Test whether a set is a subset of another set.
 * Keys are compared case insensitively.
 *
 * @param iterable1 First set of key/value pairs
 * @param iterable2 Second set of key/value pairs
 * @returns true if the first set is a subset of the second one, false otherwise
 */
function checkSubset(iterable1, iterable2) {
    const entries1 = Array.from(iterable1);
    const entries2 = Array.from(iterable2);
    while (entries1.length > 0) {
        const [key1, value1] = entries1.pop();
        const index = entries2.findIndex(([key2, value2]) => key1.toLowerCase() === key2.toLowerCase() && value1 === value2);
        if (index < 0) {
            return false;
        }
        entries2.splice(index, 1);
    }
    return true;
}
/**
 * Parse a path segment that may contain matrix parameters.
 *
 * @param segment Raw segment string
 * @returns A parsed segment object
 */
function parseSegment(segment) {
    const parts = segment.split(';');
    const name = parts.shift();
    const matrix = [];
    for (const param of parts) {
        const [key, ...values] = param.split('=');
        matrix.push([key, values.join('=')]);
    }
    return { segment: name, matrix };
}
/**
 * Parse a path that may contain matrix parameters in one or more segments.
 *
 * @param path Raw path
 * @returns Array of path segments
 */
function parsePathSegments(path) {
    path = path.replace(/^\/+|\/+$/g, '');
    if (!path) {
        return [];
    }
    return path.split('/').map(parseSegment);
}
/**
 * Check whether two sets of matrix parameters match.
 *
 * @param params1 First set of matrix parameters
 * @param params2 Second set of matrix parameters
 * @param options Comparison options
 * @returns true if the first set matches the second set, false otherwise
 */
function compareMatrixParams(params1, params2, options) {
    if (options.matrixParams === 'ignored') {
        return true;
    }
    else if (!checkSubsetSize(params1.length, params2.length, options.matrixParams === 'exact')) {
        return false;
    }
    return checkSubset(params1, params2);
}
/**
 * Check whether two url paths match.
 *
 * @param path1 First raw path
 * @param path2 Second raw path
 * @param options Comparison options
 * @returns true if the two paths matches, false otherwise
 */
function comparePathsWithMatrixParams(path1, path2, options) {
    if (path1 === path2) {
        return true;
    }
    const parsed1 = parsePathSegments(path1);
    const parsed2 = parsePathSegments(path2);
    if (!checkSubsetSize(parsed1.length, parsed2.length, options.paths === 'exact')) {
        return false;
    }
    for (let index = 0; index < parsed1.length; index++) {
        const segment1 = parsed1[index];
        const segment2 = parsed2[index];
        if (segment1.segment !== segment2.segment || !compareMatrixParams(segment1.matrix, segment2.matrix, options)) {
            return false;
        }
    }
    return true;
}
/**
 * Check whether two sets of query parameters match.
 *
 * @param params1 First set of query parameters
 * @param params2 Second set of query parameters
 * @param options Comparison options
 * @returns true if the query parameters match, false otherwise
 */
function compareQueryParams(params1, params2, options) {
    if (options.queryParams === 'ignored') {
        return true;
    }
    else if (!checkSubsetSize(params1.size, params2.size, options.queryParams === 'exact')) {
        return false;
    }
    // Typescript 5.9.3 is missing the iterator methods on URLSearchParams in lib.dom.d.ts
    return checkSubset(params1, params2);
}
/**
 * Check whether two url fragments match.
 *
 * @param fragment1 First fragment
 * @param fragment2 Second fragment
 * @param options Comparison options
 * @returns true if the fragments match, false otherwise
 */
function compareFragments(fragment1, fragment2, options) {
    return options.fragment === 'ignored' || stripLeadingHash(fragment1) === stripLeadingHash(fragment2);
}
/**
 * Check whether a target url matches the current url based on the match options.
 *
 * @param targetUrl Url to test
 * @param currentUrl Current/active url to test against
 * @param options Comparison options
 * @returns true if `targetUrl` matches `currentUrl`, false otherwise
 */
function isUrlActive(targetUrl, currentUrl, options) {
    const base = 'http://localhost';
    const target = new URL(targetUrl, base);
    const current = new URL(currentUrl, base);
    const sameOrigin = target.origin === current.origin || target.origin === base;
    return (sameOrigin &&
        comparePathsWithMatrixParams(target.pathname, current.pathname, options) &&
        compareQueryParams(target.searchParams, current.searchParams, options) &&
        compareFragments(target.hash, current.hash, options));
}

/**
 * Generated bundle index. Do not edit.
 */

export { AppUrlPipe, AssetUrlPipe, CssUrlPipe, PageUrlPipe, UrlModule, appUrl, assetUrl, cssUrl, injectAppHref, injectAppUrlResolver, injectAssetHref, injectAssetUrlResolver, injectPageHref, injectPageUrlResolver, isAbsolute, isUrlActive, joinWithSlash, pageUrl, provideAppHref, provideAssetHref, providePageHref, stripLeadingHash, stripTrailingSlash };
//# sourceMappingURL=hra-ui-common-url.mjs.map
