import * as i2 from '@angular/common';
export { DOCUMENT } from '@angular/common';
import * as i0 from '@angular/core';
import { PipeTransform, InjectionToken, ElementRef, Signal } from '@angular/core';
import * as i3 from '@hra-ui/common/analytics';
import * as i4 from '@hra-ui/common/url';
import { Data } from '@angular/router';

/**
 * Formats a value into a string containing only word characters and hyphens
 */
declare class SlugifyPipe implements PipeTransform {
    /**
     * Slugify the value
     *
     * @param value Input to slugify
     * @returns Slugified value
     */
    transform(value: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<SlugifyPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<SlugifyPipe, "slugify", true>;
}

/**
 * Provides common directives and pipes.
 * Also reexports Angular's common module for ease of use.
 */
declare class HraCommonModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<HraCommonModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<HraCommonModule, never, [typeof SlugifyPipe], [typeof i2.CommonModule, typeof i3.AnalyticsModule, typeof i4.UrlModule, typeof SlugifyPipe]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<HraCommonModule>;
}

/** Injection token for the window object (if available) */
declare const WINDOW: InjectionToken<(Window & typeof globalThis) | undefined>;
/** Injection token for IntersectionObserver (if available) */
declare const INTERSECTION_OBSERVER: InjectionToken<{
    new (callback: IntersectionObserverCallback, options?: IntersectionObserverInit): IntersectionObserver;
    prototype: IntersectionObserver;
} | undefined>;

/**
 * Monitors the height of a given element.
 * @param elementFn The element function that fetches the element to monitor.
 * @returns Height as a signal.
 */
declare function monitorHeight(elementFn: () => Element | ElementRef<Element>): Signal<number>;

/**
 * Fetches the custom data from the current route.
 * @returns Signal containing data from the current route.
 */
declare function routeData(): Signal<Data>;

export { HraCommonModule, INTERSECTION_OBSERVER, SlugifyPipe, WINDOW, monitorHeight, routeData };
