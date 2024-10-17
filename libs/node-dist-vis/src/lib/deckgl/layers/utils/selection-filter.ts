import { AccessorFunction } from '@deck.gl/core/typed';

const FILTER_INCLUDE_VALUE = 1;
const FILTER_EXCLUDE_VALUE = 3;
export const FILTER_RANGE: [number, number] = [0, 2];

export function createSelectionFilterAccessor<T>(
  accessor: AccessorFunction<T, string>,
  selection: string[] | undefined,
): AccessorFunction<T, number> {
  if (selection === undefined) {
    return () => FILTER_INCLUDE_VALUE;
  }

  const selectionSet = new Set(selection);
  return (obj, info) => {
    const value = accessor(obj, info);
    return selectionSet.has(value) ? FILTER_INCLUDE_VALUE : FILTER_EXCLUDE_VALUE;
  };
}
