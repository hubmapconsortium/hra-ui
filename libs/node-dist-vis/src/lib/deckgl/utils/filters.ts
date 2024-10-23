import { AccessorFunction } from '@deck.gl/core/typed';
import { NodeFilterPredFn } from '../../models/filters';

const FILTER_INCLUDE_VALUE = 1;
const FILTER_EXCLUDE_VALUE = 3;
export const FILTER_RANGE: [number, number] = [0, 2];

export function createNodeFilterAccessor<T>(
  accessor: AccessorFunction<T, string>,
  indexAccessor: AccessorFunction<T, number>,
  filterFn: NodeFilterPredFn,
): AccessorFunction<T, number> {
  return (obj, info) => {
    const type = accessor(obj, info);
    const index = indexAccessor(obj, info);
    const result = filterFn(type, index);
    return result ? FILTER_INCLUDE_VALUE : FILTER_EXCLUDE_VALUE;
  };
}
