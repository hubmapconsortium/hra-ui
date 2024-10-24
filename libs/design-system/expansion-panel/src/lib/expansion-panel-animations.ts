import { animate, state, style, transition, trigger } from '@angular/animations';

/** Animation for the expansion panel */
export const EXPANSION_PANEL_ANIMATION_TIMING = '225ms cubic-bezier(0.4,0.0,0.2,1)';

/** Animation for Body Expansion */
export const BODY_EXPANSION = trigger('bodyExpansion', [
  state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
  state('expanded', style({ height: '*', visibility: '' })),
  transition('expanded <=> collapsed, void => collapsed', animate(EXPANSION_PANEL_ANIMATION_TIMING)),
]);
