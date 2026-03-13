import { patchState, signalMethod, signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';

/** Display mode for research items */
export enum View {
  Gallery = 'gallery',
  List = 'list',
}

/** View state for the research page */
interface ViewState {
  /** Active display mode */
  _view: View | null;
}

/** Default view state (gallery) */
const initialState: ViewState = {
  _view: null,
};

/**
 * Manages view mode for research items (gallery or list).
 * Automatically sets list view for certain categories on initial load.
 */
export function withView() {
  return signalStoreFeature(
    withState(initialState),
    withComputed((store) => ({
      view: () => store._view() ?? View.Gallery,
    })),
    withMethods((store) => ({
      /** Sets the active view mode */
      setView: signalMethod((view: View | null) => patchState(store, { _view: view })),
    })),
  );
}
