import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { TableColumn, TableComponent, TableRow } from '@hra-ui/design-system/table';
import slugify from 'slugify';
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

  /** Columns for the venues table */
  readonly columns = signal<TableColumn[]>([
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
  ]);

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
   * Converts a string to a URL-friendly slug (convert to lowercase, replace spaces with hyphens, and remove special characters)
   * @param str String to convert to a slug
   * @returns URL-friendly slug generated from the input string
   */
  private toSlug(str: string): string {
    return slugify(str, { lower: true, strict: true });
  }

  /**
   * Formats a date as a segmented string (YYYY/MM-DD) for use in URLs
   * @param date Date to format
   * @returns Formatted date string in the format YYYY/MM-DD
   */
  private getSegmentedDate(date: Date): string {
    const fullDate = new Date(date);
    const year = fullDate.getUTCFullYear();
    const day = ('0' + fullDate.getUTCDate()).slice(-2);
    const month = ('0' + (fullDate.getUTCMonth() + 1)).slice(-2);
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
      links.push(
        `[Photo gallery](${[BASE_URL, 'venues/gallery', this.getSegmentedDate(venue.dateStart), this.toSlug(venue.title)].join('/')})`,
      );
    }
    if (venue.pdfLink) {
      links.push(
        `[PDF](${[BASE_URL, 'assets/content/venues', this.getSegmentedDate(venue.dateStart), this.toSlug(venue.title), venue.pdfLink].join('/')})`,
      );
    }
    return links.join(' | ');
  }
}
