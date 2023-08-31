import { dispatch, selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { Shallow } from 'shallow-render';
import { HraLandingPageIntroWcBehaviourComponent } from './hra-landing-page-intro-wc-behaviour.component';
jest.mock('@hra-ui/cdk/injectors');

describe('HraLandingPageIntroWcBehaviourComponent', () => {
  let shallow: Shallow<HraLandingPageIntroWcBehaviourComponent>;
  jest.mocked(selectQuerySnapshot).mockReturnValue(jest.fn());
  jest.mocked(dispatch).mockReturnValue(jest.fn());

  beforeEach(async () => {
    shallow = new Shallow(HraLandingPageIntroWcBehaviourComponent);
  });

  afterEach(() => jest.clearAllMocks());

  it('should create HraLandingPageIntroWcBehaviourComponent', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
