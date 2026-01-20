export const QUERY_PARAM_OPTIONS_KEY: Record<string, string> = {
  category: 'category',
  'event-type': 'eventType',
  'funding-type': 'fundingType',
  'publication-type': 'publicationType',
  people: 'people',
  // project: 'project',
  year: 'year',
};

export const VIEW_AS_OPTIONS = [
  { id: 'gallery', label: 'Gallery' },
  { id: 'list', label: 'List' },
];

export const SORT_BY_OPTIONS = [
  { id: 'nameAsc', label: 'Ascending (A-Z) by title' },
  { id: 'nameDesc', label: 'Descending (Z-A) by title' },
  { id: 'newest', label: 'Newest' },
  { id: 'oldest', label: 'Oldest' },
];

export const DEFAULT_GROUP_OPTIONS = [
  { id: 'none', label: 'None' },
  // { id: 'project', label: 'Project' },
  { id: 'publicationType', label: 'Publication type' },
  { id: 'year', label: 'Year' },
];
