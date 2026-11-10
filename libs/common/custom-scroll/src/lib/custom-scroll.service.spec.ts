import { Location, ViewportScroller } from '@angular/common';
import { provideLocationMocks } from '@angular/common/testing';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { CustomScrollService } from './custom-scroll.service';

@Component({ selector: 'hra-test-page', template: '' })
class TestPageComponent {}

describe('CustomScrollService', () => {
  let router: Router;
  let scroller: jest.Mocked<ViewportScroller>;

  async function navigate(url: string): Promise<void> {
    await router.navigateByUrl(url);
    jest.runAllTimers();
  }

  beforeEach(async () => {
    jest.useFakeTimers();
    scroller = {
      setHistoryScrollRestoration: jest.fn(),
      getScrollPosition: jest.fn().mockReturnValue([0, 0]),
      scrollToPosition: jest.fn(),
      scrollToAnchor: jest.fn(),
    } as unknown as jest.Mocked<ViewportScroller>;

    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: 'a', component: TestPageComponent },
          { path: 'b', component: TestPageComponent },
        ]),
        provideLocationMocks(),
        { provide: ViewportScroller, useValue: scroller },
      ],
    });

    TestBed.inject(CustomScrollService);
    router = TestBed.inject(Router);
    router.setUpLocationChangeListener();
    await navigate('/a');
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should take over history scroll restoration', () => {
    expect(scroller.setHistoryScrollRestoration).toHaveBeenCalledWith('manual');
  });

  it('should not scroll on the initial navigation', () => {
    expect(scroller.scrollToPosition).not.toHaveBeenCalled();
  });

  it('should not scroll when navigating to the same url', async () => {
    await navigate('/a');
    expect(scroller.scrollToPosition).not.toHaveBeenCalled();
  });

  it('should scroll to the top instantly when the route changes', async () => {
    await navigate('/b');
    expect(scroller.scrollToPosition).toHaveBeenCalledWith([0, 0], { behavior: 'instant' });
  });

  it('should not scroll when only query params change', async () => {
    await navigate('/a?x=1');
    expect(scroller.scrollToPosition).not.toHaveBeenCalled();
  });

  it('should scroll to the anchor when the url has a fragment', async () => {
    await navigate('/b#section');
    expect(scroller.scrollToAnchor).toHaveBeenCalledWith('section');
  });

  it('should restore the previous position on back navigation', async () => {
    scroller.getScrollPosition.mockReturnValue([0, 500]);
    await navigate('/b');
    scroller.scrollToPosition.mockClear();

    TestBed.inject(Location).back();
    await jest.runAllTimersAsync();
    expect(scroller.scrollToPosition).toHaveBeenCalledWith([0, 500], { behavior: 'instant' });
  });

  describe('when the page is too short to restore yet', () => {
    const originalResizeObserver = globalThis.ResizeObserver;
    let resize: () => void;
    let disconnect: jest.Mock;

    beforeEach(async () => {
      disconnect = jest.fn();
      globalThis.ResizeObserver = jest.fn().mockImplementation((callback: () => void) => {
        resize = callback;
        return { observe: jest.fn(), disconnect };
      }) as unknown as typeof ResizeObserver;

      scroller.getScrollPosition.mockReturnValue([0, 500]);
      await navigate('/b');
      scroller.getScrollPosition.mockReturnValue([0, 200]);
      scroller.scrollToPosition.mockClear();

      TestBed.inject(Location).back();
      await jest.advanceTimersByTimeAsync(100);
    });

    afterEach(() => {
      globalThis.ResizeObserver = originalResizeObserver;
    });

    it('should reapply the position as the page grows', () => {
      scroller.getScrollPosition.mockReturnValue([0, 500]);
      resize();

      expect(scroller.scrollToPosition).toHaveBeenCalledTimes(2);
      expect(disconnect).toHaveBeenCalled();
    });

    it('should stop restoring once the user scrolls', () => {
      window.dispatchEvent(new Event('wheel'));

      expect(disconnect).toHaveBeenCalled();
    });
  });
});
