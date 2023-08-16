import { Shallow } from 'shallow-render';
import { LandingComponent } from './landing.component';
import { dispatch } from '@hra-ui/cdk/injectors';

jest.mock('@hra-ui/cdk/injectors');

describe('AppComponent', () => {
  let shallow: Shallow<LandingComponent>;

  beforeEach(() => {
    jest.mocked(dispatch).mockReturnValue(jest.fn());
    shallow = new Shallow(LandingComponent);
  });

  it('should create component', async () => {
    expect(shallow.render()).resolves.toBeDefined();
  });
});
