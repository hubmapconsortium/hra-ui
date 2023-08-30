import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import produce from 'immer';
import { Set, SetSize } from './screen-mode.actions';
import { ScreenModeModel } from './screen-mode.model';

/** State storing the screen mode */
@State<ScreenModeModel>({
  name: 'screenmode',
  defaults: {
    isFullScreen: false,
    size: 'large',
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

  @Action(SetSize)
  SetSize({ setState }: StateContext<ScreenModeModel>, { size }: SetSize): void {
    setState(
      produce((draft: ScreenModeModel) => {
        draft.size = size;
      })
    );
  }
}
