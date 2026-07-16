import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { joinWithSlash } from '@hra-ui/common/url';
import { load } from 'js-yaml';
import { map } from 'rxjs';
import { PeopleItem, PeopleItemSchema } from '../schemas/people.schema';

/**
 * Resolver to load person data by slug
 *
 * @param baseUrl Base URL for person content
 * @returns A resolve function that fetches and parses person data
 */
export function createPersonResolver(baseUrl: string): ResolveFn<PeopleItem> {
  return (route) => {
    const slug = route.paramMap.get('slug');
    if (!slug) {
      throw new Error('Internal error: route parameter "slug" is missing');
    }

    const http = inject(HttpClient);
    const url = joinWithSlash(baseUrl, `${slug}/data.yaml`);
    return http.get(url, { responseType: 'text' }).pipe(
      map((data) => load(data, { filename: url })),
      map((data) => PeopleItemSchema.parse(data)),
      map((item) => {
        if (item.image) {
          item.image = joinWithSlash(baseUrl, `${slug}/${item.image}`);
        }

        return item;
      }),
    );
  };
}
