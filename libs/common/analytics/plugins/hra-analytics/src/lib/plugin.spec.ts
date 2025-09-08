import { TestBed } from '@angular/core/testing';
import { hraAnalyticsPlugin } from './plugin';
import { TelemetryService } from './telemetry/telemetry.service';
import { Analytics } from 'analytics';
import { CoreEvents } from '@hra-ui/common/analytics/events';

describe('Analytics Plugin', () => {
  const options = { sessionId: 'test' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TelemetryService,
          useValue: { send: jest.fn() },
        },
      ],
    });
  });

  it('must be called in an injection context', () => {
    expect(() => hraAnalyticsPlugin(options)).toThrow();
  });

  it('sends page and track events to the telemetry service', async () => {
    const plugin = TestBed.runInInjectionContext(() => hraAnalyticsPlugin(options));
    const telemetry = TestBed.inject(TelemetryService);
    const config = { app: 'myapp', version: '1.2' };
    const payload = { custom: 'data' };
    const analytics = Analytics({
      ...config,
      plugins: [plugin],
    });

    await analytics.page(payload);
    expect(telemetry.send).toHaveBeenCalledWith({
      sessionId: options.sessionId,
      ...config,
      event: CoreEvents.PageView.type,
      e: expect.objectContaining(payload),
    });

    await analytics.track(CoreEvents.Click.type, payload);
    expect(telemetry.send).toHaveBeenCalledWith({
      sessionId: options.sessionId,
      event: CoreEvents.Click.type,
      e: expect.objectContaining(payload),
    });
  });
});
