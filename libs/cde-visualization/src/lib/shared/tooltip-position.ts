import { ConnectedPosition } from '@angular/cdk/overlay';

const POSITION_ABOVE: ConnectedPosition = {
  originX: 'center',
  originY: 'top',
  overlayX: 'center',
  overlayY: 'bottom',
};

const POSITION_BELOW: ConnectedPosition = {
  originX: 'center',
  originY: 'bottom',
  overlayX: 'center',
  overlayY: 'top',
};

const POSITION_LEFT: ConnectedPosition = {
  originX: 'start',
  originY: 'center',
  overlayX: 'end',
  overlayY: 'center',
};

const POSITION_RIGHT: ConnectedPosition = {
  originX: 'end',
  originY: 'center',
  overlayX: 'start',
  overlayY: 'center',
};

export const TOOLTIP_POSITION_HORIZONTAL: ConnectedPosition[] = [
  POSITION_RIGHT,
  POSITION_LEFT,
  POSITION_BELOW,
  POSITION_ABOVE,
];

export const TOOLTIP_POSITION_VERTICAL: ConnectedPosition[] = [
  POSITION_BELOW,
  POSITION_ABOVE,
  POSITION_RIGHT,
  POSITION_LEFT,
];
