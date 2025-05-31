import { Injectable } from '@angular/core';
import { Router, Event, Scroll, NavigationEnd, NavigationSkipped, RouterEvent } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter, pairwise } from 'rxjs/operators';

/**
 * Custom scroll service to handle scroll restoration on navigation events
 */
@Injectable({ providedIn: 'root' })
export class CustomScrollService {
  /**
   * CustomScrollService constructor
   * @param router The Angular Router instance to listen for navigation events
   * @param viewportScroller The ViewportScroller instance to manage scroll positions
   */
  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller,
  ) {
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
  private handleScrollOnNavigation(): void {
    this.router.events
      .pipe(
        filter((e: Event): e is Scroll => e instanceof Scroll),
        pairwise(),
      )
      .subscribe((e: Scroll[]) => {
        const previous = e[0];
        const current = e[1];

        if (current.position) {
          this.viewportScroller.scrollToPosition(current.position);
        } else if (current.anchor) {
          this.viewportScroller.scrollToAnchor(current.anchor);
        } else {
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
  private getBaseRoute(url: string): string {
    return url.split('?')[0];
  }

  /**
   * Extracts the URL from a RouterEvent.
   * @param event The RouterEvent to extract the URL from
   * @returns The URL as a string, or null if the event does not contain a URL
   * */
  private getUrlFromRouterEvent(event: RouterEvent): string | null {
    if (event instanceof NavigationEnd) {
      return event.urlAfterRedirects;
    } else if (event instanceof NavigationSkipped) {
      return event.url;
    }
    return null;
  }
}
