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
import { PublicationTypes, ResearchItem, ResearchItemType } from '../../../schemas/research/research.schema';
import { FilterProps } from './with-filters.feature';
import { ResearchState } from './with-research.feature';

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

function createKeyLabelsMap(pubTypes: PublicationTypes): Record<GroupByKey, string> {
  const map: Record<GroupByKey, string> = {
    '': '',
    unknown: 'Unknown',
  };
  for (const pubType of pubTypes) {
    map[pubType.value as GroupByKey] = pubType.label;
  }
  return map;
}

function groupByKeyToLabel(key: GroupByKey, keyLabels: Record<GroupByKey, string>): string {
  if (typeof key === 'number') {
    return key.toString();
  }

  return keyLabels[key] ?? 'Other';
}

function convertToListViewItem(item: ResearchItem): ListViewItem {
  return { content: item.description };
}

export function withOrdering() {
  return signalStoreFeature(
    { state: type<ResearchState>(), props: type<FilterProps>() },
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
        const groupBy = store.groupBy();
        const pubTypes = store.pubTypes();
        const keyLabels = createKeyLabelsMap(pubTypes);

        const groupedItems = groups.map(([key, items]) => ({
          label: groupByKeyToLabel(key, keyLabels),
          items,
        }));

        groupedItems.sort((a, b) => a.label.localeCompare(b.label));
        if (groupBy === GroupBy.Year) {
          groupedItems.reverse();
        }

        return groupedItems;
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
