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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: AppUrlPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "20.3.7", ngImport: i0, type: AppUrlPipe, isStandalone: true, name: "appUrl" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: AppUrlPipe, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: AssetUrlPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "20.3.7", ngImport: i0, type: AssetUrlPipe, isStandalone: true, name: "assetUrl" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: AssetUrlPipe, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: CssUrlPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "20.3.7", ngImport: i0, type: CssUrlPipe, isStandalone: true, name: "cssUrl" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: CssUrlPipe, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: PageUrlPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "20.3.7", ngImport: i0, type: PageUrlPipe, isStandalone: true, name: "pageUrl" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: PageUrlPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'pageUrl',
                }]
        }] });

class UrlModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: UrlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.7", ngImport: i0, type: UrlModule, imports: [AppUrlPipe, AssetUrlPipe, PageUrlPipe, CssUrlPipe], exports: [AppUrlPipe, AssetUrlPipe, PageUrlPipe, CssUrlPipe] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: UrlModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: UrlModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [AppUrlPipe, AssetUrlPipe, PageUrlPipe, CssUrlPipe],
                    exports: [AppUrlPipe, AssetUrlPipe, PageUrlPipe, CssUrlPipe],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { AppUrlPipe, AssetUrlPipe, CssUrlPipe, PageUrlPipe, UrlModule, appUrl, assetUrl, cssUrl, injectAppHref, injectAppUrlResolver, injectAssetHref, injectAssetUrlResolver, injectPageHref, injectPageUrlResolver, isAbsolute, joinWithSlash, pageUrl, provideAppHref, provideAssetHref, providePageHref };
//# sourceMappingURL=hra-ui-common-url.mjs.map
