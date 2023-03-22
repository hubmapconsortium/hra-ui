import { dispatch, selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { Shallow } from 'shallow-render';
import { FooterBehaviorComponent } from './footer-behavior.component';

jest.mock('@hra-ui/cdk/injectors');

describe('HeaderBehaviorComponent', () => {
  let shallow: Shallow<FooterBehaviorComponent>;

  jest.mocked(selectQuerySnapshot).mockReturnValue(jest.fn());
  jest.mocked(dispatch).mockReturnValue(jest.fn());

  beforeEach(async () => {
    shallow = new Shallow(FooterBehaviorComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
