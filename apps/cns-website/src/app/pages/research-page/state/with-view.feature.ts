import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { patchState, signalMethod, signalStoreFeature, withMethods, withState } from '@ngrx/signals';

/** Display mode for research items */
export enum View {
  Gallery = 'gallery',
  List = 'list',
}

/** View state for the research page */
interface ViewState {
  /** Active display mode */
  view: View;
}

/** Default view state (gallery) */
const initialState: ViewState = {
  view: View.Gallery,
};

/**
 * Manages view mode for research items (gallery or list).
 * Automatically sets list view for certain categories on initial load.
 */
export function withView() {
  return signalStoreFeature(
    withState(() => {
      const route = inject(ActivatedRoute);
      const categoryParam = route.snapshot.queryParams['category'];
      const view = ['publication', 'event', 'funding', 'presentation'].includes(categoryParam)
        ? View.List
        : initialState.view;
      return { view };
    }),

    withMethods((store) => ({
      /** Sets the active view mode */
      setView: signalMethod((view: View) => patchState(store, { view })),
    })),
  );
}
