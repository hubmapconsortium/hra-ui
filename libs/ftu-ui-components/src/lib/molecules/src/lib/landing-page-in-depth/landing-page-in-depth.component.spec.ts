import { LinkDirective } from '@hra-ui/cdk';
import { selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { Shallow } from 'shallow-render';
import { LandingPageInDepthComponent } from './landing-page-in-depth.component';

jest.mock('@hra-ui/cdk/injectors');
jest.mocked(selectQuerySnapshot).mockReturnValue(() => undefined as never);

describe('LandingPageInDepthComponent', () => {
  let shallow: Shallow<LandingPageInDepthComponent>;

  beforeEach(() => {
    shallow = new Shallow(LandingPageInDepthComponent).dontMock(LinkDirective);
  });

  it('renders images correctly', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
