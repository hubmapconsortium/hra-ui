import { computed, contentChildren, Directive, effect, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IsActiveMatchOptions, isActive as isUrlTreeActive, NavigationEnd } from '@angular/router';
import { injectWindow } from '@hra-ui/common/injectors';
import { isUrlActive } from '@hra-ui/utils/paths';
import { createNotifier } from 'ngxtension/create-notifier';
import { injectRouter } from '../injectors';
import { LinkDirective } from '../link/link.directive';

/** Default match options */
const DEFAULT_MATCH_OPTIONS: IsActiveMatchOptions = {
  paths: 'subset',
  queryParams: 'subset',
  fragment: 'ignored',
  matrixParams: 'ignored',
};

/**
 * Apply classes when a connected link directive becomes active as determined by `Router#isActive`
 */
@Directive({
  selector: '[hraLinkActive]',
  host: {
    '[class]': 'isActive() ? classes() : null',
  },
  exportAs: 'hraLinkActive',
})
export class LinkActiveDirective {
  /** Classes to apply when active */
  readonly classes = input<string | string[] | Record<string, unknown>>('', { alias: 'hraLinkActive' });

  /** Options controlling how matching is performed */
  readonly options = input<IsActiveMatchOptions>(DEFAULT_MATCH_OPTIONS, { alias: 'hraLinkActiveOptions' });

  /** Emits when the active state changes */
  readonly isActiveChange = output<boolean>();

  /** Whether this link is currently active */
  readonly isActive = computed(() => {
    this.routeChanges.listen();
    return this.hasActiveLinks();
  });

  /** Associated link directive if placed on the same element */
  private readonly link = inject(LinkDirective, { optional: true });
  /** Child link directives if this is placed on a parent element */
  private readonly sublinks = contentChildren(LinkDirective, { descendants: true });
  /** All links */
  private readonly links = computed(() => (this.link ? [this.link, ...this.sublinks()] : this.sublinks()));

  /** Reference to the window object */
  private readonly window = injectWindow();
  /** Reference to the router if available */
  private readonly router = injectRouter({ optional: true });
  /** Notifier used to update computed signals on route changes */
  private readonly routeChanges = createNotifier();

  /** Initialize the directive */
  constructor() {
    this.router?.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.routeChanges.notify();
      }
    });

    let isFirstChange = true;
    effect(() => {
      const isActive = this.isActive();
      const skipEmit = isFirstChange && !isActive;
      isFirstChange = false;

      if (!skipEmit) {
        this.isActiveChange.emit(isActive);
      }
    });
  }

  /**
   * Check whether any connected link is currently active.
   *
   * @returns true if any connected link is active, false otherwise
   */
  private hasActiveLinks(): boolean {
    const {
      router,
      window: { location },
    } = this;
    const links = this.links();
    const options = this.options();

    if (!router) {
      return links.some((link) => isUrlActive(link.url(), location.href, options));
    }

    return links.some((link) => {
      const urlTree = link.urlTree();
      if (!urlTree) {
        return false;
      }

      return isUrlTreeActive(urlTree, router, options)();
    });
  }
}
