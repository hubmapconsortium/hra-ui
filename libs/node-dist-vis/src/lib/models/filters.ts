import { computed, Signal } from '@angular/core';
import { JsonFileLoaderService } from '@hra-ui/common/fs';
import { isRecordObject, loadData } from './utils';

export type NodeFilterEntry = string | number;
export type NodeFilterInput = NodeFilter | string | undefined;
export type NodeFilterPredFn = (type: string, index: number) => boolean;

export interface NodeFilter {
  include?: NodeFilterEntry[];
  exclude?: NodeFilterEntry[];
}

function truthy(): boolean {
  return true;
}

function falsy(): boolean {
  return false;
}

export class NodeFilterView {
  readonly includes = this.selectFilterFn();
  readonly isEmpty = () => {
    const { include, exclude = [] } = this;
    return include === undefined && exclude.length === 0;
  };

  constructor(
    readonly include: NodeFilterEntry[] | undefined,
    readonly exclude: NodeFilterEntry[] | undefined,
  ) {}

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

  private createFilterFn(entries: NodeFilterEntry[] | undefined): NodeFilterPredFn {
    const entriesSet = new Set(entries);
    return (type, index) => entriesSet.has(type) || entriesSet.has(index);
  }
}

export function loadNodeFilter(
  input: Signal<NodeFilterInput>,
  selection: Signal<string | string[] | undefined>,
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
