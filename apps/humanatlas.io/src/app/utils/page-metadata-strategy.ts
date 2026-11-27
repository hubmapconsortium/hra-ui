import { DOCUMENT, inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { injectAppConfiguration } from '@hra-ui/common/injectors';
import { ContentPageData } from '@hra-ui/design-system/content-templates/content-page';

/** Site name appended to page titles */
const SITE_NAME = 'Human Reference Atlas';

/** Title for pages without their own, such as the homepage. Matches index.html */
const DEFAULT_TITLE = 'Human Reference Atlas Portal';

/** Description for pages without a subtitle. Matches index.html */
const DEFAULT_DESCRIPTION =
  'The Human Reference Atlas (HRA) is a multiscale, multimodal, three-dimensional atlas of the anatomical structures and cells in the healthy human body.';

/**
 * Sets the title, description, canonical link, Open Graph tags, and robots
 * directive after each navigation. Titles come from the route's `title`, else
 * the resolved content page title. Descriptions come from the content page
 * subtitle. Set `robots` in route data to add a robots directive, for example
 * `noindex`; pages with `noindex` get no canonical link.
 */
@Injectable()
export class PageMetadataStrategy extends TitleStrategy {
  /** Document */
  private readonly document = inject(DOCUMENT);
  /** Title service */
  private readonly title = inject(Title);
  /** Meta service */
  private readonly meta = inject(Meta);
  /** Site url used for canonical links */
  private readonly siteUrl = injectAppConfiguration().url;

  /**
   * Updates the page metadata for the current route
   * @param snapshot Router state after navigation
   */
  override updateTitle(snapshot: RouterStateSnapshot): void {
    const route = getDeepestChild(snapshot.root);
    const content = (route.data['data'] ?? {}) as Partial<ContentPageData>;
    const robots = route.data['robots'] as string | undefined;
    const pageTitle = this.buildTitle(snapshot) ?? cleanText(content.title);
    const description = cleanText(content.subtitle) ?? DEFAULT_DESCRIPTION;
    const url = this.siteUrl ? getCanonicalUrl(snapshot.url, this.siteUrl) : undefined;
    const canonicalUrl = robots?.includes('noindex') ? undefined : url;

    this.title.setTitle(pageTitle ? `${pageTitle} | ${SITE_NAME}` : DEFAULT_TITLE);
    this.setTag('name', 'description', description);
    this.setTag('name', 'robots', robots);
    this.setTag('property', 'og:title', pageTitle ?? DEFAULT_TITLE);
    this.setTag('property', 'og:description', description);
    this.setTag('property', 'og:url', canonicalUrl);
    this.setCanonicalLink(canonicalUrl);
  }

  /**
   * Adds or updates a meta tag, or removes it when there's no content
   * @param attr Attribute that identifies the tag
   * @param key Value of that attribute
   * @param content Tag content
   */
  private setTag(attr: 'name' | 'property', key: string, content: string | undefined): void {
    if (content) {
      this.meta.updateTag({ [attr]: key, content });
    } else {
      this.meta.removeTag(`${attr}="${key}"`);
    }
  }

  /**
   * Adds or updates the canonical link, or removes it when there's no url
   * @param href Canonical url
   */
  private setCanonicalLink(href: string | undefined): void {
    const { head } = this.document;
    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!href) {
      link?.remove();
      return;
    }

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', href);
  }
}

/**
 * Finds the deepest activated route
 * @param route Root route
 * @returns The deepest child route
 */
function getDeepestChild(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
  while (route.firstChild) {
    route = route.firstChild;
  }
  return route;
}

/**
 * Strips HTML tags and collapses whitespace
 * @param text Text from content data
 * @returns Plain text, or undefined if empty
 */
function cleanText(text: string | undefined): string | undefined {
  return (
    text
      ?.replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim() || undefined
  );
}

/**
 * Builds a canonical url without the query or fragment
 * @param path Router url
 * @param siteUrl Site url
 * @returns Canonical url
 */
function getCanonicalUrl(path: string, siteUrl: string): string {
  const url = new URL(path, siteUrl);
  url.search = '';
  url.hash = '';
  return url.href;
}
