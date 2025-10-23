import { Directive, input } from '@angular/core';
import { stripLeadingHash } from '@hra-ui/common/url';
import { injectRouter } from '../injectors';
import { isAuxClick } from '../util/event';

/**
 * Simpler version of `RouterLink` that only navigates to a different fragments.
 * Must be used on `<a>` or `<area>` elements.
 */
@Directive({
  selector: 'a[hraFragmentLink], area[hraFragmentLink]',
  host: {
    '[attr.href]': '"#" + fragment',
    '(click)': 'onClick($event)',
  },
})
export class FragmentLinkDirective {
  /** Url fragment (with or without a leading #) */
  readonly fragment = input.required({ alias: 'hraFragmentLink', transform: stripLeadingHash });

  /** Reference to the router */
  private readonly router = injectRouter({ optional: true });

  /**
   * Perform a navigation in response to a click event
   *
   * @param event Click event
   * @returns true if the default handler should run, false otherwise
   */
  onClick(event: MouseEvent): boolean {
    const { fragment, router } = this;
    if (!router || isAuxClick(event)) {
      return true;
    }

    router.navigate([], { fragment: fragment() });
    return false;
  }
}
