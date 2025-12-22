import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { createYamlSpecResolver } from '@hra-ui/design-system/content-templates/resolvers';
import { FilterOptionCategory } from '@hra-ui/design-system/filter-menu';
import { SearchListOption } from '@hra-ui/design-system/search-list';
import { map, of } from 'rxjs';
import { ResearchPageData, ResearchPageDataSchema } from '../../schemas/research/research.schema';

const FILTER_OPTIONS: Record<string, SearchListOption[]> = {
  category: [
    { id: 'dataTools', label: 'Data & tools', count: 1000 },
    { id: 'events', label: 'Events', count: 1000 },
    { id: 'funding', label: 'Funding', count: 1000 },
    { id: 'displays', label: 'Interactive displays', count: 1000 },
    { id: 'miscellaneous', label: 'Miscellaneous', count: 1000 },
    { id: 'news', label: 'News', count: 1000 },
    { id: 'presentations', label: 'Presentations', count: 1000 },
    { id: 'publications', label: 'Publications', count: 1000 },
  ],
  publicationType: [
    { id: 'book', label: 'Book', count: 1000 },
    { id: 'bookChapter', label: 'Book chapter', count: 1000 },
    { id: 'conference', label: 'Conference proceedings', count: 1000 },
    { id: 'editedBooks', label: 'Edited books', count: 1000 },
    { id: 'journalArticles', label: 'Journal articles', count: 1000 },
    { id: 'other', label: 'Other', count: 1000 },
    { id: 'patents', label: 'Patents', count: 1000 },
    { id: 'technicalReports', label: 'Technical reports', count: 1000 },
    { id: 'unreferred', label: 'Unreferred', count: 1000 },
  ],
  fundingType: [
    { id: 'researchFunding', label: 'Research funding', count: 1000 },
    { id: 'teachingFunding', label: 'Teaching funding', count: 1000 },
    { id: 'workshopFunding', label: 'Workshop funding', count: 1000 },
  ],
  eventType: [
    { id: '24Hour', label: '24-hour', count: 1000 },
    { id: 'amatria', label: 'Amatria', count: 1000 },
    { id: 'workshops', label: 'Workshops', count: 1000 },
  ],
  year: [
    { id: '2025', label: '2025', count: 1000 },
    { id: '2024', label: '2024', count: 1000 },
    { id: '2023', label: '2023', count: 1000 },
    { id: '2022', label: '2022', count: 1000 },
    { id: '2021', label: '2021', count: 1000 },
    { id: '2020', label: '2020', count: 1000 },
    { id: '2019', label: '2019', count: 1000 },
    { id: '2018', label: '2018', count: 1000 },
  ],
};

const FILTER_CATEGORIES = [
  { id: 'category', label: 'Category', options: FILTER_OPTIONS['category'] },
  { id: 'eventType', label: 'Event type', options: FILTER_OPTIONS['eventType'] },
  { id: 'fundingType', label: 'Funding type', options: FILTER_OPTIONS['fundingType'] },
  { id: 'publicationType', label: 'Publication type', options: FILTER_OPTIONS['publicationType'] },
  { id: 'people', label: 'People', options: [] },
  { id: 'project', label: 'Project', options: [] },
  { id: 'year', label: 'Year', options: FILTER_OPTIONS['year'] },
] as FilterOptionCategory<SearchListOption>[];

const PUBLICATIONS_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-publications.json';
const TAGS_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-tags.json';
const PEOPLE_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-people.json';
const PUBLICATION_TYPES_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-publication-types.json';

export function createFiltersResolver(): ResolveFn<FilterOptionCategory<SearchListOption>[]> {
  return () => {
    return of(FILTER_CATEGORIES);
  };
}

export function createResearchResolver(): ResolveFn<ResearchPageData> {
  return (route, state) => {
    const queryParams = route.queryParams;
    if (queryParams['type'] === 'news') {
      const url = 'assets/content/news/data.yaml';
      const resolver = createYamlSpecResolver(url, ResearchPageDataSchema);
      return resolver(route, state);
    }

    const http = inject(HttpClient);
    return http.get(PUBLICATIONS_INDEX_URL, { responseType: 'json' }).pipe(
      map((data) => {
        return {
          data,
        } as ResearchPageData;
      }),
    );
  };
}
