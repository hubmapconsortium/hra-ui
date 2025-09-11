import { TestBed } from '@angular/core/testing';
import { CoreEvents } from '@hra-ui/common/analytics/events';
import { TelemetryService } from '@hra-ui/common/analytics/plugins/hra-analytics';
import { waitFor } from '@testing-library/dom';
import { ConsentService } from '../consent/consent.service';
import { FeatureDirective } from '../feature/feature.directive';
import { AnalyticsService, injectLogEvent } from './analytics.service';

describe('AnalyticsService', () => {
  function setup(): AnalyticsService {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ConsentService,
          useValue: { isEventEnabled: jest.fn().mockReturnValue(true) },
        },
        {
          provide: TelemetryService,
          useValue: { send: jest.fn() },
        },
      ],
    });

    return TestBed.inject(AnalyticsService);
  }

  it('should log page views to plugins', async () => {
    const service = setup();
    const telemetry = TestBed.inject(TelemetryService);
    const data = { foo: 'bar' };

    service.logPageView(data);
    await waitFor(() =>
      expect(telemetry.send).toHaveBeenCalledWith(
        expect.objectContaining({
          e: expect.objectContaining(data),
        }),
      ),
    );
  });

  it('should log events to plugins', async () => {
    const service = setup();
    const telemetry = TestBed.inject(TelemetryService);
    const data = { qwerty: 123 };

    service.logEvent(CoreEvents.Click, data);
    await waitFor(() =>
      expect(telemetry.send).toHaveBeenCalledWith(
        expect.objectContaining({
          event: CoreEvents.Click.type,
          e: expect.objectContaining(data),
        }),
      ),
    );
  });
});

describe('injectLogEvent()', () => {
  const path = 'path.to.event';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AnalyticsService,
          useValue: { logEvent: jest.fn() },
        },
        {
          provide: FeatureDirective,
          useValue: { path: jest.fn().mockReturnValue(path) },
        },
      ],
    });
  });

  it('should log events using the analytics service', () => {
    const service = TestBed.inject(AnalyticsService);
    const logEvent = TestBed.runInInjectionContext(injectLogEvent);
    const data = { values: [1, 2, 3] };

    logEvent(CoreEvents.DoubleClick, data);
    expect(service.logEvent).toHaveBeenCalledWith(CoreEvents.DoubleClick, { path, ...data });
  });
});
