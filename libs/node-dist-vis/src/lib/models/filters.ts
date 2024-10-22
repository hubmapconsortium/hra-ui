import { computed, Signal } from '@angular/core';
import { JsonFileLoaderService } from '@hra-ui/common/fs';
import { loadData } from './utils';

export type NodesFilterEntry = string | number;
export type NodesFilterInput = NodesFilter | string | undefined;

export interface NodesFilter {
  include?: NodesFilterEntry[];
  exclude?: NodesFilterEntry[];
}

export class NodesFilterView {
  constructor(
    readonly include: NodesFilterEntry[] | undefined,
    readonly exclude: NodesFilterEntry[] | undefined,
  ) {
    //
  }

  equals(other: unknown): boolean {
    if (!(other instanceof NodesFilterView)) {
      return false;
    }

    // TODO

    return true;
  }
}

export function loadNodesFilter(
  input: Signal<NodesFilterInput>,
  selection: Signal<string[] | undefined>,
): Signal<NodesFilterView> {
  const data = loadData(input, JsonFileLoaderService, {});
  return computed(() => {
    const result = data();
    if (typeof result !== 'object' || result === null) {
      return new NodesFilterView(selection(), undefined);
    }

    const { include, exclude } = result as NodesFilter;
    return new NodesFilterView(include, exclude);
  });
}
