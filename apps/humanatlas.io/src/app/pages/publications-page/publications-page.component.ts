import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { ContentTemplatesModule } from '@hra-ui/design-system/content-templates/';
import { TableOfContentsLayoutModule } from '@hra-ui/design-system/layouts/table-of-contents';
import { MarkdownModule } from 'ngx-markdown';
import { PublicationsPageData } from '../../schemas/publications-page/publications-page.schema';
import { AssetUrlPipe } from '@hra-ui/common/url';

/** A single publication item */
interface PublicationItem {
  /** Publication year */
  year: number;
  /** Publication title */
  tagline: string;
  /** Section anchor id */
  anchor: string;
  /** Markdown contents */
  contents: string[];
}

/**
 * Page for displaying hra publication data
 */
@Component({
  selector: 'hra-publications-page',
  imports: [HraCommonModule, ContentTemplatesModule, MarkdownModule, TableOfContentsLayoutModule, AssetUrlPipe],
  templateUrl: './publications-page.component.html',
  styleUrl: './publications-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicationsPageComponent {
  /** Publication data */
  readonly publications = input.required<PublicationsPageData>();

  /** Publication items sorted by year in descending order */
  protected readonly items = computed(() => this.normalizePublications(this.publications()));

  /**
   * Normalizes publications from a mapping object into an array
   *
   * @param publications Mapping from year to contents
   * @returns Array of normalized and sorted items
   */
  private normalizePublications(publications: PublicationsPageData): PublicationItem[] {
    const pairs = Object.entries(publications);
    const items = pairs.map(
      ([year, contents]) =>
        ({
          year: +year,
          tagline: year,
          anchor: `year-${year}`,
          contents: contents.map((value) => this.fixupContent(value)),
        }) satisfies PublicationItem,
    );
    const filteredItems = items.filter(({ year, contents }) => Number.isInteger(year) && contents.length > 0);
    return filteredItems.sort((a, b) => b.year - a.year);
  }

  /**
   * Fixes problems with publication content html
   *
   * @param value HTML string
   * @returns HTML string without author links
   */
  private fixupContent(value: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(value, 'text/html');
    const authorLinks = doc.body.querySelectorAll('a[href]:not([itemprop="url"])');
    authorLinks.forEach((link) => link.replaceWith(link.textContent as string));
    const publicationLinks = doc.body.querySelectorAll('a[href^="/docs/publications/"]');
    publicationLinks.forEach((el) => el.setAttribute('href', `https://cns.iu.edu${el.getAttribute('href')}`));
    return doc.body.innerHTML;
  }
}
