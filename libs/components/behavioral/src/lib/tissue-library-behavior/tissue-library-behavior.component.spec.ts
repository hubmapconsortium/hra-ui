import { dispatch, selectSnapshot } from '@hra-ui/cdk/injectors';
import { Shallow } from 'shallow-render';
import { TissueLibraryBehaviorComponent } from './tissue-library-behavior.component';

jest.mock('@hra-ui/cdk/injectors');

describe('TissueLibraryBehaviorComponent', () => {
  let shallow: Shallow<TissueLibraryBehaviorComponent>;

  jest.mocked(selectSnapshot).mockReturnValue(jest.fn().mockReturnValue([]));
  jest.mocked(dispatch).mockReturnValue(jest.fn());

  beforeEach(async () => {
    shallow = new Shallow(TissueLibraryBehaviorComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
