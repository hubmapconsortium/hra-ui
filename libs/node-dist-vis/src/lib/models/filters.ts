import { computed, Signal } from '@angular/core';
import { JsonFileLoaderService } from '@hra-ui/common/fs';
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

/** Node filter view */
export class NodeFilterView {
  /** Predicate that tests whether a node is included in the filter */
  readonly includes = this.selectFilterFn();

  /**
   * Get whether the filter is empty
   *
   * @returns Whether the filter is empty, i.e. all nodes are included
   */
  readonly isEmpty = () => {
    const { include, exclude = [] } = this;
    return include === undefined && exclude.length === 0;
  };

  /** Initialize the filter */
  constructor(
    readonly include: NodeFilterEntry[] | undefined,
    readonly exclude: NodeFilterEntry[] | undefined,
  ) {}

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
    } else {
      return (type, index) => includeFn(type, index) && !excludeFn(type, index);
    }
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
 * @returns A node filter view
 */
export function loadNodeFilter(
  input: Signal<NodeFilterInput>,
  selection: Signal<DataInput<string[]>>,
): Signal<NodeFilterView> {
  const data = loadData(input, JsonFileLoaderService, {});
  const selectionData = loadData(selection, JsonFileLoaderService, {});
  return computed(() => {
    const result = data();
    if (isRecordObject(result)) {
      const { include, exclude } = result as NodeFilter;
      return new NodeFilterView(include, exclude);
    }

    const includeSelection = selectionData();
    const include = Array.isArray(includeSelection) ? includeSelection : undefined;
    return new NodeFilterView(include, undefined);
  });
}
