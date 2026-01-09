import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { FilterOptionCategory } from '@hra-ui/design-system/filter-menu';
import { SearchListOption } from '@hra-ui/design-system/search-list';
import { map, of } from 'rxjs';
import { ResearchPageData, ResearchPageDataSchema } from '../../schemas/research/research.schema';

const PUBLICATIONS_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-publications.json';
const NEWS_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-news.json';
const PEOPLE_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-people.json';
const TAGS_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-tags.json';
const PUBLICATION_TYPES_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-publication-types.json';

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

export function createResearchResolver(): ResolveFn<ResearchPageData> {
  return (route) => {
    const queryParams = route.queryParams;
    const http = inject(HttpClient);
    if (queryParams['category'] === 'news') {
      return http.get(NEWS_INDEX_URL, { responseType: 'json' }).pipe(
        map((data) => {
          return {
            data,
          } as ResearchPageData;
        }),
      );
    }

    return http.get(PUBLICATIONS_INDEX_URL, { responseType: 'json' }).pipe(
      map((data) => {
        return {
          data,
        } as ResearchPageData;
      }),
    );
  };
}
