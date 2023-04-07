import { dispatch, injectDestroy$, selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { LandingPageInDepthComponent, LandingPageIntroComponent } from '@hra-ui/components/molecules';
import { Shallow } from 'shallow-render';

import { Subject } from 'rxjs';
import { LandingPageContentComponent } from './landing-page-content.component';
jest.mock('@hra-ui/cdk/injectors');
describe('LandingPageContentComponent', () => {
  let shallow: Shallow<LandingPageContentComponent>;
  jest.mocked(selectQuerySnapshot).mockReturnValue(jest.fn());
  jest.mocked(dispatch).mockReturnValue(jest.fn());
  const destroy$ = new Subject<void>();
  jest.mocked(injectDestroy$).mockReturnValue(destroy$.asObservable());
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
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

  it('should handle intersection observer callback and add class', async () => {
    const { instance } = await shallow.render();
    const mockedEntries = [
      {
        isIntersecting: true,
        target: instance['intersectableEls'].get(0)?.nativeElement,
      },
    ] as IntersectionObserverEntry[];
    jest.spyOn(instance['renderer'], 'addClass');
    instance.handleIntersection(mockedEntries, new IntersectionObserver(() => null));
    expect(instance['renderer'].addClass).toHaveBeenCalled();
  });

  it('should disconnect observer on destroy', async () => {
    destroy$.next();
  });
});
