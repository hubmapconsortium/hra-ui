import { LocationStrategy } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  Input,
  OnChanges,
  SecurityContext,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { dispatch, selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import {
  createLinkId,
  InternalLinkEntry,
  LinkEntry,
  LinkRegistryActions,
  LinkRegistrySelectors,
  LinkType,
} from '@hra-ui/cdk/state';

/** Empty Link ID */
const EMPTY_LINK_ID = createLinkId('');

/** Link Directive for routing */
@Directive({
  selector: '[hraLink]',
  standalone: true,
})
export class LinkDirective implements OnChanges {
  /** linkId with empty string as default value */
  @Input('hraLink') linkId = EMPTY_LINK_ID;
  /** href of the element */
  @HostBinding('attr.href') href?: string;
  /** rel attribute of the element */
  @HostBinding('attr.rel') rel?: string;
  /** target attribute of the element */
  @HostBinding('attr.target') target?: string;

  /** Native Element */
  private readonly el: HTMLElement = inject(ElementRef).nativeElement;
  /** Angular router */
  private readonly router = inject(Router);
  /** Activate route */
  private readonly route = inject(ActivatedRoute, { optional: true });
  /** Location strategy */
  private readonly locationStrategy = inject(LocationStrategy);
  /** DomSanitizer to sanitize the url */
  private readonly sanitizer = inject(DomSanitizer);
  /** Selector for querying the link registry state */
  private readonly queryLink = selectQuerySnapshot(LinkRegistrySelectors.query);
  /** Dispatch action to navigate to a url */
  private readonly navigate = dispatch(LinkRegistryActions.Navigate);
  /** tagName from Native Element */
  private readonly tagName = this.el.tagName.toLowerCase();
  /** to know if the element is an anchor element */
  private readonly isAnchorElement = ['a', 'area'].includes(this.tagName);
  /** url security context */
  private readonly urlSecurityContext = ['base', 'link'].includes(this.tagName)
    ? SecurityContext.RESOURCE_URL
    : SecurityContext.URL;

  /** Link Entry */
  private link?: LinkEntry;

  /**
   * triggers when linkId changes
   * @param changes contains changes of inputs
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['linkId'].currentValue !== EMPTY_LINK_ID) {
      this.updateLink();
    }
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
      if (link.type === LinkType.External) {
        return true;
      }
      if (button !== 0 || ctrlKey || shiftKey || altKey || metaKey) {
        return true;
      }
    }

    this.navigate(linkId);
    return !isAnchorElement;
  }

  /**
   * Updates link when linkId changes
   */
  private updateLink(): void {
    const link = (this.link = this.queryLink(this.linkId));
    this.href = undefined;
    this.target = undefined;
    this.rel = undefined;
    if (link) {
      if (link.type === LinkType.External) {
        this.href = link.url;
        this.rel = link.rel;
        this.target = link.target;
      } else {
        this.href = this.getHref(link) ?? undefined;
      }
    }
  }

  /**
   * Creates a url tree and sanitizes the url
   * @param link Internal link entry
   * @returns A sanitized url string
   */
  private getHref(link: InternalLinkEntry): string | null {
    const { router, route, locationStrategy, sanitizer, urlSecurityContext } = this;
    const urlTree = router.createUrlTree(link.commands, {
      ...link.extras,
      relativeTo: route,
    });
    const url = locationStrategy.prepareExternalUrl(router.serializeUrl(urlTree));
    return sanitizer.sanitize(urlSecurityContext, url);
  }
}
