import { LocationStrategy } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  Input,
  OnChanges,
  Renderer2,
  SecurityContext,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { dispatch, selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { createLinkId, LinkEntry, LinkRegistryActions, LinkRegistryState, LinkType } from '@hra-ui/cdk/state';
import { UnionMember } from '@hra-ui/utils/types';

const EMPTY_LINK_ID = createLinkId('');

@Directive({
  selector: '[hraLink]',
  standalone: true,
})
export class LinkDirective implements OnChanges {
  @Input('hraLink') linkId = EMPTY_LINK_ID;

  @HostBinding('attr.href') href?: string;
  @HostBinding('attr.rel') rel?: string;
  @HostBinding('attr.target') target?: string;

  private readonly el: HTMLElement = inject(ElementRef).nativeElement;
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly locationStrategy = inject(LocationStrategy);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly renderer = inject(Renderer2);
  private readonly queryLink = selectQuerySnapshot(LinkRegistryState.query);
  private readonly navigate = dispatch(LinkRegistryActions.Navigate);

  private readonly tagName = this.el.tagName.toLowerCase();
  private readonly isAnchorElement = ['a', 'area'].includes(this.tagName);
  private readonly urlSecurityContext = ['base', 'link'].includes(this.tagName)
    ? SecurityContext.RESOURCE_URL
    : SecurityContext.URL;

  private link?: LinkEntry;

  ngOnChanges(changes: SimpleChanges): void {
    if ('linkId' in changes) {
      this.updateLink();
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): boolean {
    const { link, linkId, isAnchorElement, target } = this;
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

      if (target !== undefined && target !== '_self') {
        return true;
      }
    }

    this.navigate(linkId);
    return !isAnchorElement;
  }

  private applyAttributeValue() {
    const { renderer, href, el } = this;
    if (href != null) {
      renderer.setAttribute(el, 'href', href);
    }
  }

  private updateLink(): void {
    const link = (this.link = this.queryLink(this.linkId));
    this.href = undefined;
    this.target = undefined;

    if (link) {
      if (link.type === LinkType.External) {
        this.href = link.url;
        this.rel = link.rel;
        this.target = link.target;
      } else {
        this.href = this.getHref(link) ?? undefined;
        this.applyAttributeValue();
      }
    }
  }

  private getHref(link: UnionMember<LinkEntry, 'type', LinkType.Internal>): string | null {
    const { router, route, locationStrategy, sanitizer, urlSecurityContext } = this;
    const urlTree = router.createUrlTree(link.commands, {
      ...link.extras,
      relativeTo: route,
    });
    const url = locationStrategy.prepareExternalUrl(router.serializeUrl(urlTree));
    return sanitizer.sanitize(urlSecurityContext, url);
  }
}
