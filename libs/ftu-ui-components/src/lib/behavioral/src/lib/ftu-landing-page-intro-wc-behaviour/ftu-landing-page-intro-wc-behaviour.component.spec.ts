import { dispatch, selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { Shallow } from 'shallow-render';
import { FtuLandingPageIntroWcBehaviourComponent } from './ftu-landing-page-intro-wc-behaviour.component';
jest.mock('@hra-ui/cdk/injectors');

describe('FtuLandingPageIntroWcBehaviourComponent', () => {
  let shallow: Shallow<FtuLandingPageIntroWcBehaviourComponent>;
  jest.mocked(selectQuerySnapshot).mockReturnValue(jest.fn());
  jest.mocked(dispatch).mockReturnValue(jest.fn());

  beforeEach(async () => {
    shallow = new Shallow(FtuLandingPageIntroWcBehaviourComponent);
  });

  afterEach(() => jest.clearAllMocks());

  it('should create FtuLandingPageIntroWcBehaviourComponent', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
