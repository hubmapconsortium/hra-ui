import { ConnectedPosition } from '@angular/cdk/overlay';

/**
 * Creates a position configuration for tooltips.
 *
 * @param originX - The horizontal origin position.
 * @param originY - The vertical origin position.
 * @param overlayX - The horizontal overlay position.
 * @param overlayY - The vertical overlay position.
 * @param offsetX - Optional horizontal offset.
 * @param offsetY - Optional vertical offset.
 * @returns A ConnectedPosition object.
 */
function createPosition(
  originX: ConnectedPosition['originX'],
  originY: ConnectedPosition['originY'],
  overlayX: ConnectedPosition['overlayX'],
  overlayY: ConnectedPosition['overlayY'],
  offsetX?: ConnectedPosition['offsetX'],
  offsetY?: ConnectedPosition['offsetY'],
): ConnectedPosition {
  return {
    originX,
    originY,
    overlayX,
    overlayY,
    offsetX,
    offsetY,
  };
}

/** Tooltip positions on the right side. */
export const TOOLTIP_POSITION_RIGHT_SIDE = [
  createPosition('end', 'top', 'start', 'top', 0, -20),
  createPosition('end', 'center', 'start', 'center'),
  createPosition('end', 'bottom', 'start', 'bottom'),
];

/** Tooltip positions on the left side. */
export const TOOLTIP_POSITION_LEFT_SIDE = [
  createPosition('start', 'bottom', 'end', 'top'),
  createPosition('start', 'center', 'end', 'center'),
  createPosition('start', 'top', 'end', 'bottom'),
];

/** Tooltip positions below. */
export const TOOLTIP_POSITION_BELOW = [
  createPosition('center', 'bottom', 'center', 'top'),
  createPosition('start', 'bottom', 'start', 'top'),
  createPosition('end', 'bottom', 'end', 'top'),
];

/** Tooltip positions for color picker labels. */
export const TOOLTIP_POSITION_COLOR_PICKER_LABEL = [
  createPosition('start', 'center', 'end', 'center', -26),
  createPosition('end', 'center', 'start', 'center', 4),
];
