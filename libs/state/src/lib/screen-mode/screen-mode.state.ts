import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import produce from 'immer';
import { Set } from './screen-mode.actions';
import { ScreenModeModel } from './screen-mode.model';

@State<ScreenModeModel>({
  name: 'screenmode',
  defaults: {
    isFullScreen: false,
  },
})
@Injectable()
export class ScreenModeState {
  @Action(Set)
  set({ setState }: StateContext<ScreenModeModel>, { isFullScreen }: Set): void {
    setState(
      produce((draft: ScreenModeModel) => {
        draft.isFullScreen = isFullScreen;
      })
    );
  }
}
