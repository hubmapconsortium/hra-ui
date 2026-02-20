import * as i0 from '@angular/core';

/**
 * Custom scroll service to handle scroll restoration on navigation events
 */
declare class CustomScrollService {
    /**
     * Injects the Angular Router.
     */
    private router;
    /**
     * Injects the ViewportScroller.
     */
    private viewportScroller;
    /**
     * CustomScrollService constructor
     * @param router The Angular Router instance to listen for navigation events
     * @param viewportScroller The ViewportScroller instance to manage scroll positions
     */
    constructor();
    /**
     * Handles scroll restoration on navigation events.
     * It listens for scroll events and manages the scroll position based on the navigation type.
     * - If the navigation is backward, it restores the previous scroll position.
     * - If the navigation is to an anchor, it scrolls to that anchor.
     * - If the navigation is forward (i.e., route change), it scrolls to the top.
     */
    private handleScrollOnNavigation;
    /**
     * Extracts the base route from a URL by removing any query parameters.
     * @param url The full URL to process
     * @returns The base route without query parameters
     */
    private getBaseRoute;
    /**
     * Extracts the URL from a RouterEvent.
     * @param event The RouterEvent to extract the URL from
     * @returns The URL as a string, or null if the event does not contain a URL
     * */
    private getUrlFromRouterEvent;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomScrollService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CustomScrollService>;
}

export { CustomScrollService };
