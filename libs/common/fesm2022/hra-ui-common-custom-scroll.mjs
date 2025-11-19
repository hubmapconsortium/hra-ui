import { ViewportScroller } from '@angular/common';
import * as i0 from '@angular/core';
import { inject, Injectable } from '@angular/core';
import { Router, Scroll, NavigationEnd, NavigationSkipped } from '@angular/router';
import { filter, startWith, pairwise } from 'rxjs/operators';

/**
 * Custom scroll service to handle scroll restoration on navigation events
 */
class CustomScrollService {
    /**
     * Injects the Angular Router.
     */
    router = inject(Router);
    /**
     * Injects the ViewportScroller.
     */
    viewportScroller = inject(ViewportScroller);
    /**
     * CustomScrollService constructor
     * @param router The Angular Router instance to listen for navigation events
     * @param viewportScroller The ViewportScroller instance to manage scroll positions
     */
    constructor() {
        this.viewportScroller.setHistoryScrollRestoration('manual');
        this.handleScrollOnNavigation();
    }
    /**
     * Handles scroll restoration on navigation events.
     * It listens for scroll events and manages the scroll position based on the navigation type.
     * - If the navigation is backward, it restores the previous scroll position.
     * - If the navigation is to an anchor, it scrolls to that anchor.
     * - If the navigation is forward (i.e., route change), it scrolls to the top.
     */
    handleScrollOnNavigation() {
        this.router.events
            .pipe(filter((e) => e instanceof Scroll), startWith(new Scroll(new NavigationEnd(-1, '', ''), null, null)), pairwise())
            .subscribe((e) => {
            const previous = e[0];
            const current = e[1];
            if (current.position) {
                this.viewportScroller.scrollToPosition(current.position);
            }
            else if (current.anchor) {
                this.viewportScroller.scrollToAnchor(current.anchor);
            }
            else {
                const previousUrl = this.getUrlFromRouterEvent(previous.routerEvent);
                const currentUrl = this.getUrlFromRouterEvent(current.routerEvent);
                if (previousUrl && currentUrl && this.getBaseRoute(previousUrl) !== this.getBaseRoute(currentUrl)) {
                    this.viewportScroller.scrollToPosition([0, 0]);
                }
            }
        });
    }
    /**
     * Extracts the base route from a URL by removing any query parameters.
     * @param url The full URL to process
     * @returns The base route without query parameters
     */
    getBaseRoute(url) {
        return url.split('?')[0];
    }
    /**
     * Extracts the URL from a RouterEvent.
     * @param event The RouterEvent to extract the URL from
     * @returns The URL as a string, or null if the event does not contain a URL
     * */
    getUrlFromRouterEvent(event) {
        if (event instanceof NavigationEnd) {
            return event.urlAfterRedirects;
        }
        else if (event instanceof NavigationSkipped) {
            return event.url;
        }
        return null;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: CustomScrollService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: CustomScrollService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: CustomScrollService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [] });

/**
 * Generated bundle index. Do not edit.
 */

export { CustomScrollService };
//# sourceMappingURL=hra-ui-common-custom-scroll.mjs.map
