import { AccessorFunction } from '@deck.gl/core/typed';
import { NodeFilterPredFn } from '../../models/filters';

/** Value used to indicate that an item is in the filter */
const FILTER_INCLUDE_VALUE = 1;
/** Value used to indicate that an item is not in the filter */
const FILTER_EXCLUDE_VALUE = 3;
/** Filter value range. Must be set so it includes `FILTER_INCLUDE_VALUE` and excludes `FILTER_EXCLUDE_VALUE` */
export const FILTER_RANGE: [number, number] = [0, 2];

/**
 * Create a filter accessor
 *
 * @param accessor Type value accessor
 * @param indexAccessor Item index accessor
 * @param filterFn Filter predicate
 * @returns An accessor
 */
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
