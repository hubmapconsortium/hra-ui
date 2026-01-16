import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SearchListOption } from '@hra-ui/design-system/search-list';
import { forkJoin, map, Observable } from 'rxjs';
import { ResearchPageData } from '../../schemas/research/research.schema';

const PUBLICATIONS_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-publications.json';
const NEWS_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-news.json';
const PEOPLE_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-people.json';
const PUBLICATION_TYPES_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-publication-types.json';

export type ViewType = 'gallery' | 'list' | 'table';

const CATEGORY_OPTIONS: SearchListOption[] = [
  { id: 'data-tools', label: 'Data & tools' },
  { id: 'events', label: 'Events' },
  { id: 'funding', label: 'Funding' },
  { id: 'displays', label: 'Interactive displays' },
  { id: 'miscellaneous', label: 'Miscellaneous' },
  { id: 'news', label: 'News' },
  { id: 'presentations', label: 'Presentations' },
  { id: 'publications', label: 'Publications' },
  { id: 'software-products', label: 'Software Products' },
  { id: 'teaching', label: 'Teaching' },
  { id: 'visualizations', label: 'Visualizations' },
];

const FUNDING_OPTIONS: SearchListOption[] = [
  { id: 'research-funding', label: 'Research funding' },
  { id: 'teaching-funding', label: 'Teaching funding' },
  { id: 'workshop-funding', label: 'Workshop funding' },
];

const EVENT_OPTIONS: SearchListOption[] = [
  { id: '24-hour', label: '24-hour' },
  { id: 'amatria', label: 'Amatria' },
  { id: 'workshops', label: 'Workshops' },
];

const PROJECT_OPTIONS: SearchListOption[] = [
  {
    id: 'project-name',
    label: 'Project Name',
  },
];

export function createResearchDataResolver(): ResolveFn<ResearchPageData> {
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
            title: item.title?.trim(),
          })),
        ];
      }),
    );
  };
}

export function getPeopleData(): Observable<SearchListOption[]> {
  const http = inject(HttpClient);
  return http.get<{ slug: string; name: string }[]>(PEOPLE_INDEX_URL, { responseType: 'json' }).pipe(
    map((people) => {
      return people
        .map(({ slug, name }) => ({
          id: slug,
          label: name,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));
    }),
  );
}

export function getPublicationTypes(): Observable<SearchListOption[]> {
  const http = inject(HttpClient);
  return http.get<{ label: string; value: string }[]>(PUBLICATION_TYPES_INDEX_URL, { responseType: 'json' }).pipe(
    map((types) => {
      return types
        .map(({ label, value }) => ({
          id: value,
          label,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));
    }),
  );
}

export function createOptionsResolver(): ResolveFn<Record<string, SearchListOption[]>> {
  return () => {
    return forkJoin({
      publicationTypes: getPublicationTypes(),
      people: getPeopleData(),
    }).pipe(
      map(({ publicationTypes, people }) => {
        return {
          category: CATEGORY_OPTIONS,
          type: publicationTypes,
          people: people,
          eventType: EVENT_OPTIONS,
          fundingType: FUNDING_OPTIONS,
          project: PROJECT_OPTIONS,
          year: [], // to be filled in dynamically in the component,
        };
      }),
    );
  };
}
