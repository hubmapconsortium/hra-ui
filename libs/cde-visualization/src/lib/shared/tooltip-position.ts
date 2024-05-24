import { ConnectedPosition } from '@angular/cdk/overlay';

function createPosition(
  originX: ConnectedPosition['originX'],
  originY: ConnectedPosition['originY'],
  overlayX: ConnectedPosition['overlayX'],
  overlayY: ConnectedPosition['overlayY'],
): ConnectedPosition {
  return {
    originX,
    originY,
    overlayX,
    overlayY,
  };
}

export const TOOLTIP_POSITION_RIGHT_SIDE: ConnectedPosition[] = [
  createPosition('end', 'top', 'start', 'top'),
  createPosition('end', 'center', 'start', 'center'),
  createPosition('end', 'bottom', 'start', 'bottom'),
];

export const TOOLTIP_POSITION_BELOW: ConnectedPosition[] = [
  createPosition('center', 'bottom', 'center', 'top'),
  createPosition('start', 'bottom', 'start', 'top'),
  createPosition('end', 'bottom', 'end', 'top'),
];
