import { dispatch, selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { LandingPageInDepthComponent, LandingPageIntroComponent } from '@hra-ui/components/molecules';
import { Shallow } from 'shallow-render';

import { LandingPageContentComponent } from './landing-page-content.component';
jest.mock('@hra-ui/cdk/injectors');
describe('LandingPageContentComponent', () => {
  let shallow: Shallow<LandingPageContentComponent>;
  jest.mocked(selectQuerySnapshot).mockReturnValue(jest.fn());
  jest.mocked(dispatch).mockReturnValue(jest.fn());
  beforeEach(async () => {
    shallow = new Shallow(LandingPageContentComponent);
  });
  afterEach(() => jest.clearAllMocks());

  it('should create LandingPageContentComponent', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  it('should call exploreFTU function on moreClick event emit', async () => {
    const { instance, findComponent } = await shallow.render();
    const landingPageIntroComponent = findComponent(LandingPageIntroComponent);
    jest.spyOn(instance, 'exploreFTU');
    landingPageIntroComponent.moreClick.emit();
    expect(instance.exploreFTU).toHaveBeenCalled();
  });

  it('should call readMore method on moreClick emits', async () => {
    const { instance, findComponent } = await shallow.render();
    const landingPageInDepthComponent = findComponent(LandingPageInDepthComponent);
    jest.spyOn(instance, 'readMore');
    landingPageInDepthComponent.moreClick.emit();
    expect(instance.readMore).toHaveBeenCalled();
  });

  it('should get metricItems', async () => {
    jest.mocked(selectQuerySnapshot).mockReturnValue(() => {
      return { metrics: [{ type: 'metrics', text: 'test' }] };
    });
    const { instance } = await shallow.render();
    expect(instance.metricItems).toEqual([{ type: 'metrics', text: 'test' }]);
  });
});
