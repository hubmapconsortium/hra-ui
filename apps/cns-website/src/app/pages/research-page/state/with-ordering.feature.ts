import { computed } from '@angular/core';
import { ListViewGroup, ListViewItem } from '@hra-ui/design-system/content-templates/list-view';
import {
  patchState,
  signalMethod,
  signalStoreFeature,
  type,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  ResearchEventType,
  ResearchFundingType,
  ResearchItem,
  ResearchItemType,
  ResearchPublicationType,
} from '../../../schemas/research/research.schema';
import { FilterProps } from './with-filters.feature';

export enum SortBy {
  NameAsc = 'nameAsc',
  NameDesc = 'nameDesc',
  Newest = 'newest',
  Oldest = 'oldest',
}

export enum GroupBy {
  PublicationType = 'publicationType',
  Year = 'year',
}

export interface GroupedResearchItems {
  label: string;
  items: ResearchItem[];
}

type GroupByKey = ResearchItemType | number | '' | 'unknown';

interface OrderingState {
  sortBy: SortBy | null;
  groupBy: GroupBy | null;
}

const initialState: OrderingState = {
  sortBy: null,
  groupBy: null,
};

function compareByGroupKey(a: GroupByKey, b: GroupByKey): number {
  if (typeof a === 'number' && typeof b === 'number') {
    return b - a;
  }

  return String(a).localeCompare(String(b));
}

function createSortByFn(sortBy: SortBy | null): ((a: ResearchItem, b: ResearchItem) => number) | undefined {
  switch (sortBy) {
    case SortBy.NameAsc:
      return (a, b) => a.title.localeCompare(b.title);
    case SortBy.NameDesc:
      return (a, b) => b.title.localeCompare(a.title);
    case SortBy.Newest:
      return (a, b) => b.dateStart.getTime() - a.dateStart.getTime();
    case SortBy.Oldest:
      return (a, b) => a.dateStart.getTime() - b.dateStart.getTime();
    default:
      return undefined;
  }
}

function createGroupByKeyFn(groupBy: GroupBy | null): (item: ResearchItem) => GroupByKey {
  switch (groupBy) {
    case GroupBy.PublicationType:
      return (item) => item.type || 'unknown';
    case GroupBy.Year:
      return (item) => item.dateStart.getFullYear();
    default:
      return () => '';
  }
}

const GROUP_BY_KEY_LABELS: Record<GroupByKey, string> = {
  '': '',
  unknown: 'Unknown',
  ['news' as ResearchItemType]: 'News',
  ['paper-conference' as ResearchPublicationType]: 'Visualizations',
  ['report' as ResearchPublicationType]: 'Tech report',
  ['article-journal' as ResearchPublicationType]: 'Journal article',
  ['manuscript' as ResearchPublicationType]: 'Unrefereed',
  ['chapter' as ResearchPublicationType]: 'Book chapter',
  ['book' as ResearchPublicationType]: 'Book',
  ['periodical' as ResearchPublicationType]: 'Edited journal',
  ['broadcast' as ResearchPublicationType]: 'Audio/video',
  ['thesis' as ResearchPublicationType]: 'Thesis',
  ['patent' as ResearchPublicationType]: 'Patent',
  ['research-funding' as ResearchFundingType]: 'Research funding',
  ['teaching-funding' as ResearchFundingType]: 'Teaching funding',
  ['workshop-funding' as ResearchFundingType]: 'Workshop funding',
  ['24-hour' as ResearchEventType]: '24-hour',
  ['amatria' as ResearchEventType]: 'Amatria',
  ['workshop' as ResearchEventType]: 'Workshops',
};

function groupByKeyToLabel(key: GroupByKey): string {
  if (typeof key === 'number') {
    return key.toString();
  }

  return GROUP_BY_KEY_LABELS[key] ?? key;
}

function convertToListViewItem(item: ResearchItem): ListViewItem {
  return { content: item.description };
}

export function withOrdering() {
  return signalStoreFeature(
    { props: type<FilterProps>() },
    withState(initialState),
    withComputed((store) => {
      const _sortByFn = computed(() => createSortByFn(store.sortBy()));
      const _sortedItems = computed(() => {
        const items = store.filteredItems();
        const sortByFn = _sortByFn();
        return sortByFn ? [...items].sort(sortByFn) : items;
      });

      const _groupByKeyFn = computed(() => createGroupByKeyFn(store.groupBy()));
      const _groupedItems = computed(() => {
        const items = _sortedItems();
        const groupBy = store.groupBy();
        if (!groupBy) {
          return new Map<GroupByKey, ResearchItem[]>([['', items]]);
        }

        const groupByKeyFn = _groupByKeyFn();
        const groups = new Map<GroupByKey, ResearchItem[]>();
        for (const item of items) {
          const key = groupByKeyFn(item);
          let group = groups.get(key);
          if (!group) {
            group = [];
            groups.set(key, group);
          }
          group.push(item);
        }

        return groups;
      });

      const sortedGroupedItems = computed(() => {
        const groups = Array.from(_groupedItems());
        const sortBy = store.sortBy();
        groups.sort((a, b) => compareByGroupKey(a[0], b[0]));
        if (sortBy === SortBy.NameDesc || sortBy === SortBy.Oldest) {
          groups.reverse();
        }

        return groups.map(([key, items]) => ({ label: groupByKeyToLabel(key), items }));
      });

      const sortedGroupedListItems = computed(() => {
        const groups = sortedGroupedItems();
        return groups.map(
          ({ label, items }): ListViewGroup => ({ group: label, items: items.map(convertToListViewItem) }),
        );
      });

      return {
        sortedGroupedItems,
        sortedGroupedListItems,
        _sortedItems,
        _groupedItems,
      };
    }),
    withMethods((store) => ({
      setSortBy: signalMethod((sortBy: SortBy | null) => patchState(store, { sortBy })),
      setGroupBy: signalMethod((groupBy: GroupBy | null) => patchState(store, { groupBy })),
    })),
  );
}
