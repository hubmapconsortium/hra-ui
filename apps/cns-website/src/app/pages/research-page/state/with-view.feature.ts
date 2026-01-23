import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    withState(() => {
      const route = inject(ActivatedRoute);
      const categoryParam = route.snapshot.queryParams['category'];
      const view = ['publication', 'event', 'funding', 'presentation'].includes(categoryParam)
        ? View.List
        : initialState.view;
      return { view };
    }),

    withMethods((store) => ({
      setView: signalMethod((view: View) => patchState(store, { view })),
    })),
  );
}
