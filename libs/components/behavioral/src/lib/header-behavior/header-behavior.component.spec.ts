import { dispatch, selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { Shallow } from 'shallow-render';

import { HeaderBehaviorComponent } from './header-behavior.component';

jest.mock('@hra-ui/cdk/injectors');

describe('HeaderBehaviorComponent', () => {
  let shallow: Shallow<HeaderBehaviorComponent>;

  jest.mocked(selectQuerySnapshot).mockReturnValue(jest.fn());
  jest.mocked(dispatch).mockReturnValue(jest.fn());

  beforeEach(async () => {
    shallow = new Shallow(HeaderBehaviorComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
