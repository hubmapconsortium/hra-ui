import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TableColumn, TableComponent, TableRow } from '@hra-ui/design-system/table';
import slugify from 'slugify';
import { VenueData, VenueItem } from '../../schemas/venues.schema';

const columns: TableColumn[] = [
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

const BASE_URL = 'https://scimaps.org/';

@Component({
  selector: 'cns-venues-table',
  imports: [TableComponent],
  templateUrl: './venues-table.component.html',
  styleUrl: './venues-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VenuesTableComponent {
  readonly venues = input<VenueData>([]);

  readonly rows = computed(() => this.convertToTableRows(this.venues()));

  readonly columns = columns;

  private convertToTableRows(venues: VenueData): TableRow[] {
    return venues.map((venue) => ({
      date: venue.dateStart,
      event: venue.title,
      location: [venue.city, venue.state, venue.country].filter((s) => !!s).join(', '),
      contact: venue.organizer || '',
      links: this.createLinks(venue),
    }));
  }

  private toSlug(str: string): string {
    return slugify(str, { lower: true, strict: true });
  }

  private getSegmentedDate = (date: Date) => {
    const fullDate = new Date(date);
    const year = fullDate.getUTCFullYear();
    const day = ('0' + fullDate.getUTCDate()).slice(-2);
    const month = ('0' + (fullDate.getUTCMonth() + 1)).slice(-2);
    return `${year}/${month}-${day}`;
  };

  private createLinks(venu: VenueItem): string {
    const links = [];
    if (venu.websiteUrl) {
      links.push(`[Website](${venu.websiteUrl})`);
    }
    if (venu.venueImages) {
      links.push(
        `[Photo gallery](${[BASE_URL, 'venues/gallery', this.getSegmentedDate(venu.dateStart), this.toSlug(venu.title)].join('/')})`,
      );
    }
    if (venu.pdfLink) {
      links.push(
        `[PDF](${[BASE_URL, 'assets/content/venues', this.getSegmentedDate(venu.dateStart), this.toSlug(venu.title), venu.pdfLink].join('/')})`,
      );
    }
    return links.join(' | ');
  }
}
