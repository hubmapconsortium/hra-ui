import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AnalyticsEvent, CoreEvents, createEvent, EventCategory, EventTrigger } from '@hra-ui/common/analytics/events';
import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { AnalyticsService } from '../analytics/analytics.service';
import { FeatureDirective } from '../feature/feature.directive';
import { ClickEventDirective, DoubleClickEventDirective, EventDirective, HoverEventDirective } from './event.directive';

describe('EventDirective', () => {
  const customEvent = createEvent('customEvent', EventCategory.Statistics);
  const customEvent2 = createEvent('customEvent2', EventCategory.Necessary, 'dblclick');
  const testProps = { test: 'test' };

  function setup(
    event: AnalyticsEvent,
    props: object = {},
    trigger?: EventTrigger | 'none',
    disabled = false,
    feature?: string,
  ) {
    return render(
      `${feature ? '<div [hraFeature]="feature">' : ''}
        <div [hraEvent]="event" [hraEventProps]="props"
             [hraEventTriggerOn]="trigger" [hraEventDisabled]="disabled"
             data-testid="dir">
        </div>
      ${feature ? '</div>' : ''}`,
      {
        imports: [EventDirective, FeatureDirective],
        providers: [
          {
            provide: AnalyticsService,
            useValue: { logEvent: jest.fn() },
          },
        ],
        componentProperties: {
          event,
          props,
          trigger,
          disabled,
          feature,
        },
      },
    );
  }

  it('should log events when triggered by a dom event', async () => {
    await setup(customEvent, testProps, undefined, undefined, 'abc');
    const analytics = TestBed.inject(AnalyticsService);
    const dir = screen.getByTestId('dir');

    await userEvent.click(dir);
    expect(analytics.logEvent).toHaveBeenCalledWith(customEvent, {
      path: 'abc',
      trigger: 'click',
      triggerData: expect.anything(),
      ...testProps,
    });
  });

  it("should use the event's default trigger", async () => {
    await setup(customEvent2, testProps);
    const analytics = TestBed.inject(AnalyticsService);
    const dir = screen.getByTestId('dir');

    await userEvent.dblClick(dir);
    expect(analytics.logEvent).toHaveBeenCalledWith(customEvent2, expect.anything());
  });

  it('should accept a custom trigger dom event', async () => {
    await setup(customEvent, testProps, 'mouseover');
    const analytics = TestBed.inject(AnalyticsService);
    const dir = screen.getByTestId('dir');

    await userEvent.hover(dir);
    expect(analytics.logEvent).toHaveBeenCalledWith(customEvent, expect.anything());
  });

  it('should not trigger when disabled', async () => {
    await setup(customEvent, testProps, undefined, true);
    const analytics = TestBed.inject(AnalyticsService);
    const dir = screen.getByTestId('dir');

    await userEvent.click(dir);
    expect(analytics.logEvent).not.toHaveBeenCalled();
  });

  it("should not trigger when triggerOn is 'none'", async () => {
    await setup(customEvent, testProps, 'none');
    const analytics = TestBed.inject(AnalyticsService);
    const dir = screen.getByTestId('dir');

    await userEvent.click(dir);
    expect(analytics.logEvent).not.toHaveBeenCalled();
  });
});

function setupSpecializedDirective<T>(type: Type<T>, selector: string) {
  return render(`<div ${selector} data-testid="dir"></div>`, {
    imports: [type],
    providers: [
      {
        provide: AnalyticsService,
        useValue: { logEvent: jest.fn() },
      },
    ],
  });
}

describe('ClickEventDirective', () => {
  it('should trigger a click event', async () => {
    await setupSpecializedDirective(ClickEventDirective, 'hraClickEvent');
    const analytics = TestBed.inject(AnalyticsService);
    const dir = screen.getByTestId('dir');

    await userEvent.click(dir);
    expect(analytics.logEvent).toHaveBeenCalledWith(CoreEvents.Click, expect.anything());
  });
});

describe('HoverEventDirective', () => {
  it('should trigger a hover event', async () => {
    await setupSpecializedDirective(HoverEventDirective, 'hraHoverEvent');
    const analytics = TestBed.inject(AnalyticsService);
    const dir = screen.getByTestId('dir');

    await userEvent.hover(dir);
    expect(analytics.logEvent).toHaveBeenCalledWith(CoreEvents.Hover, expect.anything());
  });
});

describe('DoubleClickEventDirective', () => {
  it('should trigger a double click event', async () => {
    await setupSpecializedDirective(DoubleClickEventDirective, 'hraDoubleClickEvent');
    const analytics = TestBed.inject(AnalyticsService);
    const dir = screen.getByTestId('dir');

    await userEvent.dblClick(dir);
    expect(analytics.logEvent).toHaveBeenCalledWith(CoreEvents.DoubleClick, expect.anything());
  });
});
