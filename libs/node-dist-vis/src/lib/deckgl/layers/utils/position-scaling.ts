import { AccessorFunction, Position } from '@deck.gl/core/typed';

export function createScaledPositionAccessor<T>(
  accessor: AccessorFunction<T, Position>,
  dimensions: [number, number],
): AccessorFunction<T, Position> {
  const [min, max] = dimensions;
  const diff = max - min;
  const scale = (value: number) => (value - min) / diff;

  return (obj, info) => {
    const [x, y, z] = accessor(obj, info);
    return [scale(x), 1 - scale(y), scale(z)];
  };
}
