import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import produce from 'immer';
import { Set } from './screen-mode.actions';
import { ScreenModeModel } from './screen-mode.model';

/** State storing the screen mode */
@State<ScreenModeModel>({
  name: 'screenmode',
  defaults: {
    isFullScreen: false,
  },
})
@Injectable()
export class ScreenModeState {
  /**
   * Updates the screen mode
   * @param ctx State context
   * @param action Action with new mode
   */
  @Action(Set)
  set({ setState }: StateContext<ScreenModeModel>, { isFullScreen }: Set): void {
    setState(
      produce((draft: ScreenModeModel) => {
        draft.isFullScreen = isFullScreen;
      })
    );
  }
}
