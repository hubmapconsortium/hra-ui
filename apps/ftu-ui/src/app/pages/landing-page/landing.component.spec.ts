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

  it('should use appLink2 for EBI link', async () => {
    const { instance } = await shallow.render({
      bind: { appLink1: 'https://custom-kpmp.org', appLink2: 'https://custom-ebi.ac.uk' },
    });
    expect(instance['ebiLink']()).toBe('https://custom-ebi.ac.uk');
  });
});
