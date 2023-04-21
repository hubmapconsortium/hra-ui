import { Selector } from '@ngxs/store';
import { ScreenModeModel } from './screen-mode.model';

/**
 * Screen mode selectors
 */
export class ScreenModeSelectors {
  /**
   * Selectors screen mode selectors
   * @param state
   * @returns true if full screen
   */
  @Selector()
  static isFullScreen(state: ScreenModeModel): boolean {
    return state.isFullScreen;
  }
}
