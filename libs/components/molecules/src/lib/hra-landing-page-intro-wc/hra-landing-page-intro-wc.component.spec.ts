import { LinkDirective } from '@hra-ui/cdk';
import { selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { Shallow } from 'shallow-render';
import { HraLandingPageIntroWcComponent } from './hra-landing-page-intro-wc.component';

jest.mock('@hra-ui/cdk/injectors');
jest.mocked(selectQuerySnapshot).mockReturnValue(() => undefined as never);

describe('HraLandingPageIntroWcComponent', () => {
  let shallow: Shallow<HraLandingPageIntroWcComponent>;

  beforeEach(() => {
    shallow = new Shallow(HraLandingPageIntroWcComponent).dontMock(LinkDirective);
  });

  it('should create HraLandingPageIntroWcComponent', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
