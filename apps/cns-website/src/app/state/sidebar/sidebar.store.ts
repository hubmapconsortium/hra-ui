import { computed, untracked } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { patchState, signalStore, withComputed, withLinkedState, withMethods, withState } from '@ngrx/signals';

/** Sidebar global state */
interface SidebarState {
  /** The currently active sidebar component */
  sidebar: MatSidenav | null;
}

/** Initial state for sidebar */
const initialState: SidebarState = {
  sidebar: null,
};

/**
 * Global store for managing the sidebar state
 */
export const SidebarStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => {
    const hasSidebar = computed(() => store.sidebar() !== null);
    const _isWideScreen = watchBreakpoint('(min-width: 1100px)');
    const mode = computed(() => (_isWideScreen() ? 'side' : 'over'));

    return { hasSidebar, mode, _isWideScreen };
  }),
  withLinkedState((store) => ({
    isOpen: () => store._isWideScreen(),
  })),
  withMethods((store) => ({
    setSidebar: (sidebar: MatSidenav) => {
      if (untracked(store.sidebar) !== null) {
        throw new Error('Sidebar has already been set.');
      }

      patchState(store, { sidebar });
    },
    clearSidebar: () => patchState(store, { sidebar: null }),
    open: () => patchState(store, { isOpen: true }),
    close: () => patchState(store, { isOpen: false }),
    toggle: () => patchState(store, (state) => ({ isOpen: !state.isOpen })),
  })),
);
