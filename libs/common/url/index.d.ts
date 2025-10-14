import * as _angular_core from '@angular/core';
import { PipeTransform, WritableSignal, Signal, Provider } from '@angular/core';
import * as _hra_ui_common_url from '@hra-ui/common/url';
import { CreateInjectionTokenReturn } from 'ngxtension/create-injection-token';

/** Inject the application href */
declare const injectAppHref: {
    (): WritableSignal<string>;
    (injectOptions: _angular_core.InjectOptions & {
        optional?: false;
    } & {
        injector?: _angular_core.Injector;
    }): WritableSignal<string>;
    (injectOptions: _angular_core.InjectOptions & {
        injector?: _angular_core.Injector;
    }): WritableSignal<string> | null;
};
/** Provide a new application href */
declare const provideAppHref: _hra_ui_common_url.ProvideHrefFn;
/** Inject an url resolver that resolve urls against the application href */
declare const injectAppUrlResolver: _hra_ui_common_url.InjectUrlResolverFn;
/** Create a derived signal that resolves an url against the application href */
declare const appUrl: (value: string | (() => string)) => _angular_core.Signal<string>;
/** Pipe that resolves urls against the application href */
declare class AppUrlPipe implements PipeTransform {
    /** Resolver function */
    private readonly resolver;
    /**
     * Resolve an url against the application href
     *
     * @param value Url to resolve
     * @returns Resolved url
     */
    transform(value: string): string;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<AppUrlPipe, never>;
    static ɵpipe: _angular_core.ɵɵPipeDeclaration<AppUrlPipe, "appUrl", true>;
}

/** Inject the asset href */
declare const injectAssetHref: {
    (): WritableSignal<string>;
    (injectOptions: _angular_core.InjectOptions & {
        optional?: false;
    } & {
        injector?: _angular_core.Injector;
    }): WritableSignal<string>;
    (injectOptions: _angular_core.InjectOptions & {
        injector?: _angular_core.Injector;
    }): WritableSignal<string> | null;
};
/** Provide a new asset href */
declare const provideAssetHref: _hra_ui_common_url.ProvideHrefFn;
/** Inject an url resolver that resolve urls against the asset href */
declare const injectAssetUrlResolver: _hra_ui_common_url.InjectUrlResolverFn;
/** Create a derived signal that resolves an url against the asset href */
declare const assetUrl: (value: string | (() => string)) => _angular_core.Signal<string>;
/** Pipe that resolves urls against the asset href */
declare class AssetUrlPipe implements PipeTransform {
    /** Resolver function */
    private readonly resolver;
    /**
     * Resolve an url against the asset href
     *
     * @param value Url to resolve
     * @returns Resolved url
     */
    transform(value: string): string;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<AssetUrlPipe, never>;
    static ɵpipe: _angular_core.ɵɵPipeDeclaration<AssetUrlPipe, "assetUrl", true>;
}

/** Inject the page href */
declare const injectPageHref: {
    (): WritableSignal<string>;
    (injectOptions: _angular_core.InjectOptions & {
        optional?: false;
    } & {
        injector?: _angular_core.Injector;
    }): WritableSignal<string>;
    (injectOptions: _angular_core.InjectOptions & {
        injector?: _angular_core.Injector;
    }): WritableSignal<string> | null;
};
/** Provide a new page href */
declare const providePageHref: _hra_ui_common_url.ProvideHrefFn;
/** Inject an url resolver that resolve urls against the page href */
declare const injectPageUrlResolver: _hra_ui_common_url.InjectUrlResolverFn;
/** Create a derived signal that resolves an url against the page href */
declare const pageUrl: (value: string | (() => string)) => _angular_core.Signal<string>;
/** Pipe that resolves urls against the page href */
declare class PageUrlPipe implements PipeTransform {
    /** Resolver function */
    private readonly resolver;
    /**
     * Resolve an url against the page href
     *
     * @param value Url to resolve
     * @returns Resolved url
     */
    transform(value: string): string;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<PageUrlPipe, never>;
    static ɵpipe: _angular_core.ɵɵPipeDeclaration<PageUrlPipe, "pageUrl", true>;
}

/**
 * Wrap an URL in CSS url() function
 *
 * @param value URL string or function returning URL string
 * @returns Signal with CSS url() wrapped URL
 */
declare function cssUrl(value: string | (() => string)): Signal<string>;
/**
 * Pipe for wrapping an URL in CSS url() function
 */
declare class CssUrlPipe implements PipeTransform {
    /**
     * Transform URL to CSS url() format
     *
     * @param url URL to transform
     * @returns CSS url() wrapped URL
     */
    transform(value: string): string;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<CssUrlPipe, never>;
    static ɵpipe: _angular_core.ɵɵPipeDeclaration<CssUrlPipe, "cssUrl", true>;
}

declare class UrlModule {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<UrlModule, never>;
    static ɵmod: _angular_core.ɵɵNgModuleDeclaration<UrlModule, never, [typeof AppUrlPipe, typeof AssetUrlPipe, typeof PageUrlPipe, typeof CssUrlPipe], [typeof AppUrlPipe, typeof AssetUrlPipe, typeof PageUrlPipe, typeof CssUrlPipe]>;
    static ɵinj: _angular_core.ɵɵInjectorDeclaration<UrlModule>;
}

/**
 * Test whether a path is an absolute url
 *
 * @param path Path to test
 * @returns true if the path is absolute, false otherwise
 */
declare function isAbsolute(path: string): boolean;
/**
 * Joins two paths with a signle slash between them
 *
 * @param start First path
 * @param end Second path
 * @returns The concatenated path
 */
declare function joinWithSlash(start: string, end: string): string;

/** A value or a factory function */
type ValueOrFactory<T> = T | (() => T);
/** Href inject function */
type InjectHrefFn = CreateInjectionTokenReturn<WritableSignal<string>>[0];
/** Href provide function */
type ProvideHrefFn = (valueOrFactory: ValueOrFactory<string | Signal<string>>) => Provider;
/** Url resolver function */
type UrlResolverFn = (value: string) => string;
/** Url resolver inject function */
type InjectUrlResolverFn = () => UrlResolverFn;

export { AppUrlPipe, AssetUrlPipe, CssUrlPipe, PageUrlPipe, UrlModule, appUrl, assetUrl, cssUrl, injectAppHref, injectAppUrlResolver, injectAssetHref, injectAssetUrlResolver, injectPageHref, injectPageUrlResolver, isAbsolute, joinWithSlash, pageUrl, provideAppHref, provideAssetHref, providePageHref };
export type { InjectHrefFn, InjectUrlResolverFn, ProvideHrefFn, UrlResolverFn };
