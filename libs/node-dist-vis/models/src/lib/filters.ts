import { computed, Signal } from '@angular/core';
import { JsonFileLoaderService } from '@hra-ui/common/fs';
import { NextObserver } from 'rxjs';
import { DataInput, isRecordObject, loadData } from './utils';

/** Node filter data entry */
export type NodeFilterEntry = string | number;
/** Node filter input */
export type NodeFilterInput = DataInput<NodeFilter>;
/** Node filter predicate signature */
export type NodeFilterPredFn = (type: string, index: number) => boolean;

/** Node filter */
export interface NodeFilter {
  /** Node types and indices to include */
  include?: NodeFilterEntry[];
  /** Node types and indices to exclude */
  exclude?: NodeFilterEntry[];
}

/** Function that always return true */
function truthy(): boolean {
  return true;
}

/** Function that always return false */
function falsy(): boolean {
  return false;
}

function concatEntries(
  array1: NodeFilterEntry[] | undefined,
  array2: NodeFilterEntry[] | undefined,
): NodeFilterEntry[] | undefined {
  if (array1 !== undefined) {
    if (array2 !== undefined) {
      return [...array1, ...array2];
    }
    return array1;
  }
  return array2;
}

/** Node filter view */
export class NodeFilterView {
  /** Included entries */
  readonly include: NodeFilterEntry[] | undefined;
  /** Excluded entries */
  readonly exclude: NodeFilterEntry[] | undefined;

  /** Predicate that tests whether a node is included in the filter */
  readonly includes: NodeFilterPredFn;

  /**
   * Get whether the filter is empty
   *
   * @returns Whether the filter is empty, i.e. all nodes are included
   */
  readonly isEmpty = () => {
    const { include, exclude = [] } = this;
    return include === undefined && exclude.length === 0;
  };

  readonly addEntries = (
    include?: NodeFilterEntry[] | undefined,
    exclude?: NodeFilterEntry[] | undefined,
  ): NodeFilterView => {
    const newInclude = concatEntries(this.include, include);
    const newExclude = concatEntries(this.exclude, exclude);
    return new NodeFilterView(newInclude, newExclude);
  };

  readonly clear = (clearInclude = true, clearExclude = true): NodeFilterView => {
    const include = clearInclude ? undefined : this.include;
    const exclude = clearExclude ? undefined : this.exclude;
    return new NodeFilterView(include, exclude);
  };

  /** Initialize the filter */
  constructor(include: NodeFilterEntry[] | undefined, exclude: NodeFilterEntry[] | undefined) {
    this.include = include;
    this.exclude = exclude;
    this.includes = this.selectFilterFn();
  }

  /**
   * Selects a node filter predicate function based on whether
   * parts of the filter is empty
   *
   * @returns A node filter predicate function
   */
  private selectFilterFn(): NodeFilterPredFn {
    const { include, exclude = [] } = this;
    const includeFn = this.createFilterFn(include);
    const excludeFn = this.createFilterFn(exclude);

    if (include === undefined) {
      return exclude.length === 0 ? truthy : (type, index) => !excludeFn(type, index);
    } else if (include.length === 0) {
      return falsy;
    } else if (exclude.length === 0) {
      return includeFn;
    }
    return (type, index) => includeFn(type, index) && !excludeFn(type, index);
  }

  /**
   * Create a filter predicate for some entries
   *
   * @param entries Filter entries
   * @returns A filter predicate that returns true for value in the entries
   */
  private createFilterFn(entries: NodeFilterEntry[] | undefined): NodeFilterPredFn {
    const entriesSet = new Set(entries);
    return (type, index) => entriesSet.has(type) || entriesSet.has(index);
  }
}

/**
 * Load a node filter
 *
 * @param input Node filter raw input
 * @param selection Backwards compatable node filter include array
 * @param loading Observer notified when data is loading
 * @returns A node filter view
 */
export function loadNodeFilter(
  input: Signal<NodeFilterInput>,
  selection: Signal<DataInput<string[]>>,
  loading?: NextObserver<boolean>,
): Signal<NodeFilterView> {
  const data = loadData(input, JsonFileLoaderService, {}, loading);
  const selectionData = loadData(selection, JsonFileLoaderService, {}, loading);
  return computed(() => {
    const result = data();
    if (result instanceof NodeFilterView) {
      return result;
    } else if (isRecordObject(result)) {
      const { include, exclude } = result as NodeFilter;
      return new NodeFilterView(include, exclude);
    }

    const includeSelection = selectionData();
    const include = Array.isArray(includeSelection) ? includeSelection : undefined;
    return new NodeFilterView(include, undefined);
  });
}
