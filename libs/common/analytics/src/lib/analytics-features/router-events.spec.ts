import { TestBed } from '@angular/core/testing';
import { Event, NavigationEnd, NavigationError, Router } from '@angular/router';
import { CoreEvents } from '@hra-ui/common/analytics/events';
import { Subject } from 'rxjs';
import { AnalyticsService } from '../analytics/analytics.service';
import { setupRouterEventListener } from './router-events';

describe('Analytics Router Events', () => {
  function setup(): Subject<Event> {
    const events = new Subject<Event>();
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: { events },
        },
        {
          provide: AnalyticsService,
          useValue: {
            logPageView: jest.fn(),
            logEvent: jest.fn(),
          },
        },
      ],
    });

    TestBed.runInInjectionContext(() => setupRouterEventListener());
    return events;
  }

  it('should log page views on navigation end', () => {
    const events = setup();
    const analytics = TestBed.inject(AnalyticsService);

    events.next(new NavigationEnd(0, '/test', ''));
    expect(analytics.logPageView).toHaveBeenCalled();
  });

  it('should log navigation errors', () => {
    const events = setup();
    const analytics = TestBed.inject(AnalyticsService);
    const error = new Error('navigation error');

    events.next(new NavigationError(0, '/test', error));
    expect(analytics.logEvent).toHaveBeenCalledWith(
      CoreEvents.Error,
      expect.objectContaining({
        reason: error,
      }),
    );
  });
});
