import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { SlugifyPipe } from '@hra-ui/common';
import { TableColumn, TableComponent, TableRow } from '@hra-ui/design-system/table';
import { VenueData, VenueItem } from '../../schemas/venues.schema';

/** Base URL for Scimaps */
const BASE_URL = 'https://scimaps.org/';

/**
 * Component to display a table of venues
 */
@Component({
  selector: 'cns-venues-table',
  imports: [TableComponent],
  templateUrl: './venues-table.component.html',
  styleUrl: './venues-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VenuesTableComponent {
  /** Venues data to display in the table */
  readonly venues = input<VenueData>([]);

  readonly linkBaseHref = input<string>(BASE_URL);

  /** Columns for the venues table */
  readonly columns: TableColumn[] = [
    {
      column: 'date',
      label: 'Date',
      type: 'date',
    },
    {
      column: 'event',
      label: 'Event',
      type: 'text',
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

  /** Table rows computed from the venues data */
  readonly rows = computed(() => this.convertToTableRows(this.venues()));

  /**
   * Converts venues data to table rows
   * @param venues Venues data to convert
   * @returns Table rows generated from the venues data
   */
  private convertToTableRows(venues: VenueData): TableRow[] {
    return venues.map((venue) => ({
      date: venue.dateStart,
      event: venue.title,
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

  private buildLinkUrl(path: string, date: Date, title: string, extra?: string): string {
    const dateSegment = this.getSegmentedDate(date);
    const titleSegment = new SlugifyPipe().transform(title);
    return [this.linkBaseHref(), path, dateSegment, titleSegment, extra].filter((s) => !!s).join('/');
  }
}
