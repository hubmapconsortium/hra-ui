import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CoreEvents } from '@hra-ui/common/analytics/events';
import { AnalyticsPlugin } from 'analytics';
import { hraEventFilterPlugin } from './plugin';

describe('Event Filter Plugin', () => {
  let isEventEnabled: jest.Mock<boolean>;
  let abort: jest.Mock;
  let data: unknown;
  let plugin: AnalyticsPlugin;

  function callPluginMethod(method: 'pageStart' | 'identifyStart' | 'trackStart'): void {
    (plugin[method] as (data: unknown) => void)(data);
  }

  beforeEach(() => {
    isEventEnabled = jest.fn().mockReturnValue(false);
    abort = jest.fn();
    data = {
      abort,
      payload: {
        event: CoreEvents.Click.type,
        options: { category: CoreEvents.Click.category },
      },
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: PLATFORM_ID,
          useValue: 'browser',
        },
      ],
    });
    plugin = TestBed.runInInjectionContext(() => hraEventFilterPlugin({ isEventEnabled }));
  });

  it('should abort when an event is disabled', () => {
    callPluginMethod('pageStart');
    callPluginMethod('identifyStart');
    callPluginMethod('trackStart');
    expect(abort).toHaveBeenCalledTimes(3);
  });

  it('should not call abort when the event is enabled', () => {
    isEventEnabled.mockReturnValueOnce(true);
    callPluginMethod('pageStart');
    expect(abort).not.toHaveBeenCalled();
  });
});
