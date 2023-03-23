import { dispatch, selectSnapshot } from '@hra-ui/cdk/injectors';
import { Shallow } from 'shallow-render';

import { MedicalIllustrationBehaviorComponent } from './medical-illustration-behavior.component';

jest.mock('@hra-ui/cdk/injectors');

describe('MedicalIllustrationBehaviorComponent', () => {
  let shallow: Shallow<MedicalIllustrationBehaviorComponent>;

  jest.mocked(selectSnapshot).mockReturnValue(jest.fn());
  jest.mocked(dispatch).mockReturnValue(jest.fn());

  beforeEach(() => {
    shallow = new Shallow(MedicalIllustrationBehaviorComponent);
  });

  afterEach(() => jest.clearAllMocks());

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  it('update the node', async () => {
    const { instance } = await shallow.render();
    instance.nodeHovered('test');
    expect(instance.updateNode).toHaveBeenCalledWith('test');
  });
});
