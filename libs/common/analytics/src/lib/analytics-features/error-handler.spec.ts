import { TestBed } from '@angular/core/testing';
import { CoreEvents } from '@hra-ui/common/analytics/events';
import { AnalyticsService } from '../analytics/analytics.service';
import {
  AnalyticsErrorHandler,
  AnalyticsErrorHandlerConfig,
  provideAnalyticsErrorHandlerConfig,
} from './error-handler';

describe('AnalyticsErrorHandler', () => {
  let consoleErrorSpy: jest.SpyInstance;
  beforeEach(() => (consoleErrorSpy = jest.spyOn(console, 'error')));
  afterEach(() => consoleErrorSpy.mockRestore());

  function setup(config: AnalyticsErrorHandlerConfig = {}) {
    TestBed.configureTestingModule({
      providers: [
        provideAnalyticsErrorHandlerConfig(config),
        {
          provide: AnalyticsService,
          useValue: { logEvent: jest.fn() },
        },
      ],
    });

    return TestBed.inject(AnalyticsErrorHandler);
  }

  function ignoreNextConsoleError(): void {
    consoleErrorSpy.mockImplementationOnce(() => undefined);
  }

  it('logs errors to analytics', () => {
    const handler = setup();
    const analytics = TestBed.inject(AnalyticsService);
    const error = new Error('an unknown error has occured');

    ignoreNextConsoleError();
    handler.handleError(error);
    expect(analytics.logEvent).toHaveBeenCalledWith(CoreEvents.Error, {
      message: expect.any(String),
      reason: error,
    });
  });

  it("logs errors to console if the 'console' configuration options is set to true", () => {
    const handler = setup({ console: true });
    const error = new Error('oh no');

    ignoreNextConsoleError();
    handler.handleError(error);
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(String), error);
  });
});
