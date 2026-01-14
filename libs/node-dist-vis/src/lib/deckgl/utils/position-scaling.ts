import { AccessorFunction, Position } from '@deck.gl/core/typed';
import { Dimensions } from '@hra-ui/node-dist-vis/models';

/**
 * Applies scaling to a position value
 *
 * @param dest Destination position array (must have length >= 3)
 * @param position Unscaled position
 * @param offset Position offset
 * @param scale Scale length
 * @returns The `dest` array cast to a `Position` containing the scaled position
 */
function applyScaling(dest: number[], position: Position, offset: number, scale: number): Position {
  dest[0] = (position[0] - offset) / scale;
  dest[1] = 1 - (position[1] - offset) / scale;
  dest[2] = ((position[2] ?? 0) - offset) / scale;
  return dest as Position;
}

/**
 * Scales a position to the range [0, 1]
 *
 * @param position Unscaled position
 * @param dimensions Dimensions of visualization
 * @returns Scaled position
 */
export function scalePosition(position: Position, dimensions: Dimensions): Position {
  return applyScaling([0, 0, 0], position, dimensions[0], dimensions[1] - dimensions[0]);
}

/**
 * Create a position accessor that scales position to the range [0, 1]
 *
 * @param accessor Unscaled position accessor
 * @param dimensions Dimensions of visualization
 * @returns An accessor
 */
export function createScaledPositionAccessor<T>(
  accessor: AccessorFunction<T, Position>,
  dimensions: Dimensions,
): AccessorFunction<T, Position> {
  return (obj, info) => {
    const { target } = info;
    const position = accessor(obj, info);
    return applyScaling(target, position, dimensions[0], dimensions[1] - dimensions[0]);
  };
}
