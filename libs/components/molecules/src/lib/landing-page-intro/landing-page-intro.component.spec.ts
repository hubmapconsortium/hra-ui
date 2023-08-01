import { LinkDirective } from '@hra-ui/cdk';
import { selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { Shallow } from 'shallow-render';
import { LandingPageIntroComponent } from './landing-page-intro.component';

jest.mock('@hra-ui/cdk/injectors');
jest.mocked(selectQuerySnapshot).mockReturnValue(() => undefined as never);

describe('LandingPageIntroComponent', () => {
  let shallow: Shallow<LandingPageIntroComponent>;

  beforeEach(() => {
    shallow = new Shallow(LandingPageIntroComponent).dontMock(LinkDirective);
  });

  it('should create LandingPageIntroComponent', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
