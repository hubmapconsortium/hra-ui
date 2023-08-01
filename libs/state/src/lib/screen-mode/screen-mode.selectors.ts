import { Selector } from '@ngxs/store';
import { ScreenModeModel } from './screen-mode.model';
import { ScreenModeState } from './screen-mode.state';

/**
 * Screen mode selectors
 */
export class ScreenModeSelectors {
  /**
   * Selectors screen mode selectors
   * @param state
   * @returns true if full screen
   */
  @Selector([ScreenModeState])
  static isFullScreen(state: ScreenModeModel): boolean {
    return state.isFullScreen;
  }
}
