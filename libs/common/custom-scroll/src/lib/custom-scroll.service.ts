import { ViewportScroller } from '@angular/common';
import { inject, Injectable, InjectionToken, Provider } from '@angular/core';
import { Event, NavigationEnd, NavigationSkipped, Router, RouterEvent, Scroll } from '@angular/router';
import { filter, pairwise, startWith } from 'rxjs/operators';

/** Custom scroll options */
export interface CustomScrollOptions {
  /**
   * Whether route changes and restored positions jump instantly, skipping the document's smooth scroll-behavior,
   * so a new page starts at the top right away. Anchor links still scroll smoothly.
   */
  instantNavigation: boolean;
}

/** Injection token for custom scroll options */
export const CUSTOM_SCROLL_OPTIONS = new InjectionToken<CustomScrollOptions>('CustomScrollOptions', {
  providedIn: 'root',
  factory: () => ({ instantNavigation: false }),
});

/**
 * Provides custom scroll options
 *
 * @param options Custom scroll options
 * @returns A provider for the options
 */
export function provideCustomScrollOptions(options: CustomScrollOptions): Provider {
  return { provide: CUSTOM_SCROLL_OPTIONS, useValue: options };
}

/**
 * Custom scroll service to handle scroll restoration on navigation events
 */
@Injectable({ providedIn: 'root' })
export class CustomScrollService {
  /**
   * Injects the Angular Router.
   */
  private router = inject(Router);
  /**
   * Injects the ViewportScroller.
   */
  private viewportScroller = inject(ViewportScroller);
  /**
   * Scroll options for route changes and restored positions
   */
  private navigationScrollOptions: ScrollOptions | undefined = inject(CUSTOM_SCROLL_OPTIONS).instantNavigation
    ? { behavior: 'instant' }
    : undefined;

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
  private handleScrollOnNavigation(): void {
    this.router.events
      .pipe(
        filter((e: Event): e is Scroll => e instanceof Scroll),
        startWith(new Scroll(new NavigationEnd(-1, '', ''), null, null)),
        pairwise(),
      )
      .subscribe((e: Scroll[]) => {
        const previous = e[0];
        const current = e[1];

        if (current.position) {
          this.viewportScroller.scrollToPosition(current.position, this.navigationScrollOptions);
        } else if (current.anchor) {
          this.viewportScroller.scrollToAnchor(current.anchor);
        } else {
          const previousUrl = this.getUrlFromRouterEvent(previous.routerEvent);
          const currentUrl = this.getUrlFromRouterEvent(current.routerEvent);

          if (previousUrl && currentUrl && this.getBaseRoute(previousUrl) !== this.getBaseRoute(currentUrl)) {
            this.viewportScroller.scrollToPosition([0, 0], this.navigationScrollOptions);
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
