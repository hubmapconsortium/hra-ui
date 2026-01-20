import { patchState, signalMethod, signalStoreFeature, withMethods, withState } from '@ngrx/signals';

export enum View {
  Gallery = 'gallery',
  List = 'list',
}

interface ViewState {
  view: View;
}

const initialState: ViewState = {
  view: View.Gallery,
};

export function withView() {
  return signalStoreFeature(
    withState(initialState),
    withMethods((store) => ({
      setView: signalMethod((view: View) => patchState(store, { view })),
    })),
  );
}
