import { dispatch, injectDestroy$, selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { Subject } from 'rxjs';
import { Shallow } from 'shallow-render';
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
