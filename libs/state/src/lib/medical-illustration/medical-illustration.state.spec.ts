import { StateContext } from '@ngxs/store';
import { mock } from 'jest-mock-extended';

import { SetActiveNode, SetUri } from './medical-illustration.actions';
import { MedicalIllustrationModel } from './medical-illustration.model';
import { MedicalIllustrationState } from './medical-illustration.state';

describe('MedicalIllustrationState', () => {
  const testAction1 = new SetUri('test');
  const testAction2 = new SetActiveNode('test');
  const ctx = mock<StateContext<MedicalIllustrationModel>>();
  const state = new MedicalIllustrationState();

  afterEach(() => jest.clearAllMocks());

  it('should save a url', async () => {
    state.setUri(ctx, testAction1);
    expect(ctx.setState).toHaveBeenCalledWith({
      url: 'test',
    });
  });

  it('should save the current active node', async () => {
    state.setActiveNode(ctx, testAction2);
    expect(ctx.patchState).toHaveBeenCalledWith({
      node: 'test',
    });
  });
});
