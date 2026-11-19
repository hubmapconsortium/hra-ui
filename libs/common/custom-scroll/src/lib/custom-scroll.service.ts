import { DOCUMENT, ViewportScroller } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Event,
  NavigationEnd,
  NavigationSkipped,
  NavigationSkippedCode,
  NavigationStart,
  Router,
} from '@angular/router';

/** Jumps even when the page or a site embedding the app sets `scroll-behavior: smooth` */
const INSTANT_SCROLL: ScrollOptions = { behavior: 'instant' };
/** How long to keep retrying a back/forward restore while the page is still growing */
const RESTORE_TIMEOUT_MS = 3000;
/** User input that cancels a pending restore so it never fights the user */
const USER_SCROLL_EVENTS = ['wheel', 'touchstart', 'keydown', 'mousedown'] as const;

/**
 * Custom scroll service to handle scroll restoration on navigation events.
 *
 * Listens to navigation events directly instead of the router's `Scroll` events.
 * The router only emits those after `ApplicationRef.bootstrap`, which never runs
 * for apps started with `createCustomElement` (e.g. apps.humanatlas.io, dashboard).
 */
@Injectable({ providedIn: 'root' })
export class CustomScrollService {
  /**
   * Injects the Angular Router.
   */
  private readonly router = inject(Router);
  /**
   * Injects the ViewportScroller.
   */
  private readonly viewportScroller = inject(ViewportScroller);
  /** Document reference */
  private readonly document = inject(DOCUMENT);

  /** Cancels the in-progress back/forward restore, if any */
  private restoreController?: AbortController;
  /** Scroll position saved when leaving each navigation, keyed by navigation id */
  private readonly positions = new Map<number, [number, number]>();
  /** Id of the most recently completed navigation */
  private lastId = 0;
  /** What triggered the current navigation */
  private lastTrigger: NavigationStart['navigationTrigger'];
  /** Id of the navigation being restored by a back/forward navigation */
  private restoredId = 0;
  /** Base route of the previously completed navigation */
  private previousBaseRoute?: string;

  /**
   * CustomScrollService constructor
   */
  constructor() {
    this.viewportScroller.setHistoryScrollRestoration('manual');
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => this.handleRouterEvent(event));
  }

  /**
   * Tracks navigation state and schedules a scroll when a navigation completes.
   * @param event Router event
   */
  private handleRouterEvent(event: Event): void {
    if (event instanceof NavigationStart) {
      this.restoreController?.abort();
      this.positions.set(this.lastId, this.viewportScroller.getScrollPosition());
      this.lastTrigger = event.navigationTrigger;
      this.restoredId = event.restoredState?.navigationId ?? 0;
    } else if (event instanceof NavigationEnd) {
      this.lastId = event.id;
      const position = this.lastTrigger === 'popstate' ? this.positions.get(this.restoredId) : undefined;
      this.scheduleScroll(event.urlAfterRedirects, position);
    } else if (event instanceof NavigationSkipped && event.code === NavigationSkippedCode.IgnoredSameUrlNavigation) {
      this.lastTrigger = undefined;
      this.restoredId = 0;
      this.scheduleScroll(event.url);
    }
  }

  /**
   * Scrolls once the new page has rendered, using the same delay as the router.
   * - If the navigation is backward, it restores the previous scroll position.
   * - If the navigation is to an anchor, it scrolls to that anchor.
   * - If the navigation is forward (i.e., route change), it scrolls to the top.
   * @param url Url navigated to
   * @param position Scroll position to restore, if any
   */
  private scheduleScroll(url: string, position?: [number, number]): void {
    const anchor = this.router.parseUrl(url).fragment;
    const baseRoute = this.getBaseRoute(url);
    const previousBaseRoute = this.previousBaseRoute;
    this.previousBaseRoute = baseRoute;

    this.afterRender(() => {
      if (position) {
        this.restorePosition(position);
      } else if (anchor) {
        this.viewportScroller.scrollToAnchor(anchor);
      } else if (previousBaseRoute !== undefined && previousBaseRoute !== baseRoute) {
        this.viewportScroller.scrollToPosition([0, 0], INSTANT_SCROLL);
      }
    });
  }

  /**
   * Restores a saved scroll position. Content that loads after render (web components,
   * images, data) can leave the page too short to reach it, so the restore is reapplied
   * as the page grows until it lands, times out, or the user scrolls.
   * @param position Scroll position to restore
   */
  private restorePosition(position: [number, number]): void {
    const restore = (): boolean => {
      this.viewportScroller.scrollToPosition(position, INSTANT_SCROLL);
      return Math.abs(this.viewportScroller.getScrollPosition()[1] - position[1]) < 1;
    };

    const window = this.document.defaultView;
    if (restore() || !window || typeof ResizeObserver === 'undefined') {
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;
    const observer = new ResizeObserver(() => {
      if (restore()) {
        controller.abort();
      }
    });
    const timeout = setTimeout(() => controller.abort(), RESTORE_TIMEOUT_MS);

    signal.addEventListener('abort', () => {
      observer.disconnect();
      clearTimeout(timeout);
    });
    for (const type of USER_SCROLL_EVENTS) {
      window.addEventListener(type, () => controller.abort(), { passive: true, signal });
    }

    observer.observe(this.document.documentElement);
    this.restoreController = controller;
  }

  /**
   * Runs a callback after the next timeout or animation frame, whichever comes first.
   * @param callback Function to run
   */
  private afterRender(callback: () => void): void {
    let done = false;
    const run = () => {
      if (!done) {
        done = true;
        callback();
      }
    };

    setTimeout(run);
    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(run);
    }
  }

  /**
   * Extracts the base route from a URL by removing any query parameters.
   * @param url The full URL to process
   * @returns The base route without query parameters
   */
  private getBaseRoute(url: string): string {
    return url.split('?')[0];
  }
}
