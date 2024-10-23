import { computed, Signal } from '@angular/core';
import { DeckProps } from '@deck.gl/core/typed';
import { ViewMode } from '../models/view-mode';

const DEFAULT_CONTROLLER_OPTIONS: DeckProps['controller'] = true;
const SELECT_CONTROLLER_OPTIONS: DeckProps['controller'] = {
  dragRotate: false,
};

export function createController(mode: Signal<ViewMode>): Signal<DeckProps['controller']> {
  return computed(() => {
    return mode() === 'select' ? SELECT_CONTROLLER_OPTIONS : DEFAULT_CONTROLLER_OPTIONS;
  });
}
