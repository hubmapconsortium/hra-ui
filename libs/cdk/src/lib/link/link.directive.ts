import { Directive, ElementRef, HostBinding, HostListener, inject, Injector, Input, OnChanges } from '@angular/core';
import { ActivatedRoute, Params, QueryParamsHandling, UrlCreationOptions } from '@angular/router';
import { dispatch, selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { EMPTY_LINK, LinkEntry, LinkRegistryActions, LinkRegistrySelectors, LinkType } from '@hra-ui/cdk/state';
import { createExternalUrl, createInternalUrl } from '@hra-ui/utils';

/** Link Directive for routing */
@Directive({
  selector: '[hraLink]',
  standalone: true,
})
export class LinkDirective implements OnChanges {
  /** linkId with empty string as default value */
  @Input('hraLink') linkId = EMPTY_LINK;

  /** Query string parameters */
  @Input() queryParams?: Params;

  /** How to handle existing query params */
  @Input() queryParamsHandling?: QueryParamsHandling;

  /** Url fragment */
  @Input() fragment?: string;

  /** Whether to preserve the existing fragment */
  @Input() preserveFragment?: boolean;

  /** Nagivate relative to a route. Only affects internal links. */
  @Input() relativeTo?: ActivatedRoute;

  /** href of the element */
  @HostBinding('attr.href') href?: string;
  /** rel attribute of the element */
  @HostBinding('attr.rel') rel?: string;
  /** target attribute of the element */
  @HostBinding('attr.target') target?: string;

  /** Reference to this component's injector */
  private readonly injector = inject(Injector);
  /** Element tag on which this directive is mounted */
  private readonly tagName = inject<ElementRef<Element>>(ElementRef).nativeElement.tagName.toLowerCase();
  /** Selector for querying the link registry state */
  private readonly queryLink = selectQuerySnapshot(LinkRegistrySelectors.query);
  /** Dispatch action to navigate to a url */
  private readonly navigate = dispatch(LinkRegistryActions.Navigate);

  /** Link Entry */
  private link?: LinkEntry;

  /** Whether the host element is an anchor */
  private get isAnchorElement(): boolean {
    return ['a', 'area'].includes(this.tagName);
  }

  /** Whether the host element deals with resource urls */
  private get isResourceUrl(): boolean {
    return ['base', 'link'].includes(this.tagName);
  }

  /** Collects query params and fragment options into a single object */
  private get extras(): UrlCreationOptions {
    const { link } = this;
    return this.mergeExtras(link?.type === LinkType.Internal ? link.extras : undefined, this);
  }

  /** Updates the current link/url based on the inputs */
  ngOnChanges(): void {
    this.updateLink();
  }

  /**
   * Triggers when a click action is performed on the element
   * @param event type of event
   * @returns true/false based on entry and element
   */
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): boolean {
    const { link, linkId, isAnchorElement } = this;
    if (!link) {
      return true;
    }

    if (isAnchorElement) {
      const { button, ctrlKey, shiftKey, altKey, metaKey } = event;
      if (link.type === LinkType.External || button !== 0 || ctrlKey || shiftKey || altKey || metaKey) {
        return true;
      }
    }

    this.navigate(linkId, this.extras);
    return !isAnchorElement;
  }

  /** Updates the link entry and bound attributes */
  private updateLink(): void {
    const link = (this.link = this.queryLink(this.linkId));
    ({ href: this.href, rel: this.rel, target: this.target } = this.getLinkAttributes(link));
  }

  /**
   * Gets the new values for different attributes bound to the host element
   * @param link Current link entry
   * @returns New attributes values to bind on the host element
   */
  private getLinkAttributes(link?: LinkEntry): { href?: string; rel?: string; target?: string } {
    const { injector, extras, isResourceUrl } = this;
    switch (link?.type) {
      case LinkType.Internal:
        return { href: createInternalUrl(injector, link.commands, extras, isResourceUrl) };

      case LinkType.External:
        return { ...link, href: createExternalUrl(link.url, extras) };

      default:
        return {};
    }
  }

  /**
   * Merges two UrlCreationOptions.
   * Undefined values in the second set does not override values from the first set.
   * @param opt1 First set of options
   * @param opt2 Second set of options
   * @returns Merged options
   */
  private mergeExtras(opt1: UrlCreationOptions | undefined, opt2: UrlCreationOptions): UrlCreationOptions {
    const result = { ...opt1 };
    const mergeKey = <K extends keyof UrlCreationOptions>(key: K) => {
      if (opt2[key] !== undefined) {
        result[key] = opt2[key];
      }
    };

    mergeKey('queryParams');
    mergeKey('queryParamsHandling');
    mergeKey('fragment');
    mergeKey('preserveFragment');
    mergeKey('relativeTo');
    return result;
  }
}
