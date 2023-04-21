import { ScreenModeModel } from './screen-mode.model';
import { ScreenModeSelectors } from './screen-mode.selectors';

describe('ScreenMode Selectors', () => {
  const state: ScreenModeModel = {
    isFullScreen: false,
  };

  it('should return screenmode isFullscreen', () => {
    const result = ScreenModeSelectors.isFullScreen(state);
    expect(result).toEqual(false);
  });
});
