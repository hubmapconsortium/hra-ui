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

/** Sort order options for research items */
export enum SortBy {
  NameAsc = 'nameAsc',
  NameDesc = 'nameDesc',
  Newest = 'newest',
  Oldest = 'oldest',
}

/** Grouping criteria for research items */
export enum GroupBy {
  PublicationType = 'publicationType',
  Year = 'year',
}

/** Group of research items with a label */
export interface GroupedResearchItems {
  /** Group display label */
  label: string;
  /** Items belonging to the group */
  items: ResearchItem[];
}

/** Key type for grouping research items */
type GroupByKey = ResearchItemType | number | '' | 'unknown';

/** Ordering state for sorting and grouping */
interface OrderingState {
  /** Active sort option */
  sortBy: SortBy | null;
  /** Active grouping option */
  groupBy: GroupBy | null;
}

/** Default ordering state (newest, no grouping) */
const initialState: OrderingState = {
  sortBy: SortBy.Newest,
  groupBy: null,
};

/**
 * Creates a sorting function based on the selected sort option.
 * @param sortBy Selected sort option
 */
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

/**
 * Creates a function to extract the grouping key from a research item.
 * @param groupBy Selected grouping option
 */
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

/**
 * Creates a mapping of group keys to display labels.
 * @param pubTypes Publication type definitions
 */
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

/**
 * Converts a group key to its display label.
 * @param key Group key value
 * @param keyLabels Map of key labels
 */
function groupByKeyToLabel(key: GroupByKey, keyLabels: Record<GroupByKey, string>): string {
  if (typeof key === 'number') {
    return key.toString();
  }

  return keyLabels[key] ?? 'Other';
}

/**
 * Converts a research item to a list view item format.
 * @param item Research item to convert
 */
function convertToListViewItem(item: ResearchItem): ListViewItem {
  return { content: item.description };
}

/**
 * Adds sorting and grouping capabilities for research items.
 * Provides sorted and grouped views of filtered research items.
 */
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
      /** Sets the current sort option */
      setSortBy: signalMethod((sortBy: SortBy | null) => patchState(store, { sortBy })),
      /** Sets the current grouping option */
      setGroupBy: signalMethod((groupBy: GroupBy | null) => patchState(store, { groupBy })),
    })),
  );
}
