import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SearchListOption } from '@hra-ui/design-system/search-list';
import { forkJoin, map } from 'rxjs';
import { ResearchPageData } from '../../schemas/research/research.schema';

const PUBLICATIONS_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-publications.json';
const NEWS_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-news.json';
const PEOPLE_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-people.json';
const PUBLICATION_TYPES_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-publication-types.json';

export function createResearchResolver(): ResolveFn<ResearchPageData> {
  return () => {
    const http = inject(HttpClient);
    return forkJoin({
      news: http.get(NEWS_INDEX_URL, { responseType: 'json' }),
      publications: http.get(PUBLICATIONS_INDEX_URL, { responseType: 'json' }),
    }).pipe(
      map(({ news, publications }) => {
        return [
          ...(news as ResearchPageData),
          ...(publications as ResearchPageData).map((item) => ({
            ...item,
            category: item.category === 'publication' ? 'publications' : item.type,
          })),
        ].sort((a, b) => b.dateStart.localeCompare(a.dateStart));
      }),
    );
  };
}

export function createPeopleResolver(): ResolveFn<SearchListOption[]> {
  return () => {
    const http = inject(HttpClient);
    return http.get<{ slug: string; name: string }[]>(PEOPLE_INDEX_URL, { responseType: 'json' }).pipe(
      map((people) => {
        const sortedPeople = people.sort((a, b) => a.name.localeCompare(b.name));
        return sortedPeople.map((person) => ({
          id: person.slug,
          label: person.name,
        }));
      }),
    );
  };
}

export function createPublicationTypesResolver(): ResolveFn<SearchListOption[]> {
  return () => {
    const http = inject(HttpClient);
    return http.get<{ label: string; value: string }[]>(PUBLICATION_TYPES_INDEX_URL, { responseType: 'json' }).pipe(
      map((types) => {
        return types.map(({ label, value }) => ({
          id: value === 'publication' ? 'publications' : value,
          label,
        }));
      }),
    );
  };
}
