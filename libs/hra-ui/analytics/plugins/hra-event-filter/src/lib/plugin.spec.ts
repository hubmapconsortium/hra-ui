import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CoreEvents } from '@hra-ui/common/analytics/events';
import { hraEventFilterPlugin } from './plugin';

describe('hra-event-filter plugin', () => {
  function setup(isBrowser = true) {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: PLATFORM_ID,
          useValue: isBrowser ? 'browser' : 'server',
        },
      ],
    });

    const abort = jest.fn();
    const isEventEnabled = jest.fn().mockReturnValue(false);
    const plugin = TestBed.runInInjectionContext(() => hraEventFilterPlugin({ isEventEnabled }));
    const callPluginMethod = (method: 'pageStart' | 'identifyStart' | 'trackStart'): void => {
      (plugin[method] as (data: unknown) => void)({
        abort,
        payload: {
          event: CoreEvents.Click.type,
          options: { category: CoreEvents.Click.category },
        },
      });
    };

    return { abort, callPluginMethod, isEventEnabled, plugin };
  }

  it('should abort when an event is disabled', () => {
    const { abort, callPluginMethod } = setup();
    callPluginMethod('pageStart');
    callPluginMethod('identifyStart');
    callPluginMethod('trackStart');
    expect(abort).toHaveBeenCalledTimes(3);
  });

  it('should abort when not running in the browser', () => {
    const { abort, callPluginMethod, isEventEnabled } = setup(false);
    isEventEnabled.mockReturnValue(true);
    callPluginMethod('pageStart');
    callPluginMethod('identifyStart');
    callPluginMethod('trackStart');
    expect(abort).toHaveBeenCalledTimes(3);
  });

  it('should not call abort when the event is enabled', () => {
    const { abort, callPluginMethod, isEventEnabled } = setup();
    isEventEnabled.mockReturnValueOnce(true);
    callPluginMethod('pageStart');
    expect(abort).not.toHaveBeenCalled();
  });
});
