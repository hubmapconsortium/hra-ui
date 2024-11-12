import { AccessorFunction } from '@deck.gl/core/typed';
import { NodeFilterPredFn } from '@hra-ui/node-dist-vis/models';

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

/**
 * Create a filter accessor
 *
 * @param accessor1 Type value accessor
 * @param indexAccessor1 Item index accessor
 * @param accessor2 Type value accessor
 * @param indexAccessor2 Item index accessor
 * @param filterFn Filter predicate
 * @returns An accessor
 */
export function createNodeFilterAccessor2<T>(
  accessor1: AccessorFunction<T, string>,
  indexAccessor1: AccessorFunction<T, number>,
  accessor2: AccessorFunction<T, string>,
  indexAccessor2: AccessorFunction<T, number>,
  filterFn: NodeFilterPredFn,
): AccessorFunction<T, number> {
  return (obj, info) => {
    const type1 = accessor1(obj, info);
    const index1 = indexAccessor1(obj, info);
    const result1 = filterFn(type1, index1);
    if (!result1) {
      return FILTER_EXCLUDE_VALUE;
    }

    const type2 = accessor2(obj, info);
    const index2 = indexAccessor2(obj, info);
    const result2 = filterFn(type2, index2);
    return result2 ? FILTER_INCLUDE_VALUE : FILTER_EXCLUDE_VALUE;
  };
}
