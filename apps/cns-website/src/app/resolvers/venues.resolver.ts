import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { joinWithSlash } from '@hra-ui/common/url';
import { load } from 'js-yaml';
import { map } from 'rxjs';
import { VenueData, VenueItem, VenueItemSchema } from '../schemas/venues.schema';
import { TableColumn, TableRow } from '@hra-ui/design-system/table';

export function createVenuesResolver(baseUrl: string): ResolveFn<VenueData> {
  console.log(baseUrl);
  return () => {
    const http = inject(HttpClient);
    return http.get(baseUrl, { responseType: 'json' }).pipe(
      map((data) => {
        console.log(data);
        return data as VenueData;
      }),
    );
  };
}

function convertToTableRows(venues: VenueData): TableRow[] {
  return venues.map((venue) => ({
    date: venue.dateStart.toLocaleDateString(),
    event: venue.title,
    location: `${venue.city}, ${venue.state}, ${venue.country}`,
    contact: venue.organizer,
    links: `[PDF](${venue.pdfLink})`,
  }));
}

const columns: TableColumn[] = [
  {
    column: 'date',
    label: 'Date',
    type: 'text',
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
