import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { map } from 'rxjs';
import { VenueData } from '../schemas/venues.schema';

export function createVenuesResolver(baseUrl: string): ResolveFn<VenueData> {
  return () => {
    const http = inject(HttpClient);
    return http.get(baseUrl, { responseType: 'json' }).pipe(map((data) => data as VenueData));
  };
}
