import { booleanAttribute, computed, Directive, input } from '@angular/core';
import { injectAppUrlResolver, isAbsolute, stripTrailingSlash } from '@hra-ui/common/url';
import { injectRouter } from '../injectors';
import { isAuxClick } from '../util/event';

/**
 * Simpler version of `RouterLink`.
 * Only supports absolute urls and must be used on `<a>` or `<area>` elements.
 */
@Directive({
  selector: 'a[hraLink], area[hraLink]',
  host: {
    '[attr.href]': 'url()',
    '[attr.target]': 'external() ? "_blank" : null',
    '[attr.rel]': 'external() ? "noopener noreferrer" : null',
    '(click)': 'onClick($event)',
  },
})
export class LinkDirective {
  /** Full url */
  readonly url = input.required<string>({ alias: 'hraLink' });

  /** Whether the link should open is a new tab/window */
  // eslint-disable-next-line @angular-eslint/no-input-rename -- Rule doesn't work for non-trivial selectors
  readonly external = input(false, { alias: 'hraLinkExternal', transform: booleanAttribute });

  /** Reference to the router (if available) */
  private readonly router = injectRouter({ optional: true });
  /** Url resolving function */
  private readonly resolve = injectAppUrlResolver();
  /** Resolved url tree */
  private readonly urlTree = computed(() => {
    const { router, resolve } = this;
    if (router && !this.external()) {
      const url = resolve(this.url());
      if (!isAbsolute(url)) {
        return router.parseUrl(stripTrailingSlash(url));
      }
    }

    return undefined;
  });

  /**
   * Perform a navigation in response to a click event
   *
   * @param event Click event
   * @returns true if the default handler should run, false otherwise
   */
  onClick(event: Event): boolean {
    const urlTree = this.urlTree();
    if (!urlTree || (event instanceof MouseEvent && isAuxClick(event))) {
      return true;
    }

    this.router?.navigateByUrl(urlTree);
    return false;
  }
}
