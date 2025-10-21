import { computed, Directive, input } from '@angular/core';
import { injectAppUrlResolver, isAbsolute } from '@hra-ui/common/url';
import { injectRouter } from '../injectors';

/** App link type */
export type AppLinkType = 'default' | 'skip-router' | 'external';

/**
 * Simpler version of `RouterLink`.
 * Only supports absolute urls and should only be used on `<a>` or `<area>` elements.
 */
@Directive({
  selector: '[hraAppLink]',
  host: {
    '[attr.href]': 'link()',
    '[attr.target]': 'type() === "external" ? "_blank" : null',
    '[attr.rel]': 'type() === "external" ? "noopener noreferrer" : null',
    '(click)': 'onClick($event)',
  },
})
export class AppLinkDirective {
  /** Full url */
  readonly link = input.required<string>({ alias: 'hraAppLink' });
  /** Type controlling how navigation is performed */
  readonly type = input<AppLinkType>('default', { alias: 'hraAppLinkType' });

  /** Reference to the router (if available) */
  private readonly router = injectRouter({ optional: true });
  /** Url resolving function */
  private readonly resolve = injectAppUrlResolver();
  /** Resolved url tree */
  private readonly urlTree = computed(() => {
    const { router, resolve } = this;
    const type = this.type();
    if (type === 'default' && router) {
      const url = resolve(this.link());
      if (!isAbsolute(url)) {
        return router.parseUrl(url);
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
  onClick(event: MouseEvent): boolean {
    const urlTree = this.urlTree();
    if (!urlTree) {
      return true;
    }

    const { button, ctrlKey, shiftKey, altKey, metaKey } = event;
    if (button !== 0 || ctrlKey || shiftKey || altKey || metaKey) {
      return true;
    }

    this.router?.navigateByUrl(urlTree);
    return false;
  }
}
