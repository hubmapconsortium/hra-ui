import { CommonModule, DOCUMENT } from '@angular/common';
export { DOCUMENT } from '@angular/common';
import * as i0 from '@angular/core';
import { Pipe, NgModule, InjectionToken, inject, signal, effect, assertInInjectionContext } from '@angular/core';
import { AnalyticsModule } from '@hra-ui/common/analytics';
import { UrlModule } from '@hra-ui/common/url';
import { coerceElement } from '@angular/cdk/coercion';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs';

/**
 * Formats a value into a string containing only word characters and hyphens
 */
class SlugifyPipe {
    /**
     * Slugify the value
     *
     * @param value Input to slugify
     * @returns Slugified value
     */
    transform(value) {
        if (!value) {
            return '';
        }
        return value
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(/[^\w-]+/g, '') // Remove all non-word chars
            .replace(/--+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, ''); // Trim - from end of text
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: SlugifyPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "20.3.11", ngImport: i0, type: SlugifyPipe, isStandalone: true, name: "slugify" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: SlugifyPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'slugify',
                }]
        }] });

/**
 * Provides common directives and pipes.
 * Also reexports Angular's common module for ease of use.
 */
class HraCommonModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: HraCommonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.11", ngImport: i0, type: HraCommonModule, imports: [SlugifyPipe], exports: [CommonModule, AnalyticsModule, UrlModule, SlugifyPipe] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: HraCommonModule, imports: [CommonModule, AnalyticsModule, UrlModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: HraCommonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [SlugifyPipe],
                    exports: [CommonModule, AnalyticsModule, UrlModule, SlugifyPipe],
                }]
        }] });

/** Injection token for the window object (if available) */
const WINDOW = new InjectionToken('window', {
    providedIn: 'root',
    factory: () => inject(DOCUMENT).defaultView ?? undefined,
});
/** Injection token for IntersectionObserver (if available) */
const INTERSECTION_OBSERVER = new InjectionToken('IntersectionObserver', {
    providedIn: 'root',
    factory: () => inject(WINDOW)?.IntersectionObserver,
});

/**
 * Monitors the height of a given element.
 * @param elementFn The element function that fetches the element to monitor.
 * @returns Height as a signal.
 */
function monitorHeight(elementFn) {
    const height = signal(0, ...(ngDevMode ? [{ debugName: "height" }] : []));
    const observer = new ResizeObserver((entries) => {
        const value = entries[0].contentRect.height;
        height.set(value);
    });
    effect((onCleanup) => {
        const element = coerceElement(elementFn());
        height.set(element.getBoundingClientRect().height);
        observer.observe(element);
        onCleanup(() => observer.unobserve(element));
    });
    return height;
}

/**
 * Fetches the custom data from the current route.
 * @returns Signal containing data from the current route.
 */
function routeData() {
    assertInInjectionContext(routeData);
    const router = inject(Router);
    const data$ = router.events.pipe(filter((event) => event instanceof NavigationEnd), map(() => extractData(router)));
    return toSignal(data$, { initialValue: {} });
}
/**
 * Extracts the data from route using the router instance.
 * @param router Router instance.
 * @returns Data from the current route.
 */
function extractData(router) {
    const snapshot = router.routerState.snapshot;
    let route = snapshot.root;
    while (route.firstChild) {
        route = route.firstChild;
    }
    return route.data;
}

/**
 * Generated bundle index. Do not edit.
 */

export { HraCommonModule, INTERSECTION_OBSERVER, SlugifyPipe, WINDOW, monitorHeight, routeData };
//# sourceMappingURL=hra-ui-common.mjs.map
