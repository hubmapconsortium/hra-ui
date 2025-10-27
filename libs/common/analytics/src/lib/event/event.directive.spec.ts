import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgControl } from '@angular/forms';
import { AnalyticsEvent, CoreEvents, createEvent, EventCategory, EventTrigger } from '@hra-ui/common/analytics/events';
import { render, screen } from '@testing-library/angular';
import { UserEvent, userEvent } from '@testing-library/user-event';
import { BehaviorSubject } from 'rxjs';
import { AnalyticsService } from '../analytics/analytics.service';
import { FeatureDirective } from '../feature/feature.directive';
import {
  ClickEventDirective,
  DoubleClickEventDirective,
  EventDirective,
  HoverEventDirective,
  KeyboardEventDirective,
  ModelChangeEventDirective,
  ModelChangePropsOrFilter,
} from './event.directive';

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

  function getCommonVariables() {
    return {
      analytics: TestBed.inject(AnalyticsService),
      dir: screen.getByTestId('dir'),
      user: userEvent.setup(),
    };
  }

  it('should log events when triggered by a dom event', async () => {
    await setup(customEvent, testProps, undefined, undefined, 'abc');
    const { analytics, dir, user } = getCommonVariables();

    await user.click(dir);
    expect(analytics.logEvent).toHaveBeenCalledWith(customEvent, {
      path: 'abc',
      trigger: 'click',
      triggerData: expect.anything(),
      ...testProps,
    });
  });

  it("should use the event's default trigger", async () => {
    await setup(customEvent2, testProps);
    const { analytics, dir, user } = getCommonVariables();

    await user.dblClick(dir);
    expect(analytics.logEvent).toHaveBeenCalledWith(customEvent2, expect.anything());
  });

  it('should accept a custom trigger dom event', async () => {
    await setup(customEvent, testProps, 'mouseover');
    const { analytics, dir, user } = getCommonVariables();

    await user.hover(dir);
    expect(analytics.logEvent).toHaveBeenCalledWith(customEvent, expect.anything());
  });

  it('should accept a custom trigger dom event with modifier', async () => {
    const { container } = await setup(customEvent, testProps, 'document:mouseover');
    const { analytics, user } = getCommonVariables();

    await user.hover(container);
    expect(analytics.logEvent).toHaveBeenCalledWith(customEvent, expect.anything());
  });

  it('should not trigger when disabled', async () => {
    await setup(customEvent, testProps, undefined, true);
    const { analytics, dir, user } = getCommonVariables();

    await user.click(dir);
    expect(analytics.logEvent).not.toHaveBeenCalled();
  });

  it("should not trigger when triggerOn is 'none'", async () => {
    await setup(customEvent, testProps, 'none');
    const { analytics, dir, user } = getCommonVariables();

    await user.click(dir);
    expect(analytics.logEvent).not.toHaveBeenCalled();
  });
});

function setupSpecializedDirective<T>(type: Type<T>, selector: string) {
  return render(`<div ${selector} tabindex="0" data-testid="dir"></div>`, {
    imports: [type],
    providers: [
      {
        provide: AnalyticsService,
        useValue: { logEvent: jest.fn() },
      },
    ],
  });
}

async function testSpecializedDirectiveTrigger<T>(
  type: Type<T>,
  selector: string,
  event: AnalyticsEvent,
  trigger: (user: UserEvent, dir: HTMLElement) => Promise<void>,
) {
  await setupSpecializedDirective(type, selector);
  const user = userEvent.setup();
  const analytics = TestBed.inject(AnalyticsService);
  const dir = screen.getByTestId('dir');

  await trigger(user, dir);
  expect(analytics.logEvent).toHaveBeenCalledWith(event, expect.anything());
}

describe('ClickEventDirective', () => {
  it('should trigger a click event', () =>
    testSpecializedDirectiveTrigger(ClickEventDirective, 'hraClickEvent', CoreEvents.Click, (user, dir) =>
      user.click(dir),
    ));
});

