import { StateContext } from '@ngxs/store';
import { mock } from 'jest-mock-extended';
import { Set } from './screen-mode.actions';
import { ScreenModeModel } from './screen-mode.model';
import { ScreenModeState } from './screen-mode.state';

describe('ScreenMode State', () => {
  const state = new ScreenModeState();
  const action = new Set(true);
  const latest: ScreenModeModel = {
    isFullScreen: false,
  };
  const ctx = mock<StateContext<ScreenModeModel>>();

  afterEach(() => jest.clearAllMocks());

  it('should call set state for ctx', async () => {
    state.set(ctx, action);
    expect(ctx.setState).toHaveBeenCalled();
  });

  it('should update flag', async () => {
    ctx.setState.mockImplementation(() => latest);
    await state.set(ctx, action);
    expect(latest.isFullScreen).toEqual(true);
  });
});
