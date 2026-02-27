import { untracked } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { NgScrollbar } from 'ngx-scrollbar';
import { SmoothScrollOptions } from 'ngx-scrollbar/smooth-scroll';

/** Scrollbar state */
interface ScrollbarState {
  /** The scrollbar instance */
  scrollbar: NgScrollbar | null;
}

/** Initial state for the scrollbar store */
const initialState: ScrollbarState = {
  scrollbar: null,
};

/**
 * Global store for managing the scrollbar state and providing scroll-related methods
 */
export const ScrollbarStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setScrollbar: (scrollbar: NgScrollbar) => {
      if (untracked(store.scrollbar) !== null) {
        throw new Error('Scrollbar has already been set.');
      }

      patchState(store, { scrollbar });
    },
    clearScrollbar: () => patchState(store, { scrollbar: null }),
    scrollToTop: (options?: SmoothScrollOptions) => {
      const scrollbar = store.scrollbar();
      scrollbar?.scrollTo({ top: 0, duration: 0, ...options });
    },
  })),
);