describe('HoverEventDirective', () => {
  it('should trigger a hover event', () =>
    testSpecializedDirectiveTrigger(HoverEventDirective, 'hraHoverEvent', CoreEvents.Hover, (user, dir) =>
      user.hover(dir),
    ));
});

describe('DoubleClickEventDirective', () => {
  it('should trigger a double click event', () =>
    testSpecializedDirectiveTrigger(
      DoubleClickEventDirective,
      'hraDoubleClickEvent',
      CoreEvents.DoubleClick,
      (user, dir) => user.dblClick(dir),
    ));
});

describe('KeyboardEventDirective', () => {
  it('should trigger a keyboard event', () =>
    testSpecializedDirectiveTrigger(KeyboardEventDirective, 'hraKeyboardEvent', CoreEvents.Keyboard, async (user) => {
      await user.tab();
      await user.keyboard('a');
    }));
});

describe('ModelChangeEventDirective', () => {
  const commonProps = { path: '', trigger: undefined, triggerData: undefined };

  function setup(propsOrFilter: ModelChangePropsOrFilter) {
    return render('<div [hraModelChangeEvent]="data" data-testid="dir"></div>', {
      imports: [ModelChangeEventDirective],
      providers: [
        {
          provide: AnalyticsService,
          useValue: { logEvent: jest.fn() },
        },
        {
          provide: NgControl,
          useValue: { valueChanges: new BehaviorSubject(null) },
        },
      ],
      componentProperties: {
        data: propsOrFilter,
      },
    });
  }

  function getCommonVariables() {
    return {
      analytics: TestBed.inject(AnalyticsService),
      dir: screen.getByTestId('dir'),
      valueChanges: TestBed.inject(NgControl).valueChanges as BehaviorSubject<unknown>,
    };
  }

  it('listens to model changes', async () => {
    await setup('');
    const { analytics, valueChanges } = getCommonVariables();

    expect(analytics.logEvent).not.toHaveBeenCalled();
    valueChanges.next('abc');
    expect(analytics.logEvent).toHaveBeenCalledWith(CoreEvents.ModelChange, { ...commonProps, value: 'abc' });
  });

  it('passes regular props alongside the value', async () => {
    await setup({ myValue: 1 });
    const { analytics, valueChanges } = getCommonVariables();

    valueChanges.next(true);
    expect(analytics.logEvent).toHaveBeenCalledWith(CoreEvents.ModelChange, {
      ...commonProps,
      value: true,
      myValue: 1,
    });
  });

  it('passes props to a filter and uses the result as the new value', async () => {
    const filter = jest.fn().mockReturnValue('def');
    await setup(filter);
    const { analytics, valueChanges } = getCommonVariables();

    valueChanges.next(123);
    expect(filter).toHaveBeenCalledWith(123);
    expect(analytics.logEvent).toHaveBeenCalledWith(CoreEvents.ModelChange, { ...commonProps, value: 'def' });
  });

  it('picks properties from the value when pass a list of property keys', async () => {
    await setup(['a', 'b']);
    const { analytics, valueChanges } = getCommonVariables();

    valueChanges.next(undefined);
    expect(analytics.logEvent).toHaveBeenLastCalledWith(CoreEvents.ModelChange, { ...commonProps, value: {} });
    valueChanges.next(null);
    expect(analytics.logEvent).toHaveBeenLastCalledWith(CoreEvents.ModelChange, { ...commonProps, value: {} });
    valueChanges.next({ a: 1 });
    expect(analytics.logEvent).toHaveBeenLastCalledWith(CoreEvents.ModelChange, { ...commonProps, value: { a: 1 } });
    valueChanges.next({ a: 1, b: false, c: 'qqq' });
    expect(analytics.logEvent).toHaveBeenLastCalledWith(CoreEvents.ModelChange, {
      ...commonProps,
      value: { a: 1, b: false },
    });
  });
});
