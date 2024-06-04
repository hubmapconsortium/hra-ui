import { ConnectedPosition } from '@angular/cdk/overlay';

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

export const TOOLTIP_POSITION_RIGHT_SIDE = [
  createPosition('end', 'top', 'start', 'bottom'),
  createPosition('end', 'center', 'start', 'center'),
  createPosition('end', 'bottom', 'start', 'top'),
];

export const TOOLTIP_POSITION_LEFT_SIDE = [
  createPosition('start', 'bottom', 'end', 'top'),
  createPosition('start', 'center', 'end', 'center'),
  createPosition('start', 'top', 'end', 'bottom'),
];

export const TOOLTIP_POSITION_BELOW = [
  createPosition('center', 'bottom', 'center', 'top'),
  createPosition('start', 'bottom', 'start', 'top'),
  createPosition('end', 'bottom', 'end', 'top'),
];

export const TOOLTIP_POSITION_COLOR_PICKER_LABEL = [
  createPosition('start', 'center', 'end', 'center', -26),
  createPosition('end', 'center', 'start', 'center', 4),
];
