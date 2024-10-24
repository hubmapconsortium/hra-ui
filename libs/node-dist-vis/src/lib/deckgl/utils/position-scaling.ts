import { AccessorFunction, Position } from '@deck.gl/core/typed';

/**
 * Create a position accessor that scales position to the range [-1, 1]
 *
 * @param accessor Unscaled position accessor
 * @param dimensions Dimensions of visualization
 * @returns An accessor
 */
export function createScaledPositionAccessor<T>(
  accessor: AccessorFunction<T, Position>,
  dimensions: [number, number],
): AccessorFunction<T, Position> {
  const [min, max] = dimensions;
  const diff = max - min;
  const scale = (value: number) => (value - min) / diff;

  return (obj, info) => {
    const { target } = info;
    const position = accessor(obj, info);
    target[0] = scale(position[0]);
    target[1] = 1 - scale(position[1]);
    target[2] = scale(position[2] ?? 0);
    return target as Position;
  };
}
