import { HttpClient, httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { assetUrl } from '@hra-ui/common/url';
import { TableColumn, TableComponent, TableRow } from '@hra-ui/design-system/table';
import { VenueData, VenueDataSchema, VenueItem } from './types/venues-table.schema';

/**
 * Component to display a table of venues for Scimaps exhibit
 */
@Component({
  selector: 'hra-venues-table',
  imports: [TableComponent],
  templateUrl: './venues-table.component.html',
  styleUrl: './venues-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VenuesTableComponent {
  /** HttpClient for making API requests */
  readonly http = inject(HttpClient);

  /** URL to fetch venues data from */
  readonly venuesUrl = input.required<string>();

  /** Base href for links in the table (e.g. website, photo gallery, PDF) */
  readonly linkBaseHref = input<string>();

  /** Columns for the venues table */
  protected readonly columns: TableColumn[] = [
    {
      column: 'date',
      label: 'Date',
      type: 'date',
    },
    {
      column: 'event',
      label: 'Event',
      type: 'markdown',
    },
    {
      column: 'location',
      label: 'Location',
      type: 'text',
    },
    {
      column: 'contact',
      label: 'Contact',
      type: 'text',
    },
    {
      column: 'links',
      label: 'Links',
      type: 'markdown',
    },
  ];

  /** Resource to fetch venues data */
  protected readonly venuesData = httpResource(assetUrl(this.venuesUrl), {
    parse: (data) => VenueDataSchema.parse(data),
    defaultValue: [],
  });

  /** Table rows computed from the venues data */
  protected readonly rows = computed(() => this.convertToTableRows(this.venuesData.value()));

  /**
   * Converts venues data to table rows
   * @param venues Venues data to convert
   * @returns Table rows generated from the venues data
   */
  private convertToTableRows(venues: VenueData): TableRow[] {
    return venues.map((venue) => ({
      date: venue.dateStart,
      event: venue.title.replace(/Places\s*&\s*Spaces/g, '*Places & Spaces*'),
      location: [venue.city, venue.state, venue.country].filter((s) => !!s).join(', '),
      contact: venue.organizer || '',
      links: this.createLinks(venue),
    }));
  }

  /**
   * Formats a date as a segmented string (YYYY/MM-DD) for use in URLs
   * @param date Date to format
   * @returns Formatted date string in the format YYYY/MM-DD
   */
  private getSegmentedDate(date: Date): string {
    const year = date.getUTCFullYear();
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    return `${year}/${month}-${day}`;
  }

  /**
   * Creates markdown links for the venue based on available data (website, photo gallery, PDF)
   * @param venue Venue item to create links for
   * @returns Markdown string containing links for the venue (website, photo gallery, PDF) based on available data
   */
  private createLinks(venue: VenueItem): string {
    const links = [];
    if (venue.websiteUrl) {
      links.push(`[Website](${venue.websiteUrl})`);
    }
    if (venue.venueImages) {
      links.push(`[Photo gallery](${this.buildLinkUrl('venues/gallery', venue.dateStart, venue.title, '')})`);
    }
    if (venue.pdfLink) {
      links.push(`[PDF](${this.buildLinkUrl('assets/content/venues', venue.dateStart, venue.title, venue.pdfLink)})`);
    }
    return links.join(' | ');
  }

  private slugifyTitle(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/&/g, 'and') // Replace '&' with 'and'
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Strip diacritics after transliteration
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  }

  /**
   * Builds a link URL for the venue based on the provided path, date, title, and optional extra segment
   * @param path Base path for the link (e.g. 'venues/gallery' or 'assets/content/venues')
   * @param date Date of the venue, used to create a segmented date string for the URL
   * @param title Title of the venue, used to create a slugified segment for the URL
   * @param [extra] Optional extra segment to append to the URL (e.g. PDF filename)
   * @returns Constructed URL string combining the base href, path, segmented date, slugified title, and optional extra segment
   */
  private buildLinkUrl(path: string, date: Date, title: string, extra?: string): string {
    const dateSegment = this.getSegmentedDate(date);
    const titleSegment = this.slugifyTitle(title);
    return [this.linkBaseHref(), path, dateSegment, titleSegment, extra].filter((s) => !!s).join('/');
  }
}
