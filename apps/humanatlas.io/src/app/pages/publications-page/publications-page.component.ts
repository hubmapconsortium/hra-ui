import { ChangeDetectionStrategy, Component, computed, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { PageSectionModule } from '@hra-ui/design-system/content-templates/page-section';
import { SectionLinkComponent } from '@hra-ui/design-system/content-templates/section-link';
import { MarkdownModule } from 'ngx-markdown';

import { PublicationsPageData } from '../../resolvers/publications-page/publications-page.schema';

/**
 * Page for displaying hra publication data
 */
@Component({
  selector: 'hra-publications-page',
  imports: [HraCommonModule, PageSectionModule, SectionLinkComponent, MarkdownModule],
  templateUrl: './publications-page.component.html',
  styleUrl: './publications-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PublicationsPageComponent {
  /** Publication data */
  publications = input.required<PublicationsPageData>();

  /** Returns publication years sorted in descending order */
  readonly years = computed(() => {
    const values = Object.keys(this.publications()).sort((a, b) => (a < b ? 1 : -1));
    return values;
  });

  /**
   * Removes author links
   * @param value HTML string
   * @returns HTML string without author links
   */
  removeAuthorLinks(value: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(value, 'text/html');
    const authorLinks = doc.body.querySelectorAll('a[href]:not([itemprop="url"])');
    authorLinks.forEach((link) => link.replaceWith(link.textContent as string));
    return doc.body.innerHTML;
  }

  /**
   * Formats id for anchor links. If value does not start with a letter, it will be prefixed with "id-".
   * @param value Id to format
   * @returns Formatted anchor id
   */
  toAnchor(value: string): string {
    return value.replace(/[^\w:._-]/g, '-').replace(/^[^a-z]/i, 'id-$&');
  }
}
