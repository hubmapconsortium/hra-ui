import { WritableSignal } from '@angular/core';
import { NextObserver } from 'rxjs';

/**
 * Creates an observer that tracks a data loader's loading state in a signal,
 * so the panels that use the data can show skeletons while it loads.
 *
 * @param state Signal to update
 * @returns Observer to pass to the data loader
 */
export function loadingObserver(state: WritableSignal<boolean>): NextObserver<boolean> {
  return { next: (value) => state.set(value) };
}
