import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { assetUrl } from '@hra-ui/common/url';
import { forkJoin, map } from 'rxjs';
import { ResearchData, ResearchDataSchema, ResearchItem } from '../schemas/research.schema';

/**
 * Creates a resolver that loads research items from one or more indexes
 * and optionally filters them
 *
 * @param urls Research index urls
 * @param filter Optional predicate selecting which items to keep
 * @returns A resolve function returning the combined (and filtered) research items
 */
export function createResearchItemsResolver(
  urls: string[],
  filter?: (item: ResearchItem) => boolean,
): ResolveFn<ResearchData> {
  return () => {
    const http = inject(HttpClient);
    const requests = urls.map((url) =>
      http.get(assetUrl(url)(), { responseType: 'json' }).pipe(map((data) => ResearchDataSchema.parse(data))),
    );

    return forkJoin(requests).pipe(
      map((results) => results.flat()),
      map((items) => (filter ? items.filter(filter) : items)),
    );
  };
}
