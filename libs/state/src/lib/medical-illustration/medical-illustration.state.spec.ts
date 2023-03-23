import { StateContext } from '@ngxs/store';
import { mock } from 'jest-mock-extended';

import { NodeHover, SaveUrl } from './medical-illustration.actions';
import { MedicalIllustrationModel, MedicalIllustrationState } from './medical-illustration.state';

describe('MedicalIllustrationState', () => {
  const testAction1 = new SaveUrl('test');
  const testAction2 = new NodeHover('test');
  const ctx = mock<StateContext<MedicalIllustrationModel>>();
  const state = new MedicalIllustrationState();

  afterEach(() => jest.clearAllMocks());

  it('should save a url', async () => {
    state.saveUrl(ctx, testAction1);
    expect(ctx.setState).toHaveBeenCalledWith({
      url: 'test',
    });
  });

  it('should save the current nove hover', async () => {
    state.nodeHover(ctx, testAction2);
    expect(ctx.patchState).toHaveBeenCalledWith({
      node: 'test',
    });
  });
});
