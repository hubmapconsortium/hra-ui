import { computed, Signal } from '@angular/core';
import { DeckProps } from '@deck.gl/core/typed';
import { ViewMode } from '../models/view-mode';

/** Initial/default controller options */
const DEFAULT_CONTROLLER_OPTIONS: DeckProps['controller'] = true;
/** Controller options for 'select' view mode */
const SELECT_CONTROLLER_OPTIONS: DeckProps['controller'] = {
  dragRotate: false,
};

/**
 * Get the controller options based on current view mode
 *
 * @param mode The view mode
 * @returns Controller options
 */
export function createController(mode: Signal<ViewMode>): Signal<DeckProps['controller']> {
  return computed(() => {
    return mode() === 'select' ? SELECT_CONTROLLER_OPTIONS : DEFAULT_CONTROLLER_OPTIONS;
  });
}
