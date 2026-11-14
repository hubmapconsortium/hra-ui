import { ViewportScroller } from '@angular/common';
import { Provider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Event, NavigationEnd, NavigationSkipped, NavigationSkippedCode, Router, Scroll } from '@angular/router';
import { mock, MockProxy } from 'jest-mock-extended';
import { Subject } from 'rxjs';
import { CustomScrollService, provideCustomScrollOptions } from './custom-scroll.service';

describe('CustomScrollService', () => {
  let events: Subject<Event>;
  let scroller: MockProxy<ViewportScroller>;

  function setup(providers: Provider[] = []): void {
    events = new Subject<Event>();
    scroller = mock<ViewportScroller>();
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: { events } },
        { provide: ViewportScroller, useValue: scroller },
        ...providers,
      ],
    });
    TestBed.inject(CustomScrollService);
  }

  function navigate(url: string, position: [number, number] | null = null, anchor: string | null = null): void {
    events.next(new Scroll(new NavigationEnd(1, url, url), position, anchor));
  }

  it('should take over history scroll restoration', () => {
    setup();
    expect(scroller.setHistoryScrollRestoration).toHaveBeenCalledWith('manual');
  });

  it('should scroll to the top when the route changes', () => {
    setup();
    navigate('/gallery');
    navigate('/gallery/study');
    expect(scroller.scrollToPosition).toHaveBeenCalledWith([0, 0], undefined);
  });

  it('should not scroll when only the query parameters change', () => {
    setup();
    navigate('/gallery?page=1');
    navigate('/gallery?page=2');
    expect(scroller.scrollToPosition).not.toHaveBeenCalled();
  });

  it('should restore saved positions', () => {
    setup();
    navigate('/gallery', [0, 120]);
    expect(scroller.scrollToPosition).toHaveBeenCalledWith([0, 120], undefined);
  });

  it('should scroll to anchors', () => {
    setup();
    navigate('/gallery', null, 'featured-studies');
    expect(scroller.scrollToAnchor).toHaveBeenCalledWith('featured-studies');
  });

  it('should compare skipped navigations by url', () => {
    setup();
    navigate('/gallery');
    events.next(
      new Scroll(new NavigationSkipped(2, '/gallery', '', NavigationSkippedCode.IgnoredSameUrlNavigation), null, null),
    );
    expect(scroller.scrollToPosition).not.toHaveBeenCalled();
  });

  it('should jump instantly when instant navigation is enabled', () => {
    setup([provideCustomScrollOptions({ instantNavigation: true })]);
    navigate('/gallery');
    navigate('/gallery/study');
    navigate('/gallery', [0, 120]);
    expect(scroller.scrollToPosition).toHaveBeenCalledWith([0, 0], { behavior: 'instant' });
    expect(scroller.scrollToPosition).toHaveBeenCalledWith([0, 120], { behavior: 'instant' });
  });
});
